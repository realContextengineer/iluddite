import { schedule } from '@netlify/functions';
import { getStore } from '@netlify/blobs';
import Anthropic from '@anthropic-ai/sdk';
import prompts from '../../src/data/prompts.json';

const TONE_GUIDE = `You are writing a daily reading for "iLuddite" — a British website encouraging people to unplug from technology.

TONE:
- British English (colour, centre, realise, café, etc.)
- Warm, conversational, like a wise friend having a cuppa with you
- Gently self-deprecating and slightly funny — "be a Luddite today", "put the phone down", "the world will survive without your opinion for an hour"
- NOT preachy, NOT wellness-bro, NOT American self-help
- Acknowledge difficulty — this isn't easy, that's the point
- Specific details that feel lived-in — weather, seasons, kettles, pub gardens, the M6, a Tesco queue
- Occasionally irreverent — we're a website telling you not to use websites, and we know that's funny

STRUCTURE — Return valid JSON with these exact fields:
{
  "day": <number>,
  "date": "<e.g. January 12>",
  "title": "<the title provided>",
  "holidayNote": "<optional — only if it's a notable day, otherwise null>",
  "somaticInvitation": "<the main reading, 2-4 paragraphs separated by \\n\\n — body-aware, grounded, sensory>",
  "practice": "<one concrete, doable practice for today — 1-2 sentences>",
  "niceSelf": "<one kind thing to do for yourself today — 1 sentence>",
  "niceOther": "<one kind thing to do for someone else today — 1 sentence>",
  "quote": "<a real quote from literature, poetry, philosophy, or folk wisdom — must be a genuine quote>",
  "quoteSource": "<author name, and work title if relevant>",
  "techBoundary": "<one specific tech boundary to try today — 1-2 sentences>",
  "tags": ["<3-5 relevant tags from: breath, rest, morning, embodiment, presence, nervous-system, silence, letting-go, meals, solstice, nature, cycles, light, darkness, winter, spring, summer, autumn, milestone, awareness, gratitude, new-year, community, creativity, work, weekend, evening, walking, reading, cooking>"]
}

IMPORTANT: Return ONLY the JSON object, no markdown, no code fences, no extra text.`;

function getDayOfYear(): number {
  const now = new Date();
  // Use UK time
  const ukTime = new Date(now.toLocaleString('en-GB', { timeZone: 'Europe/London' }));
  const start = new Date(ukTime.getFullYear(), 0, 0);
  const diff = ukTime.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

function getDateString(): string {
  const now = new Date();
  const ukTime = new Date(now.toLocaleString('en-GB', { timeZone: 'Europe/London' }));
  return ukTime.toISOString().split('T')[0];
}

const innerHandler = async () => {
  try {
    const dayOfYear = getDayOfYear();
    const prompt = prompts.find(p => p.day === dayOfYear);

    if (!prompt) {
      console.error(`No prompt found for day ${dayOfYear}`);
      return { statusCode: 500, body: 'No prompt for today' };
    }

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const message = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1500,
      messages: [
        {
          role: 'user',
          content: `Write today's iLuddite reading.

Day ${prompt.day} — ${prompt.date}
Month theme: "${prompt.monthTheme}" (${prompt.monthSubtitle})
Title: "${prompt.title}"

${TONE_GUIDE}`,
        },
      ],
    });

    const responseText = message.content[0].type === 'text' ? message.content[0].text : '';
    const reading = JSON.parse(responseText);

    // Store in Netlify Blobs
    const store = getStore('readings');
    const dateKey = getDateString();

    // Store by date (for retrieval)
    await store.set(dateKey, JSON.stringify(reading));
    // Also store as "today" for quick access
    await store.set('today', JSON.stringify({
      date: dateKey,
      reading: reading,
    }));

    console.log(`Generated reading for day ${dayOfYear} (${prompt.date}): "${prompt.title}"`);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, day: dayOfYear, date: prompt.date }),
    };
  } catch (error) {
    console.error('Error generating reading:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to generate reading' }),
    };
  }
};

// Run at midnight UK time (GMT = 00:00, BST = 23:00 UTC previous day)
// We'll use 00:05 UTC to be safe — during BST this is 01:05 UK time
export const handler = schedule('5 0 * * *', innerHandler);

import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';
import Anthropic from '@anthropic-ai/sdk';
import prompts from '../../src/data/prompts.json';
import pools from '../../src/data/suggestion-pools.json';

// Seeded random picker — gives consistent results per day but different each day
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

function pickRandom<T>(arr: T[], count: number, rng: () => number): T[] {
  const shuffled = [...arr].sort(() => rng() - 0.5);
  return shuffled.slice(0, count);
}

function getDailyExamples(dayOfYear: number) {
  const rng = seededRandom(dayOfYear * 7919);
  return {
    practices: pickRandom(pools.practices, 3, rng),
    niceSelf: pickRandom(pools.niceSelf, 3, rng),
    niceOther: pickRandom(pools.niceOther, 3, rng),
    techBoundary: pickRandom(pools.techBoundary, 3, rng),
    quotes: pickRandom(pools.quotes, 3, rng),
  };
}

const TONE_GUIDE = `You are writing a daily reading for "Bitless" — a British website encouraging people to unplug from technology. The name has three meanings: a horse without a bit (free, unbridled), a bit less tech, and bit-less (fewer digital bits).

TONE:
- British English (colour, centre, realise, café, etc.)
- Warm, conversational, like a thoughtful friend — not performative, not preachy
- Gently self-deprecating and slightly funny — we're a website telling you not to use websites, and we know that's funny
- NOT preachy, NOT wellness-bro, NOT American self-help, NOT Instagram mindfulness
- Acknowledge difficulty — this isn't easy, that's the point
- Range from whimsical to therapeutic to somatic to creative — surprise the reader
- Occasionally irreverent, occasionally tender, always human

BANNED PHRASES — Do NOT use any of these:
- "cup of tea" / "cuppa" / "kettle" / "brew" (overused)
- "take a deep breath" (too generic)
- "in this digital age" / "in today's world" (cliché)
- "mindful" / "mindfulness" / "mindfully" (overused)
- "journey" (wellness cliché)
- "self-care" (too buzzwordy)
- "unplug" on its own (too obvious for our brand)
- "digital detox" (cliché)
- "screen time" (too parental)

STRUCTURE — Return valid JSON with these exact fields:
{
  "day": <number>,
  "date": "<e.g. January 12>",
  "title": "<the title provided>",
  "holidayNote": "<optional — only if it's a notable day, otherwise null>",
  "somaticInvitation": "<the main reading, 2-4 paragraphs separated by \\\\n\\\\n — body-aware, grounded, sensory. This should feel like prose, not instructions.>",
  "practice": "<one concrete, doable somatic or grounding practice — 1-2 sentences. Be SPECIFIC about the body — hands, feet, ribs, jaw, shoulders. Not vague.>",
  "niceSelf": "<one kind, sensory thing to do for yourself — 1 sentence. NOT 'have a cup of tea'. Think texture, temperature, sound, taste, movement.>",
  "niceOther": "<one act of human connection for someone else — 1 sentence. Specific, doable, real.>",
  "quote": "<a real, verified quote — can be from literature, music, philosophy, comedy, film, folk wisdom. Must be genuine.>",
  "quoteSource": "<author/artist name, and work title if relevant>",
  "techBoundary": "<one specific, practical digital limit to try today — 1-2 sentences. Concrete, not vague.>",
  "tags": ["<3-5 relevant tags from: breath, rest, morning, embodiment, presence, nervous-system, silence, letting-go, meals, solstice, nature, cycles, light, darkness, winter, spring, summer, autumn, milestone, awareness, gratitude, new-year, community, creativity, work, weekend, evening, walking, reading, cooking>"]
}

CRITICAL RULES:
- Each field must be COMPLETELY DIFFERENT from the others — no repeated themes or phrases across fields
- DO NOT copy the examples below verbatim — use them as inspiration for tone and specificity
- The practice must involve the BODY — not just thinking or deciding
- The quote can be funny, profound, unexpected — from musicians, poets, comedians, philosophers, anyone real
- Return ONLY the JSON object, no markdown, no code fences, no extra text.`;

function getDayOfYear(): number {
  const now = new Date();
  const ukTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/London' }));
  const start = new Date(ukTime.getFullYear(), 0, 0);
  const diff = ukTime.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

function getDateString(): string {
  const now = new Date();
  const ukTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/London' }));
  return ukTime.toISOString().split('T')[0];
}

const handler: Handler = async () => {
  try {
    const dayOfYear = getDayOfYear();
    const prompt = prompts.find(p => p.day === dayOfYear);

    if (!prompt) {
      return { statusCode: 500, body: JSON.stringify({ error: `No prompt found for day ${dayOfYear}` }) };
    }

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const examples = getDailyExamples(dayOfYear);

    const examplesBlock = `
HERE ARE SOME EXAMPLES FOR INSPIRATION (do NOT copy these — write something fresh and different):

Practice examples:
${examples.practices.map((p: string, i: number) => `${i + 1}. ${p}`).join('\n')}

Nice thing for yourself examples:
${examples.niceSelf.map((p: string, i: number) => `${i + 1}. ${p}`).join('\n')}

Nice thing for someone else examples:
${examples.niceOther.map((p: string, i: number) => `${i + 1}. ${p}`).join('\n')}

Tech boundary examples:
${examples.techBoundary.map((p: string, i: number) => `${i + 1}. ${p}`).join('\n')}

Quote examples (use a DIFFERENT quote, these are just for tone):
${examples.quotes.map((q: { text: string; source: string }, i: number) => `${i + 1}. "${q.text}" — ${q.source}`).join('\n')}
`;

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1500,
      messages: [
        {
          role: 'user',
          content: `Write today's Bitless reading.

Day ${prompt.day} — ${prompt.date}
Month theme: "${prompt.monthTheme}" (${prompt.monthSubtitle})
Title: "${prompt.title}"

${TONE_GUIDE}

${examplesBlock}`,
        },
      ],
    });

    const responseText = message.content[0].type === 'text' ? message.content[0].text : '';
    const reading = JSON.parse(responseText);

    // Store in Supabase
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { error: dbError } = await supabase
      .from('readings')
      .upsert({
        date: getDateString(),
        day: dayOfYear,
        content: reading,
      });

    if (dbError) {
      console.error('Supabase error:', dbError);
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, stored: !dbError, day: dayOfYear, date: prompt.date, reading }),
    };
  } catch (error) {
    console.error('Error generating reading:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to generate reading', details: String(error) }),
    };
  }
};

export { handler };

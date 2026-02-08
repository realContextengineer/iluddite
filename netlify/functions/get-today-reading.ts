import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

function getDateString(): string {
  const now = new Date();
  const ukTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/London' }));
  return ukTime.toISOString().split('T')[0];
}

const handler: Handler = async (event) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Cache-Control': 'public, max-age=300',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const todayDate = getDateString();

    const { data, error } = await supabase
      .from('readings')
      .select('content')
      .eq('date', todayDate)
      .single();

    if (error || !data) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'No reading generated yet for today' }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data.content),
    };
  } catch (error) {
    console.error('Error fetching reading:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to fetch reading' }),
    };
  }
};

export { handler };

import { Handler } from '@netlify/functions';
import { getStore } from '@netlify/blobs';

const handler: Handler = async (event) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const store = getStore('readings');
    const todayData = await store.get('today');

    if (!todayData) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'No reading generated yet for today' }),
      };
    }

    const parsed = JSON.parse(todayData);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(parsed.reading),
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

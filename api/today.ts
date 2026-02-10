import { createClient } from '@supabase/supabase-js';

function getDateString(): string {
  const now = new Date();
  const ukTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/London' }));
  return ukTime.toISOString().split('T')[0];
}

export default async function handler(req: any, res: any) {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Cache-Control': 'public, max-age=300',
  };

  if (req.method === 'OPTIONS') {
    res.status(200).setHeader('Access-Control-Allow-Origin', headers['Access-Control-Allow-Origin']);
    res.status(200).setHeader('Access-Control-Allow-Headers', headers['Access-Control-Allow-Headers']);
    return res.status(200).send('');
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
      return res.status(404).setHeader('Content-Type', headers['Content-Type']).json({
        error: 'No reading generated yet for today',
      });
    }

    return res.status(200).setHeader('Content-Type', headers['Content-Type']).json(data.content);
  } catch (error) {
    console.error('Error fetching reading:', error);
    return res.status(500).setHeader('Content-Type', headers['Content-Type']).json({
      error: 'Failed to fetch reading',
    });
  }
}

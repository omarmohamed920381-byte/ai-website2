const fetch = require('node-fetch');
exports.handler = async function(event, context) {
  try {
    const { message } = JSON.parse(event.body || '{}');
    const apiKey = process.env.OMAR_AI_KEY || process.env.OPENAI_API_KEY;
    if(!apiKey) return { statusCode:500, body: JSON.stringify({ error: 'Missing API key (OMAR_AI_KEY)' }) };
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method:'POST', headers:{'Content-Type':'application/json','Authorization':'Bearer '+apiKey},
      body: JSON.stringify({ model:'gpt-4o-mini', messages:[{role:'user',content:message}], max_tokens:500 })
    });
    const j = await r.json();
    const reply = j.choices?.[0]?.message?.content ?? (j.error && j.error.message) ?? 'No reply';
    return { statusCode:200, body: JSON.stringify({ reply }) };
  } catch (err) { return { statusCode:500, body: JSON.stringify({ error: String(err) }) }; }
};
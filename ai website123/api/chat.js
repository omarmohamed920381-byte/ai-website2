const fetch = require('node-fetch');
module.exports = async (req, res) => {
  try {
    const { message } = req.body || {};
    const apiKey = process.env.OMAR_AI_KEY || process.env.OPENAI_API_KEY;
    if(!apiKey) return res.status(500).json({ error: 'Missing API key (OMAR_AI_KEY)' });
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method:'POST', headers:{'Content-Type':'application/json','Authorization':'Bearer '+apiKey},
      body: JSON.stringify({ model:'gpt-4o-mini', messages:[{role:'user',content:message}], max_tokens:500 })
    });
    const j = await r.json();
    const reply = j.choices?.[0]?.message?.content ?? (j.error && j.error.message) ?? 'No reply';
    res.json({ reply });
  } catch (e) { res.status(500).json({ error: String(e) }); }
};
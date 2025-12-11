export async function onRequestPost(context) {
  try {
    const { message } = await context.request.json();
    const apiKey = context.env.OMAR_AI_KEY || context.env.OPENAI_API_KEY;
    if(!apiKey) return new Response(JSON.stringify({ error: 'Missing API key (OMAR_AI_KEY)' }), { status: 500 });
    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method:'POST', headers:{ 'Content-Type':'application/json','Authorization':'Bearer '+apiKey },
      body: JSON.stringify({ model:'gpt-4o-mini', messages:[{role:'user',content:message}], max_tokens:500 })
    });
    const j = await resp.json();
    const reply = j.choices?.[0]?.message?.content ?? (j.error && j.error.message) ?? 'No reply';
    return new Response(JSON.stringify({ reply }), { headers: { 'Content-Type':'application/json' } });
  } catch (err) { return new Response(JSON.stringify({ error: String(err) }), { status:500 }); }
}
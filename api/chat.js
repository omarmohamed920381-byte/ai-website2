import OpenAI from "openai";

export default async function handler(req, res) {
  try{
    const client = new OpenAI({ apiKey: process.env.OMAR_AI_KEY });
    const userMsg = req.body.message || "";

    const completion = await client.chat.completions.create({
      model:"gpt-4o-mini",
      messages:[{role:"user", content:userMsg}]
    });

    res.status(200).json({ reply: completion.choices[0].message.content });
  }catch(e){
    res.status(500).json({ error: e.message });
  }
}

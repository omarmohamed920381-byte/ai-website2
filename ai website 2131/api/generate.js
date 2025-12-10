import fetch from 'node-fetch';

export default async function handler(req,res){
 if(req.method!=='POST') return res.status(405).json({error:'no'});
 const {prompt}=req.body;
 const r=await fetch("https://api.openai.com/v1/images/generations",{
  method:"POST",
  headers:{
   "Content-Type":"application/json",
   "Authorization":"Bearer "+process.env.OPENAI_API_KEY
  },
  body:JSON.stringify({
    model:"gpt-image-1",
    prompt,
    size:"1024x1024"
  })
 });
 const j=await r.json();
 const url=j.data?.[0]?.url || "";
 res.status(200).json({image:url});
}

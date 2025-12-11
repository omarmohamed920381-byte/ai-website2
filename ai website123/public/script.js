// animated background canvas (soft floating gradients)
const canvas = document.getElementById('bgCanvas'), ctx = canvas.getContext('2d');
function resize(){ canvas.width = innerWidth; canvas.height = document.querySelector('.hero').offsetHeight; }
resize(); window.addEventListener('resize', resize);
let blobs = [];
for(let i=0;i<8;i++) blobs.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:120+Math.random()*140,dx:(Math.random()-0.5)*0.3,dy:(Math.random()-0.5)*0.3, hue: Math.random()*360});
function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  blobs.forEach(b=>{
    b.x+=b.dx; b.y+=b.dy;
    if(b.x< -200) b.x = canvas.width+200; if(b.x>canvas.width+200) b.x=-200;
    if(b.y< -200) b.y = canvas.height+200; if(b.y>canvas.height+200) b.y=-200;
    let g = ctx.createRadialGradient(b.x,b.y,0,b.x,b.y,b.r);
    g.addColorStop(0, `hsla(${b.hue},80%,60%,0.18)`);
    g.addColorStop(1, `hsla(${b.hue},60%,40%,0)`);
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(b.x,b.y,b.r,0,Math.PI*2); ctx.fill();
  });
  requestAnimationFrame(draw);
}
draw();

async function sendPrompt(){
  const input = document.getElementById('prompt');
  const val = input.value.trim();
  if(!val) return alert('Type something');
  const btn = document.getElementById('send'); btn.disabled=true; btn.textContent='Thinking...';
  try{
    // try Vercel first
    let res = await fetch('/api/chat', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ message: val }) });
    if(!res.ok){
      // fallback to Netlify function path
      res = await fetch('/.netlify/functions/chat', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ message: val }) });
    }
    const j = await res.json();
    alert('AI reply:\n' + (j.reply || j.error || JSON.stringify(j)));
  }catch(err){
    alert('Backend error: ' + err.message);
  }finally{ btn.disabled=false; btn.textContent='Send'; }
}
document.getElementById('send').addEventListener('click', sendPrompt);

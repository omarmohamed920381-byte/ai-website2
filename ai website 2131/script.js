
document.getElementById('generate').onclick = async () => {
 const prompt = document.getElementById('prompt').value;
 const out = document.getElementById('output');
 out.textContent = "Generating...";
 const res = await fetch('/api/generate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({prompt})});
 const data = await res.json();
 out.innerHTML = `<img src="${data.image}">`;
};

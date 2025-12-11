async function sendMsg() {
    const inp = document.getElementById('prompt');
    const chat = document.getElementById('chat');

    const msg = inp.value.trim();
    if (!msg) return;

    // FIXED: wrap HTML inside quotes
    chat.innerHTML += <div><b>You:</b> ${msg}</div>;
    inp.value = "";

    const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg })
    });

    const data = await res.json();
    chat.innerHTML += <div><b>AI:</b> ${data.reply}</div>;
}

// FIXED Enter key listener
document.getElementById('prompt').addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        sendMsg();
    }
});

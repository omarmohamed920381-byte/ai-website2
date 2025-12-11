async function sendMsg() {
    const inp = document.getElementById('prompt');
    const chat = document.getElementById('chat');

    const msg = inp.value.trim();
    if (!msg) return;

    // Correct HTML
    chat.innerHTML += `<div><b>You:</b> ${msg}</div>`;
    inp.value = "";

    // Correct API path
    const res = await fetch("/api/chat.js", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg })
    });

    const data = await res.json();

    // Correct HTML
    chat.innerHTML += `<div><b>AI:</b> ${data.reply}</div>`;
}

// Enter key listener
document.getElementById('prompt').addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        sendMsg();
    }
});


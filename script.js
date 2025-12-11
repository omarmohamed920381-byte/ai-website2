async function sendMsg() {
    const inp = document.getElementById("prompt");
    const chat = document.getElementById("chat");

    const msg = inp.value.trim();
    if (!msg) return;

    // show user message
    chat.innerHTML += `<div><b>You:</b> ${msg}</div>`;
    inp.value = "";

    try {
        const res = await fetch("/api/chat.js", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: msg })
        });

        const data = await res.json();
        console.log("API response:", data);

        // if backend sends reply → show reply
        if (data.reply) {
            chat.innerHTML += `<div><b>AI:</b> ${data.reply}</div>`;
        } else {
            // backend returned error
            chat.innerHTML += `<div><b>AI:</b> Error: ${data.error}</div>`;
        }

    } catch (e) {
        chat.innerHTML += `<div><b>AI:</b> Failed to connect</div>`;
    }
}

// Enter key sends message
document.getElementById("prompt").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        sendMsg();
    }
});


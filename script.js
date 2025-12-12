const chat = document.getElementById("chat");
const promptBox = document.getElementById("prompt");

promptBox.addEventListener("keydown", e => {
  if (e.key === "Enter") sendMsg();
});

function sendMsg() {
  const msg = promptBox.value.trim();
  if (!msg) return;

  chat.innerHTML += <div><b>You:</b> ${msg}</div>;
  promptBox.value = "";

  setTimeout(() => {
    chat.innerHTML += <div><b>AI:</b> Hello Omar! 👋</div>;
    chat.scrollTop = chat.scrollHeight;
  }, 500);
}
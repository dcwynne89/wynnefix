async function getFix() {
  const input = document.getElementById("userInput").value;
  const responseText = document.getElementById("responseText");
  const responseBox = document.getElementById("responseBox");

  responseText.innerText = "Thinking...";
  responseBox.classList.remove("hidden");

  const result = await fetch("/.netlify/functions/fix", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: input })
  });

  const data = await result.json();
  responseText.innerText = data.reply || "Something went wrong.";
}


async function sendMessage() {
  const input = document.getElementById("userInput").value.trim();
  if (input === "") return;

  const chat = document.getElementById("chat");
  const userMessage = document.createElement("p");
  userMessage.innerHTML = "<strong>Tu:</strong> " + input;
  chat.appendChild(userMessage);

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + apiKey
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: input }]
    })
  });

  const data = await response.json();
  const responseText = data.choices[0].message.content;

  const responseElement = document.createElement("p");
  responseElement.innerHTML = "<strong>Nea:</strong> " + responseText;
  chat.appendChild(responseElement);

  speak(responseText);
  document.getElementById("userInput").value = "";
  chat.scrollTop = chat.scrollHeight;
}

function speak(text) {
  const synth = window.speechSynthesis;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "it-IT";
  utter.pitch = 1;
  utter.rate = 1;
  synth.speak(utter);
}

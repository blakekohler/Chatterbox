

const socket = io();
const outputYou = document.querySelector('.output-you');
const outputBot = document.querySelector('.output-bot');
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();




recognition.lang = 'en-US';
recognition.interimResults = false;
document.querySelector('button').addEventListener('click', () => {
  recognition.start();
});

recognition.onspeechstart = function() {
 document.getElementById("microphone").style.color = "#7d7d7d";
}

recognition.onspeechend = function() {
 document.getElementById("microphone").style.color = "#fff";
}


recognition.addEventListener('result', (e) => {
  let last = e.results.length - 1;
  let text = e.results[last][0].transcript;
console.log(e);
console.log(last);
console.log(text);
outputYou.textContent = text;
  console.log('Confidence: ' + e.results[0][0].confidence);

  // We will use the Socket.IO here later…
  socket.emit('chat message', text);
});

function synthVoice(text) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  utterance.volume = 1;
  synth.speak(utterance);
}

socket.on('bot reply', function(replyText) {
  synthVoice(replyText);
  if(replyText == '') replyText = '(No answer...)';
  outputBot.textContent = replyText;
});


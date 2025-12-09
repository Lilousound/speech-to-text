const recordBtn = document.getElementById('recordBtn');
const resultBox = document.getElementById('resultBox');

let isRecording = false;
let speechObj = null;

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {        // Browser not supported
  recordBtn.innerText = "Speech Recognition Not Supported in Firefox. Try with Chrome please";
  recordBtn.disabled = true;
}


recordBtn.addEventListener('click', () => {
  isRecording = !isRecording;
  isRecording ? startRecording() : stopRecording();
});

function startRecording() {
  recordBtn.innerText = "J'écoute...";
  speechObj = new SpeechRecognition(); // nouvelle instance à chaque démarrage
  speechObj.start(); // démarrer la reconnaissance vocale
  speechObj.onresult = transcribe; // gérer les résultats
  speechObj.onerror = (event) => {
  console.error("Erreur de reconnaissance vocale :", event.error);
  recordBtn.innerText = "Erreur";
  isRecording = false;
};
};

function transcribe(event) {
  const { transcript } = event.results[0][0];
  resultBox.textContent += `${transcript} `; // afficher le texte transcrit
}

function stopRecording() {
  speechObj.stop(); // arrêter la reconnaissance vocale
  speechObj = null; // réinitialiser l'objet
  recordBtn.innerText = "Start";
  isRecording = false;
}

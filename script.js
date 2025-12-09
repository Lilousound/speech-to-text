const recordBtn = document.getElementById('recordBtn');
const resultBox = document.getElementById('resultBox');
const errorTxt = document.getElementById('errorTxt');
const eraseBtn = document.getElementById('erase');



let isRecording = false;
let speechObj = null;

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {        // Browser not supported
  errorTxt.innerHTML = `<p><i class="fa-solid fa-triangle-exclamation"></i>  Ah malheureusement, ton navigateur ne supporte pas la reconnaissance vocale. Merci d'essayer avec Google Chrome.</p>`;
  recordBtn.disabled = true;
}


recordBtn.addEventListener('click', () => {
  isRecording = !isRecording;
  isRecording ? startRecording() : stopRecording();
});

function startRecording() {
  recordBtn.innerHTML = `<i class="fa-solid fa-circle-stop" style="color: red;"></i>`;
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
  recordBtn.innerHTML = `<i class="fa-solid fa-microphone-lines"></i>`;
  isRecording = false;
}

eraseBtn.addEventListener('click', () => {
  resultBox.textContent = '';
});

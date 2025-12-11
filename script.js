const recordBtn = document.getElementById('recordBtn');
const resultBox = document.getElementById('resultBox');
const errorTxt = document.getElementById('errorTxt');
const eraseBtn = document.getElementById('erase');

let currentP = null;
let isRecording = false;

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;


if (!SpeechRecognition) {        // Browser not supported
  errorTxt.innerHTML = `<p><i class="fa-solid fa-triangle-exclamation"></i>  Ah malheureusement, ton navigateur ne supporte pas la reconnaissance vocale. Merci d'essayer avec Google Chrome.</p>`;
  recordBtn.disabled = true;
}

const recognition = new SpeechRecognition();
recognition.continuous = true;  // continue à écouter même après une pause
recognition.interimResults = true; // affiche le texte au fur et à mesure si true
recognition.lang = 'fr-FR';


recordBtn.addEventListener('click', () => {
  isRecording = !isRecording;
  isRecording ? startRecording() : stopRecording();
});



function startRecording() {
  recordBtn.innerHTML = `<i class="fa-solid fa-circle-stop" style="color: red;"></i>`;

  currentP = document.createElement('p');       // crée un nouveau <p> pour cette transcription
  resultBox.appendChild(currentP);

  recognition.start();        // démarre la reconnaissance vocale
  recognition.onresult = transcribe;     // gère les résultats
};

function transcribe(event) {

  const transcript = Array.from(event.results) // convertit les résultats en tableau
    .map(result => result[0])   // prend le 1er élément de chaque résultat
    .map(result => result.transcript) // prend le texte transcrit
    .join('');   // joint tout en une seule chaîne

  // s'assurer d'avoir un <p> courant (au cas où)
  if (!currentP) {
    currentP = document.createElement('p');
    resultBox.appendChild(currentP);
  }

  currentP.textContent = transcript; // affiche le texte transcrit au fur et à mesure
}

function stopRecording() {
  recognition.stop(); // arrêter la reconnaissance vocale
  recordBtn.innerHTML = `<i class="fa-solid fa-microphone-lines"></i>`;
  isRecording = false;
}

eraseBtn.addEventListener('click', () => {
  resultBox.textContent = '';
});

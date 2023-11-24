// Array of phrases
const possiblePhrases = ["赤", "橙色", "黄色", "緑", "青", "紫", "桃色", "茶色", "灰色", "黒", "白"
];

const meanings = ["Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Pink", "Brown", "Grey", "Black", "White"
];


let ogenkidesuka = "";
let isRecognitionInProgress = false;

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition;
window.speechSynthesis = window.speechSynthesis || window.SpeechSynthesisUtterance;

function getRandomPhrase() {
return new Promise(resolve => {
const randomIndex = Math.floor(Math.random() * possiblePhrases.length);
resolve(possiblePhrases[randomIndex]);
});
}

function speakGirlAsk(transcript) {
document.getElementById("avatar").style.display = 'block';

const imgElement = document.createElement('img');
imgElement.id = 'avatarImg';
imgElement.alt = 'Avatar';
imgElement.style.width = '100%';
imgElement.style.height = '100%';
imgElement.src = 'img/avatar.gif';
document.getElementById('avatar').appendChild(imgElement);

const utterance = new SpeechSynthesisUtterance(transcript);
utterance.lang = 'ja-JP';
utterance.pitch = 1;
utterance.rate = 0.8; // Adjust speed (0.5 is slower, 2.0 is faster)
utterance.volume = 5.0; // Adjust volume (1.0 is normal, values greater than 1 increase volume)
utterance.voice = speechSynthesis.getVoices().find(voice => voice.lang === 'ja-JP');

utterance.onend = function () {
document.getElementById('avatar').style.display = 'none';
document.getElementById('avatar').removeChild(imgElement);
ask();
};

speechSynthesis.speak(utterance);
}

async function ask() {
ogenkidesuka = await getRandomPhrase();
const meaning = meanings[possiblePhrases.indexOf(ogenkidesuka)];

document.getElementById("her").textContent = ogenkidesuka;
document.getElementById("meaning").style.backgroundColor = meaning;
document.getElementById("meaningLabel").style.color = meaning;
document.getElementById("meaningLabel").textContent = meaning;


setTimeout(() => {
    startCountdown(5, () => speakGirlAsk(ogenkidesuka));
  }, 3000); // Wait for 3 seconds before calling speakGirlAsk
}

function updateCountdown(seconds) {
const timeElement = document.getElementById('time');
if (timeElement) {
timeElement.textContent = `Next question in: ${seconds} seconds`;
}
}

function startCountdown(seconds, callback) {
let countdown = seconds;

const countdownInterval = setInterval(function () {
updateCountdown(countdown);

if (countdown <= 0) {
clearInterval(countdownInterval);
resetCountdown();
if (callback && typeof callback === 'function') {
callback();
}
} else {
countdown--;
}
}, 1000);
}

function resetCountdown() {
updateCountdown(5);
}

function initialize() {
resetCountdown();
ask();
}


initialize();

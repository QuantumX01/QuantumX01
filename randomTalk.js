// Array of phrases
const possiblePhrases = ["お元気ですか", "あなたの名前は何ですか"];
// Variable to store the randomly selected phrase
let ogenkidesuka = "";
let isRecognitionInProgress = false;

// Function to play the sound clip
function eClip() {
    const audio = new Audio('audio/eClip.mp3'); 
    audio.play();
}

function oClip() {
    const audio = new Audio('audio/oClip.mp3');
    audio.play();
}

// Define variables for speech recognition and synthesis
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition;
window.speechSynthesis = window.speechSynthesis || window.SpeechSynthesisUtterance;

// Function to get a random phrase from the array
function getRandomPhrase() {
    return new Promise(resolve => {
        const randomIndex = Math.floor(Math.random() * possiblePhrases.length);
        resolve(possiblePhrases[randomIndex]);
    });
}

// Define the speech recognition function
const recognitionAsk = new window.SpeechRecognition();
recognitionAsk.interimResults = true;
recognitionAsk.lang = 'ja-JP';

// Your speech recognition event listener
recognitionAsk.addEventListener('result', e => {
    transcriptAsk = Array.from(e.results)
        .map(result => result[0].transcript)
        .join('');

    document.getElementById("me").textContent = transcriptAsk;

    if (e.results[0].isFinal) {
        // Compare the recognized phrase with the expected phrases
        if (transcriptAsk.trim() === "元気です" && ogenkidesuka === "お元気ですか") {
            setTimeout(function () {
                speakGirlAsk("はい");
            }, 7000);
        } else if ((transcriptAsk.trim() === "あしゃんです" || transcriptAsk.trim() === "アシャーン") && ogenkidesuka === "あなたの名前は何ですか") {
            setTimeout(function () {
                speakGirlAsk("はい");
            }, 7000);
        } else {
            setTimeout(function () {
                speakGirlAsk("いいえ");
            }, 7000);
        }
    }
});

// Define the function to speak the text
function speakGirlAsk(transcript) {
    // Show avatar div
    document.getElementById("avatar").style.display = 'block';

    // Create the img element
    const imgElement = document.createElement('img');
    imgElement.id = 'avatarImg';
    imgElement.alt = 'Avatar';
    imgElement.style.width = '100%';
    imgElement.style.height = '100%';

    // Set the source of the avatar image
    imgElement.src = 'img/avatar.gif';

    // Append the img element to the avatar div
    document.getElementById('avatar').appendChild(imgElement);

    const utterance = new SpeechSynthesisUtterance(transcript);
    utterance.lang = 'ja-JP';
    utterance.pitch = 1;
    utterance.voice = speechSynthesis.getVoices().find(voice => voice.lang === 'ja-JP');

    // Speech end event
    utterance.onend = function () {
        // Hide avatar div after speech ends
        document.getElementById('avatar').style.display = 'none';
        // Remove the img element from the avatar div
        document.getElementById('avatar').removeChild(imgElement);
    };

    speechSynthesis.speak(utterance);
}

recognitionAsk.addEventListener('end', () => {
    // Set isRecognitionInProgress to false when recognition ends
    isRecognitionInProgress = false;
     // Hide avatar div
     document.getElementById('avatar').style.display = 'none';

     // Hide loading GIF
     document.getElementById('loadingGif').style.display = 'none';
     oClip();

    // Call ask again to initiate the next recognition after 30 seconds
    setTimeout(ask, 30000);
});

// Function to ask a question using the randomly selected phrase
async function ask() {
    // Check if recognitionAsk is not already running
    if (!isRecognitionInProgress) {
        isRecognitionInProgress = true;

        
        // Get a random phrase and assign it to ogenkidesuka
        ogenkidesuka = await getRandomPhrase();
        speakGirlAsk(ogenkidesuka);
        document.getElementById("her").textContent = ogenkidesuka;

        if (ogenkidesuka === "お元気ですか") {
            setTimeout(function () {
                 // Show loading GIF
                 document.getElementById('loadingGif').style.display = 'block';
                // Start recognitionAsk
                eClip();
                recognitionAsk.start();
            }, 4000);
        } else if (ogenkidesuka === "あなたの名前は何ですか") {
            setTimeout(function () {
                // Show loading GIF
                document.getElementById('loadingGif').style.display = 'block';
                // Start recognitionAsk
                eClip();
                recognitionAsk.start();
            }, 7000);
        }
    }
}

//Function to update the countdown timer
function updateCountdown(seconds) {
    const timeElement = document.getElementById('time');
    if (timeElement) {
        timeElement.textContent = `Next question in: ${seconds} seconds`;
    }
}

// Function to start the countdown
function startCountdown(seconds) {
    let countdown = seconds;

    // Update the countdown every second
    const countdownInterval = setInterval(function () {
        updateCountdown(countdown);

        if (countdown <= 0) {
            clearInterval(countdownInterval); // Stop the countdown when it reaches 0
            resetCountdown(0); // Update the display to show 0 seconds
            ask(); // Trigger the next question
        } else {
            countdown--;
        }
    }, 1000);
}

// Function to schedule the next random run with a maximum delay of 20 seconds
function randomlyRunFunction() {
    updateCountdown(30); // Initial display of 30 seconds countdown
    startCountdown(30); // Start the countdown

    console.log("Function executed!");
}

// Function to reset the countdown to 30 seconds
function resetCountdown() {
    updateCountdown(30); // Reset display to 30 seconds
    startCountdown(30); // Start the countdown again
}

// Function to run random phrases
function randomPhrases() {
    // Reset isRecognitionInProgress to false for random phrases
    isRecognitionInProgress = false;
    resetCountdown(); // Reset the countdown to 30 seconds
    ask(); // Start asking random phrases
}

// Start the initial run
randomlyRunFunction();

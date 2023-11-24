// Array of phrases
const possiblePhrases = ["ア", "イ", "ウ", "エ", "オ",
"カ", "キ", "ク", "ケ", "コ",
"サ", "シ", "ス", "セ", "ソ",
"タ", "チ", "ツ", "テ", "ト",
"ナ", "ニ", "ヌ", "ネ", "ノ",
"ハ", "ヒ", "フ", "ヘ", "ホ",
"マ", "ミ", "ム", "メ", "モ",
"ヤ", "ユ", "ヨ",
"ラ", "リ", "ル", "レ", "ロ",
"ワ", "ヲ", "ン",
"ガ", "ギ", "グ", "ゲ", "ゴ",
"ザ", "ジ", "ズ", "ゼ", "ゾ",
"ダ", "ヂ", "ヅ", "デ", "ド",
"バ", "ビ", "ブ", "ベ", "ボ",
"パ", "ピ", "プ", "ペ", "ポ",
"キャ", "キュ", "キョ",
"シャ", "シュ", "ショ",
"チャ", "チュ", "チョ",
"ニャ", "ニュ", "ニョ",
"ヒャ", "ヒュ", "ヒョ",
"ミャ", "ミュ", "ミョ",
"リャ", "リュ", "リョ",
];
  
  // Variable to store the randomly selected phrase
  let ogenkidesuka = "";
  let isRecognitionInProgress = false;
  
  // Define variables for speech recognition and synthesis
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition;
window.SpeechSynthesisUtterance = window.SpeechSynthesisUtterance || window.webkitSpeechSynthesisUtterance || window.mozSpeechSynthesisUtterance || window.msSpeechSynthesisUtterance;
  
  // Function to get a random phrase from the array
  function getRandomPhrase() {
    return new Promise(resolve => {
      const randomIndex = Math.floor(Math.random() * possiblePhrases.length);
      resolve(possiblePhrases[randomIndex]);
    });
  }
  


      // Function to speak the text
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
        utterance.rate = 0.8; // Adjust speed (0.5 is slower, 2.0 is faster)
        utterance.volume = 5.0; // Adjust volume (1.0 is normal, values greater than 1 increase volume)
        utterance.voice = speechSynthesis.getVoices().find(voice => voice.lang === 'ja-JP');
        console.log('Selected Voice:', utterance.voice);

        // Speech end event
        utterance.onend = function () {
          // Hide avatar div after speech ends
          document.getElementById('avatar').style.display = 'none';
          // Remove the img element from the avatar div
          document.getElementById('avatar').removeChild(imgElement);
          ask(); // Trigger the next question after speaking
        };
      
        speechSynthesis.speak(utterance);
      }


  
  // Function to ask a question using the randomly selected phrase
  async function ask() {
    // Get a random phrase and assign it to ogenkidesuka
    ogenkidesuka = await getRandomPhrase();
    document.getElementById("her").textContent = ogenkidesuka;
  
    // Start the countdown and speak the letter at the end
    startCountdown(5, () => speakGirlAsk(ogenkidesuka));
  }
  
  // Function to update the countdown timer
  function updateCountdown(seconds) {
    const timeElement = document.getElementById('time');
    if (timeElement) {
      timeElement.textContent = `Next question in: ${seconds} seconds`;
    }
  }
  
  // Function to start the countdown
  function startCountdown(seconds, callback) {
    let countdown = seconds;
  
    // Update the countdown every second
    const countdownInterval = setInterval(function () {
      updateCountdown(countdown);
  
      if (countdown <= 0) {
        clearInterval(countdownInterval); // Stop the countdown when it reaches 0
        resetCountdown(); // Update the display to show 0 seconds
        if (callback && typeof callback === 'function') {
          callback(); // Call the callback function after the countdown
        }
      } else {
        countdown--;
      }
    }, 1000);
  }
  
  // Function to reset the countdown to 5 seconds
  function resetCountdown() {
    updateCountdown(5); // Reset display to 5 seconds
  }
  
  // Function to run the initial random question
  function initialize() {
    resetCountdown(); // Reset the countdown to 5 seconds
    ask(); // Start the process
  }
  
  // Start the initial run
  initialize();
  
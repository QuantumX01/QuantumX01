// Array of phrases
const animalNamesJapanese = [
    'あざらし', 'うま', 'くま', 'しまうま', 'ひとで',
    'あひる', 'うみがめ', 'くらげ', 'ぞう', 'ぶた',
    'いか', 'カニ', 'こうてい', 'たこ', 'ペンギン',
    'イルカ', 'かば', 'さかな', 'たつのおとしご', 'マナティ',
    'うさぎ', 'かもめ', 'さめ', 'チーター', 'やぎ',
    'うし', 'かんがるー', 'さる', 'とら', 'らいおん',
    'うなぎ', 'きりん', 'しか', 'にわとり', 'らくだ',
    'ウニ', 'くじら', 'しじみ', 'ひつじ', 'ロブスター'
];

const animalNamesEnglish = [
    'seal', 'horse', 'bear', 'zebra', 'starfish',
    'duck', 'turtle', 'jellyfish', 'elephant', 'pig',
    'squid', 'crab', 'seagull', 'octopus', 'penguin',
    'dolphin', 'hippopotamus', 'fish', 'seahorse', 'manatee',
    'rabbit', 'seagull', 'shark', 'cheetah', 'goat',
    'cow', 'kangaroo', 'monkey', 'tiger', 'lion',
    'eel', 'giraffe', 'deer', 'chicken', 'camel',
    'sea urchin', 'whale', 'clam', 'sheep', 'lobster'
];


let ogenkidesuka = "";

function getRandomPhrase() {
    const randomIndex = Math.floor(Math.random() * animalNamesJapanese.length);
    return animalNamesJapanese[randomIndex];
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
let newOgenkidesuka;
async function ask() {
    
    do {
        newOgenkidesuka = await getRandomPhrase();
    } while (newOgenkidesuka === ogenkidesuka);

    ogenkidesuka = newOgenkidesuka;

    const meaning = animalNamesEnglish[animalNamesJapanese.indexOf(ogenkidesuka)];
    const imagePath = 'animals/' + newOgenkidesuka + '.png';

    document.getElementById("her").textContent = ogenkidesuka;

    // Create an img element
    const imgElement = document.createElement('img');
    imgElement.src = imagePath;
    imgElement.alt = ogenkidesuka;
    imgElement.style.width = '100%';
    imgElement.style.height = '100%';

    // Clear previous content and append the new img element
    const meaningContainer = document.getElementById("meaning");
    meaningContainer.innerHTML = ''; // Clear previous content
    meaningContainer.appendChild(imgElement);
    document.getElementById("meaningLabel").textContent=meaning;

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

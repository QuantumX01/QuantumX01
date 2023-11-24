const vegetableNamesJapanese = [
    'キャベツ', '白菜', 'ほうれん草', '小松菜', 'シソの葉',
    'だいこん', 'カブ', 'じゃがいも', 'さつまいも', '里芋',
    '長芋', 'レンコン', 'ごぼう', 'にんじん', 'ショウガ',
    'タケノコ', 'ねぎ', 'きゅうり', 'なす', 'ピーマン',
    'シシトウ', 'かぼちゃ', 'とうもろこし', 'オクラ', 'ゴーヤ'
];

const vegetableNamesEnglish = [
    'Cabbage', 'Chinese cabbage', 'Spinach', 'Japanese mustard spinach', 'Perilla leaf',
    'Radish', 'Turnip', 'Potato', 'Sweet potato', 'Taro root',
    'Yam', 'Lotus root', 'Burdock root', 'Carrot', 'Ginger',
    'Bamboo shoot', 'Leek', 'Cucumber', 'Eggplant', 'Green pepper',
    'Small Japanese green pepper', 'Pumpkin', 'Corn', "Lady's fingers", 'Bitter melon'
];





let ogenkidesuka = "";

function getRandomPhrase() {
    const randomIndex = Math.floor(Math.random() * vegetableNamesJapanese.length);
    return vegetableNamesJapanese[randomIndex];
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

    const meaning = vegetableNamesEnglish[vegetableNamesJapanese.indexOf(ogenkidesuka)];
    const imagePath = 'vegetables/' + newOgenkidesuka + '.png';

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

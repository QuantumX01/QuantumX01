


let isListening ; // Flag to control the state of recognition
let voicesLoaded = false;

document.addEventListener("DOMContentLoaded",function(){
    speakGirl("こんにちは。"); // Speak a greeting when the page loads
    setTimeout(function () {
        isListening = true; // Start recognition after the greeting is spoken
        recognition.start();
    }, 3000);
});


//time process
const currentTime = new Date();
const currentHour = currentTime.getHours();

let period;

if (currentHour >= 5 && currentHour < 12) {
    period = 'おはようございます';
} else if (currentHour >= 12 && currentHour < 17) {
    period = 'こんにちは';
} else if (currentHour >= 17 && currentHour < 20) {
    period = 'こんばんは';
} else {
    period = 'おやすみなさい';
}

if(period ==='おはようございます'){
    document.getElementById('period').textContent=period;
    var imgDiv = document.getElementById("dreetingImg");
    imgDiv.innerHTML = ''; // Clear the div
    var img = document.createElement("img");
    img.src = "img/おはようございます.png";
    img.style.width = '64px'; // Set the desired width or use CSS classes instead
    img.style.height = '64px'; // Maintain aspect ratio
    imgDiv.appendChild(img); // Add the image to the div


}else if(period ==='こんにちは'){
    document.getElementById('period').textContent=period;
    var imgDiv = document.getElementById("dreetingImg");
    imgDiv.innerHTML = ''; // Clear the div
    var img = document.createElement("img");
    img.src = "img/こんにちは.png";
    img.style.width = '64px'; // Set the desired width or use CSS classes instead
    img.style.height = '64px'; // Maintain aspect ratio
    imgDiv.appendChild(img); // Add the image to the div

}else if(period ==='こんばんは'){
    document.getElementById('period').textContent=period;
    var imgDiv = document.getElementById("dreetingImg");
    imgDiv.innerHTML = ''; // Clear the div
    var img = document.createElement("img");
    img.src = "img/こんばんは.png";
    img.style.width = '64px'; // Set the desired width or use CSS classes instead
    img.style.height = '64px'; // Maintain aspect ratio
    imgDiv.appendChild(img); // Add the image to the div

}else if(period ==='おやすみなさい'){
    document.getElementById('period').textContent=period;
    var imgDiv = document.getElementById("dreetingImg");
    imgDiv.innerHTML = ''; // Clear the div
    var img = document.createElement("img");
    img.src = "img/おやすみなさい.png";
    img.style.width = '64px'; // Set the desired width or use CSS classes instead
    img.style.height = '64px'; // Maintain aspect ratio
    imgDiv.appendChild(img); // Add the image to the div
}


// Define variables for speech recognition and synthesis
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition;
window.speechSynthesis = window.speechSynthesis || window.SpeechSynthesisUtterance;




// Define the speech recognition function
const recognition = new window.SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'ja-JP';

// Define the function to speak the text
function speakGirl(transcript) {
const utterance = new SpeechSynthesisUtterance(transcript);
utterance.lang = 'ja-JP';
utterance.pitch = 1;
utterance.voice = speechSynthesis.getVoices().find(voice => voice.lang === 'ja-JP');
speechSynthesis.speak(utterance);
}

// Add event listener for speech recognition results
recognition.addEventListener('result', e => {
let transcript = Array.from(e.results)
.map(result => result[0].transcript)
.join('');
document.getElementById("me").textContent = transcript;
if (e.results[0].isFinal) {
handleResponse(transcript.trim());
recognition.stop(); 
}
});

// Add event listener for speech recognition end
recognition.addEventListener('end', () => {
if (isListening) {
recognition.start(); // Restart recognition only if isListening is true
}
});

//set image
function setImage(imageUrl){
var imgDiv = document.getElementById("imgDiv");
imgDiv.innerHTML = ''; // Clear the div
var img = document.createElement("img");
img.src = "img/"+imageUrl+".png";
img.style.width = '50%'; // Set the desired width or use CSS classes instead
img.style.height = '50%'; // Maintain aspect ratio
imgDiv.appendChild(img); // Add the image to the div
}

function beLate(){
    setTimeout(function(){
        isListening=true;
        recognition.start();
    },3000);
}
// Define the handleResponse function that reacts to speech recognition results
function handleResponse(text) {
// Use the text parameter to determine the response
// and use speakGirl to vocalize the response

const negative = document.getElementById('negativeSwitch').checked;
const president = document.getElementById('president').checked;



 if(text === "こんにちは。" || text === "こんにちは" ){
    speakGirl("こんにちは。");
    document.getElementById("her").textContent = text;
    setImage("こんにちは。");
    beLate();
}else if(text === "おはようございます。" || text === "おはようございます" ){
    speakGirl("おはようございます。");
    document.getElementById("her").textContent = text;
    setImage("おはようございます");
    beLate();
}else if(text === "こんばんは。" || text === "こんばんは" ){
    speakGirl("こんばんは。");
    document.getElementById("her").textContent = text;
    setImage("こんばんは");
    beLate();
}else if(text === "おやすみなさい。" || text === "おやすみなさい" ){
    speakGirl("おやすみなさい。");
    document.getElementById("her").textContent = text;
    setImage("おやすみなさい");
    beLate();
}else if(text === "はじめまして。" || text === "初めまして" || text === "はじめまして"){
    speakGirl("はじめまして。");
    document.getElementById("her").textContent = "はじめまして。";
    setImage("はじめまして。");
    beLate();

}else if(text === "さよなら。" || text === "さよなら"){
    speakGirl("さよなら。");
    document.getElementById("her").textContent = text;
    beLate();
}

else if(text === "行ってきます。" || text === "行ってきます"){
    speakGirl("行っていらっしゃぃ。");
    document.getElementById("her").textContent = "行っていらっしゃぃ。";
}

else if(text === "ただいま。" || text === "ただいま"){
    speakGirl("おかえりなさい。");
    document.getElementById("her").textContent = "おかえりなさい。";
    beLate();
}

else if(text === "どうもありがとうございます。" || text === "ありがとうございます。" || text === "どうも。" || text === "ありがとう。" || text === "どうもありがとうございます" || text === "ありがとうございます" || text === "どうも" || text === "ありがとう"){
    speakGirl("どういたしまして。");
    document.getElementById("her").textContent = "どういたしまして。";
    beLate();
}

else if(text === "すみません。" || text === "すみません"){
    speakGirl("いいえ。");
    document.getElementById("her").textContent = "いいえ。";
    beLate();
}

else if(text === "ごめんなさい。" || text === "ごめんなさい"){
    speakGirl("いいえ。");
    document.getElementById("her").textContent = "いいえ。";
    beLate();
}
else if(text === "どうぞ。" || text === "どうぞ"){
    speakGirl("いただきます。どうも。");
    document.getElementById("her").textContent = "いただきます。/ どうも。";
    beLate();
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
else if(text === "ごちそうさまでした。" || text === "ごちそうさまでした"){
    speakGirl("");
    document.getElementById("her").textContent = "";
    beLate();
}

else if(text === "お誕生日おめでとうございます。" || text === "お誕生日おめでとうございます"){
    speakGirl("");
    document.getElementById("her").textContent = "";
    beLate();
}

else if(text === "結婚するおめでとうございます。" || text === "結婚するおめでとうございます"){
    speakGirl("");
    document.getElementById("her").textContent = "";
    beLate();
}

else if(text === "新年明けまして、おめでとうございます。" || text === "新年明けまして、おめでとうございます"){
    speakGirl("");
    document.getElementById("her").textContent = "";
    beLate();
}

else if(text === "クリスマスおめでとうございます。" || text === "クリスマスおめでとうございます"){
    speakGirl("");
    document.getElementById("her").textContent = "";
    beLate();
}

else if(text === "頑張れ。" || text === "頑張れ"){
    speakGirl("");
    document.getElementById("her").textContent = "";
    beLate();
}

else if(text === "きっと勝つ。" || text === "きっと勝つ"){
    speakGirl("");
    document.getElementById("her").textContent = "";
    beLate();
}


else if(text === "この度はご愁傷さまでした。" || text === "この度はご愁傷さまでした"){
    speakGirl("");
    document.getElementById("her").textContent = "";
    beLate();
}

else if(text === "ご冥福をお祈りします。" || text === "ご冥福をお祈りします"){
    speakGirl("");
    document.getElementById("her").textContent = "";
    beLate();
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

else if(text === "ペンをください。" || text === "ペンをください"){
    speakGirl("はい、どうぞ。");
    document.getElementById("her").textContent = "はい、どうぞ。";
    beLate();
}

else if(text === "わかりますか？" || text === "わかりますか"){
    if(negative){
        speakGirl("いいえわかりません。");
        document.getElementById("her").textContent = "いいえわかりません。";
        beLate();
    }else{
        speakGirl("はい、わかります。");
        document.getElementById("her").textContent = "はい、わかります。";
        beLate();
    }
}

else if(text === "終わりますか？" || text === "終わりますか"){
    if(negative){
        speakGirl("いいえ、終わりません。");
        document.getElementById("her").textContent = "いいえ、終わりません。";
        beLate();
    }else{
        speakGirl("はい、終わります。");
        document.getElementById("her").textContent = "はい、終わります。";
        beLate();
    } 
}

else if(text === "お元気ですか？" || text === "お元気ですか"){
    if(president){
        speakGirl("お陰様で元気です。");
        document.getElementById("her").textContent = "お陰様で元気です。";
        beLate();
    }else{
        speakGirl("元気です。");
        document.getElementById("her").textContent = "元気です。";
        beLate();
    }
    
}

else if(text === "どこが痛いですか？" || text === "どこが痛いですか"){
    speakGirl("頭が痛いです。");
    document.getElementById("her").textContent = "頭が痛いです。";
    beLate();
}

else if(text === "家族は何人ですか？" || text === "家族は何人ですか？"){
    speakGirl("5人です。");
    document.getElementById("her").textContent = "5人です。=  ごにんです。";
    beLate();
}

//clock area
else if(text === "何時ですか"){
    let h = currentTime.getHours();
    let realHours = h % 12; // Get hours in 12-hour format
    let m = currentTime.getMinutes();
    let ap = h >= 12 ? '午後' : '午前';

    if (realHours === 0) {
        realHours = 12; // Set midnight to 12 in 12-hour format
    }

    speakGirl(ap);
    speakGirl(realHours + "時");
    speakGirl(m + "分");
    document.getElementById("her").textContent = realHours + "時" + ":" + m + "分" + " " + ap;
    setTimeout(function(){
        isListening=true;
        recognition.start();
    },6000);

}else if(text === "何分ですか"){
    let m = currentTime.getMinutes();
    speakGirl(m+"分");
    document.getElementById("her").textContent = m+"分";
    beLate();
}else if(text === "何秒ですか"){
    let s = currentTime.getSeconds();
    speakGirl(s+"秒");
    document.getElementById("her").textContent = s+"秒";
    beLate();
}

//day month year
else if(text === "何日ですか"){
    let d = currentTime.getDate();
    speakGirl(d+"日");
    document.getElementById("her").textContent = d+"日";
    beLate();
}else if(text === "何週目ですか"){
    var currentDate = new Date();
    var startDate = new Date(currentDate.getFullYear(), 0, 1);
    var days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
    var weeks = Math.ceil((days + 1) / 7); // Adding 1 to account for the current day

    var startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    var days2 = Math.floor((currentDate - startOfMonth) / (24 * 60 * 60 * 1000));
    var weeks2 = Math.ceil((days2 + 1) / 7); // Adding 1 to account for the current day

    speakGirl(weeks2 + "週目");
    document.getElementById("her").textContent = weeks2 + "週目" +"("+weeks + "週目"+")";
    beLate();

}else if(text === "何月ですか"){
    var currentDate = new Date();
    var currentMonth = currentDate.getMonth() + 1; // Adding 1 to get the month number from 1 to 12

    speakGirl(currentMonth+"月");
    document.getElementById("her").textContent = currentMonth+"月";
    beLate();
}else if(text === "今はどの季節ですか"){
    var currentDate = new Date();
    var currentMonth = currentDate.getMonth() + 1; // Adding 1 to get the month number from 1 to 12

    if(currentMonth===11 || currentMonth===12 || currentMonth===1){
        speakGirl(currentMonth+"月ですね、冬ですね。");
        document.getElementById("her").textContent = currentMonth+"月ですね、冬ですね。";
        setImage("冬");
        beLate();
    }else if(currentMonth===2 || currentMonth===3 || currentMonth===4){
        speakGirl(currentMonth+"月ですね、春ですね。");
        document.getElementById("her").textContent = currentMonth+"月ですね、春ですね。";
        setImage("春");
        beLate();
    }else if(currentMonth===5 || currentMonth===6 || currentMonth===7){
        speakGirl(currentMonth+"月ですね、夏ですね。");
        document.getElementById("her").textContent = currentMonth+"月ですね、夏ですね。";
        setImage("夏");
        beLate();
    }else if(currentMonth===8 || currentMonth===9 || currentMonth===10){
        speakGirl(currentMonth+"月ですね、秋ですね。");
        document.getElementById("her").textContent = currentMonth+"月ですね、秋ですね。";
        setImage("秋");
        beLate();
    }
    
}else if(text === "何曜日ですか"){
    var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var currentDate = new Date();
    var currentDayOfWeek = daysOfWeek[currentDate.getDay()];

    if(currentDayOfWeek === "Sunday"){
        speakGirl("日曜日です");
        document.getElementById("her").textContent = "日曜日です";
        beLate();
    }else if(currentDayOfWeek === "Monday"){
        speakGirl("月曜日です");
        document.getElementById("her").textContent = "月曜日です";
        beLate();
    }else if(currentDayOfWeek === "Tuesday"){
        speakGirl("火曜日です");
        document.getElementById("her").textContent = "火曜日です";
        beLate();
    }else if(currentDayOfWeek === "Wednesday"){
        speakGirl("水曜日です");
        document.getElementById("her").textContent = "水曜日です";
        beLate();
    }else if(currentDayOfWeek === "Thursday"){
        speakGirl("木曜日です");
        document.getElementById("her").textContent = "木曜日です";
        beLate();
    }else if(currentDayOfWeek === "Friday"){
        speakGirl("金曜日です");
        document.getElementById("her").textContent = "金曜日です";
        beLate();
    }else if(currentDayOfWeek === "Saturday"){
        speakGirl("土曜日です");
        document.getElementById("her").textContent = "土曜日です";
        beLate();
    }
}else if(text === "何年ですか"){
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();

    speakGirl(currentYear+"年です");
    document.getElementById("her").textContent = currentYear+"年です";
    beLate();

}

//her ask questions from me 

else if(text === "誰と誰ですか？" || text === "誰と誰ですか"){
    speakGirl("両親と姉は2人と私です。");
    document.getElementById("her").textContent = "両親と姉は2人と私です。";
    beLate();
}

else if(text === "誰と誰ですか？" || text === "誰と誰ですか"){
    speakGirl("5人。");
    document.getElementById("her").textContent = "5人。=  ごにん";
    beLate();
}

else if(text === "面接 しましょう"){
    speakGirl("はい,始めましょう");

    // Add a delay to ensure the "speakGirl" function finishes speaking
    setTimeout(function () {
        // Redirect to another HTML page
        window.location.href = "qAndA.html";
    }, 1000); // Adjust the delay (in milliseconds) as needed
                    
}else if(text === "さようなら"){
    speakGirl("さようなら");
    var imgDiv = document.getElementById("imgDiv");
    imgDiv.innerHTML = ''; // Clear the div
    var img = document.createElement("img");
    img.src = "img/"+"さようなら"+".gif";
    img.style.width = '50%'; // Set the desired width or use CSS classes instead
    img.style.height = '50%'; // Maintain aspect ratio
    imgDiv.appendChild(img); // Add the image to the div

    // Add a delay to ensure the "speakGirl" function finishes speaking
    setTimeout(function () {
        // Redirect to another HTML page
        window.location.href = "index.html";
    }, 4000);
}
else if(text === "あなたの名前は何ですか"){
    speakGirl("明美です");
    document.getElementById("her").textContent = "明美です";
    beLate();
}else{
    speakGirl("申し訳ありませんが、別のことを聞いてください");
    document.getElementById("her").textContent = "申し訳ありませんが、別のことを聞いてください";
    setTimeout(function(){
        isListening=true;
        recognition.start();
    },7000);
}

// After handling the response, reset the recognition flag
isListening = false;
}

// Define the voiceschanged event to load the voice list
speechSynthesis.onvoiceschanged = function() {
if(!voicesLoaded) {
voicesLoaded = true; // Set voicesLoaded to true to prevent repeat loading
const voice = speechSynthesis.getVoices().find(voice => voice.lang === 'ja-JP');
if (!voice) {
console.error('Japanese voice not found.');
}
}
};

// Attach click event listeners to the talk and stop buttons
document.getElementById('talkBtn').addEventListener('click', () => {
if (!isListening) {
isListening = true;
recognition.start(); // Start recognition when Talk button is clicked
}
});

document.getElementById('stopBtn').addEventListener('click', () => {
isListening = false;
recognition.stop(); // Stop recognition when Stop button is clicked
});
// Array of phrases
const possiblePhrases = ["森", "森林", "森た", "森山",
"畑", "田はた",
"岩", "岩石", "岩山",
"門", "専門",
"林", "林業", "子林",
"好きな", "好かれる", "明るい", "明ける",
"中米", "米", "米国",
"糸", "毛糸",
"竹", "竹田", "竹の子",
"貝", "貝がら",
"物", "生物", "買い物", "荷物",
"肉", "牛肉", "鳥肉", "肉体",
"魚", "焼き魚", "魚屋", "金魚",
"鳥", "焼き鳥", "白鳥", "野鳥",
"馬", "馬力", "馬車",
"牛", "牛乳",
"入る", "入れる", "入学する",
"出る", "出す", "出口",
"外出する", "来る", "来年", "来月", "来日する",
"行く", "行う", "行",
"旅行する", "休み", "休日", "休む",
"電気", "電車", "電話", "会話", "話", "話す",
"新聞", "聞こえる", "聞く", "読者", "読書", "読み", "読む",
"書く", "書店", "書道",
"見る", "見せる", "見える", "意見", "見物する",
"食べる", "食べ物", "食事", "夕食",
"名前", "名古屋", "森田", "名所", "名物",
"村", "農村", "村役場",
"町", "下町", "町長",
"市", "市民", "市長", "市場",
"母", "母親", "お母さん", "母国",
"父", "父親", "お父さん", "父母",
"友", "友人", "友だち", "友情",
"青", "青年", "青い", "青信号",
"お茶", "喫茶店", "日本茶", "茶色",
"赤", "赤い", "赤ちゃん", "赤字",
"黒", "黒い", "黒板", "黒字",
"白", "白い", "白鳥", "白板",
"色", "原色", "特色",
"安い", "安売り", "安全な", "安心する",
"高い", "高橋", "高校", "高速", "高速どうろ",
"足", "二足", "足りる",
"大きい", "大学", "大人", "大切な",
"小さい", "小川", "小学校",
"長い", "長男", "長野", "学長",
"口", "出口", "入口", "人口",
"目", "目上", "目次",
"耳", "耳鼻科",
"手", "上手な", "下手な", "手紙",
"犬", "犬小屋", "野良犬", "飼い犬", "狂犬病",
"天気", "天国", "天の川",
"気持ち", "気分", "病気",
"体", "体育", "体力",
"車", "自動車", "電車",
"花", "花火", "花びん",
"石", "石川", "石油", "化石",
"雨", "雨天",
"日本語", "物語り", "英語", "語",
"山", "火山", "富士山", "山下",
"川", "火川", "ナイル川",
"田んぼ", "水田", "田中",
"山田", "山本",
"本日", "本店",
"文", "文学", "文部省",
"字", "文字", "漢字",
"国", "国立大学", "外国人", "学生", "大学", "学校",
"生きる", "生まれる",
"先生", "学生",
"先", "先生", "先月",
"校長", "高校生",
"人", "三人", "日本人",
"男", "男の子", "男の人", "男子学生", "じ男",
"女", "女の人", "彼女", "女子学生",
"子ども", "女の子", "子馬",
"東", "東口", "東京", "関東",
"西", "西口", "西洋", "関西",
"北", "北口", "北米", "北海道",
"南", "南口", "南米", "南北",
"左", "左手", "左側", "左右",
"右", "右側", "右手",
"外", "外国", "外出する", "外出きんし", "外科",
"内側", "国内", "家内", "内科",
"後", "後ろ", "年後", "後半",
"前", "前半", "年前",
"中", "中心", "一日中", "くう中",
"下", "年下", "下がる", "下車する",
"上", "上る", "年上", "上がる", "上手な", "上くう",
"毎日", "毎週", "毎月",
"今", "今月", "今年", "今日",
"午前", "午後", "正午"
];

const meanings = [
"forest", "forest", "Morita", "Moriyama", "field", "Field", "rock", "rock", "rocky mountain", "gate", 
"specialty", "Hayashi", "forestry", "Kobayashi", "Favorite", "be liked", "bright", "dawn", 
"Central America", "rice", "US", "thread", "yarn", "bamboo", "Takeda", "bamboo shoots", 
"shellfish", "shell", "thing", "living thing", "shopping", "luggage", "meat", "beef", 
"Bird meat", "body", "fish", "grilled fish", "fish shop", "Goldfish", "bird", "Yakitori", 
"swan", "wild bird", "Horse", "horsepower", "carriage", "Cow", "milk", "enter", "put in", 
"Enroll", "come out", "put out", "Exit", "go out", "come", "next year", "next month", "Visit Japan", 
"go", "conduct", "line", "Travel", "holiday", "holiday", "rest", "electricity", "train", 
"phone", "conversation", "Story", "talk", "newspaper", "hear", "listen", "reader", "reading", 
"reading", "read", "write", "bookstore", "calligraphy", "look", "show", "appear", "opinion", 
"see the sights", "eat", "food", "meal", "dinner", "name", "Nagoya", "Morita", "famous place", 
"Specialty", "village", "rural", "village hall", "town", "downtown", "mayor", "city", 
"citizen", "Mayor", "market", "mother", "mother", "mother", "home country", "father", 
"father", "father", "parents", "friend", "friend", "friend", "friendship", "blue", "youth", 
"blue", "green light", "tea", "coffee shop", "Japanese tea", "brown", "red", "red", "baby", 
"deficit", "black", "black", "blackboard", "surplus", "White", "white", "swan", "white board", 
"color", "primary colors", "Features", "cheap", "cheap sale", "Safe", "feel relieved", "expensive", 
"Takahashi", "high school", "high speed", "highway", "feet", "two legs", "enough", "big", 
"university", "adult", "important", "small", "stream", "primary school", "long", "eldest son", 
"Nagano", "President", "mouth", "Exit", "entrance", "population", "eye", "superior", "table of contents", 
"ear", "Otorhinolaryngology", "hand", "Skillful", "unskilled", "letter", "dog", "doghouse", 
"stray dog", "pet dog", "rabies", "weather", "heaven", "milky way", "feeling", "feeling", 
"disease", "body", "physical education", "physical strength", "car", "car", "train", "flower", 
"firework", "vase", "stone", "Ishikawa", "oil", "fossil", "rain", "rainy weather", "Japanese", 
"storytelling", "English", "word", "Mountain", "volcano", "Fuji Mountain", "Yamashita", "river", 
"Hikawa", "nile river", "Paddy field", "Paddy field", "Tanaka", "Yamada", "Yamamoto", "today", 
"Main store", "Sentence", "literature", "Ministry of Education", "character", "letter", "Chinese characters", 
"Country", "National university", "foreigner", "student", "university", "school", "live", "to be born", 
"teacher", "student", "destination", "teacher", "last month", "principal", "high school student", 
"Man", "three people", "Japanese", "Man", "boy", "man", "male student", "The man", "woman", "woman", 
"she", "Female student", "Child", "girl", "pony", "east", "east exit", "Tokyo", "Kanto", "West", 
"west exit", "western", "Kansai", "North", "north exit", "North America", "Hokkaido", "south", 
"south exit", "South America", "north and south", "left", "left hand", "left", "left and right", 
"right", "right side", "right hand", "outside", "foreign country", "go out", "Going out", "surgery", 
"inside", "Domestic", "wife", "Internal medicine", "rear", "behind", "years later", "Latter half", 
"Before", "first half", "year ago", "During ~", "center", "all day long", "During the battle", 
"under", "younger", "go down", "get off", "Up", "climb", "older", "Go up", "Skillful", "Upper level", 
"every day", "weekly", "monthly", "now", "this month", "this year", "today", "morning", "afternoon", "noon"
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
document.getElementById("meaning").textContent = meaning;


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

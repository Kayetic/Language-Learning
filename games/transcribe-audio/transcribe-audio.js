const polishAudioWords = [
  "jabłko", // apple
  "samochód", // car
  "książka", // book
  "słońce", // sun
  "kwiat", // flower
  "stół", // table
  "piłka", // ball
  "kot", // cat
  "drzewo", // tree
  "woda", // water
];

const englishAudioWords = [
  "apple",
  "car",
  "book",
  "sun",
  "flower",
  "table",
  "ball",
  "cat",
  "tree",
  "water",
];

const audioElement = document.querySelector("Audio");
const textElement = document.querySelector(".audioText");

let randomIndex = Math.floor(Math.random() * polishAudioWords.length);
console.log(`Random index: ${randomIndex}`);

let polishWord = polishAudioWords[randomIndex];
let englishWord = englishAudioWords[randomIndex];

// audioElement.src = `./recordings/${randomIndex}.mp3`;

isFirstLoad = true;

if (isFirstLoad) {
  audioElement.src = `./recordings/0.mp3`;
  polishWord = polishAudioWords[0];
  isFirstLoad = false;
}

const userInputField = document.querySelector(".userInput");
const submitButton = document.querySelector(".submitButton");

submitButton.onclick = function () {
  console.log(`User input: ${userInputField.value}`);
  if (userInputField.value.trim() === polishWord) {
    userInputField.value = "";
    const newRandomIndex = Math.floor(Math.random() * polishAudioWords.length);
    polishWord = polishAudioWords[newRandomIndex];
    englishWord = englishAudioWords[newRandomIndex];
    audioElement.src = `./recordings/${newRandomIndex}.mp3`;
    audioElement.load(); // reloads the audio element with the new src
    console.log(`New random index: ${newRandomIndex}`);
    console.log(audioElement.src);
    alert("Correct!");
  } else {
    alert("Incorrect!");
    userInputField.value = "";
  }
};

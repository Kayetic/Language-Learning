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

const audioElement = document.querySelector(".audioElement");
const textElement = document.querySelector(".audioText");

const randomIndex = Math.floor(Math.random() * polishAudioWords.length);
console.log(`Random index: ${randomIndex}`);

const polishWord = polishAudioWords[randomIndex];
const englishWord = englishAudioWords[randomIndex];

// textElement.textContent = englishWord;

audioElement.src = `./recordings/${randomIndex}.mp3`;

const userInputField = document.querySelector(".userInput");
const submitButton = document.querySelector(".submitButton");

submitButton.onclick = function () {
  if (userInputField.value === polishWord) {
    alert("Correct!");
    userInputField.value = "";
    location.reload();
  } else {
    alert("Incorrect!");
    userInputField.value = "";
  }
};

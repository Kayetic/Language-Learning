const polishAudioWords = [
  "jabłko",
  "samochód",
  "książka",
  "słońce",
  "kwiat",
  "stół",
  "piłka",
  "kot",
  "drzewo",
  "woda",
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

audioElement.src = `./recordings/${randomIndex}.mp3`;

const progressElement = document.querySelector(".quizProgress");

let quizProgress = 1;

const updateQuizProgress = function () {
  progressElement.textContent = `Question ${quizProgress} of 10`;
  quizProgress++;
};

updateQuizProgress();

const userInputField = document.querySelector(".userInput");
const submitButton = document.querySelector(".submitButton");

submitButton.onclick = function () {
  console.log(`User input: ${userInputField.value}`);

  submitButton.classList.add("animate");
  setTimeout(() => {
    submitButton.classList.remove("animate");

    if (userInputField.value.trim() === polishWord) {
      userInputField.value = "";
      const newRandomIndex = Math.floor(
        Math.random() * polishAudioWords.length
      );
      polishWord = polishAudioWords[newRandomIndex];
      englishWord = englishAudioWords[newRandomIndex];
      audioElement.src = `./recordings/${newRandomIndex}.mp3`;
      audioElement.load(); // reloads the audio element with the new src
      console.log(`New random index: ${newRandomIndex}`);
      console.log(audioElement.src);
      updateQuizProgress();
      alert("Correct!");
    } else {
      alert("Incorrect!");
      userInputField.value = "";
    }
  }, 300);
};

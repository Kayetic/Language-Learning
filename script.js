document.querySelector(".game-stats-btn").addEventListener("click", () => {
  document.querySelector(".game-stats-modal").style.display = "flex";
});

document.querySelector(".game-stats-modal").addEventListener("click", (e) => {
  if (e.target.classList.contains("game-stats-modal-content")) {
    document.querySelector(".game-stats-modal").style.display = "none";
  }
});

document
  .querySelector(".game-stats-modal-close-btn")
  .addEventListener("click", () => {
    document.querySelector(".game-stats-modal").style.display = "none";
  });

const quizAccuracies = JSON.parse(localStorage.getItem("quizAccuracies")) || [];

const flashcardAccuracies =
  JSON.parse(localStorage.getItem("flashcardAccuracies")) || [];

const fillInTheBlankAccuracies =
  JSON.parse(localStorage.getItem("fillInTheBlankAccuracies")) || [];

const audioAccuracies =
  JSON.parse(localStorage.getItem("audioAccuracies")) || [];

const quizPlays = JSON.parse(localStorage.getItem("quizPlays")) || 0;

const flashcardPlays = JSON.parse(localStorage.getItem("flashcardPlays")) || 0;

const fillInTheBlankPlays =
  JSON.parse(localStorage.getItem("fillInTheBlankPlays")) || 0;

const audioPlays = JSON.parse(localStorage.getItem("audioPlays")) || 0;

function average(array) {
  if (array.length === 0 || array.length === 1) {
    return array[0];
  } else {
    return array.reduce((a, b) => a + b, 0) / array.length;
  }
}

document.querySelector(
  ".quizAccuracy"
).textContent = `Average accuracy: ${average(quizAccuracies)}%`;

console.log("Quiz accuracies:");
console.log(quizAccuracies);
console.log(average(quizAccuracies));

document.querySelector(
  ".flashcardAccuracy"
).textContent = `Average accuracy: ${average(flashcardAccuracies)}%`;

console.log("Flashcard accuracies:");
console.log(flashcardAccuracies);
console.log(average(flashcardAccuracies));

document.querySelector(
  ".fillInTheBlankAccuracy"
).textContent = `Average accuracy: ${average(fillInTheBlankAccuracies)}%`;

console.log("Fill in the blank accuracies:");
console.log(fillInTheBlankAccuracies);
console.log(average(fillInTheBlankAccuracies));

document.querySelector(
  ".audioAccuracy"
).textContent = `Average accuracy: ${average(audioAccuracies)}%`;

console.log("Audio accuracies:");
console.log(audioAccuracies);
console.log(average(audioAccuracies));

document.querySelector(
  ".quizPlays"
).textContent = `Number of times played: ${quizPlays}`;

document.querySelector(
  ".flashcardPlays"
).textContent = `Number of times played: ${flashcardPlays}`;

document.querySelector(
  ".fillInTheBlankPlays"
).textContent = `Number of times played: ${fillInTheBlankPlays}`;

document.querySelector(
  ".audioPlays"
).textContent = `Number of times played: ${audioPlays}`;

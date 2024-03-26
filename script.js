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
  JSON.parse(localStorage.getItem("flashcardMatchupAccuracies")) || [];

const fillInTheBlankAccuracies =
  JSON.parse(localStorage.getItem("fillInTheBlankAccuracies")) || [];

const audioAccuracies =
  JSON.parse(localStorage.getItem("audioAccuracies")) || [];

const quizPlays = Number(localStorage.getItem("quizPlays")) || 0;

const flashcardPlays =
  Number(localStorage.getItem("flashcardMatchupPlays")) || 0;

const fillInTheBlankPlays =
  Number(localStorage.getItem("fillInTheBlankPlays")) || 0;

const audioPlays = Number(localStorage.getItem("audioPlays")) || 0;

function average(array) {
  if (array.length === 0 || array.length === 1) {
    return array[0];
  } else {
    return array.reduce((a, b) => a + b, 0) / array.length;
  }
}

if (quizAccuracies.length > 0) {
  document.querySelector(
    ".quizAccuracy"
  ).textContent = `Average accuracy: ${average(quizAccuracies).toFixed(0)}%`;
} else {
  document.querySelector(".quizAccuracy").textContent = "Not played yet";
  document.querySelector(".quizAccuracy").style.opacity = "0.5";
}

if (flashcardAccuracies.length > 0) {
  document.querySelector(
    ".flashcardAccuracy"
  ).textContent = `Average accuracy: ${average(flashcardAccuracies).toFixed(
    0
  )}%`;
} else {
  document.querySelector(".flashcardAccuracy").textContent = "Not played yet";
  document.querySelector(".flashcardAccuracy").style.opacity = "0.5";
}

if (fillInTheBlankAccuracies.length > 0) {
  document.querySelector(
    ".fillInTheBlankAccuracy"
  ).textContent = `Average accuracy: ${average(
    fillInTheBlankAccuracies
  ).toFixed(0)}%`;
} else {
  document.querySelector(".fillInTheBlankAccuracy").textContent =
    "Not played yet";
  document.querySelector(".fillInTheBlankAccuracy").style.opacity = "0.5";
}

if (audioAccuracies.length > 0) {
  document.querySelector(
    ".audioAccuracy"
  ).textContent = `Average accuracy: ${average(audioAccuracies).toFixed(0)}%`;
} else {
  document.querySelector(".audioAccuracy").textContent = "Not played yet";
  document.querySelector(".audioAccuracy").style.opacity = "0.5";
}

if (quizPlays > 0) {
  document.querySelector(
    ".quizPlays"
  ).textContent = `Number of times played: ${quizPlays}`;
} else {
  document.querySelector(".quizPlays").style.display = "none";
}

if (flashcardPlays > 0) {
  document.querySelector(
    ".flashcardPlays"
  ).textContent = `Number of times played: ${flashcardPlays}`;
} else {
  document.querySelector(".flashcardPlays").style.display = "none";
}

if (fillInTheBlankPlays > 0) {
  document.querySelector(
    ".fillInTheBlankPlays"
  ).textContent = `Number of times played: ${fillInTheBlankPlays}`;
} else {
  document.querySelector(".fillInTheBlankPlays").style.display = "none";
}

if (audioPlays > 0) {
  document.querySelector(
    ".audioPlays"
  ).textContent = `Number of times played: ${audioPlays}`;
} else {
  document.querySelector(".audioPlays").style.display = "none";
}

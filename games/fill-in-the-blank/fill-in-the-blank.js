const polishSentences = [
  "W lecie lubię jeździć nad _____, aby się ochłodzić.",
  "Kiedy jestem smutny, czasami słucham _____, żeby poprawić sobie humor.",
  "Na śniadanie najczęściej jem płatki z _____ .",
  "W szkole na lekcji historii uczyliśmy się o wojnie _____ .",
  "Mój ulubiony kolor to _____.",
  "Kiedy pada deszcz, zwykle biorę _____, żeby się nie zmoknąć.",
  "Ptaki zwykle budują _____ na drzewach lub budynkach.",
  "Chciałbym mieć psa rasy _____, ponieważ są bardzo przyjazne.",
  "Podczas upałów często piję zimną _____, aby się orzeźwić.",
  "Na dachu naszego domu są panele _____, które produkują energię elektryczną.",
];

const correctAnswers = [
  "jezioro",
  "muzykę",
  "mlekiem",
  "światowej",
  "zielony",
  "parasolkę",
  "gniazda",
  "labradora",
  "wodę",
  "słoneczne",
];

const hints = [
  "A large body of water, smaller than a sea.",
  "Something you listen to that has rhythm, melody, and often lyrics.",
  "A white or yellowish fluid produced by the mammary glands of female mammals to nourish their young.",
  "The most extensive, worldwide conflict that took place in the first half of the 20th century.",
  "The color of grass and leaves.",
  "An item used for protection against rain.",
  "A structure made by birds to hold eggs and raise young.",
  "A breed of dog known for its gentle nature and often used as a guide dog.",
  "A clear, colorless liquid that is essential for most plant and animal life.",
  "Technology that converts sunlight directly into electricity.",
];

const sentenceElement = document.getElementById("sentence");
const userInput = document.querySelector(".userInput");
const submitButton = document.querySelector(".submitButton");
const progressElement = document.querySelector(".quizProgress");
const hintElement = document.getElementById("hint");

let trackingCorrectAnswers = 0;
let trackingIncorrectAnswers = 0;

let quizProgress = 1;

const updateQuizProgress = function () {
  progressElement.textContent = `Question ${quizProgress} of 10`;
  quizProgress++;
};

const showRandomSentence = function () {
  if (polishSentences.length === 0) {
    showScore();
    return;
  }

  const randomIndex = Math.floor(Math.random() * polishSentences.length);
  const randomSentence = polishSentences[randomIndex];
  const correctAnswerForSentence = correctAnswers[randomIndex];
  console.log(correctAnswerForSentence);
  sentenceElement.textContent = randomSentence;
  hintElement.textContent = hints[randomIndex];
  polishSentences.splice(randomIndex, 1);
  correctAnswers.splice(randomIndex, 1);
  hints.splice(randomIndex, 1);
  updateQuizProgress();

  submitButton.onclick = function () {
    submitButton.classList.add("animate");
    setTimeout(() => {
      submitButton.classList.remove("animate");

      if (userInput.value.trim() === correctAnswerForSentence) {
        trackingCorrectAnswers++;
        alert("Correct!");
        showRandomSentence();
        correctAnswersTotal++;
        userInput.value = "";
      } else {
        trackingIncorrectAnswers++;
        alert("Incorrect!");
        userInput.value = "";
        showRandomSentence();
      }
    }, 500);
  };
};

showRandomSentence();

let correctAnswersTotal = 0;

const jsConfetti = new JSConfetti();

const showConfetti = function () {
  // make a darker overlay element
  const overlay = document.createElement("div");
  // style it with a black background and opacity
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  overlay.style.opacity = "0";
  overlay.style.transition = "opacity 0.5s ease-in-out";
  overlay.style.position = "absolute";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.zIndex = "100";

  document.body.appendChild(overlay);

  setTimeout(() => {
    overlay.style.opacity = "0.3";
  }, 20);

  setTimeout(() => {
    overlay.style.opacity = "0";
  }, 3000);

  jsConfetti.addConfetti({
    confettiRadius: 6,
    confettiNumber: 500,
  });

  setTimeout(() => {
    overlay.style.opacity = "0";
    setTimeout(() => {
      overlay.remove();
    }, 500);
  }, 2000);
};

const showScore = function () {
  if (correctAnswersTotal === 10) {
    showConfetti();
    setTimeout(() => {
      alert(`You got all the answers correct!`);
    }, 2000);
  } else {
    setTimeout(() => {
      alert(`You got ${correctAnswersTotal} out of 10 correct!`);
    }, 2000);
  }
};

document.querySelector(".homeIcon").addEventListener("click", () => {
  if (trackingCorrectAnswers > 0 || trackingIncorrectAnswers > 0) {
    const accuracy =
      (trackingCorrectAnswers /
        (trackingCorrectAnswers + trackingIncorrectAnswers)) *
      100;
    const accuracies =
      JSON.parse(localStorage.getItem("fillInTheBlankAccuracies")) || [];
    accuracies.push(accuracy);
    localStorage.setItem(
      "fillInTheBlankAccuracies",
      JSON.stringify(accuracies)
    );

    localStorage.setItem(
      "fillInTheBlankPlays",
      Number(localStorage.getItem("fillInTheBlankPlays")) + 1
    );
  }
});

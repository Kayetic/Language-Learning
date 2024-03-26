const englishWordElement = document.getElementById("word");
const englishWord = englishWordElement.textContent;
const choiceButtons = document.querySelectorAll(".randomWordButton");
console.log(`English word: ${englishWord}`);

const englishWords = [
  "apple",
  "blue",
  "cat",
  "dog",
  "elephant",
  "fish",
  "green",
  "hat",
  "ice",
  "jump",
  "kite",
  "lion",
  "moon",
  "nest",
  "orange",
  "penguin",
  "queen",
  "rabbit",
  "sun",
  "tree",
  "umbrella",
  "violin",
  "water",
  "xylophone",
  "yellow",
  "zebra",
];

const potentialAnswers = {
  apple: ["niebieski", "krzesło", "jabłko", "pies"],
  blue: ["czerwony", "niebieski", "mysz", "jabłko"],
  cat: ["pies", "samochód", "kot", "woda"],
  dog: ["kot", "pociąg", "kwiat", "pies"],
  elephant: ["krokodyl", "słoń", "dom", "śnieg"],
  fish: ["ryba", "droga", "księżyc", "drzewo"],
  green: ["zielony", "stół", "ptak", "but"],
  hat: ["kapelusz", "chmura", "miasto", "koń"],
  ice: ["ogień", "lód", "piasek", "szkło"],
  jump: ["tańczyć", "leżeć", "biegać", "skakać"],
  kite: ["latawiec", "książka", "fotel", "szkoła"],
  lion: ["lew", "kot", "malina", "skrzypce"],
  moon: ["słońce", "gwiazda", "planet", "księżyc"],
  nest: ["drzewo", "trawa", "gniazdo", "jaskinia"],
  orange: ["fioletowy", "pomarańcza", "srebrny", "czerwony"],
  penguin: ["żyrafa", "pingwin", "nosorożec", "hipopotam"],
  queen: ["król", "księżniczka", "królowa", "róża"],
  rabbit: ["wilk", "królik", "sarna", "jastrząb"],
  sun: ["gwiazda", "księżyc", "słońce", "planet"],
  tree: ["drzewo", "pustynia", "rzeka", "góra"],
  umbrella: ["okulary", "parasol", "butelka", "kamień"],
  violin: ["wiolonczela", "trąbka", "fortepian", "skrzypce"],
  water: ["woda", "ogień", "powietrze", "ziemia"],
  xylophone: ["klarnet", "flet", "ksylofon", "harfa"],
  yellow: ["żółty", "zielony", "niebieski", "czerwony"],
  zebra: ["tygrys", "zebra", "słoń", "kangur"],
};

const correctAnswers = [
  "jabłko",
  "niebieski",
  "kot",
  "pies",
  "słoń",
  "ryba",
  "zielony",
  "kapelusz",
  "lód",
  "skakać",
  "latawiec",
  "lew",
  "księżyc",
  "gniazdo",
  "pomarańcza",
  "pingwin",
  "królowa",
  "królik",
  "słońce",
  "drzewo",
  "parasol",
  "skrzypce",
  "woda",
  "ksylofon",
  "żółty",
  "zebra",
];

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

let trackingCorrectAnswers = 0;
let trackingIncorrectAnswers = 0;

const showRandomWord = function () {
  // addAnimations();
  if (correctAnswersTotal === 26) {
    showScore();
    return;
  }

  if (englishWords.length === 0) {
    showScore();
    return;
  }

  const randomIndex = Math.floor(Math.random() * englishWords.length);
  const randomWord = englishWords[randomIndex];
  const potentialAnswersForWord = potentialAnswers[randomWord];
  const correctAnswerForWord = correctAnswers[randomIndex];
  englishWordElement.textContent = capitalizeFirstLetter(randomWord);
  // remove the option from the arrays and dictionary to prevent it from being used again
  englishWords.splice(randomIndex, 1);
  delete potentialAnswers[randomWord];
  correctAnswers.splice(randomIndex, 1);

  console.log(englishWords);
  console.log(potentialAnswers);
  console.log(correctAnswers);

  choiceButtons.forEach((button, index) => {
    button.textContent = capitalizeFirstLetter(potentialAnswersForWord[index]);
    button.onclick = function () {
      if (button.textContent.toLowerCase() === correctAnswerForWord) {
        setTimeout(() => {
          trackingCorrectAnswers++;
          alert("Correct!");
          showRandomWord();
        }, 300);
        button.classList.add("animate");
        setTimeout(() => {
          button.classList.remove("animate");
        }, 500);
        updateQuizProgress();
        correctAnswersTotal++;
      } else {
        setTimeout(() => {
          trackingIncorrectAnswers++;
          alert("Incorrect!");
          showRandomWord();
        }, 300);
        button.classList.add("animate");
        setTimeout(() => {
          button.classList.remove("animate");
        }, 500);
        updateQuizProgress();
      }
    };
  });
};

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

let quizProgress = 1;
const quizProgressElement = document.querySelector(".quizProgress");

let correctAnswersTotal = 0;

const updateQuizProgress = function () {
  quizProgressElement.textContent = `Question ${quizProgress} of 26`;
  quizProgress++;
};

showRandomWord();

const showScore = function () {
  quizProgressElement.textContent = "Quiz complete!";
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

window.onload = function () {
  updateQuizProgress();
};

function addAnimations() {
  document.querySelectorAll(".randomWordButton").forEach(function (element) {
    // Function to add and remove 'animate' class
    function triggerAnimation() {
      element.classList.add("animate");

      // Remove the class after the animation completes to reset the animation
      setTimeout(() => {
        element.classList.remove("animate");
      }, 1000); // Match the animation duration
    }

    // Activate animation on click
    element.addEventListener("click", triggerAnimation);

    // Activate animation on focus (e.g., when selected with Tab key)
    element.addEventListener("focus", triggerAnimation);
  });
}

document.querySelector(".homeIcon").addEventListener("click", () => {
  if (trackingCorrectAnswers > 0 || trackingIncorrectAnswers > 0) {
    const accuracy =
      (trackingCorrectAnswers /
        (trackingCorrectAnswers + trackingIncorrectAnswers)) *
      100;
    const accuracies = JSON.parse(localStorage.getItem("quizAccuracies")) || [];
    accuracies.push(accuracy);
    localStorage.setItem("quizAccuracies", JSON.stringify(accuracies));

    localStorage.setItem(
      "quizPlays",
      Number(localStorage.getItem("quizPlays")) + 1
    );
  }
});

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

const showRandomWord = function () {
  if (englishWords.length === 0) {
    showScore();
    return;
  }

  const randomIndex = Math.floor(Math.random() * englishWords.length);
  const randomWord = englishWords[randomIndex];
  const potentialAnswersForWord = potentialAnswers[randomWord];
  const correctAnswerForWord = correctAnswers[randomIndex];
  englishWordElement.textContent = randomWord;
  // remove the option from the arrays and dictionary to prevent it from being used again
  englishWords.splice(randomIndex, 1);
  delete potentialAnswers[randomWord];
  correctAnswers.splice(randomIndex, 1);

  console.log(englishWords);
  console.log(potentialAnswers);
  console.log(correctAnswers);

  choiceButtons.forEach((button, index) => {
    button.textContent = potentialAnswersForWord[index];
    button.onclick = function () {
      if (button.textContent === correctAnswerForWord) {
        alert("Correct!");
        updateQuizProgress();
        showRandomWord();
        correctAnswersTotal++;
      } else {
        alert("Incorrect!");
        updateQuizProgress();
        showRandomWord();
      }
    };
  });
};

let quizProgress = 1;
const quizProgressElement = document.querySelector(".quizProgress");

let correctAnswersTotal = 0;

const updateQuizProgress = function () {
  quizProgressElement.textContent = `Question ${quizProgress} of 26`;
  quizProgress++;
};

updateQuizProgress();
showRandomWord();

const showScore = function () {
  alert(`You got ${correctAnswersTotal} out of 26 correct!`);
};

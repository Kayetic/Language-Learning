const words = [
  "bałwan",
  "banan",
  "cytryna",
  "kalendarz",
  "król",
  "krowa",
  "kwiaty",
  "lew",
  "motocykl",
  "pająk",
  "pływanie",
  "portfel",
  "renifer",
  "rower",
  "ryba",
  "żyrafa",
];

// Function to find the index of a word in the words array
function getIndexFromWord(word) {
  return words.indexOf(word);
}

// Initialize an array of indices corresponding to the words array
let availableIndices = words.map((_, index) => index);

function getUniqueRandomIndices(n) {
  let selectedIndices = [];
  for (let i = 0; i < n && availableIndices.length > 0; i++) {
    let randomIndex = Math.floor(Math.random() * availableIndices.length);
    selectedIndices.push(availableIndices[randomIndex]);
    availableIndices.splice(randomIndex, 1); // Remove the selected index
  }

  return selectedIndices; // Return the indices of the words to be used in this round
}

let matchedPairs = 0;

function checkForWin() {
  if (matchedPairs === 4) {
    matchedPairs = 0;
    // select all flashcard items and remove them
    const flashcardItems = document.querySelectorAll(".flashcard-item");
    flashcardItems.forEach((item) => {
      item.remove();
    });
    setupRound();
  }
}

let roundsPlayed = 0;
function checkForEndGame() {
  if (roundsPlayed === 4) {
    // End game
    console.log("Game over");
    alert("Game over");
    // move user window back to ../../index.html
    window.location.href = "../../index.html";
  }
}

function resetAndPrepareFlashcards() {
  const flashcardContainer = document.querySelector(".flashcard-container");

  // Clear existing content
  flashcardContainer.innerHTML = "";

  // Create and append new flashcard elements
  for (let i = 0; i < 4; i++) {
    // Assuming 4 pairs (8 elements total)
    const imgElement = document.createElement("img");
    imgElement.className = "flashcard-item";
    imgElement.src = "";
    imgElement.alt = "";

    const textElement = document.createElement("h2");
    textElement.className = "flashcard-item";
    textElement.textContent = ""; // Initially empty, will be set in setupRound

    flashcardContainer.appendChild(imgElement);
    flashcardContainer.appendChild(textElement);
  }
}

function setupRound() {
  resetAndPrepareFlashcards();
  addEventListenersToFlashcards();

  const selectedIndices = getUniqueRandomIndices(4); // Get 4 unique indices for the round

  const imageElements = document.querySelectorAll("img");
  const textElements = document.querySelectorAll("h2");

  // Shuffle the selectedIndices array to mix up the order
  shuffleArray(selectedIndices); // Use your existing shuffle function

  // Set up images and texts for the round
  selectedIndices.forEach((index, count) => {
    if (imageElements[count]) {
      imageElements[count].src = `./flashcard-images/${index}.png`;
      imageElements[count].alt = words[index];
      imageElements[count].dataset.type = "image";
      imageElements[count].dataset.match = index; // Match based on original word index
    }
  });

  shuffleArray(selectedIndices); // Shuffle the selectedIndices array again to mix up the order
  selectedIndices.forEach((index, count) => {
    if (textElements[count]) {
      textElements[count].textContent = words[index];
      textElements[count].dataset.type = "text";
      textElements[count].dataset.match = index;
    }
  });

  roundsPlayed++;
  checkForEndGame();
}

// Call setupRound() to start a round

setupRound();
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // Pick a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));
    // Swap elements array[i] and array[j]
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array; // This line is optional since the array is modified in place
}

let firstElement = null;
let secondElement = null;

function resetSelections() {
  firstElement = null;
  secondElement = null;
  document.querySelectorAll(".outline").forEach((el) => {
    el.classList.remove("outline");
  });
  console.log("Selections reset");
}

function checkForMatch() {
  if (!firstElement || !secondElement) return;

  const firstType = firstElement.dataset.type;
  const secondType = secondElement.dataset.type;

  if (firstType !== secondType) {
    // Proceed to check if they match
    let imageElement, textElement;
    if (firstType === "image") {
      imageElement = firstElement;
      textElement = secondElement;
    } else {
      imageElement = secondElement;
      textElement = firstElement;
    }

    const imageIndex = parseInt(
      imageElement.src.split("/").pop().split(".").shift()
    );
    const textWord = textElement.textContent;

    if (words[imageIndex] === textWord) {
      // Correct match, make opacity 0
      imageElement.style.opacity = "0";
      textElement.style.opacity = "0";
      matchedPairs++;
      checkForWin();
      console.log(matchedPairs);
    } else {
      // Incorrect match, remove outlines
      imageElement.classList.remove("outline");
      textElement.classList.remove("outline");
    }
  } else {
    // Same type, remove outlines
    firstElement.classList.remove("outline");
    secondElement.classList.remove("outline");
  }

  resetSelections(); // Reset selections for next action
}

function addEventListenersToFlashcards() {
  const imageElements = document.querySelectorAll("img");
  const textElements = document.querySelectorAll("h2");

  imageElements.forEach((imageElement) => {
    imageElement.addEventListener("click", () => {
      if (!firstElement) {
        // If there's no firstElement selected yet, select this one
        firstElement = imageElement;
        imageElement.classList.add("outline");
      } else if (firstElement.dataset.type === "text") {
        // If the firstElement is a text, this can be the secondElement
        secondElement = imageElement;
        checkForMatch(); // Check for a match between the first and second element
      } else {
        // If trying to select another image when an image is already selected
        firstElement.classList.remove("outline"); // Remove outline from previous selection
        firstElement = imageElement; // Make this the firstElement
        secondElement = null; // Reset secondElement
        document
          .querySelectorAll(".outline")
          .forEach((el) => el.classList.remove("outline")); // Remove all outlines
        imageElement.classList.add("outline"); // Add outline to the new firstElement
      }
      console.log("Selected Element (Image):", imageElement); // Logging selected element
    });
  });

  textElements.forEach((textElement) => {
    textElement.addEventListener("click", () => {
      if (!firstElement) {
        // If there's no firstElement selected yet, select this one
        firstElement = textElement;
        textElement.classList.add("outline");
      } else if (firstElement.dataset.type === "image") {
        // If the firstElement is an image, this can be the secondElement
        secondElement = textElement;
        checkForMatch(); // Check for a match between the first and second element
      } else {
        // If trying to select another text when a text is already selected
        firstElement.classList.remove("outline"); // Remove outline from previous selection
        firstElement = textElement; // Make this the firstElement
        secondElement = null; // Reset secondElement
        document
          .querySelectorAll(".outline")
          .forEach((el) => el.classList.remove("outline")); // Remove all outlines
        textElement.classList.add("outline"); // Add outline to the new firstElement
      }
      console.log("Selected Element (Text):", textElement); // Logging selected element
    });
  });
}

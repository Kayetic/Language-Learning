const addOutline = function () {
  this.classList.add("outline");
};

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

function getRandomNumbers(n) {
  // make a list of unique random numbers between 0 and 15 (inclusive), the amount generated should be n
  const randomNumbers = [];
  while (randomNumbers.length < n) {
    const randomNumber = Math.floor(Math.random() * words.length);
    if (!randomNumbers.includes(randomNumber)) {
      randomNumbers.push(randomNumber);
    }
  }
  return randomNumbers;
}

function handleGameLogic(randomNumbers) {
  let selectedAmount = 0;
  let firstSelected = "";
  let secondSelected = "";
  let firstSelectedItem = null;
  let counter = 0;

  const flashcardItems = document.querySelectorAll(".flashcard-item");

  flashcardItems.forEach((item, index) => {
    if (item.tagName === "IMG") {
      // It's an image, set the src attribute
      const imageName = randomNumbers[index] + ".png";
      item.src = `./flashcard-images/${imageName}`;
      console.log(`Image path set to: ${item.src}`); // Log the image path for debugging
    } else {
      // It's not an image, set the text content
      item.textContent = randomNumbers[index];
      console.log(`Text content set to: ${randomNumbers[index]}`); // Log the text content for debugging
    }

    item.addEventListener("click", () => {
      let currentSelected = "";
      try {
        const imageSrc = item.src.split("/");
        const imageName = imageSrc[imageSrc.length - 1];
        const imageNameSplit = imageName.split(".");
        const isPng = imageNameSplit[imageNameSplit.length - 1];
        if (isPng !== "png") {
          currentSelected = "text";
        } else {
          currentSelected = "image";
        }
      } catch (typeError) {
        currentSelected = "text";
      }

      console.log(`Current selected: ${currentSelected}`);

      if (selectedAmount === 0) {
        firstSelected = currentSelected;
        firstSelectedItem = item;
        selectedAmount++;
        item.classList.add("outline");
      } else if (selectedAmount === 1) {
        if (firstSelected === currentSelected) {
          // If the second selection is the same type as the first, ignore it
          return;
        } else {
          secondSelected = currentSelected;
          selectedAmount++;
          item.classList.add("outline");

          // Check if the text content matches the filename
          if (firstSelected === "image" && secondSelected === "text") {
            const imageSrc = firstSelectedItem.src.split("/");
            let imageName = imageSrc[imageSrc.length - 1].split(".")[0];
            imageName = decodeURIComponent(imageName); // decode the imageName
            if (imageName === item.textContent.trim()) {
              // Hide the items and increment the counter
              firstSelectedItem.style.opacity = "0";
              item.style.opacity = "0";
              flashcardItems.forEach((item) => {
                item.classList.remove("outline");
              });
              counter++;

              console.log(`Counter: ${counter}`);

              // Check if all items are gone
              if (counter === flashcardItems.length / 2) {
                alert("Complete!");
              }
            }
          }
        }
      } else if (selectedAmount === 2) {
        // Reset selections
        flashcardItems.forEach((item) => {
          item.classList.remove("outline");
        });
        selectedAmount = 0;
        firstSelected = "";
        secondSelected = "";
        firstSelectedItem = null;
      }
    });
  });
}

const randomItems = getRandomNumbers(words, 4);
handleGameLogic(randomItems);

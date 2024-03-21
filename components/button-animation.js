export function animateButton(buttonClass) {
  const button = document.querySelector(`.${buttonClass}`);
  // make the button shrink to 0.98 of its original size
  button.style.transition = "transform 0.2s ease-in-out";
  button.style.transform = "scale(0.98)";
  button.classList.add("animating");
  setTimeout(() => {
    button.classList.remove("animating");
  }, 200);
}

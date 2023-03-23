const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
let intervalId;
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
function changeBackgroundColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}
startButton.addEventListener('click', () => {
  if (intervalId) return;
  intervalId = setInterval(changeBackgroundColor, 1000);
});

stopButton.addEventListener('click', () => {
  intervalId = clearInterval(intervalId);
});

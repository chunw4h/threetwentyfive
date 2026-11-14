const STORAGE_KEY = "pomodoroMinutes";
const DEFAULT_MINUTES = 25;

function getSavedSeconds() {
  const minutes = parseInt(localStorage.getItem(STORAGE_KEY), 10);
  if (Number.isInteger(minutes) && minutes >= 1 && minutes <= 60) {
    return minutes * 60;
  }
  return DEFAULT_MINUTES * 60;
}

let remaining = getSavedSeconds();
let intervalId = null;

const timeDisplay = document.getElementById("time");

function render() {
  const minutes = String(Math.floor(remaining / 60)).padStart(2, "0");
  const seconds = String(remaining % 60).padStart(2, "0");
  timeDisplay.textContent = minutes + ":" + seconds;
}

render(); // show the saved time on load instead of the hardcoded 25:00

document.getElementById("start").onclick = startTimer;
document.getElementById("stop").onclick = stopTimer;
document.getElementById("reset").onclick = resetTimer;
document.getElementById("settings").onclick = function () {
  window.location.href = "settings.html";
};

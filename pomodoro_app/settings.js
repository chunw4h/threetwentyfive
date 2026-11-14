const STORAGE_KEY = "pomodoroMinutes";
const MIN_MINUTES = 1;
const MAX_MINUTES = 60;

const minutesInput = document.getElementById("minutes");
const saveButton = document.getElementById("save");

function isValid(value) {
  if (value.trim() === "") return false;
  const minutes = Number(value);
  return (
    Number.isInteger(minutes) &&
    minutes >= MIN_MINUTES &&
    minutes <= MAX_MINUTES
  );
}

function updateSaveButton() {
  saveButton.disabled = !isValid(minutesInput.value);
}

minutesInput.oninput = updateSaveButton;

saveButton.onclick = function () {
  if (!isValid(minutesInput.value)) return;
  localStorage.setItem(STORAGE_KEY, String(Number(minutesInput.value)));
};

// Show the currently saved value when the page opens
const saved = localStorage.getItem(STORAGE_KEY);
if (saved !== null && isValid(saved)) {
  minutesInput.value = saved;
}
updateSaveButton();

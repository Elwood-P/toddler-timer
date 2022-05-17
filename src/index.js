// Data init
let timer = {
  timeTotal: 60,
  timeUsed: 10,
};

// Clock
const clockTimeLeft = document.querySelector('.clock__timeleft');
const clockFace = document.querySelector('.clock__face');
// Buttons
const btnStart = document.getElementById('btn--start');
const btnPause = document.getElementById('btn--pause');
const btnCancel = document.getElementById('btn--cancel');
// Forms
const inputTimeTotal = document.getElementById('input--time-total');
const inputTimeUsed = document.getElementById('input--time-used');

//Event Listeners
inputTimeTotal.addEventListener('input', updateTimer);
inputTimeUsed.addEventListener('input', updateTimer);

function init() {
  inputTimeTotal.value = timer.timeTotal;
  inputTimeUsed.value = timer.timeUsed;
  updateClockFace();
}

function updateClockFace() {
  const pct = 100 - ((timer.timeTotal - timer.timeUsed) / timer.timeTotal) * 100;
  clockFace.style.setProperty('--pct', pct);
}

function updateTimer() {
  timer.timeTotal = inputTimeTotal.value;
  timer.timeUsed = inputTimeUsed.value;
  console.log(timer.timeTotal);
  updateClockFace();
}

init();



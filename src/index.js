// Data init
let timerData = {
  timeTotal: 3600, // 60m
  timeUsed: 0,
};

// Clock
const clockTimeLeft = document.querySelector('.clock__timeleft');
const clockFace = document.querySelector('.clock__face');
// Forms & control
const formSetup = document.querySelector('.form__setup');
const formRunning = document.querySelector('.form__running');
const controlsTimeleft = document.querySelector('.controls__timeleft');
const inputTimeTotal = document.getElementById('input--time-total');
const inputTimeUsed = document.getElementById('input--time-used');
// Buttons
const btnStart = document.getElementById('btn--start');
const btnPause = document.getElementById('btn--pause');
const btnPlay = document.getElementById('btn--play');
const btnStop = document.getElementById('btn--stop');
// Audio
const alarm = document.querySelector('.alarm');

//Event Listeners
inputTimeTotal.addEventListener('input', updateTimerData);
inputTimeUsed.addEventListener('input', updateTimerData);
btnStart.addEventListener('click', (e) => btnStartHandler(e));
btnPause.addEventListener('click', (e) => btnPauseHandler(e));
btnPlay.addEventListener('click', (e) => btnPlayHandler(e));
btnStop.addEventListener('click', (e) => btnStopHandler(e));

function init() {
  inputTimeTotal.value = timerData.timeTotal / 60;
  inputTimeUsed.value = timerData.timeUsed / 60;
  updateClock();
}

function updateClock() {
  const { timeTotal, timeUsed } = timerData;
  const timeLeft = timeTotal - timeUsed;
  const minsLeftFloor = Math.floor(timeLeft / 60);
  const minsLeftCeil = Math.ceil(timeLeft / 60);
  const secsLeft = timeLeft - minsLeftFloor * 60;
  const pct = 100 - (timeLeft / timeTotal) * 100;

  clockFace.style.setProperty('--pct', pct);
  clockTimeLeft.innerHTML = minsLeftCeil;
  controlsTimeleft.innerHTML = `${minsLeftFloor}m ${secsLeft}s left of ${timeTotal / 60}m`;
}

function updateTimerData() {
  timerData.timeTotal = inputTimeTotal.value * 60;
  timerData.timeUsed = inputTimeUsed.value * 60;
  updateClock();
}

function btnStartHandler(e) {
  e.preventDefault();
  formSetup.classList.toggle('hidden');
  formRunning.classList.toggle('hidden');
  startTimer();
}

function btnPauseHandler(e) {
  e.preventDefault();
  clearInterval(timer);
  e.target.classList.toggle('hidden');
  btnPlay.classList.toggle('hidden');
}

function btnPlayHandler(e) {
  e.preventDefault();
  startTimer();
  e.target.classList.toggle('hidden');
  btnPause.classList.toggle('hidden');
}

function btnStopHandler(e) {
  if (timerData.timeUsed >= timerData.timeTotal) return; // If timer has finished no need for prompt - nb reload default behaviour

  e.preventDefault();
  if (window.confirm('Do you really want to cancel the current timer?')) {
    location.reload();
  }
}

function startTimer() {
  timer = setInterval(timerCountdown, 1000);
  function timerCountdown() {
    timerData.timeUsed++;
    updateClock();
    if (timerData.timeUsed >= timerData.timeTotal) {
      startAlarm();
      btnStop.classList.add('btn--accent');
      clearInterval(timer);
    }
  }
}

function startAlarm() {
  alarm.play();
  alarmPlay = setInterval(() => {
    alarm.play();
  }, 10000);
}

init();

let startTime;
let elapsedTime = 0;
let timerInterval;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const lapsContainer = document.getElementById('laps');

function formatTime(ms) {
    let milliseconds = parseInt((ms % 1000) / 10);
    let seconds = Math.floor((ms / 1000) % 60);
    let minutes = Math.floor((ms / (1000 * 60)) % 60);
    let hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}

function startStopwatch() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        display.textContent = formatTime(elapsedTime);
    }, 10);

    startStopBtn.textContent = 'Pause';
    lapBtn.disabled = false;
    resetBtn.disabled = false;
}

function stopStopwatch() {
    clearInterval(timerInterval);
    startStopBtn.textContent = 'Start';
}

function resetStopwatch() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    display.textContent = "00:00:00.000";
    lapsContainer.innerHTML = "";
    startStopBtn.textContent = 'Start';
    lapBtn.disabled = true;
    resetBtn.disabled = true;
}

function recordLap() {
    const lapTime = document.createElement('div');
    lapTime.textContent = formatTime(elapsedTime);
    lapsContainer.appendChild(lapTime);
}

startStopBtn.addEventListener('click', () => {
    if (startStopBtn.textContent === 'Start') {
        startStopwatch();
    } else {
        stopStopwatch();
    }
});

resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);

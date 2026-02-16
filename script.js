let startTime;
let elapsedTime = 0;
let timerInterval;
let running = false;

const display = document.getElementById("display");
const progress = document.getElementById("progress");
const startBtn = document.getElementById("startBtn");
const laps = document.getElementById("laps");

const circumference = 754;

function startStop() {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10);
        startBtn.innerHTML = "||";
        running = true;
    } else {
        clearInterval(timerInterval);
        startBtn.innerHTML = "▶";
        running = false;
    }
}

function reset() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    running = false;
    display.innerHTML = "00:00.00";
    progress.style.strokeDashoffset = circumference;
    laps.innerHTML = "";
    startBtn.innerHTML = "▶";
}

function lap() {
    if (!running) return;

    const li = document.createElement("li");

    const lapNumber = laps.children.length + 1;
    li.innerHTML = `<span>Lap ${lapNumber}</span> <span>${display.innerHTML}</span>`;

    laps.prepend(li); // newest lap on top
}

function updateTime() {
    elapsedTime = Date.now() - startTime;

    let ms = Math.floor((elapsedTime % 1000) / 10);
    let sec = Math.floor((elapsedTime / 1000) % 60);
    let min = Math.floor((elapsedTime / (1000 * 60)) % 60);

    display.innerHTML =
        (min < 10 ? "0" : "") + min + ":" +
        (sec < 10 ? "0" : "") + sec + "." +
        (ms < 10 ? "0" : "") + ms;

    // Continuous circular progress
    let progressValue = (elapsedTime % 60000) / 60000;
    progress.style.strokeDashoffset =
        circumference - (progressValue * circumference);
}
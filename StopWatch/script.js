// ========================================
// 1. GET HTML ELEMENTS
// ========================================
const hoursDisplay = document.getElementById('hours');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');

// ========================================
// 2. INITIALIZE STATE
// ========================================
let seconds = 0;
let intervalId = null;
let isRunning = false;

// ========================================
// 3. TIME FORMATTING
// ========================================

function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    return {
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(secs).padStart(2, '0')
    };
}

function updateDisplay() {
    const time = formatTime(seconds);

    hoursDisplay.textContent = time.hours;
    minutesDisplay.textContent = time.minutes;
    secondsDisplay.textContent = time.seconds;
}

// ========================================
// 4. CONTROL FUNCTIONS
// ========================================

function startPause() {
    if (isRunning) {
        // Pause
        clearInterval(intervalId);
        startPauseBtn.textContent = 'Start';
        isRunning = false;
    } else {
        // Start
        intervalId = setInterval(function() {
            seconds++;
            updateDisplay();
        }, 1000);

        startPauseBtn.textContent = 'Pause';
        isRunning = true;
    }
}

function reset() {
    clearInterval(intervalId);
    seconds = 0;
    isRunning = false;
    intervalId = null;
    startPauseBtn.textContent = 'Start';
    updateDisplay();
}

// ========================================
// 5. EVENT LISTENERS
// ========================================

startPauseBtn.addEventListener('click', startPause);
resetBtn.addEventListener('click', reset);

// ========================================
// 6. INITIALIZE DISPLAY
// ========================================

updateDisplay();
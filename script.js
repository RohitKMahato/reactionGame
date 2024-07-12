document.addEventListener("DOMContentLoaded", function() {
    const alphabetDisplay = document.getElementById("alphabet-display");
    const message = document.getElementById("message");
    const startButton = document.getElementById("start-button");
    const averageTimeDisplay = document.getElementById("average-time");
    const totalTimeDisplay = document.getElementById("total-time");
    const stopwatchDisplay = document.getElementById("stopwatch");

    let startTime, endTime, reactionTimes = [];
    const maxTrials = 10;
    let stopwatchInterval, gameStartTime;

    function getRandomAlphabet() {
        const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        return alphabets[Math.floor(Math.random() * alphabets.length)];
    }

    function startStopwatch() {
        gameStartTime = new Date().getTime();
        stopwatchInterval = setInterval(() => {
            const currentTime = new Date().getTime();
            const elapsedTime = (currentTime - gameStartTime) / 1000;
            stopwatchDisplay.textContent = elapsedTime.toFixed(1);
        }, 100);
    }

    function stopStopwatch() {
        clearInterval(stopwatchInterval);
    }

    function startGame() {
        message.textContent = "Get ready...";
        startButton.disabled = true;
        reactionTimes = [];
        alphabetDisplay.textContent = "";

        setTimeout(() => {
            alphabetDisplay.textContent = getRandomAlphabet();
            startTime = new Date().getTime();
            message.textContent = "";
            startStopwatch();
        }, 3000);
    }

    function endGame(wrongInput = false) {
        if (wrongInput) {
            message.textContent = "Wrong input! Game over.";
        } else {
            endTime = new Date().getTime();
            const reactionTime = endTime - startTime;
            reactionTimes.push(reactionTime);

            if (reactionTimes.length >= maxTrials) {
                const totalReactionTime = reactionTimes.reduce((a, b) => a + b, 0);
                const averageReactionTime = totalReactionTime / reactionTimes.length;
                averageTimeDisplay.textContent = Math.round(averageReactionTime);
                totalTimeDisplay.textContent = totalReactionTime;
                stopStopwatch();
                startButton.disabled = false;
            } else {
                alphabetDisplay.textContent = getRandomAlphabet();
                startTime = new Date().getTime();
            }
        }

        if (wrongInput || reactionTimes.length >= maxTrials) {
            startButton.disabled = false;
            stopStopwatch();
        }
    }

    startButton.addEventListener("click", startGame);
    document.addEventListener("keydown", function(event) {
        if (alphabetDisplay.textContent && /^[A-Z]$/.test(event.key.toUpperCase())) {
            if (event.key.toUpperCase() === alphabetDisplay.textContent) {
                endGame();
            } else {
                endGame(true);
            }
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const alphabetDisplay = document.getElementById("alphabet-display");
    const message = document.getElementById("message");
    const startButton = document.getElementById("start-button");
    const averageTimeDisplay = document.getElementById("average-time");
    const totalTimeDisplay = document.getElementById("total-time");

    let startTime, endTime, reactionTimes = [];
    const maxTrials = 5;

    function getRandomAlphabet() {
        const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        return alphabets[Math.floor(Math.random() * alphabets.length)];
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
                const totalReactionTime = reactionTimes.reduce((a, b) => a + b, 0) ;
                const averageReactionTime = totalReactionTime / reactionTimes.length;
                averageTimeDisplay.textContent = Math.round(averageReactionTime);
                totalTimeDisplay.textContent = totalReactionTime.toFixed(1) / 1000 + " seconds"; // Display total time with "ms" suffix
                message.textContent = "Game over. Well done!";
                startButton.disabled = false;
            } else {
                alphabetDisplay.textContent = getRandomAlphabet();
                startTime = new Date().getTime();
                return; // Return early to avoid enabling the start button
            }
        }

        startButton.disabled = false;
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

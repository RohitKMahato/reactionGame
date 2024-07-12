document.addEventListener("DOMContentLoaded", function() {
    const alphabetDisplay = document.getElementById("alphabet-display");
    const message = document.getElementById("message");
    const startButton = document.getElementById("start-button");
    const averageTimeDisplay = document.getElementById("average-time");
    const totalTimeDisplay = document.getElementById("total-time");

    let startTime, endTime, reactionTimes = [];
    const maxTrials = 20;

    function getRandomAlphabet() {
        const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        return alphabets[Math.floor(Math.random() * alphabets.length)];
    }

    function startGame() {
        message.textContent = "Get ready...";
        startButton.disabled = true;
        reactionTimes = [];
        alphabetDisplay.textContent = "";

        // Create an input element and append it to the DOM for mobile
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            const inputElement = document.createElement('input');
            inputElement.type = 'text';
            inputElement.style.opacity = '0'; // Hide the input element visually
            document.body.appendChild(inputElement);
            inputElement.focus();
        }

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
                const totalReactionTime = reactionTimes.reduce((a, b) => a + b, 0);
                const averageReactionTime = totalReactionTime / reactionTimes.length;
                averageTimeDisplay.textContent = Math.round(averageReactionTime);
                totalTimeDisplay.textContent = (totalReactionTime / 1000).toFixed(1) + " seconds"; // Convert milliseconds to seconds
                message.textContent = "Game over. Well done!";
                startButton.disabled = false;
            } else {
                alphabetDisplay.textContent = getRandomAlphabet();
                startTime = new Date().getTime();
                return; // Return early to avoid enabling the start button
            }
        }

        // Remove input element for mobile if it was created
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            const inputElement = document.querySelector('input[type="text"]');
            if (inputElement) {
                inputElement.parentNode.removeChild(inputElement);
            }
        }

        startButton.disabled = false;
    }

    // Start game on button click for both desktop and mobile
    startButton.addEventListener("click", startGame);

    // Handle key events for desktop and mobile
    document.addEventListener("keydown", function(event) {
        if (alphabetDisplay.textContent && /^[A-Z]$/.test(event.key.toUpperCase())) {
            if (event.key.toUpperCase() === alphabetDisplay.textContent) {
                endGame();
            } else {
                endGame(true);
            }
        }
    });

    // Handle touch events for mobile
    alphabetDisplay.addEventListener("touchstart", function() {
        if (alphabetDisplay.textContent) {
            endGame();
        }
    });

    // Prevent default behavior for touch events to avoid double taps
    alphabetDisplay.addEventListener("touchmove", function(event) {
        event.preventDefault();
    });
});

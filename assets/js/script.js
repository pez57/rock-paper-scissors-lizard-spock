// const DOM elements

const moveButtons = document.getElementsByClassName("move");
const moves = ["rock", "paper", "scissors", "lizard", "spock"];
const yourScore = document.getElementById("your-score");
const botScore = document.getElementById("bot-score");
const resetButton = document.getElementById("reset-button");
const playerChoice = document.getElementById("player-choice");
const robotChoice = document.getElementById("robot-choice");


// Add event listeners to move buttons

for (let button of moveButtons) {
    button.addEventListener("click", function(event) {
     event.preventDefault();
     let move = this.getAttribute("data-type");
     playGame(move);
    });
}

// Add Event listener to Reset button

resetButton.addEventListener("click", function() {
    resetGame();

});

// Main game functions

function playGame(playerMove) {
    playerChoice.innerHTML = `<div>You chose ${playerMove}</div>
    <i class="rule-icon far fa-hand-${playerMove}"></i>
    `;
    const robotRandom = Math.floor(Math.random() * moves.length);
    const robotMove = moves[robotRandom];
    robotChoice.innerHTML = `<div>Robot chose ${robotMove}</div>
    <i class="rule-icon far fa-hand-${robotMove}"></i>
    `;

    calculateWinner(playerMove, robotMove);
}

function calculateWinner(player, robot) {
    let hasPlayerWon = false;

    if (player === robot) {
        alert("It's a draw! Try again");
    } else if (player === "rock" && (robot === "scissors" || robot === "lizard")) {
        hasPlayerWon = true;
    } else if (player === "paper" && (robot === "rock" || robot === "spock")) {
        hasPlayerWon = true;
    } else if (player === "scissors" && (robot === "paper" || robot === "lizard")) {
        hasPlayerWon = true;
    } else if (player === "lizard" && (robot === "paper" || robot === "spock")) {
        hasPlayerWon = true;
    } else if (player === "spock" && (robot === "scissors" || robot === "rock")) {
        hasPlayerWon = true; 
    }

    if (hasPlayerWon) {
       let currentScore = yourScore.innerHTML;
          currentScore++;
          yourScore.innerHTML = currentScore;
    } else {
        let currentBotScore = botScore.innerHTML;
        currentBotScore++;
        botScore.innerHTML = currentBotScore;
    }
}

function resetGame() {
    botScore.innerHTML = "0";
    yourScore.innerHTML = "0";
}


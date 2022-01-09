// const DOM elements

const moveButtons = document.getElementsByClassName("move");
const moves = ["rock", "paper", "scissors", "lizard", "spock"];
const yourScore = document.getElementById("your-score");
const botScore = document.getElementById("bot-score");
const resetButton = document.getElementById("reset-button");
const playerChoice = document.getElementById("player-choice");
const robotChoice = document.getElementById("robot-choice");


// Add event listeners to buttons
//target vales to be removed on html
for (let button of moveButtons) {
    button.addEventListener("click", function(event) {
     event.preventDefault();
     let move = this.getAttribute("data-type");
     playGame(move);
    });
}

function playGame(playerMove) {
    playerChoice.innerHTML = `<div>You chose ${playerMove}</div>
    <i class="far fa-hand-${playerMove}"></i>
    `;
    const robotRandom = Math.floor(Math.random() * moves.length);
    const robotMove = moves[robotRandom];
    robotChoice.innerHTML = `<div>Robot chose ${robotMove}</div>
    <i class="far fa-hand-${robotMove}"></i>
    `;

    calculateWinner(playerMove, robotMove);
}

function calculateWinner(player, robot) {
    let hasPlayerWon = false;

    if (player === robot) {
        return;
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
       let currentScore = yourScore.innerHTML
       console.log(currentScore++);
          yourScore.innerHTML = currentScore++;
    }
}


/*function iterateScore()


function roundWinner()
*/
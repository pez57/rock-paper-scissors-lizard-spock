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
    robotChoice.innerHTML = `<div>You chose ${robotMove}</div>
    <i class="far fa-hand-${robotMove}"></i>
    `;
}

/* function playerMove()


function robotMove()


function calculateWinner()


function iterateScore()


function roundWinner()
*/
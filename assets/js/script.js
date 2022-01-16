/*
const DOM elements
*/
const moveButtons = document.getElementsByClassName("move");
const moves = ["rock", "paper", "scissors", "lizard", "spock"];
const yourScore = document.getElementById("your-score");
const botScore = document.getElementById("bot-score");
const resetButton = document.getElementById("reset-button");
const playerChoice = document.getElementById("player-choice");
const robotChoice = document.getElementById("robot-choice");
const avatars = document.getElementsByClassName("avatar");
let robotScore = 0;
let playerScore = 0;
let highScores = readScores();


/*
Add event listeners to move buttons
*/
for (let button of moveButtons) {
    button.addEventListener("click", function (event) {
        event.preventDefault();
        let move = this.getAttribute("data-type");
        showAvatar(true);
        playGame(move);
    });
}

function showAvatar(shouldHide) {
    for (let avatar of avatars) {
        avatar.style.display = shouldHide ? "none" : "inline-block"; 
    }
}

/*
Add Event listener to Reset button
*/
resetButton.addEventListener("click", function () {
    showAvatar(false);
    resetGame();
});


/* 
Main game functions
*/
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
        return;
    }

    /*
     Game logic
     */
    else if (player === "rock" && (robot === "scissors" || robot === "lizard")) {
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

    /* 
    Update score
    */
    if (hasPlayerWon) {
        playerScore++;
    } else {
        robotScore++;
    }

    updateScoreView();
}

function updateScoreView() {
    yourScore.innerHTML = playerScore;
    botScore.innerHTML = robotScore;
}

function resetGame() {

    playerScore = 0;
    robotScore = 0;
    updateScoreView();
}



/*
Modal open close functions
*/


const modal = document.getElementById("score-modal"); //get modal element
const modalBtn = document.getElementById("high-score-button");//get open modal button
const closeBtn = document.getElementById("close-btn"); //get close button

//event listeners for open and close modal on click
modalBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
window.addEventListener("click", outerClick);

function readScores() {
    let scoresJson = localStorage.getItem("highScores");
    let scores = JSON.parse(scoresJson);

    if (!scores) { // If local storage is null create empty array
        scores = [];
    }
    return scores;

}

function sortScores(a, b) {
    return b.score - a.score;
}

function openModal() {
    highScoresContainer.innerHTML = "";
    let scores =  readScores();

    if (scores.length > 0) {
        let loopLimit = scores.length < 10 ? scores.length - 1 : 9;

        scores.sort(sortScores);

        for (let i = 0; i <= loopLimit; i++) {

            const name = scores[i].player;
            const scoreValue = scores[i].score;
            highScoresContainer.innerHTML += `${i + 1}. ${name}: ${scoreValue}<br/>`;
        }
    } else {
        highScoresContainer.innerHTML = "No high scores. Play some more!"
    }
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}

function outerClick(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}



/*
Score Board Content
*/

const inpName = document.getElementById("input-name");
const submitBtn = document.getElementById("submit-btn");
const highScoresContainer = document.querySelector(".high-scores");


submitBtn.onclick = function () {

    const player = inpName.value;
    const score = playerScore;

    if (player && score) {
        highScores.push({
            player, score
        });
        localStorage.setItem("highScores", JSON.stringify(highScores));
        openModal();
    }
};


/*
Slow video play rate
 */

document.querySelector('video').playbackRate = 0.75;



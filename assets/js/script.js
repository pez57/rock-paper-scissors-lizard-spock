/*
const DOM elements and global variables
*/
const moveButtons = document.getElementsByClassName("move");
const moves = ["rock", "paper", "scissors", "lizard", "spock"];
const yourScore = document.getElementById("your-score");
const botScore = document.getElementById("bot-score");
const resetButton = document.getElementById("reset-button");
const playerChoice = document.getElementById("player-choice");
const robotChoice = document.getElementById("robot-choice");
const avatars = document.getElementsByClassName("avatar");
const bothChoices = document.getElementsByClassName("show-choices");
const inpName = document.getElementById("input-name");
const submitBtn = document.getElementById("submit-btn");
const highScoresContainer = document.querySelector(".high-scores");
const modal = document.getElementById("score-modal");
const modalBtn = document.getElementById("high-score-button");
const closeBtn = document.getElementById("close-btn");
const inpFieldset = document.getElementById("inp-field");
let robotScore = 0;
let playerScore = 0;
let highScores = readScores();
let trackTurns = 1;
let finishedGame = false;

/*
Add event listeners to move buttons
*/
for (let button of moveButtons) {
    button.addEventListener("click", function (event) {
        event.preventDefault();
        let move = this.getAttribute("data-type");
        showAvatar(true);
        playGame(move);
        showChoices(false);
    });
}

function showAvatar(shouldHide) { //Show player images before gameplay and hide when game starts
    for (let avatar of avatars) {
        avatar.style.display = shouldHide ? "none" : "inline-block";
    }
}

/*
Add Event listener to Reset button
*/
resetButton.addEventListener("click", function () {
    showAvatar(false);
    showChoices(false);
    resetGame();
    resetTurns();
});

function showChoices(shouldHide) { //Hide choices when reset is clicked and show when game starts again
    for (let choice of bothChoices) {
        choice.style.display = shouldHide ? "none" : "inline-block";
    }
}

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
    let finalTurn = trackTurns === 10;
    calculateTurnWinner(playerMove, robotMove);

    countTurns();
    updateScoreView();

    if (finalTurn) {
        const isPlayerWinner = playerScore > robotScore;
        endGame(isPlayerWinner);
    }
}

function countTurns() {
    let turnsNum = document.getElementById("game-rounds");    
    turnsNum.innerHTML = `Round ${trackTurns++}/10`;
}

function endGame(playerWon) {
    finishedGame = true;
    if (playerWon) {
        openModal(true);
    } else {
        alert ("Sorry you did not win! Play again");
        resetGame();
    }        
}

function calculateTurnWinner(player, robot) {
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
}

function updateScoreView() {
    yourScore.innerHTML = playerScore;
    botScore.innerHTML = robotScore;
}

function resetGame() {
    playerChoice.style.display = "none";
    robotChoice.style.display = "none";
    playerScore = 0;
    robotScore = 0;
    updateScoreView();
    resetTurns();
    showAvatar(false);
    finishedGame = false;
}

function resetTurns() {
    trackTurns = 1;
}

/*
High scores and score board modal open close functions
*/
//event listeners for open and close modal on click
modalBtn.addEventListener("click", scoreBoardClick);
closeBtn.addEventListener("click", closeModal);
window.addEventListener("click", outerClick);

/*
Save scores to local storage and sort them into high scores
*/
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

/* 
Open modal function and display score board
*/

function openModal(finalTurn) {
    highScoresContainer.innerHTML = "";
    let scores = readScores(); 
    if (scores.length > 0) {
        let loopLimit = scores.length < 10 ? scores.length - 1 : 9;
        scores.sort(sortScores);
        for (let i = 0; i <= loopLimit; i++) {
            const name = scores[i].player;
            const scoreValue = scores[i].score;
            highScoresContainer.innerHTML += `${i + 1}. ${name} : ${scoreValue}<br/>`;
        }
    } else {
        highScoresContainer.innerHTML = "No high scores. Play some more!";
    }
    if (finalTurn) {
        inpFieldset.style.display = "block";
    } else {
        inpFieldset.style.display = "none";
    }
    modal.style.display = "block";
 }

 function scoreBoardClick() {
     openModal(false);
 }


/* 
Close modal with button and outer window click
*/
function closeModal() {
    modal.style.display = "none";
    if (finishedGame) {
        resetGame();
    }        
}

function outerClick(event) {
    if (event.target == modal) {
        closeModal();
    }
}

/*
Score Board Content
*/
submitBtn.onclick = function () {
    const player = inpName.value;
    const score = playerScore;
    if (player && score) {
        highScores.push({
            player,
            score
        });
        localStorage.setItem("highScores", JSON.stringify(highScores));
        openModal(false);
        resetGame();
    }
};

/*
Slow video play rate
 */
document.querySelector('video').playbackRate = 0.75;

"use strict";

const playerScoreEl = document.getElementById("playerScore");
const playerChoicEl = document.getElementById("playerChoice");
const computerScoreEl = document.getElementById("computerScore");
const computerChoicEl = document.getElementById("computerChoice");
const resultText = document.getElementById("resultText");
const resultExplanation = document.getElementById("resultExplanation");

const playerRock = document.getElementById("playerRock");
const playerPaper = document.getElementById("playerPaper");
const playerScissors = document.getElementById("playerScissors");
const playerLizard = document.getElementById("playerLizard");
const playerSpock = document.getElementById("playerSpock");

const computerRock = document.getElementById("computerRock");
const computerPaper = document.getElementById("computerPaper");
const computerScissors = document.getElementById("computerScissors");
const computerLizard = document.getElementById("computerLizard");
const computerSpock = document.getElementById("computerSpock");

const allGameIcons = document.querySelectorAll(".fa-regular");

///Sound effects

let audioScissorsPaper = new Audio('ScissorsPaper.mp3')
let audioPaperRock = new Audio('PaperRock.mp3')
let audioRockLizard = new Audio('RockLizard.mp3')
let audioLizardSpock = new Audio('LizardSpock.mp3')
let audioSpockScissors = new Audio('SpockScissors.mp3')
let audioScissorsLizard = new Audio('ScissorsLizard.mp3')
let audioLizardPaper = new Audio('LizardPaper.mp3')
let audioPaperSpock = new Audio('PaperSpock.mp3')
let audioSpockRock = new Audio('SpockRock.mp3')
let audioRockScissors = new Audio('RockScissors.mp3')
let audioBazinga = new Audio('Bazinga.mp3')




//Rules
const choices = {
  rock: { name: "Rock", defeats: ["scissors", "lizard"] },
  paper: { name: "Paper", defeats: ["rock", "spock"] },
  scissors: { name: "Scissors", defeats: ["paper", "lizard"] },
  lizard: { name: "Lizard", defeats: ["paper", "spock"] },
  spock: { name: "Spock", defeats: ["scissors", "rock"] },
};

let playerScoreNumber = 0;
let computerScoreNumber = 0;
let computerChoice = "";

//Reset al 'selected' icons
console.log(allGameIcons);
function resetSelected() {
  allGameIcons.forEach((icon) => {
    icon.classList.remove("selected");
  });
}



//Reset the game completely
function resetAll() {
  resetSelected();
  playerScoreNumber = 0;
  computerScoreNumber = 0;
  computerScoreEl.textContent = 0;
  playerScoreEl.textContent = 0;
  resultText.textContent = "BAZINgA";
  playerChoicEl.textContent = "";
  computerChoicEl.textContent = "";
  resultExplanation.textContent="Choose your fighter!"
}

//Random computer Choice
function computerRandomChoice() {
  const computerChoiceNumber = Math.random();
  if (computerChoiceNumber < 0.2) {
    computerChoice = "rock";
  } else if (computerChoiceNumber <= 0.4) {
    computerChoice = "paper";
  } else if (computerChoiceNumber <= 0.6) {
    computerChoice = "scissors";
  } else if (computerChoiceNumber <= 0.8) {
    computerChoice = "lizard";
  } else {
    computerChoice = "spock";
  }
}

//Add 'selected' styling and computer choice

function displayComputerChoice() {
  switch (computerChoice) {
    case "rock":
      computerRock.classList.add("selected");
      computerChoicEl.textContent = " --- Rock";
      break;
    case "paper":
      computerPaper.classList.add("selected");
      computerChoicEl.textContent = " --- Paper";
      break;
    case "scissors":
      computerScissors.classList.add("selected");
      computerChoicEl.textContent = " --- Scissors";
      break;
    case "lizard":
      computerLizard.classList.add("selected");
      computerChoicEl.textContent = " --- Lizard";
      break;
    case "spock":
      computerSpock.classList.add("selected");
      computerChoicEl.textContent = " --- Spock";
      break;
    default:
      break;
  }
}

//Check results, increase score and update the resultText
function updateScore(playerChoice) {
  // console.log(playerChoice, computerChoice);
  if (playerChoice === computerChoice) {
    resultText.textContent = "It is a tie!";
    resultExplanation.textContent = "BAZINgA!!!";
    audioBazinga.play();
  } else {
    const choice = choices[playerChoice];
    // console.log(choice.defeats.indexOf(computerChoice));
    if (choice.defeats.indexOf(computerChoice) > -1) {
      resultText.textContent = "You Won!!!!";
      playerScoreNumber++;
      playerScoreEl.textContent = playerScoreNumber;
    } else {
      resultText.textContent = "You Lost!!!!";
      computerScoreNumber++;
      computerScoreEl.textContent = computerScoreNumber;
    }

    //Explain the case
    let result = [playerChoice, computerChoice];
    // console.log(result);
    if (result.includes("scissors") && result.includes("paper")) {
      resultExplanation.textContent = "Scissors cuts paper!";
      audioScissorsPaper.play();
    } else if (result.includes("paper") && result.includes("rock")) {
      resultExplanation.textContent = "Paper covers rock!";
      audioPaperRock.play();
    } else if (result.includes("rock") && result.includes("lizard")) {
      resultExplanation.textContent = "Rock crushes Lizard!";
      audioRockLizard.play();
    } else if (result.includes("lizard") && result.includes("spock")) {
      resultExplanation.textContent = "Lizard poisons Spock!";
      audioLizardSpock.play();
    } else if (result.includes("spock") && result.includes("scissors")) {
      resultExplanation.textContent = "Spock smashes scissors!";
      audioSpockScissors.play();
    } else if (result.includes("scissors") && result.includes("lizard")) {
      resultExplanation.textContent = "Scissors decapitates lizard!";
      audioScissorsLizard.play();
    } else if (result.includes("lizard") && result.includes("paper")) {
      resultExplanation.textContent = "Lizard eats paper!";
      audioLizardPaper.play();
    } else if (result.includes("paper") && result.includes("spock")) {
      resultExplanation.textContent = "Paper disproves Spock!";
      audioPaperSpock.play();
    } else if (result.includes("spock") && result.includes("rock")) {
      resultExplanation.textContent = "Spock vaporizes rock!";
      audioSpockRock.play();
    } else if(result.includes("rock") && result.includes("scissors")){
      resultExplanation.textContent =
        "As it always has, rock crushes Scissors!";
        audioRockScissors.play();
    };
  };
};

//Call functions to process turn
function checkResult(playerChoice) {
  resetSelected();
  computerRandomChoice();
  displayComputerChoice();
  updateScore(playerChoice);
}

//Passing player selection value and styling icons
function select(playerChoice) {
  checkResult(playerChoice);
  //Add 'selected' styling and update playerChoice
  switch (playerChoice) {
    case "rock":
      playerRock.classList.add("selected");
      playerChoicEl.textContent = " --- Rock";
      break;
    case "paper":
      playerPaper.classList.add("selected");
      playerChoicEl.textContent = " --- Paper";
      break;
    case "scissors":
      playerScissors.classList.add("selected");
      playerChoicEl.textContent = " --- Scissors";
      break;
    case "lizard":
      playerLizard.classList.add("selected");
      playerChoicEl.textContent = " --- Lizard";
      break;
    case "spock":
      playerSpock.classList.add("selected");
      playerChoicEl.textContent = " --- Spock";
      break;
    default:
      break;
  }
}

//Rule set explanation

// function explanation() {
//   if()
// }

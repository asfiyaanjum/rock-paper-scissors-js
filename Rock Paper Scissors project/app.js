let userScore = 0;
let compScore = 0;

let round = 0;
const maxRounds = 5;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const resultScreen = document.querySelector("#result-screen");
const finalmsg = document.querySelector("#final-msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

const drawGame = () => {
  msg.innerText = "Game was Draw.Play again.";
  msg.style.backgroundColor = "#081b31";
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You lost! ${compChoice} beats your ${userChoice}`;
    msg.style.backgroundColor = "red";
  }
};

const playGame = (userChoice) => {
  if (round >= maxRounds) return;
  round++;
  //Generate computer choice->modular
  const compChoice = genCompChoice();

  if (userChoice == compChoice) {
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      userWin = compChoice === "scissors" ? false : true;
    } else {
      userWin = compChoice === "rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);
  }
  if (round === maxRounds) {
    setTimeout(declareFinalWinner, 500);
  }
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});

const declareFinalWinner = () => {
  resultScreen.classList.remove("hidden");

  if (userScore > compScore) {
    finalmsg.innerText = "🎉 You Won the Game!";
    launchConfetti();
  } else if (userScore < compScore) {
    finalmsg.innerText = "Computer Won!";
  } else {
    finalmsg.innerText = "It's a Tie!";
  }
};

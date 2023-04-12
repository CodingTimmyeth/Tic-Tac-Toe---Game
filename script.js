// Initialize variables
let currentPlayer = "X";
let gameStatus = "";
let numTurns = 0;
let gameBoard = ["", "", "", "", "", "", "", "", ""];

// Get DOM elements
const squares = document.querySelectorAll("td");
const message = document.createElement("div");
const container = document.querySelector(".container");

// Add event listeners to each square
squares.forEach((square, index) => {
  square.addEventListener("click", () => {
    if (gameBoard[index] === "") {
      gameBoard[index] = currentPlayer;
      square.textContent = currentPlayer;
      numTurns++;
      checkGameStatus();
      togglePlayer();
    }
  });
});

// Check if game has ended
function checkGameStatus() {
  checkForWinner();
  checkForDraw();
}

// Check if there is a winner
function checkForWinner() {
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      gameStatus = `${currentPlayer} wins!`;
      endGame();
    }
  }
}

// Check if it is a draw
function checkForDraw() {
  if (numTurns === 9 && gameStatus === "") {
    gameStatus = "It's a draw!";
    endGame();
  }
}

// End game
function endGame() {
  message.textContent = gameStatus;
  container.appendChild(message);
  squares.forEach((square) => {
    square.removeEventListener("click", () => {});
  });
}

// Toggle player turn
function togglePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  if (gameStatus === "") {
    message.textContent = `${currentPlayer}'s turn`;
  }
}

// New game button
const newGameButton = document.querySelector("#newGameBtn");
newGameButton.addEventListener("click", () => {
  currentPlayer = "X";
  gameStatus = "";
  numTurns = 0;
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  squares.forEach((square) => {
    square.textContent = "";
    square.addEventListener("click", () => {});
  });
  message.textContent = `${currentPlayer}'s turn`;
  container.removeChild(message);
});

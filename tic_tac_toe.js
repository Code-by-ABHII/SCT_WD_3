
const grid = document.getElementById("grid");
const winnerDisplay = document.getElementById("winner");
let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];

// Initialize the grid
function createGrid() {
  board.forEach((_, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", () => makeMove(cell, index));
    grid.appendChild(cell);
  });
}

// Handle user clicks
function makeMove(cell, index) {
  if (!board[index]) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add("taken");

    if (checkWinner()) {
      winnerDisplay.textContent = `${currentPlayer} Wins!`;
      disableBoard();
    } else if (board.every((cell) => cell)) {
      winnerDisplay.textContent = "It's a Tie!";
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }
}

// Check for winning conditions
function checkWinner() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6],           // Diagonals
  ];

  return winningCombinations.some((combination) => {
    return combination.every((index) => board[index] === currentPlayer);
  });
}

// Disable the board after a win or tie
function disableBoard() {
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.classList.add("taken");
  });
}

// Reset the game
function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  grid.innerHTML = "";
  winnerDisplay.textContent = "";
  createGrid();
}

// Start the game
createGrid();


const cells = document.querySelectorAll(".cell");
const status = document.getElementById("status");
const restart = document.getElementById("restart");
const playerX = document.getElementById("playerX");
const playerO = document.getElementById("playerO");

let currentPlayer = "X";
let board = Array(9).fill("");
let gameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function updateTurn() {
  playerX.classList.toggle("border-green-400", currentPlayer === "X");
  playerX.classList.toggle("border-slate-600", currentPlayer !== "X");
  playerO.classList.toggle("border-orange-400", currentPlayer === "O");
  playerO.classList.toggle("border-slate-600", currentPlayer !== "O");
}

function checkWinner() {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;

    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      cells[a].classList.add("winner");
      cells[b].classList.add("winner");
      cells[c].classList.add("winner");
      return true;
    }
  }

  return false;
}

function handleClick(event) {
  const cell = event.target;
  const index = Array.from(cells).indexOf(cell);

  if (!gameActive || board[index]) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());

  if (checkWinner()) {
    status.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (board.every(value => value !== "")) {
    status.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  status.textContent = `Player ${currentPlayer}'s turn`;
  updateTurn();
}

function resetGame() {
  board = Array(9).fill("");
  currentPlayer = "X";
  gameActive = true;

  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("x", "o", "winner");
  });

  status.textContent = "Player X's turn";
  updateTurn();
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
restart.addEventListener("click", resetGame);

updateTurn();

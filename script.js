const board = document.querySelector(".board");
const cells = board.querySelectorAll(".cell");
const statusText = document.getElementById("statusText");
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = true;

for (let cell of cells) {
  cell.addEventListener("click", function () {
    const cellIndex = [...cells].indexOf(this);

    if (options[cellIndex] !== "" || !running) return;

    cell.textContent = currentPlayer;
    options[cellIndex] = currentPlayer;

    checkWinner();

      if (running) changePlayer();
      else restartGame();
  });
}

function updateOptions() {
  cells.forEach((cell, index) => {
    options[index] = cell.textContent;
  });
}

function changePlayer() {
  currentPlayer = currentPlayer == "X" ? "O" : "X";
  statusText.textContent = `${currentPlayer}'s Turn`;
}

function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winConditions.length; i++) {
    let condition = winConditions[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    }
    if (cellA == cellB && cellC == cellB) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `${currentPlayer} Wins!`;
    running = false;
  } else if (!options.includes("")) {
    statusText.textContent = `Draw!`;
    running = false;
  }
}

function restartGame() {
  options.fill("");
  cells.forEach((cell) => (cell.textContent = ""));
  running = true;
  currentPlayer = "X";
  statusText.textContent = `${currentPlayer}'s Turn`;
}

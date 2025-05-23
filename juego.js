const mainBoard = document.getElementById("main-board");
let currentPlayer = "X";
let nextBoard = null;

const boards = [];

for (let i = 0; i < 9; i++) {
  const board = document.createElement("div");
  board.classList.add("board");
  board.dataset.index = i;
  mainBoard.appendChild(board);
  const cells = [];

  for (let j = 0; j < 9; j++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = j;
    cell.addEventListener("click", () => handleClick(cell, board));
    board.appendChild(cell);
    cells.push(cell);
  }

  boards.push({ element: board, cells: cells, winner: null });
}

function handleClick(cell, board) {
  if (cell.textContent !== "" || board.classList.contains("won")) return;

  const boardIndex = parseInt(board.dataset.index);

  if (nextBoard !== null && boardIndex !== nextBoard) {
    alert("¡Debes jugar en el tablero " + (nextBoard + 1) + "!");
    return;
  }

  cell.textContent = currentPlayer;

  // Verificar si se ganó el tablero chico
  if (checkWinner(board)) {
    board.classList.add("won");
    board.innerHTML = `<strong>${currentPlayer}</strong>`;
    boards[boardIndex].winner = currentPlayer;
    if (checkGlobalWinner()) {
      setTimeout(() => alert(`¡Jugador ${currentPlayer} ganó el juego!`), 10);
      disableAll();
      return;
    }
  }

  // Establecer próximo tablero según la celda jugada
  nextBoard = parseInt(cell.dataset.index);

  if (boards[nextBoard].winner !== null) {
    nextBoard = null; // tablero ya ganado → jugador puede elegir
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWinner(board) {
  const cells = Array.from(board.children).map(cell => cell.textContent);
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return lines.some(([a,b,c]) => cells[a] && cells[a] === cells[b] && cells[a] === cells[c]);
}

function checkGlobalWinner() {
  const global = boards.map(b => b.winner);
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return lines.some(([a,b,c]) => global[a] && global[a] === global[b] && global[a] === global[c]);
}

function disableAll() {
  boards.forEach(b => b.cells.forEach(cell => cell.classList.add("disabled")));
}

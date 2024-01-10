// domController.js


export function initializeGameUI() {
  // Code to initialize game UI goes here
}

export const renderGameBoards = () => {
  const playerBoard = document.querySelector('#player-board-placeholder');
  playerBoard.appendChild(createGameBoard(10));

  const computerBoard = document.querySelector('#computer-board-placeholder');
  computerBoard.appendChild(createGameBoard(10));  
};

const createGameBoard = (boardSize) => {
  const table = document.createElement('table');
  table.classList.add('board-table');
  for (let row = 0; row < boardSize; row++) {
    const tr = document.createElement('tr');
    tr.classList.add('board-row');
    for (let col = 0; col < boardSize; col++) {
      const td = document.createElement('td');
      td.classList.add('board-cell');
      td.dataset.row = row;
      td.dataset.col = col;

      td.addEventListener('click', () => handleCellClick(row, col));

      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  return table;
};

const handleCellClick = (row, col) => {
  // Logic for handling a cell click, e.g., making a move in a game
  console.log(`Cell at row ${row}, col ${col} was clicked`);
};
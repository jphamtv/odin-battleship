// domController.js



export const renderGameBoards = (playerOneGameBoard, playerTwoGameBoard) => {
  const playerBoard = document.querySelector('#player-board-placeholder');
  playerBoard.appendChild(createGameBoardUI());
  renderShipsOnGameBoardUI(playerBoard, playerOneGameBoard);

  const computerBoard = document.querySelector('#computer-board-placeholder');
  computerBoard.appendChild(createGameBoardUI());  
  renderShipsOnGameBoardUI(computerBoard, playerTwoGameBoard);
};

const createGameBoardUI = () => {
  const table = document.createElement('table');
  table.classList.add('board-table');
  for (let row = 0; row < 10; row++) {
    const tr = document.createElement('tr');
    tr.classList.add('board-row');
    for (let col = 0; col < 10; col++) {
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

export const renderShipsOnGameBoardUI = (boardPlaceholder, playerBoard) => {
  const container = boardPlaceholder;
  
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const boardCell = container.querySelector(`table tr td[data-row="${row}"][data-col="${col}"]`);
      
      if (playerBoard.board[row][col] === null || playerBoard.board[row][col] === 'boundary') {
        boardCell.classList.add('cell-empty');
      } else {
        boardCell.classList.add('cell-ship');
      }
    }
  }
};

const handleCellClick = (row, col) => {
  // Logic for handling a cell click, e.g., making a move in a game
  console.log(`Cell at row ${row}, col ${col} was clicked`);
};
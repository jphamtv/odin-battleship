// domController.js


export const renderBattleFields = (playerBattleField, computerBattleField, player, computer) => {
  const playerBoardDiv = document.querySelector('#player-board-placeholder');
  playerBoardDiv.appendChild(createBattleField());
  renderShipsOnBattleField(playerBoardDiv, playerBattleField);

  const computerBoardDiv = document.querySelector('#computer-board-placeholder');
  computerBoardDiv.appendChild(createBattleField());  
  // renderShipsOnBattleField(computerBoardDiv, computerBattleField);

  addEventListenersToBoard(player, computerBoardDiv, computerBattleField);
};

const createBattleField = () => {
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

      tr.appendChild(td);
    } 
    table.appendChild(tr);
  }
  return table;
};

export const renderShipsOnBattleField = (boardDiv, battleField) => {
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const boardCell = boardDiv.querySelector(`table tr td[data-row="${row}"][data-col="${col}"]`);
      if (battleField.board[row][col] === null || battleField.board[row][col] === 'boundary') {
        boardCell.classList.add('cell-empty');
      } else if (typeof battleField.board[row][col] === 'number') {
        boardCell.classList.add('cell-ship');
      } 
    }
  }  
};

const updateBattleField = (row, col, boardCell, battleField) => {
  console.log(row, col, boardCell, battleField)
  if (battleField.board[row][col] === 'hit') {
    boardCell.classList.add('cell-hit');
  } else if (battleField.board[row][col] === 'miss') {
    boardCell.classList.add('cell-miss');
  } 
}; 

const addEventListenersToBoard = (currentPlayer, gameBoardDiv, opponentBattleField) => {
  const cells = gameBoardDiv.querySelectorAll('.board-cell');
  cells.forEach(cell => {
    cell.addEventListener('click', () => {
      handleCellClick(cell.dataset.row, cell.dataset.col, currentPlayer, opponentBattleField);
    });
  });
};


const handleCellClick = (row, col, currentPlayer, opponentBattleField) => {
  const boardCell = document.querySelector(`#computer-board-placeholder table tr td[data-row="${row}"][data-col="${col}"]`);
  currentPlayer.attack(opponentBattleField, [row, col]);
  updateBattleField(row, col, boardCell, opponentBattleField);
  console.log(opponentBattleField.allShipsSunk())
};
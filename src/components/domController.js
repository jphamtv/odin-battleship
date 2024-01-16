// domController.js
import { onPlayersTurn } from "./gameController.js";

export const renderBoards = (playerBoard, computerBoard, player, computer) => {
  const playerBoardDiv = document.querySelector('#player-board-placeholder');
  playerBoardDiv.appendChild(createBoardElements());
  renderShipsOnBoard(playerBoardDiv, playerBoard);

  const computerBoardDiv = document.querySelector('#computer-board-placeholder');
  computerBoardDiv.appendChild(createBoardElements());  
  renderShipsOnBoard(computerBoardDiv, computerBoard);

  addEventListenersToBoardCells(player, computerBoard);
};

const createBoardElements = () => {
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

export const renderShipsOnBoard = (boardDiv, playerBoard) => {
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const boardCell = boardDiv.querySelector(`table tr td[data-row="${row}"][data-col="${col}"]`);
      if (playerBoard.board[row][col] === null || playerBoard.board[row][col] === 'boundary') {
        boardCell.classList.add('cell-empty');
      } else if (typeof playerBoard.board[row][col] === 'number') {
        boardCell.classList.add('cell-ship');
        boardCell.dataset.id = playerBoard.board[row][col];
      } 
    }
  }  
};

export const updateBoardUI = (row, col, currentPlayer, opponentBoard) => {
  let boardDivId = '';
  row = Number(row);
  col = Number(col);
  
  
  if (currentPlayer.isHuman === true) {
    boardDivId = '#computer-board-placeholder';
  } else {
    boardDivId = '#player-board-placeholder';
  }
  
  const boardCell = document.querySelector(`${boardDivId} table tr td[data-row="${row}"][data-col="${col}"]`);
  
  
  // Helper function to check for out of bounds
  const isOutOfBounds = (row, col) => {
    return row < 0 || row >= 10 || col < 0 || col >= 10; 
  };
  

  // if (hit & not ), if (hit & sunk), else (miss)
  // DO THIS NEXT
  if (opponentBoard.board[row][col] === 'hit') {
    boardCell.classList.add('cell-hit');
    let shipSunk = false;
    let ship = null;

    if (boardCell && boardCell.dataset.id) {
      const shipId = Number(boardCell.dataset.id);
      ship = opponentBoard.ships.find(ship => ship.id === shipId);
      console.log(ship)
      shipSunk = ship.isSunk();
    }  

    if (shipSunk) {
      const { orientation, position, length } = ship;

      for ( let i = 0; i < length; i++) {
        const currentRow = orientation === 'vertical' ? position.row + i : position.row;
        const currentCol = orientation === 'horizontal' ? position.col + i : position.col;

        // Mark surrounding cells for each segment of the ship
        for (let dRow = -1; dRow <= 1; dRow++) {
          for (let dCol = -1; dCol <= 1; dCol++) {
            const checkRow = currentRow + dRow;
            const checkCol = currentCol + dCol;

            if (!isOutOfBounds(checkRow, checkCol) && opponentBoard.board[checkRow][checkCol] !== 'miss' && opponentBoard.board[checkRow][checkCol] !== 'hit') {
              const cellDiv = document.querySelector(`${boardDivId} table tr td[data-row="${checkRow}"][data-col="${checkCol}"]`);
              cellDiv.classList.add('cell-miss-auto');
              cellDiv.textContent = '•';
            }
          }  
        }
      }

    } else if (!shipSunk) {
      // Loop to check boundary cells
      for (let dRow = -1; dRow <= 1; dRow++) {
        for (let dCol = -1; dCol <= 1; dCol++) {
          
          // Skip non-diagonal cells
          if (Math.abs(dRow) !== Math.abs(dCol)) continue;
  
          const checkRow = row + dRow;
          const checkCol = col + dCol;
          
          if (!isOutOfBounds(checkRow, checkCol) && opponentBoard.board[checkRow][checkCol] !== 'miss' && opponentBoard.board[checkRow][checkCol] !== 'hit') {
            const diagonalCellDiv = document.querySelector(`${boardDivId} table tr td[data-row="${checkRow}"][data-col="${checkCol}"]`);
            diagonalCellDiv.classList.add('cell-miss-auto');
            diagonalCellDiv.textContent = '•';
          }
        }
      }      
    }  
  } else if (opponentBoard.board[row][col] === 'miss') {
    boardCell.classList.add('cell-miss');
    boardCell.textContent = '•';
  } 


}; 

export const addEventListenersToBoardCells = (currentPlayer, opponentBoard) => {
  const computerBoardDiv = document.querySelector('#computer-board-placeholder');
  const cells = computerBoardDiv.querySelectorAll('.board-cell');
  cells.forEach(cell => {
    cell.addEventListener('click', () => {
      handleCellClick(cell.dataset.row, cell.dataset.col, currentPlayer, opponentBoard);
    });
  });
};

const handleCellClick = (row, col, currentPlayer, opponentBoard) => {
  currentPlayer.attack(opponentBoard, [row, col]);
  updateBoardUI(row, col, currentPlayer, opponentBoard);

  onPlayersTurn();
  
};
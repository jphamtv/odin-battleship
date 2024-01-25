// domController.js
import { onPlayersTurn, placeShipsOnBoard } from "./gameController.js";
import { isOutOfBounds } from "./utils.js";

export const renderBoards = (playerBoard, computerBoard, player, computer) => {
  const playerBoardDiv = document.querySelector('#player-board-placeholder');
  playerBoardDiv.appendChild(createBoardElements());
  renderShipsOnBoard(playerBoardDiv, playerBoard);

  const computerBoardDiv = document.querySelector('#computer-board-placeholder');
  computerBoardDiv.appendChild(createBoardElements());  
  renderShipsOnBoard(computerBoardDiv, computerBoard);

  addEventListenersToCells(player, computerBoard);
  addEventListenerToRandomBtn(playerBoardDiv, playerBoard);
  addEventListenerToStartBtn();
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
      if (typeof playerBoard.board[row][col] === 'number') {
        const cell = boardDiv.querySelector(`table tr td[data-row="${row}"][data-col="${col}"]`);
        cell.dataset.id = playerBoard.board[row][col];
        if (boardDiv.id === 'player-board-placeholder') {
          cell.classList.add('cell-ship');        
        }
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
  
  // if (hit & not ), if (hit & sunk), else (miss)
  if (opponentBoard.board[row][col] === 'hit') {
    boardCell.classList.add('cell-hit');
    let shipSunk = false;
    let ship = null;

    if (boardCell && boardCell.dataset.id) {
      const shipId = Number(boardCell.dataset.id);
      ship = opponentBoard.ships.find(ship => ship.id === shipId);
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

let canClick = true;

export const setComputerBoardOpacity = (canClick) => {
  const computerBoardUI = document.querySelector('#computer-board-placeholder');
  const instructionDiv = document.querySelector('.instruction');

  if (canClick) {
    computerBoardUI.style.opacity = '1';
    instructionDiv.textContent = `Player's turn`;
  } else {
    computerBoardUI.style.opacity = '0.25';
    instructionDiv.textContent = `Computer's turn`;
  }
};



export const setCanClick = (value) => {
  canClick = value;
};

const createCellClickHandler = (currentPlayer, opponentBoard) => {
  const handler = function (event) {
    // Ignore clicks if canClick is false
    if(!canClick) return;
  
    const cell = event.target;
    handleCellClick(cell.dataset.row, cell.dataset.col, currentPlayer, opponentBoard);
    
    // Remove the event listener from the clicked cell
    cell.removeEventListener('click', handler);     
  };
  return handler;
};

export const addEventListenersToCells = (currentPlayer, opponentBoard) => {
  const computerBoardDiv = document.querySelector('#computer-board-placeholder');
  const cells = computerBoardDiv.querySelectorAll('.board-cell');
  
  cells.forEach(cell => {
    const cellClickHandler = createCellClickHandler(currentPlayer, opponentBoard);
    cell.addEventListener('click', cellClickHandler);
  });
};

const handleCellClick = (row, col, currentPlayer, opponentBoard) => {
  currentPlayer.attack(opponentBoard, [row, col]);
  updateBoardUI(row, col, currentPlayer, opponentBoard);

  if (opponentBoard.board[row][col] === 'miss' || opponentBoard.allShipsSunk()) {
    setCanClick(false);
    setComputerBoardOpacity(canClick);
    onPlayersTurn();    
  } 
};

const recreateBoard = () => {
  const playerBoardDiv = document.querySelector('#player-board-placeholder');
  
  while (playerBoardDiv.firstChild) {
    playerBoardDiv.removeChild(playerBoardDiv.firstChild);
  }

  playerBoardDiv.appendChild(createBoardElements());
};

const handleRandomBtnClick = (playerBoardDiv, playerBoard) => {
  return () => {
    playerBoard.resetBoard();
    recreateBoard();
    placeShipsOnBoard(playerBoard);
    renderShipsOnBoard(playerBoardDiv, playerBoard);  
  };
};

const addEventListenerToRandomBtn = (playerBoardDiv, playerBoard) => {
  const randomBtn = document.querySelector('#random-btn');
  randomBtn.addEventListener('click', handleRandomBtnClick(playerBoardDiv, playerBoard));
};

const addEventListenerToStartBtn = () => {
  const startBtn = document.querySelector('#start-btn');
  startBtn.addEventListener('click', handleStartBtnClick);
};

const handleStartBtnClick = () => {
  const computerBoardUI = document.querySelector('#computer-board-placeholder');
  const randomBtn = document.querySelector('#random-btn');
  const startBtn = document.querySelector('#start-btn');

  computerBoardUI.style.opacity = '1';
  randomBtn.style.display = 'none';
  startBtn.style.display = 'none';
};
// domController.js
import { isOutOfBounds } from "./utils.js";
import { 
  onPlayersTurn, 
  placeShipsOnBoard, 
  resetGame 
} from "./gameController.js";

export const renderBoards = (playerBoard, computerBoard, player) => {
  const playerBoardDiv = document.querySelector('#player-board-placeholder');
  const computerBoardDiv = 
  document.querySelector('#computer-board-placeholder');
  const instructionDiv = document.querySelector('.instruction');

  playerBoardDiv.appendChild(createBoardElements());  
  computerBoardDiv.appendChild(createBoardElements());    
  instructionDiv.textContent = `Click Start Game to play`;
  
  renderShipsOnBoard(playerBoardDiv, playerBoard);
  renderShipsOnBoard(computerBoardDiv, computerBoard);
  addEventListenersToCells(player, computerBoard);
  addEventListenerToRandomBtn(playerBoardDiv, playerBoard);
  addEventListenerToStartBtn();
  addEventListenerToCloseBtn();
  addEventListenerToResetBtn();
};

const createBoardElements = () => {
  const table = document.createElement('table');
  table.classList.add('board-table');
  
  for (let row = 0; row < 10; row++) {
    const tr = document.createElement('tr');
    tr.classList.add('board-row');
    for (let col = 0; col < 10; col++) {
      const td = document.createElement('td');
      td.classList.add('board-cell', 'clickable');
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
        const cell = boardDiv.querySelector(
                      `table tr td[data-row="${row}"][data-col="${col}"]`
                      );
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
    
  // Set the board div based on if human or computer made the move
  if (currentPlayer.isHuman === true) {
    boardDivId = '#computer-board-placeholder';
  } else {
    boardDivId = '#player-board-placeholder';
  }
  
  const boardCell = 
    document.querySelector(
      `${boardDivId} table tr td[data-row="${row}"][data-col="${col}"]`
    );
  
  // If attack results in a hit
  if (opponentBoard.board[row][col] === 'hit') {
    boardCell.classList.add('cell-hit');
    boardCell.classList.remove('clickable');
    boardCell.textContent = '🔥';
    let shipSunk = false;
    let ship = null;

    if (boardCell && boardCell.dataset.id) {
      const shipId = Number(boardCell.dataset.id);
      ship = opponentBoard.ships.find(ship => ship.id === shipId);
      shipSunk = ship.isSunk();
    }  

    if (shipSunk) {
      const { orientation, coordinate, length } = ship;

      for ( let i = 0; i < length; i++) {
        // Calculate the coordinate based on orientation
        const currentRow = 
          orientation === 'vertical' ? coordinate.row + i : coordinate.row;
        const currentCol = 
          orientation === 'horizontal' ? coordinate.col + i : coordinate.col;

        // Check the boundary cells surrounding each segment of
        // the ship and mark them so they are removed from play
        for (let dRow = -1; dRow <= 1; dRow++) {
          for (let dCol = -1; dCol <= 1; dCol++) {
            const checkRow = currentRow + dRow;
            const checkCol = currentCol + dCol;

            if (!isOutOfBounds(checkRow, checkCol) 
                && opponentBoard.board[checkRow][checkCol] !== 'miss' 
                && opponentBoard.board[checkRow][checkCol] !== 'hit') 
            {
              const cellDiv = 
                document.querySelector(
                  `${boardDivId} table tr td[data-row="${checkRow}"][data-col="${checkCol}"]`
                );
              opponentBoard.board[checkRow][checkCol] = 'miss';
              cellDiv.classList.add('cell-miss-auto');
              cellDiv.classList.remove('clickable');
              cellDiv.textContent = '•';
            }
          }  
        }
      }
      // Check the diagonal boundary cells surrounding the segment
      // that was hit and mark them so they are removed from play
    } else if (!shipSunk) {
      for (let dRow = -1; dRow <= 1; dRow++) {
        for (let dCol = -1; dCol <= 1; dCol++) {
          
          // Skip non-diagonal cells
          if (Math.abs(dRow) !== Math.abs(dCol)) continue;
  
          const checkRow = row + dRow;
          const checkCol = col + dCol;
          
          if (!isOutOfBounds(checkRow, checkCol) 
              && opponentBoard.board[checkRow][checkCol] !== 'miss' 
              && opponentBoard.board[checkRow][checkCol] !== 'hit') 
          {
            const diagonalCellDiv = 
              document.querySelector(
                `${boardDivId} table tr td[data-row="${checkRow}"][data-col="${checkCol}"]`
              );
            opponentBoard.board[checkRow][checkCol] = 'miss';
            diagonalCellDiv.classList.add('cell-miss-auto');
            diagonalCellDiv.classList.remove('clickable');
            diagonalCellDiv.textContent = '•';
          }
        }
      }      
    }  
    // If attack results in a miss
  } else if (opponentBoard.board[row][col] === 'miss') {
    boardCell.classList.add('cell-miss');
    boardCell.classList.remove('clickable');
    boardCell.textContent = '•';
  } 
}; 

// If true, it's the player's turn and cells are clickable, 
// if false, it's the computer's turn and cells are not clickable.
let canClick = true;

export const setComputerBoardOpacity = (canClick) => {
  const computerBoardUI = document.querySelector('#computer-board-placeholder');
  const instructionDiv = document.querySelector('.instruction');

  if (canClick) {
    computerBoardUI.style.opacity = '1';
    instructionDiv.textContent = `It's your turn to attack…`;
  } else {
    computerBoardUI.style.opacity = '0.25';
    instructionDiv.textContent = `Enemy is attacking…`;
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
    handleCellClick(
      cell.dataset.row, 
      cell.dataset.col, 
      currentPlayer, 
      opponentBoard
    );

    // Remove the event listener when a cell is clicked
    cell.removeEventListener('click', handler);     
  };
  
  return handler;
};

export const addEventListenersToCells = (currentPlayer, opponentBoard) => {
  const computerBoardDiv = 
    document.querySelector('#computer-board-placeholder');
  const cells = computerBoardDiv.querySelectorAll('.board-cell');
  
  cells.forEach(cell => {
    const cellClickHandler = 
      createCellClickHandler(currentPlayer, opponentBoard);
    cell.addEventListener('click', cellClickHandler);
  });
};

const handleCellClick = (row, col, currentPlayer, opponentBoard) => {
  currentPlayer.attack(opponentBoard, [row, col]);
  updateBoardUI(row, col, currentPlayer, opponentBoard);

  if (opponentBoard.board[row][col] === 'miss' 
      || opponentBoard.allShipsSunk()) 
  {
    setCanClick(false);
    setComputerBoardOpacity(canClick);
    onPlayersTurn();    
  } 
};

const recreateBoard = () => {
  const playerBoardDiv = document.querySelector('#player-board-placeholder');
  
  // Loop to clear the current board's elements before recreating a new one
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
  randomBtn.addEventListener(
    'click', handleRandomBtnClick(playerBoardDiv, playerBoard
  ));
};

const addEventListenerToStartBtn = () => {
  const startBtn = document.querySelector('#start-btn');
  startBtn.addEventListener('click', handleStartBtnClick);
};

const handleStartBtnClick = () => {
  const computerBoardUI = document.querySelector('#computer-board-placeholder');
  const randomBtn = document.querySelector('#random-btn');
  const startBtn = document.querySelector('#start-btn');
  const resetBtn = document.querySelector('#reset-btn');
  const instructionDiv = document.querySelector('.instruction');
  
  computerBoardUI.style.opacity = '1';
  randomBtn.style.display = 'none';
  startBtn.style.display = 'none';
  resetBtn.style.display = 'block';
  instructionDiv.textContent = `It's your turn to attack…`;
};

const dialog = document.querySelector('#dialog');

export const showWinnerDialog = (name) => {
  const winnerNameDiv = document.querySelector('.winner-name');
  winnerNameDiv.textContent = `${name} wins!`;
  clearInstructions();
  dialog.showModal();
};

const clearInstructions = () => {
  const instructionDiv = document.querySelector('.instruction');
  instructionDiv.textContent = ``;
};

const handleResetBtnClick = () => {
  resetGame();
};

const addEventListenerToResetBtn = () => {
  const resetBtn = document.querySelector('#reset-btn');
  resetBtn.addEventListener('click', handleResetBtnClick);
};

const addEventListenerToCloseBtn = () => {
  const closeBtn = document.querySelector('#close-btn');
  closeBtn.addEventListener('click', handleCloseBtnClick);
};

const handleCloseBtnClick = () => {
  dialog.close();
  resetGame();
};
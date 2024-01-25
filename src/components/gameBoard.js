// gameBoard.js
import { createShip } from "./ship.js";
import { isValidPlacement, isOutOfBounds } from "./utils.js";

export const createGameBoard = () => {
  // Helper function to initialize the board
  const initializeBoard = () => {
    const newBoard = [];
    for (let row = 0; row < 10; row++) {
      newBoard[row] = [];
      for (let col = 0; col < 10; col++) {
        newBoard[row][col] = null;
      }
    }    
    return newBoard;
  };
  
  let board = initializeBoard();
  const ships = [];
 
  // Helper function to set a one cell boundary around placed ships
  const setShipBoundary = (row, col) => {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (!isOutOfBounds(row + i, col + j) && board[row + i][col + j] === null) {
          board[row + i][col + j] = 'boundary';
        }
      }
    }
  };

  // const missedShots = [];

  // Place the ship on the board with starting coordinate
  const placeShip = (length, [row, col], orientation) => {
    // Check for boundaries and collisions
    if (!isValidPlacement(board, row, col, length, orientation)) {
      throw new Error('Invalid ship placement');
    }

    const newShip = createShip(length, { row, col }, orientation);

    // Place the ship and set boundaries
    for (let i = 0; i < length; i++) {
      // Calculate the coordinate based on orientation
      const currentRow = orientation === 'vertical' ? row + i : row;
      const currentCol = orientation === 'horizontal' ? col + i : col;

      // Place the ship
      board[currentRow][currentCol] = newShip.id;
      setShipBoundary(currentRow, currentCol);   
    }

    ships.push(newShip);
    return newShip;
  };

  // **DELETE THIS IF NOT NEEDED** Get the ship's position on the board
  const getShipPosition = (ship) => {
    const shipInfo = shipPositions[ship.id];
    if (shipInfo) {
      return [shipInfo.row, shipInfo.col];
    }
    return null;
  };

  const receiveAttack = ([row, col]) => {
    const cell = board[row][col];
    const ship = ships.find(ship => ship.id === cell)

    if (cell !== null && cell !== 'boundary') {
      board[row][col] = 'hit'; 
      ship.hit();
      return true;
    } else {
      board[row][col] = 'miss';
      // missedShots.push([row, col]);
      return false;
    }
  };

  const allShipsSunk = () => {
    return ships.every(ship => ship.isSunk());
  }; 

  const resetBoard = () => {
    // Clear the existing board array
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        board[row][col] = null;
      }
    }
    ships.length = 0;
  }
  
  
  return { 
    board, 
    ships,
    // missedShots, 
    placeShip, 
    getShipPosition, 
    receiveAttack, 
    allShipsSunk,
    resetBoard 
  };
};

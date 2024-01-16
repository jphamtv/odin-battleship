// gameBoard.js
import { createShip } from "./ship.js";

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
  
  const board = initializeBoard();

  // Helper function to check for out of bounds
  const isOutOfBounds = (row, col) => {
    return row < 0 || row >= 10 || col < 0 || col >= 10; 
  };

  // Helper function to check for collision
  const isCollision = (row, col) => {
    return board[row][col] !== null;
  };
  
  // Helper function to check for boundary violation
  const isValidPlacement = (row, col, length, orientation) => {
    for (let i = 0; i < length; i++) {
      const currentRow = orientation === 'vertical' ? row + i : row;
      const currentCol = orientation === 'horizontal' ? col + i : col;

      if (isOutOfBounds(currentRow, currentCol) || isCollision(currentRow, currentCol)) {
        return false;
      }

      // Check the ship cells and all surrounding cells
      for (let dRow = -1; dRow <= 1; dRow++) {
        for (let dCol = -1; dCol <= 1; dCol++) {
          // Skip diagonal cells and the ship cell itself
          if(Math.abs(dRow) === Math.abs(dCol)) continue;

          const checkRow = currentRow + dRow;
          const checkCol = currentCol + dCol;

          if (!isOutOfBounds(checkRow, checkCol) && board[checkRow][checkCol] !== null && board[checkRow][checkCol] !== 'boundary') {
            return false;
          }
        }
      }
    }
    return true;
  };

  
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

  const ships = [];
  const shipPositions = {}; // **DELETE THIS IF NOT NECESSARY**
  const missedShots = [];
  let allShipsAreSunk = false; // **DELETE THIS - NOT NEEDED**

  // Place the ship on the board with starting coordinate
  const placeShip = (length, [row, col], orientation) => {

    // First, check if out of bounds, collision, or boundary violations
    for (let i = 0; i < length; i++) {
      // Calculate the coordinate based on orientation
      const currentRow = orientation === 'vertical' ? row + i : row;
      const currentCol = orientation === 'horizontal' ? col + i : col;
      
      // Check for boundaries and collisions
      // *** NEED TO FIX THIS TO IGNORE IF BOUNDARY IS OUT OF BOUNDS.***
      // if (!isValidPlacement(currentRow, currentCol, length, orientation)) {
      if (!isValidPlacement(row, col, length, orientation)) {
        throw new Error('Invalid ship placement');
      }
    }

    const newShip = createShip(length, { row, col }, orientation);

    // Then place the ship and set boundaries
    for (let i = 0; i < length; i++) {
      // Calculate the coordinate based on orientation
      const currentRow = orientation === 'vertical' ? row + i : row;
      const currentCol = orientation === 'horizontal' ? col + i : col;

      // Place the ship
      board[currentRow][currentCol] = newShip.id;
      setShipBoundary(currentRow, currentCol);   
    }

    ships.push(newShip);
    // shipPositions[newShip.id] = { row, col, orientation };
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
      missedShots.push([row, col]);
      return false;
    }
  };

  const allShipsSunk = () => {
    return ships.every(ship => ship.isSunk());
  }; 
  
  
  return { 
    board, 
    ships,
    shipPositions,
    missedShots, 
    placeShip, 
    getShipPosition, 
    receiveAttack, 
    allShipsSunk 
  };
};

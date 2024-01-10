// gameBoard.js
import { createShip } from "./ship.js";

export const createGameBoard = () => {
  // Initialize the game board
  const boardSize = 10;
  const board = initializeBoard(boardSize);
  const ships = [];
  const shipPositions = {}; // **DELETE THIS IF NOT NECESSARY**
  const missedShots = [];
  let allShipsAreSunk = false; // **DELETE THIS - NOT NEEDED**

  // Helper function to initialize the board
  function initializeBoard(size) {
    const newBoard = [];
    for (let x = 0; x < size; x++) {
      newBoard[x] = [];
      for (let y = 0; y < size; y++) {
        newBoard[x][y] = null;
      }
    }    
    return newBoard;
  }

  // Helper function to check for out of bounds
  function isOutOfBounds(x, y) {
    return x < 0 || x >= boardSize || y < 0 || y >= boardSize; 
  }

  // Helper function to check for collision
  function isCollision(x, y) {
    return board[x][y] !== null;
  }
  
  // Helper function to check for boundary violation
  function isBoundaryViolation(x, y) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (!isOutOfBounds(x + i, y + j) 
            && board[x + i][y + j] === 'boundary') {
          return true;
        }
      }
    }
    return false;
  }

  // Place the ship on the board with starting coordinate
  const placeShip = (length, [x, y], orientation) => {
    const newShip = createShip(length);

    // First, check if out of bounds, collision, or boundary violations
    for (let i = 0; i < length; i++) {
      // Calculate the coordinate based on orientation
      const coordX = orientation === 'horizontal' ? x + i : x;
      const coordY = orientation === 'vertical' ? y + i : y;

      // Check for boundaries and collisions
      if (isOutOfBounds(coordX, coordY) 
          || isCollision(coordX, coordY) 
          || isBoundaryViolation(coordX, coordY)) {
        throw new Error('Invalid ship placement');
      }
    }

    // Then place the ship and set boundaries
    for (let i = 0; i < length; i++) {
      // Calculate the coordinate based on orientation
      const coordX = orientation === 'horizontal' ? x + i : x;
      const coordY = orientation === 'vertical' ? y + i : y;

      // Place the ship
      board[coordX][coordY] = newShip.id;
      setShipBoundary(coordX, coordY);   
    }

    ships.push(newShip);
    shipPositions[newShip.id] = { x, y, orientation };
    return newShip;
  };

  // Helper function to set a one cell boundary around placed ships
  function setShipBoundary(x, y) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (!isOutOfBounds(x + i, y + j) && board[x + i][y + j] === null) {
          board[x + i][y + j] = 'boundary';
        }
      }
    }
  }

  // **DELETE THIS IF NOT NEEDED** Get the ship's position on the board
  const getShipPosition = (ship) => {
    const shipInfo = shipPositions[ship.id];
    if (shipInfo) {
      return [shipInfo.x, shipInfo.y];
    }
    return null;
  };

  const receiveAttack = ([x, y]) => {
    const cell = board[x][y];
    const ship = ships.find(ship => ship.id === cell)

    if (cell !== null && cell !== 'boundary') {
      board[x][y] = 'hit'; 
      ship.hit();
      return true;
    } else {
      board[x][y] = 'miss';
      missedShots.push([x, y]);
      return false;
    }
  };

  const allShipsSunk = () => {
    return ships.every(ship => ship.isSunk());
  }; 
  
  
  return { 
    board, 
    missedShots, 
    placeShip, 
    getShipPosition, 
    receiveAttack, 
    allShipsSunk 
  };
};

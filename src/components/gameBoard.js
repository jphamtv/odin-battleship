// gameBoard.js
import { createShip } from "./ship";

export const createGameBoard = () => {
  // Initialize the game board
  const boardSize = 10;
  const board = initializeBoard(boardSize);
  const shipPositions = {};

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
  
  // Place the ship on the board with starting coordinate
  const placeShip = (ship, [x, y], orientation) => {
    for (let i = 0; i < ship.length; i++) {
      // Calculate the coordinate based on orientation
      const coordX = orientation === 'horizontal' ? x + i : x;
      const coordY = orientation === 'vertical' ? y + i : y;

      // Check for boundaries and collisions
      if (isOutOfBounds(coordX, coordY) || isCollision(coordX, coordY)) {
        throw new Error('Invalid ship placement');
      }

      // Place the ship
      board[coordX][coordY] = ship.id;   
    }

    shipPositions[ship.id] = { x, y, orientation };
  };

  // Get the ship's position on the board
  const getShipPosition = (ship) => {
    const shipInfo = shipPositions[ship.id];
    if (shipInfo) {
      return [shipInfo.x, shipInfo.y];
    }
    return null;
  };
  
  return { board, placeShip, getShipPosition };
};



  let missedShots = [];
  let allSunk = false;

  const receiveAttack = ([x, y]) => {
    if (board[x][y] === 's') {
      board[x][y] = 'hit';      
    } else {
      missedShots.push(x, y);
    }
  };

  const allShipsSunk = () => {
    
  };
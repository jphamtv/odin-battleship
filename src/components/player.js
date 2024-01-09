// player.js

import { createGameBoard } from "./gameBoard.js";

export const createPlayer = () => {

  // Attack functionality
  const attack = (opponentGameBoard, [x, y]) => {
    return opponentGameBoard.receiveAttack([x, y]);
  };

  // Turn management
  
  return { attack }
};


// Computer random attack function
export function generateRandomAttack() {
  const legalMoves = [];

  // Generate legalMoves array objects

  // Generate random number to select coordinate

  // Check to make sure coordinate has not been used

  return [x, y];
}


// gameLoop.js
import { createPlayer, generateCoordinates, generateRandomAttack } from "./player.js";
import { createGameBoard } from "./gameBoard.js";
import { createShip } from "./ship.js";

// Set up new game with two players (one as computer AI) and the game boards

const playerOne = createPlayer('Player One');
const playerTwo = createPlayer('Player Two');
const playerOneGameBoard = createGameBoard();
const playerTwoGameBoard = createGameBoard();

let currentAttacker = playerOne;


export function switchPlayersTurn(currentAttacker) {
  return currentAttacker === playerOne ? playerTwo : playerOne;
}
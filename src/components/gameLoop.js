// gameLoop.js
import { createPlayer, generateCoordinates, generateRandomAttack } from "./player.js";
import { createGameBoard } from "./gameBoard.js";

// Initialize new game
export const initializeGame = () => {
  const playerOne = createPlayer('Player One');
  const playerTwo = createPlayer('Player Two');
  const playerOneGameBoard = createGameBoard();
  const playerTwoGameBoard = createGameBoard();

  // Place ships on board
  placeShipsOnBoard(playerOneGameBoard);
  placeShipsOnBoard(playerTwoGameBoard);

  return { playerOne, playerTwo, playerOneGameBoard, playerTwoGameBoard };
};

// Place ships on player's boards **WILL AUTOMATE THIS LATER and DRAG N DROP LATER**
const placeShipsOnBoard = (playerOneGameBoard, playerTwoGameBoard) => {
  const carrier = 5;
  const battleship = 4;
  const destroyer = 3;
  const submarine = 3;
  const patrolBoat = 2;

  playerOneGameBoard.placeShip(carrier, [1, 5], 'horizontal');
  playerOneGameBoard.placeShip(battleship, [0, 2], 'vertical');
  playerOneGameBoard.placeShip(destroyer, [4, 5], 'horizontal');
  playerOneGameBoard.placeShip(submarine, [7, 4], 'horizontal');
  playerOneGameBoard.placeShip(patrolBoat, [9, 0], 'horizontal');

  playerTwoGameBoard.placeShip(carrier, [6, 4], 'horizontal');
  playerTwoGameBoard.placeShip(battleship, [4, 6], 'horizontal');
  playerTwoGameBoard.placeShip(destroyer, [2, 0], 'vertical');
  playerTwoGameBoard.placeShip(submarine, [0, 8], 'vertical');
  playerTwoGameBoard.placeShip(patrolBoat, [9, 7], 'horizontal');
};

export const startGame = () => {
  const { playerOne, playerTwo, playerOneGameBoard, playerTwoGameBoard } = initializeGame();
  let currentAttacker = playerOne;

  currentAttacker = switchPlayersTurn(currentAttacker, playerOne, playerTwo);
};

export const switchPlayersTurn = (currentAttacker, playerOne, playerTwo) => {
  return currentAttacker === playerOne ? playerTwo : playerOne;
};

const checkForWinner = (playerOneGameBoard, playerTwoGameBoard) => {
  if (playerOneGameBoard.allShipsSunk === true) {
    return alert('Player Two wins!')
  }

  if (playerTwoGameBoard.allShipsSunk === true) {
    return alert('Player One wins!')
  }
};

const announceWinner = (winner) => {};

const resetGame = () => {};




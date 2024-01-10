// gameLoop.js
import { createPlayer, generateCoordinates, generateRandomAttack } from "./player.js";
import { createGameBoard } from "./gameBoard.js";

export function startGame() {
  initializeGame();
  renderBoards();

  while (!gameOver) {
    let currentAttacker = playerOne;
  }

}

// Set up new game with two players (one as computer AI) and the game boards
const playerOne = createPlayer('Player One');
const playerTwo = createPlayer('Player Two');
const playerOneGameBoard = createGameBoard();
const playerTwoGameBoard = createGameBoard();

// Place ships on player's boards **WILL AUTOMATE THIS LATER and DRAG N DROP LATER**
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
console.log(playerTwoGameBoard)
playerTwoGameBoard.placeShip(submarine, [0, 8], 'vertical');
playerTwoGameBoard.placeShip(patrolBoat, [9, 7], 'horizontal');

let currentAttacker = playerOne;

export function switchPlayersTurn(currentAttacker) {
  return currentAttacker === playerOne ? playerTwo : playerOne;
}

function checkForWinner() {
  if (playerOneGameBoard.allShipsSunk === true) {
    return alert('Player Two wins!')
  }

  if (playerTwoGameBoard.allShipsSunk === true) {
    return alert('Player One wins!')
  }
}

function announceWinner() {};
// gameLoop.js
import { createPlayer } from "./player.js";
import { createGameBoard } from "./gameBoard.js";
import { renderBattleFields } from "./domController.js";

// Initialize new game
export const initializeGame = () => {
  const player = createPlayer('Player', true);
  const computer = createPlayer('Computer', false);
  const playerBattleField = createGameBoard();
  const computerBattleField = createGameBoard();
  
  // Place ships on board **LATER ON PLACE SHIP SEPARATELY FOR EACH PLAYER**
  placeShipsOnBattleField(playerBattleField, computerBattleField);
  renderBattleFields(playerBattleField, computerBattleField, player, computer);

  return { player, computer, playerBattleField, computerBattleField };
};

// Place ships on player's boards **WILL AUTOMATE THIS LATER and DRAG N DROP LATER**
const placeShipsOnBattleField = (playerBattleField, computerBattleField) => {
  playerBattleField.placeShip(5, [1, 5], 'horizontal');
  playerBattleField.placeShip(4, [0, 2], 'vertical');
  playerBattleField.placeShip(3, [4, 5], 'horizontal');
  playerBattleField.placeShip(3, [7, 4], 'horizontal');
  playerBattleField.placeShip(2, [9, 0], 'horizontal');

  computerBattleField.placeShip(5, [6, 4], 'horizontal');
  computerBattleField.placeShip(4, [4, 6], 'horizontal');
  computerBattleField.placeShip(3, [2, 0], 'vertical');
  computerBattleField.placeShip(3, [0, 8], 'vertical');
  computerBattleField.placeShip(2, [9, 7], 'horizontal');
};

export const startGame = () => {
  const { player, computer, playerBattleField, computerBattleField } = initializeGame();
  let gameOver = false;
  let currentPlayer = player;
   
  currentPlayer = switchPlayer(currentPlayer, player, computer);    


};

export const switchPlayer = (currentPlayer, player, computer) => {
  return currentPlayer === player ? computer : player;
};

export const checkForWinner = (currentPlayer, opponentBattleField) => {
  if (opponentBattleField.allShipsSunk() === true) return announceWinner(currentPlayer);
};

const announceWinner = (winner) => {
  return alert(`${winner.name} wins!`);
};

const resetGame = () => {};




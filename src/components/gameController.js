// gameController.js
import { createPlayer } from "./player.js";
import { createGameBoard } from "./gameBoard.js";
import { renderBoards, updateBoardUI } from "./domController.js";

// Initialize a new game
export const initializeGame = () => {
  const player = createPlayer('Player', true);
  const computer = createPlayer('Computer', false);
  const playerBoard = createGameBoard();
  const computerBoard = createGameBoard();

  return { player, computer, playerBoard, computerBoard };
};

// Place ships on player's boards **WILL AUTOMATE THIS LATER and DRAG N DROP LATER**
const placeShipsOnBoard = (playerBoard, computerBoard) => {
  playerBoard.placeShip(5, [1, 5], 'horizontal');
  playerBoard.placeShip(4, [0, 2], 'vertical');
  playerBoard.placeShip(3, [4, 5], 'horizontal');
  playerBoard.placeShip(3, [7, 4], 'horizontal');
  playerBoard.placeShip(2, [9, 0], 'horizontal');

  computerBoard.placeShip(5, [6, 4], 'horizontal');
  computerBoard.placeShip(4, [4, 6], 'horizontal');
  computerBoard.placeShip(3, [2, 0], 'vertical');
  computerBoard.placeShip(3, [0, 8], 'vertical');
  computerBoard.placeShip(2, [9, 7], 'horizontal');
};

const { player, computer, playerBoard, computerBoard } = initializeGame();
placeShipsOnBoard(playerBoard, computerBoard);
renderBoards(playerBoard, computerBoard, player, computer);

export const onPlayersTurn = () => {

  checkForWinner(player, computerBoard);
  checkForWinner(computer, playerBoard)

  setTimeout(() => {
    computer.attack(playerBoard);
    // console.log(playerBoard.ships)
    let move = computer.attack(playerBoard).move;
    updateBoardUI(move[0], move[1], computer, playerBoard);
  }, 1000);

};

export const switchPlayer = (currentPlayer, player, computer) => {
  return currentPlayer === player ? computer : player;
};

const checkForWinner = (currentPlayer, opponentBoard) => {
  if (opponentBoard.allShipsSunk() === true) return announceWinner(currentPlayer);
};

const announceWinner = (winner) => {
  return alert(`${winner.name} wins!`);
};

const resetGame = () => {};

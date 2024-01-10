// gameLoop.test.js
import { createPlayer } from "../src/components/player.js";
import { createGameBoard } from "../src/components/gameBoard.js";
import { switchPlayersTurn } from "../src/components/gameLoop.js";

test('switches players turn after a turn', () => {
  const playerOne = createPlayer();
  const playerTwo = createPlayer();
  const playerOneGameBoard = createGameBoard();
  const playerTwoGameBoard = createGameBoard();
  let currentAttacker = playerOne;

  playerOne.attack(playerTwoGameBoard, [1, 1]);
  currentAttacker = switchPlayersTurn(currentAttacker);

  expect(currentAttacker.name).toBe(playerTwo.name);
});

test('remains current players turn after successful hit', () => {
  const playerOne = createPlayer();
  const playerTwo = createPlayer();
  const playerOneGameBoard = createGameBoard();
  const playerTwoGameBoard = createGameBoard();
  let currentAttacker = playerOne;

  playerOne.attack(playerTwoGameBoard, [1, 1]);
  currentAttacker = switchPlayersTurn(currentAttacker);

  playerTwo.attack(playerOneGameBoard, [2, 2]);
  currentAttacker = switchPlayersTurn(currentAttacker);

  expect(currentAttacker.name).toBe(playerOne.name);
});
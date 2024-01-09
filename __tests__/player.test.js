// player.test.js

import { createPlayer, generateRandomAttack } from "../src/components/player.js";
import { createGameBoard } from "../src/components/gameBoard.js";

test('correctly attacks and affects game board at specific coordinates', () => {
  const player = createPlayer();
  const gameBoard = createGameBoard();
  player.attack(gameBoard, [3, 4]);
  expect(gameBoard.board[3][4]).toBe('miss');
});

test('switches players turn after a miss', () => {
  const playerOne = createPlayer();
  const playerTwo = createPlayer();
  const playerOneGameBoard = createGameBoard();
  const playerTwoGameBoard = createGameBoard();
  playerOneGameBoard.placeShip(3, [3, 4], 'horizontal');
  playerTwoGameBoard.placeShip(3, [3, 6], 'horizontal');
  playerOne.attack(playerTwoGameBoard, [1, 1]);
  expect(currentAttacker).toBe(playerTwo);
});

test('remains current players turn after successful hit', () => {
  const playerOne = createPlayer();
  const playerTwo = createPlayer();
  const playerOneGameBoard = createGameBoard();
  const playerTwoGameBoard = createGameBoard();
  playerOneGameBoard.placeShip(3, [3, 4], 'horizontal');
  playerTwoGameBoard.placeShip(3, [3, 6], 'horizontal');
  playerOne.attack(playerTwoGameBoard, [3, 6]);
  expect(currentAttacker).toBe(playerOne);
});

test('computer AI makes a random legal move', () => {
  const player = createPlayer();
  const computerAI = createPlayer();
  const playerGameBoard = createGameBoard();
  const computerAIGameBoard = createGameBoard();
  playerGameBoard.placeShip(3, [3, 4], 'horizontal');
  computerAIGameBoard.placeShip(3, [3, 6], 'horizontal');
  const randomCoordinates = generateRandomAttack();
  computerAI.attack(playerGameBoard, randomCoordinates);
  expect(playerGameBoard.board[randomCoordinates[0]][randomCoordinates[1]]).toBe('miss');
});

test('computer AI does not repeat coordinates in its attacks', () => {
  const computerAI = createPlayer();
  const playerGameBoard = createGameBoard();
  playerGameBoard.placeShip(3, [3, 4], 'horizontal');

  const attackedCoordinates = new Set();
  const numberOfAttacks = 50;

  for (let i = 0; i < numberOfAttacks; i++) {
    const randomCoordinates = generateRandomAttack();
    computerAI.attack(playerGameBoard, randomCoordinates);

    const coordString = `${randomCoordinates[0]}, ${randomCoordinates[1]}`;
    expect(attackedCoordinates.has(coordString)).toBe(false);
    attackedCoordinates.add(coordString);
  }
});
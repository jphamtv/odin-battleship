// player.test.js

import { createPlayer, generateCoordinates, generateRandomAttack } from "../src/components/player.js";
import { createGameBoard } from "../src/components/gameBoard.js";

test('correctly attacks and affects game board at specific coordinates', () => {
  const player = createPlayer();
  const gameBoard = createGameBoard();
  player.attack(gameBoard, [3, 4]);
  expect(gameBoard.board[3][4]).toBe('miss');
});

test('computer AI makes a random legal move', () => {
  const player = createPlayer();
  const computerAI = createPlayer();
  const playerGameBoard = createGameBoard();
  const computerAIGameBoard = createGameBoard();
  playerGameBoard.placeShip(3, [3, 4], 'horizontal');
  computerAIGameBoard.placeShip(3, [3, 6], 'horizontal');
  const generateCoords = generateCoordinates();
  const randomCoordinates = generateRandomAttack(generateCoords);
  computerAI.attack(playerGameBoard, randomCoordinates);
  expect(playerGameBoard.board[randomCoordinates[0]][randomCoordinates[1]]).toBe('miss' || 'hit');
});

test('computer AI does not repeat coordinates in its attacks', () => {
  const computerAI = createPlayer();
  const playerGameBoard = createGameBoard();
  playerGameBoard.placeShip(3, [3, 4], 'horizontal');

  const legalMoves = generateCoordinates();
  const attackedCoordinates = new Set();
  const numberOfAttacks = 100;
  
  for (let i = 0; i < numberOfAttacks; i++) {
    const randomCoordinates = generateRandomAttack(legalMoves);
    computerAI.attack(playerGameBoard, randomCoordinates);
    
    const coordString = `${randomCoordinates[0]}, ${randomCoordinates[1]}`;
    expect(attackedCoordinates.has(coordString)).toBe(false);
    attackedCoordinates.add(coordString);
  }

  expect(legalMoves.size).toBe(100 - numberOfAttacks);
});
// player.test.js

import { createPlayer, createComputerPlayer } from "../src/components/player.js";
import { createGameBoard } from "../src/components/gameBoard.js";

test('correctly attacks and affects game board at specific coordinates', () => {
  const player = createPlayer('player', true);
  const battleField = createGameBoard();
  player.attack(battleField, [3, 4]);
  expect(battleField.board[3][4]).toBe('miss');
});

test('computer AI makes a random valid move', () => {
  const computerAI = createComputerPlayer('computerAI', false);
  const playerBoard = createGameBoard();
  playerBoard.placeShip(3, [3, 4], 'horizontal');

  // Count hit or miss before attack
  const countBeforeAttack = countHitsAndMisses(playerBoard.board);

  // Perform the attack
  computerAI.attack(playerBoard);

  // Count hit or miss after attack
  const countAfterAttack = countHitsAndMisses(playerBoard.board);

  // Expect the count to have increased
  expect(countAfterAttack).toBeGreaterThan(countBeforeAttack);
});

test('computer AI does not repeat coordinates in its attacks', () => {
  const computerAI = createComputerPlayer('computerAI', false);
  const playerBoard = createGameBoard();
  playerBoard.placeShip(3, [3, 4], 'horizontal');

  const initialPossibleMovesCount = computerAI.possibleMoves.size;
  const numberOfAttacks = 50;
  
  for (let i = 0; i < numberOfAttacks; i++) {
    computerAI.attack(playerBoard);
  }

  expect(computerAI.possibleMoves.size).toBe(initialPossibleMovesCount - numberOfAttacks);
});

function countHitsAndMisses(board) {
  return board.flat().filter(cell => cell === 'hit' || cell === 'miss').length;
}
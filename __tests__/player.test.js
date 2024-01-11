// player.test.js

import { createPlayer } from "../src/components/player.js";
import { createGameBoard } from "../src/components/gameBoard.js";

test('correctly attacks and affects game board at specific coordinates', () => {
  const player = createPlayer('player', true);
  const battleField = createGameBoard();
  player.attack(battleField, [3, 4]);
  expect(battleField.board[3][4]).toBe('miss');
});

test('computer AI makes a random legal move', () => {
  const computerAI = createPlayer('computerAI', false);
  const playerBattleField = createGameBoard();
  playerBattleField.placeShip(3, [3, 4], 'horizontal');

  // Count hit or miss before attack
  const countBeforeAttack = countHitsAndMisses(playerBattleField.board);

  // Perform the attack
  computerAI.attack(playerBattleField);

  // Count hit or miss after attack
  const countAfterAttack = countHitsAndMisses(playerBattleField.board);

  // Expect the count to have increased
  expect(countAfterAttack).toBeGreaterThan(countBeforeAttack);
});

test('computer AI does not repeat coordinates in its attacks', () => {
  const computerAI = createPlayer('computerAI', false);
  const playerBattleField = createGameBoard();
  playerBattleField.placeShip(3, [3, 4], 'horizontal');

  const initialLegalMovesCount = computerAI.possibleMoves.size;
  const numberOfAttacks = 69;
  
  for (let i = 0; i < numberOfAttacks; i++) {
    computerAI.attack(playerBattleField);
  }

  expect(computerAI.possibleMoves.size).toBe(initialLegalMovesCount - numberOfAttacks);
});

function countHitsAndMisses(board) {
  return board.flat().filter(cell => cell === 'hit' || cell === 'miss').length;
}
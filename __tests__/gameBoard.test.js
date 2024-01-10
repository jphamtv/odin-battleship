// gameBoard.test.js
import { createGameBoard } from "../src/components/gameBoard.js";

// Test that ships are placed correctly on the board
test('correctly places ship at specific coordinate', () => {
  const gameBoard = createGameBoard();
  const testShip = gameBoard.placeShip(3, [3, 4], 'horizontal');
  expect(gameBoard.getShipPosition(testShip)).toEqual([3, 4]);
});

// Test behavior of receiveAttack on a coordinate without a ship
test('receiveAttack returns false when ship is not hit', () => {
  const gameBoard = createGameBoard();  
  gameBoard.placeShip(3, [3, 4], 'horizontal');
  expect(gameBoard.receiveAttack([8, 9])).toBe(false);
});

// Test behavior of receiveAttack on a coordinate with a ship
test('receiveAttack returns true when ship is hit', () => {
  const gameBoard = createGameBoard();
  gameBoard.placeShip(3, [3, 4], 'horizontal');
  expect(gameBoard.receiveAttack([3, 4])).toBe(true);
});

// Tests if missed attack's coordinates are recorded correctly
test('records a missed attack', () => {
  const gameBoard = createGameBoard();
  gameBoard.placeShip(3, [3, 4], 'horizontal');
  gameBoard.receiveAttack([8, 9]);
  expect(gameBoard.missedShots).toContainEqual([8, 9]);
});

// Test if the game board can report all missed shots
test('game board correctly keeps track of missed shots', () => {
  const gameBoard = createGameBoard();
  gameBoard.placeShip(3, [3, 4], 'horizontal');
  gameBoard.receiveAttack([8, 9]);
  expect(gameBoard.board[8][9]).toBe('miss');
});

// Test if the game board correctly reports when all ships are sunk
test('returns true if all ships are sunk', () => {
  const gameBoard = createGameBoard();
  gameBoard.placeShip(3, [3, 4], 'vertical');  
  gameBoard.receiveAttack([3, 4]);
  gameBoard.receiveAttack([4, 4]);
  gameBoard.receiveAttack([5, 4]);
  expect(gameBoard.allShipsSunk()).toBe(true);
});

// Test if the game board correctly reports when not all ships are sunk
test('returns false if not all ships are sunk', () => {
  const gameBoard = createGameBoard();
  gameBoard.placeShip(3, [3, 4], 'horizontal');
  gameBoard.placeShip(1, [5, 9], 'horizontal');
  gameBoard.receiveAttack([3, 4]);
  gameBoard.receiveAttack([3, 5]);
  expect(gameBoard.allShipsSunk()).toBe(false);
}); 

  
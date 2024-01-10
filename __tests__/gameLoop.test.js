// gameLoop.test.js

// test('switches players turn after a miss', () => {
//   const playerOne = createPlayer();
//   const playerTwo = createPlayer();
//   const playerOneGameBoard = createGameBoard();
//   const playerTwoGameBoard = createGameBoard();
//   playerOneGameBoard.placeShip(3, [3, 4], 'horizontal');
//   playerTwoGameBoard.placeShip(3, [3, 6], 'horizontal');
//   playerOne.attack(playerTwoGameBoard, [1, 1]);
//   expect(currentAttacker).toBe(playerTwo);
// });

// test('remains current players turn after successful hit', () => {
//   const playerOne = createPlayer();
//   const playerTwo = createPlayer();
//   const playerOneGameBoard = createGameBoard();
//   const playerTwoGameBoard = createGameBoard();
//   playerOneGameBoard.placeShip(3, [3, 4], 'horizontal');
//   playerTwoGameBoard.placeShip(3, [3, 6], 'horizontal');
//   playerOne.attack(playerTwoGameBoard, [3, 6]);
//   expect(currentAttacker).toBe(playerOne);
// });
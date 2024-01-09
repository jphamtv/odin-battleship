// player.js

export const createPlayer = () => {

  // Attack functionality
  const attack = (opponentGameBoard, [x, y]) => {
    return opponentGameBoard.receiveAttack([x, y]);
  };
  
  return { attack }
};

// Computer random attack function
export function generateRandomAttack(legalMoves) {
  const numOfCoords = legalMoves.size;

  // Generate random index value based on size of the set
  const randomIndex = Math.floor(Math.random() * numOfCoords);

  // Convert set to an array
  const legalMovesArray = Array.from(legalMoves)
  const randomAttackCoordinate = legalMovesArray[randomIndex];

  legalMoves.delete(randomAttackCoordinate);

  return randomAttackCoordinate;
}

export function generateCoordinates() {
  const coordinates = new Set();

  // Generate all possible coordinates
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      coordinates.add([x, y]);
    }
  }  

  return coordinates;
}


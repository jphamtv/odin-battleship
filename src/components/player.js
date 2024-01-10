// player.js

export const createPlayer = (name) => {

  // Attack functionality
  const attack = (opponentGameBoard, [x, y]) => {
    return opponentGameBoard.receiveAttack([x, y]);
  };
  
  return { attack };
};

// Function to generate random attacks for the computer AI
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

// Helper function to generate all the possible legal moves
export function generateCoordinates() {
  const legalMoves = new Set();

  // Generate all possible coordinates
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      legalMoves.add([x, y]);
    }
  }  

  return legalMoves;
}


// player.js

export const createPlayer = (name) => {

  // Attack functionality
  const attack = (opponentGameBoard, [row, col]) => {
    return opponentGameBoard.receiveAttack([row, col]);
  };
  
  return { attack };
};

// Function to generate random attacks for the computer AI
export const generateRandomAttack = (legalMoves) => {
  const numOfCoords = legalMoves.size;

  // Generate random index value based on size of the set
  const randomIndex = Math.floor(Math.random() * numOfCoords);

  // Convert set to an array
  const legalMovesArray = Array.from(legalMoves)
  const randomAttackCoordinate = legalMovesArray[randomIndex];

  legalMoves.delete(randomAttackCoordinate);

  return randomAttackCoordinate;
};

// Helper function to generate all the possible legal moves
export const generateCoordinates = () => {
  const legalMoves = new Set();

  // Generate all possible coordinates
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      legalMoves.add([row, col]);
    }
  }  

  return legalMoves;
};


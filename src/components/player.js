// player.js

export const createPlayer = (name, isHuman) => {
  // Store coordinates to keep track of possible AI moves
  const possibleMoves = isHuman ? null : generateSetOfCoords();

  const attack = (opponentGameBoard, chosenMove = null) => {
    let move = chosenMove;

    if (!isHuman) {
      move = generateRandomCoord(possibleMoves);
      possibleMoves.delete(move);
    }

    return opponentGameBoard.receiveAttack(move);
  };

  return { name, isHuman, possibleMoves, attack };
};

// Function to generate random attacks for the computer AI
export const generateRandomCoord = (possibleMoves) => {
  // Convert the set to an array to pick by index
  const array = Array.from(possibleMoves)

  const index = Math.floor(Math.random() * array.length);
  const move = array[index];

  return move;
};

// Helper function to generate all the possible coords on the board
export const generateSetOfCoords = () => {
  const coordinates = new Set();

  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      coordinates.add([row, col]);
    }
  }  

  return coordinates;
};

// utils.js


export const generateRandomShipPosition = (board) => {
  const availablePositions = new Set();

  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      if (board.board[row][col] === null) {
        availablePositions.add([row, col]);
      }
    }
  }  

  let position = generateRandomCoord(availablePositions);
  let orientation = generateRandomOrientation();
  return { position, orientation };
};

const generateRandomOrientation = () => {
  const num = Math.floor(Math.random() * 2);
  if (num === 0) return 'horizontal';
  if (num === 1) return 'vertical';
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


// Helper function to check for out of bounds
export const isOutOfBounds = (row, col) => {
  return row < 0 || row >= 10 || col < 0 || col >= 10; 
};


// Helper function to check for collision
export const isCollision = (board, row, col) => {
  return board[row][col] !== null;
};


// Helper function to check for boundary violation for placing ships
export const isValidPlacement = (board, row, col, length, orientation) => {
  // Calculate the end coordinates of the ship based on its orientation
  const endRow = orientation === 'vertical' ? row + length - 1 : row;
  const endCol = orientation === 'horizontal' ? col + length - 1 : col;
  
  if (isOutOfBounds(endRow, endCol)) {
    return false;
  }
  
  // Check each segment of the ship and its immediate surroundings
  for (let i = 0; i < length; i++ ) {
    const segmentRow = orientation === 'vertical' ? row + i : row;
    const segmentCol = orientation === 'horizontal' ? col + i : col;
    
    // Check the segment and its boundaries
    for (let dRow = -1; dRow <= 1; dRow++) {
      for (let dCol = -1; dCol <= 1; dCol++) {
        const checkRow = segmentRow + dRow;
        const checkCol = segmentCol + dCol;
        
        // Skip checking if out of bounds
        if (isOutOfBounds(checkRow, checkCol)) continue;

        // Check for collision at the cell
        if ((dRow === 0 && dCol === 0) && isCollision(board, checkRow, checkCol)) {
          return false;
        }    
      }
    }
  }

  return true;
};
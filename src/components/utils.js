// Function to generate random ship placements at the start
// of the game and when using Randomize Ships button
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

// Function to generate random coordinate for the computer's move
export const generateRandomCoord = (possibleMoves) => {
  // Convert the Set to an Array to choose by index
  const array = Array.from(possibleMoves)
  const index = Math.floor(Math.random() * array.length);
  const move = array[index];

  return move;
};

// Function to generate all the possible coordinates on the board
export const generateSetOfCoords = () => {
  const coordinates = new Set();

  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      coordinates.add([row, col]);
    }
  }  

  return coordinates;
};

// Function to check if coordinate is out of bounds
export const isOutOfBounds = (row, col) => {
  return row < 0 || row >= 10 || col < 0 || col >= 10; 
};

// Function to check for collision at the cell
export const isCollision = (board, row, col) => {
  return board[row][col] !== null;
};

// Function to check for boundary violation before placing ships
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
    
    // Check the ship's segment and its boundaries
    for (let dRow = -1; dRow <= 1; dRow++) {
      for (let dCol = -1; dCol <= 1; dCol++) {
        const checkRow = segmentRow + dRow;
        const checkCol = segmentCol + dCol;
        
        // Skip checking if coordinate is out of bounds
        if (isOutOfBounds(checkRow, checkCol)) continue;

        // Check for collision at the cell
        if ((dRow === 0 && dCol === 0) && 
              isCollision(board, checkRow, checkCol)) {
          return false;
        }    
      }
    }
  }

  return true;
};

// Function to choose the computer's next move after a hit
export const getNextAdjacentTarget = 
  (
  lastHit, 
  possibleMoves, 
  opponentGameBoard
  ) => {
  const nextPossibleMoves = 
    [
      [lastHit[0] - 1, lastHit[1]],
      [lastHit[0] + 1, lastHit[1]],
      [lastHit[0], lastHit[1] - 1],
      [lastHit[0], lastHit[1] + 1],
    ];

  // Convert the Set to an Array for iterating
  const possibleMovesArray = Array.from(possibleMoves)

  // Include moves that are possible
  const validMoves = nextPossibleMoves.filter(move =>
    !isOutOfBounds(move[0], move[1]) && 
    possibleMovesArray.some(possibleMove => 
      possibleMove[0] === move[0] && possibleMove[1] === move[1]
    )
  );

  // Keep track until a valid move is found
  while (validMoves.length > 0) {
    // Choose a random move from validMoves
    const index = Math.floor(Math.random() * validMoves.length);
    const move = validMoves[index];
  
    // Check if chosen move is valid and cell has not already 
    // been targeted, and is within the boundary of the board
    if (opponentGameBoard.board[move[0]][move[1]] !== 'hit' && 
        opponentGameBoard.board[move[0]][move[1]] !== 'miss') {
      return move;
    } else {
      validMoves.splice(index, 1);
    }
  }

  // Fallback if no valid move is found (should be rare)
  return generateRandomCoord(possibleMoves);
};

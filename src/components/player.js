// player.js
import { 
  generateRandomCoord, 
  generateSetOfCoords, 
  isOutOfBounds 
} from "./utils.js";

// Factory for creating human player
export const createPlayer = (name, isHuman) => {
  const attack = (opponentGameBoard, chosenMove = null) => {
    let move = chosenMove;        
    const attackResult = opponentGameBoard.receiveAttack(move);
    return { attackResult, move };
  };

  return { name, isHuman, attack };
};

// Factory for creating computer player
export const createComputerPlayer = (name, isHuman) => {

  // Store coordinates to keep track of possible computer moves
  let possibleMoves = generateSetOfCoords();
  let lastHit = null;

  const updatePossibleMoves = (opponentGameBoard) => {
    possibleMoves = new Set();

    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        if (opponentGameBoard.board[row][col] !== 'hit' && 
            opponentGameBoard.board[row][col] !== 'miss') {
          possibleMoves.add([row, col]);
        }
      }
    }
  }

  const updateAttackState = (attackResult, move) => {
    if (attackResult === true) {
      lastHit = move;
    } else {
      lastHit = null;
    }  
  }; 

  const attack = (opponentGameBoard, chosenMove = null) => {
    updatePossibleMoves(opponentGameBoard);

    let move = chosenMove;
   
    if (lastHit) {
      move = getNextAdjacentTarget(lastHit, possibleMoves, opponentGameBoard);
    } else {
      move = generateRandomCoord(possibleMoves);
    }
    
    possibleMoves.delete(move);      
    const attackResult = opponentGameBoard.receiveAttack(move);
    updateAttackState(attackResult, move);
    return { attackResult, move };
  };

  return { name, isHuman, attack };
};


// Helper function to choose the next computer move after a hit
const getNextAdjacentTarget = (lastHit, possibleMoves, opponentGameBoard) => {
  const nextPossibleMoves = [
    [lastHit[0] - 1, lastHit[1]],
    [lastHit[0] + 1, lastHit[1]],
    [lastHit[0], lastHit[1] - 1],
    [lastHit[0], lastHit[1] + 1],
  ];

  // Convert the Set to an Array for looping
  const possibleMovesArray = Array.from(possibleMoves)

  // Filter out moves that are not in possibleMoves
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

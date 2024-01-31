import { 
  generateRandomCoord, 
  generateSetOfCoords, 
  getNextAdjacentTarget 
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

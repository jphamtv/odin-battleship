// player.js
import { generateRandomCoord, generateSetOfCoords, isOutOfBounds } from "./utils.js";

export const createPlayer = (name, isHuman) => {
  // Store coordinates to keep track of possible AI moves
  const possibleMoves = isHuman ? null : generateSetOfCoords();
  let lastHit = null;
  let initialHit = null
  let hitSequence = false;
  let targetingShip = false;
  let hitDirection = null;

  const updateAttackState = (attackResult, move) => {

    if (attackResult === 'hit') {

      // If last move was a miss
      if (!lastHit) {

        // Replace lastHit with current move
        lastHit = move;

        // Set targetingShip to true
        targetingShip = true;

        // If previous was also a hit and we are not in a hitSequence, 
        // we are now so set the direction for the next attack, and 
        // record the initialHit which is the lastHit
      } else if (lastHit && !hitSequence) {
        initialHit = lastHit;
        hitSequence = true;
        hitDirection = determineDirection(lastHit, move);
      }
    
    } else if (attackResult === 'miss') {
        // If we are targeting a ship
        if (targetingShip) {
          
          // If we are in a hit sequence
          if (hitSequence) {
              
            // We aren't anymore because we missed
            hitSequence = false;

            // So we want to reverse direction using the initial hit
            lastHit = reverseDirection(lastHit, hitDirection);
          
          // If we are not in a hit sequence yet, we want to try another cell around lastHit
          } else {
            // try another non-diagonal cell
            // Reset lastHit to the initial hit point and try another cell
            // ...
          }
        } else {
          lastHit = null;
          targetingShip = false;
          hitDirection = null;
        }

    }  
  }; 

  const attack = (opponentGameBoard, chosenMove = null) => {
    let move = chosenMove;    
    
    if (!isHuman) {
      if (lastHit && targetingShip) {
        move = hitDirection ? getNextTargetInLine() : getNextAdjacentTarget();
      } else {
        move = generateRandomCoord(possibleMoves);
      }
      
      possibleMoves.delete(move);      
    }
    
    const attackResult = opponentGameBoard.receiveAttack(move);
    updateAttackState(attackResult, move);
    return { attackResult, move };
  };

  return { name, isHuman, attack };
};

// Helper functions

const determineDirection = (lastHit, move) => {
  if (lastHit[0] === move[0]) {
    return 'horizontal';
  } else if (lastHit[1] === move[1]) {
    return 'vertical';
  }
};

const reverseDirection = () => {
  if (hitDirection === 'horizontal') {
    return [initialHit[0], initialHit[1] + (lastHit[1] < initialHit[1] ? 1 : -1)];
  } else if (hitDirection === 'vertical') {
    return [initialHit[0] + (lastHit[0] < initialHit[0] ? 1 : -1), initialHit[1]];
  }
};

const getNextAdjacentTarget = (lastHit, possibleMoves) => {
  const nextPossibleMoves = [
    [lastHit[0] - 1, lastHit[1]],
    [lastHit[0] + 1, lastHit[1]],
    [lastHit[0], lastHit[1] - 1],
    [lastHit[0], lastHit[1] + 1],
  ];

  // Filter out moves not in possibleMoves
  const validMoves = nextPossibleMoves.filter(move =>
    !isOutOfBounds(move[0], move[1]) && 
    possibleMoves.some(possibleMove => 
      possibleMove[0] === move[0] && possibleMove[1] === move[1]
    )
  );

  // Keep track until a valid move is found
  while (validMoves.length > 0) {
    const index = Math.floor(Math.random() * validMoves.length);
    const move = validMoves[index];
  
    // Check chosen move is valid and not already hit or miss and is within the boundary of board
    if (opponentGameBoard.board[move[0]][move[1]] === null) {
      return move;
    } else {
      validMoves.splice(index, 1);
    }
  }

  // Fallback if no valid move is found (should be rare)
  return generateRandomCoord(possibleMoves);
};

const getNextTargetInLine = () => {
  if (hitDirection === 'horizontal') {
    return [lastHit[0], lastHit[1] + 1];
  } else if (hitDirection === 'vertical') {
    return [lastHit[0] + 1, lastHit[1]];
  }
};
// player.js
import { generateRandomCoord, generateSetOfCoords } from "./utils.js";

export const createPlayer = (name, isHuman) => {
  // Store coordinates to keep track of possible AI moves
  const possibleMoves = isHuman ? null : generateSetOfCoords();

  const attack = (opponentGameBoard, chosenMove = null) => {
    let move = chosenMove;

    if (!isHuman) {
      move = generateRandomCoord(possibleMoves);
      possibleMoves.delete(move);
    }

    const attackResult = opponentGameBoard.receiveAttack(move);
    return { attackResult, move };
  };

  return { name, isHuman, possibleMoves, attack };
};

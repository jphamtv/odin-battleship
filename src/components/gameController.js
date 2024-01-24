// gameController.js
import { createPlayer } from "./player.js";
import { createGameBoard } from "./gameBoard.js";
import { renderBoards, updateBoardUI, setCanClick } from "./domController.js";
import { generateRandomShipPosition, isValidPlacement } from "./utils.js";

// Initialize a new game
export const initializeGame = () => {
  const player = createPlayer('Player', true);
  const computer = createPlayer('Computer', false);
  const playerBoard = createGameBoard();
  const computerBoard = createGameBoard();
  placeShipsOnBoard(playerBoard);
  placeShipsOnBoard(computerBoard);
  

  return { player, computer, playerBoard, computerBoard };
};

// Place ships on the board
const placeShipsOnBoard = (board) => {
  const SHIPS = {
    carrier: {length: 5, isPlaced: false},
    battleship: {length: 4, isPlaced: false},
    destroyer: {length: 3, isPlaced: false},
    submarine: {length: 3, isPlaced: false},
    patrolBoat: {length: 2, isPlaced: false},
  }

  const allShipsPlaced = () => Object.values(SHIPS).every(ship => ship.isPlaced === true);

  while (!allShipsPlaced()) {
    const shipsToPlace = Object.entries(SHIPS).filter(([name, ship]) => !ship.isPlaced);

    for (const [name, ship] of shipsToPlace) {
      const shipPosition = generateRandomShipPosition(board);
      if (isValidPlacement(board.board, shipPosition.position[0], shipPosition.position[1], ship.length, shipPosition.orientation)) {
        board.placeShip(ship.length, shipPosition.position, shipPosition.orientation);
        ship.isPlaced = true;    
      }
    }  
  }
};

const { player, computer, playerBoard, computerBoard } = initializeGame();
renderBoards(playerBoard, computerBoard, player, computer);

export const onPlayersTurn = () => {

  setTimeout(() => {
    checkForWinner(player, computerBoard);
  }, 500);

  setTimeout(() => {
    computer.attack(playerBoard);
    let move = computer.attack(playerBoard).move;
    updateBoardUI(move[0], move[1], computer, playerBoard);

    setTimeout(() => {
      checkForWinner(computer, playerBoard)  
    }, 500);

    if (playerBoard.board[move[0]][move[1]] === 'hit') {
      onPlayersTurn();  
    } else {
      setCanClick(true);
    }

  }, 1000);

};

export const switchPlayer = (currentPlayer, player, computer) => {
  return currentPlayer === player ? computer : player;
};

const checkForWinner = (currentPlayer, opponentBoard) => {
  if (opponentBoard.allShipsSunk() === true) return announceWinner(currentPlayer);
};

const announceWinner = (winner) => {
  return alert(`${winner.name} wins!`);
};

const resetGame = () => {};

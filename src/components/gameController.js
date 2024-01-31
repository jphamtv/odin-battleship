import { createPlayer, createComputerPlayer } from "./player.js";
import { createGameBoard } from "./gameBoard.js";
import { generateRandomShipPosition, isValidPlacement } from "./utils.js";
import { 
  renderBoards, 
  updateBoardUI, 
  setCanClick, 
  setComputerBoardOpacity, 
  showWinnerDialog 
} from "./domController.js";

let player;
let computer;
let playerBoard;
let computerBoard;

export const startGame = () => {
  ({ player, computer, playerBoard, computerBoard } = initializeGame());
  renderBoards(playerBoard, computerBoard, player);
};

// Initialize a new game
export const initializeGame = () => {
  player = createPlayer('Player', true);
  computer = createComputerPlayer('Computer', false);
  playerBoard = createGameBoard();
  computerBoard = createGameBoard();
  placeShipsOnBoard(computerBoard);
  placeShipsOnBoard(playerBoard);

  return { player, computer, playerBoard, computerBoard };
};

export const placeShipsOnBoard = (board) => {
  const SHIPS = {
    carrier: { length: 5, isPlaced: false },
    battleship: { length: 4, isPlaced: false },
    destroyer: { length: 3, isPlaced: false },
    submarine: { length: 3, isPlaced: false },
    patrolBoat: { length: 2, isPlaced: false },
  }

  // Checks if all ships are placed on the board
  const allShipsPlaced = () => 
    Object.values(SHIPS).every(ship => 
      ship.isPlaced === true);

  while (!allShipsPlaced()) {
    const shipsToPlace = 
      Object.entries(SHIPS).filter(([name, ship]) => 
        !ship.isPlaced);

    for (const [name, ship] of shipsToPlace) {
      const shipPosition = generateRandomShipPosition(board);
      if (isValidPlacement(
            board.board, 
            shipPosition.position[0], 
            shipPosition.position[1], 
            ship.length, shipPosition.orientation)
          ) {
        board.placeShip(
          ship.length, 
          shipPosition.position, 
          shipPosition.orientation
        );
        ship.isPlaced = true;
      }
    }
  }
};

// Function executes every time human player makes a move
export const onPlayersTurn = () => {
  setTimeout(() => {
    checkForWinner(player, computerBoard);
  }, 500);

  setTimeout(() => {
    let move = computer.attack(playerBoard).move;
    updateBoardUI(move[0], move[1], computer, playerBoard);

    setTimeout(() => {
      checkForWinner(computer, playerBoard)
    }, 500);

    if (playerBoard.board[move[0]][move[1]] === 'hit') {
      onPlayersTurn();
    } else {
      // Allow human player to make the next move
      setCanClick(true);
      setComputerBoardOpacity(true);
    }
  }, 500);
};

const checkForWinner = (currentPlayer, opponentBoard) => {
  if (opponentBoard.allShipsSunk() === true) {
    return announceWinner(currentPlayer.name);
  }
};

const announceWinner = (name) => {
  return showWinnerDialog(name);
};

export const resetGame = () => { 
  return window.location.reload();
};

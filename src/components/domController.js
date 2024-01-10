// domController.js


export function initializeGameUI() {
  // Code to initialize game UI goes here
}

export function renderGameBoards() {
  const gameBoardContainer = document.querySelector('.game-boards-container');
  const boardDiv = document.createElement('div');
  boardDiv.classList.add('board');
  gameBoardContainer.appendChild(boardDiv);
  gameBoardContainer.appendChild(boardDiv);
}
// index.js
import { initializeGame, startGame } from "./components/gameLoop.js";
import { renderGameBoards } from "./components/domController.js";

document.addEventListener('DOMContentLoaded', () => {
  initializeGame();
});

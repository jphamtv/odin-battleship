// index.js
import { startGame } from "./components/gameLoop.js";
import { initializeGameUI, renderGameBoards } from "./components/domController.js";

document.addEventListener('DOMContentLoaded', () => {
  renderGameBoards();
});

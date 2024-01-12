// index.js
import { initializeGame, startGame } from "./components/gameLoop.js";
import { renderBattleFields } from "./components/domController.js";

document.addEventListener('DOMContentLoaded', () => {
  startGame();
});

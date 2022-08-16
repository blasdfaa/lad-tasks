import Playground from "./controller/Playground.js";
import { DEFAULT_GAME_DIFFICULTY, getEl } from "./utils.js";

let difficulty = DEFAULT_GAME_DIFFICULTY;
const game = new Playground();

const startButton = getEl("#start_btn");

getEl("#difficulty_select").addEventListener("change", (e) => {
  difficulty = e.target.value;
});

startButton.addEventListener("click", () => {
  game.gameLoop(difficulty);

  getEl("#hp").style.display = "grid";
  startButton.disabled = true;
});

export const resetGamePrint = (difficulty) => {
  difficulty = DEFAULT_GAME_DIFFICULTY;
  startButton.disabled = false;
  getEl("#player_moves").innerHTML = "";
  getEl("#monster_move").innerHTML = "";
  getEl("#hp").style.display = "none";
};

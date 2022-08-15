import Playground from "./controller/Playground.js";
import { createHTMLTemplate, getEl } from "./utils.js";

const DEFAULT_GAME_DIFFICULTY = "medium";

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

export const renderMonsterMove = (move) => {
  getEl("#monster_move").innerHTML = createHTMLTemplate(move, { isMonster: true });
};

export const renderHeroMoves = () => {
  const movesContainer = document.createElement("div");
  movesContainer.id = "player_moves";

  getEl("#hero_hp").textContent = game.hero.health;
  getEl("#monster_hp").textContent = game.monster.health;

  game.hero.moves.forEach((move, index) => {
    const moveTemplate = createHTMLTemplate(move);

    const moveButton = document.createElement("button");
    moveButton.type = "button";
    moveButton.dataset.moveId = index;

    if (move.isOnCooldown) {
      moveButton.disabled = true;
    }

    moveButton.innerHTML = moveTemplate;
    movesContainer.append(moveButton);
  });

  getEl("#player_moves").replaceWith(movesContainer);
};

export const resetGame = () => {
  difficulty = DEFAULT_GAME_DIFFICULTY;
  startButton.disabled = false;
  getEl("#player_moves").innerHTML = "";
  getEl("#monster_move").innerHTML = "";
  getEl("#hp").style.display = "none";
};

// Ждет ответа от пользователя, далее резолвит айди скилла
export const waitToUserMove = () => {
  return new Promise((resolve) => {
    const handler = (e) => {
      const moveId = e.target.dataset.moveId;

      if (moveId) {
        resolve(+moveId);

        getEl("#player_moves").removeEventListener("click", handler);
      }
    };

    getEl("#player_moves").addEventListener("click", handler);
  });
};

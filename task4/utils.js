export const DEFAULT_GAME_DIFFICULTY = "medium";

export const getEl = (selector) => {
  return document.querySelector(selector);
};

export const getRandomInt = (min, max) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

export const getHealthByDifficulty = (difficulty) => {
  const healths = {
    low: 30,
    medium: 20,
    hard: 10,
  };

  return healths[difficulty] ?? 20;
};

// У монстра `roundsToCooldown` не нужно показывать
export const createHTMLTemplate = (move, { isMonster = false } = {}) =>
  `
    <span>Имя: <b>${move.name}</b></span>
    <span>Физический урон: <b>${move.physicalDmg}</b></span>
    <span>Магический урон: <b>${move.magicDmg}</b></span>
    <span>Физическая защита: <b>${move.physicArmorPercents}%</b></span>
    <span>Магическая защита: <b>${move.magicArmorPercents}%</b></span>
    <span>Перезарядка: <b>${move.cooldown}</b> хода</span>
    ${!isMonster ? `<span>До конца перезарядки: <b>${move.roundsToCooldown}</b> хода</span>` : ""}
   `;

export const renderMonsterMove = (move) => {
  getEl("#monster_move").innerHTML = createHTMLTemplate(move, { isMonster: true });
};

export const renderHeroMoves = (hero, monster) => {
  const movesContainer = document.createElement("div");
  movesContainer.id = "player_moves";

  getEl("#hero_hp").textContent = hero.health;
  getEl("#monster_hp").textContent = monster.health;

  hero.moves.forEach((move, index) => {
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

/**
 * Ждет ответа от пользователя, далее резолвит айди скилла
 */
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

export const monsterMoves = [
  {
    "name": "Удар когтистой лапой",
    "physicalDmg": 3, // физический урон
    "magicDmg": 0, // магический урон
    "physicArmorPercents": 20, // физическая броня
    "magicArmorPercents": 20, // магическая броня
    "cooldown": 0, // ходов на восстановление
  },
  {
    "name": "Огненное дыхание",
    "physicalDmg": 0,
    "magicDmg": 4,
    "physicArmorPercents": 0,
    "magicArmorPercents": 0,
    "cooldown": 3,
  },
  {
    "name": "Удар хвостом",
    "physicalDmg": 2,
    "magicDmg": 0,
    "physicArmorPercents": 50,
    "magicArmorPercents": 0,
    "cooldown": 2,
  },
];

export const heroMoves = [
  {
    "name": "Удар боевым кадилом",
    "physicalDmg": 2,
    "magicDmg": 0,
    "physicArmorPercents": 0,
    "magicArmorPercents": 50,
    "cooldown": 0,
  },
  {
    "name": "Вертушка левой пяткой",
    "physicalDmg": 4,
    "magicDmg": 0,
    "physicArmorPercents": 0,
    "magicArmorPercents": 0,
    "cooldown": 4,
  },
  {
    "name": "Каноничный фаербол",
    "physicalDmg": 0,
    "magicDmg": 5,
    "physicArmorPercents": 0,
    "magicArmorPercents": 0,
    "cooldown": 3,
  },
  {
    "name": "Магический блок",
    "physicalDmg": 0,
    "magicDmg": 0,
    "physicArmorPercents": 100,
    "magicArmorPercents": 100,
    "cooldown": 4,
  },
];

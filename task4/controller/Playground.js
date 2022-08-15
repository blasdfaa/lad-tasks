import { renderHeroMoves, renderMonsterMove, resetGame, waitToUserMove } from "../index.js";
import { getHealthByDifficulty, heroMoves, monsterMoves } from "../utils.js";
import Character from "./Character.js";

class Monster extends Character {
  constructor(name) {
    super(name, 10, monsterMoves);
  }

  makeMove() {
    return super.makeMove({ random: true });
  }
}

class Hero extends Character {
  constructor(name, difficulty = "medium") {
    super(name, getHealthByDifficulty(difficulty), heroMoves);
  }
}

export default class Playground {
  monster = null;
  hero = null;
  round = 0;

  dealDamage(heroMove, monsterMove) {
    const heroPhysicalDamage = heroMove?.physicalDmg ?? 0;
    const heroMagicalDamage = heroMove?.magicDmg ?? 0;

    const monsterPhysicalDamage = monsterMove?.physicalDmg ?? 0;
    const monsterMagicalDamage = monsterMove?.magicDmg ?? 0;

    const heroPhysicArmor = heroMove?.physicArmorPercents ?? 0;
    const heroMagicArmor = heroMove?.magicArmorPercents ?? 0;

    const monsterPhysicArmor = monsterMove?.physicArmorPercents ?? 0;
    const monsterMagicArmor = monsterMove?.magicArmorPercents ?? 0;

    // damage to hero
    this.hero.takeDamage((monsterPhysicalDamage * (100 - heroPhysicArmor)) / 100);
    this.hero.takeDamage((monsterMagicalDamage * (100 - heroMagicArmor)) / 100);

    // damage to monster
    this.monster.takeDamage((heroPhysicalDamage * (100 - monsterPhysicArmor)) / 100);
    this.monster.takeDamage((heroMagicalDamage * (100 - monsterMagicArmor)) / 100);
  }

  async gameLoop(difficulty) {
    this.monster = new Monster("Лютый");
    this.hero = new Hero("Евстафий", difficulty);

    while (true) {
      renderMonsterMove(this.hero);
      renderHeroMoves();

      if (this.hero.health < 1) {
        alert(`Победил ${this.monster.name}`);
        this.endGame();
        return;
      } else if (this.monster.health < 1) {
        alert(`Победил ${this.hero.name}`);
        this.endGame();
        return;
      }

      let heroMove;
      const monsterMove = this.monster.makeMove();
      monsterMove.activate();
      renderMonsterMove(monsterMove);

      // Если нет доступных ходов, юзер пропускает ход
      if (this.hero.availableMoves.length > 0) {
        const moveId = await waitToUserMove();
        heroMove = this.hero.makeMove({ id: moveId });
        heroMove.activate();
      }

      this.dealDamage(heroMove, monsterMove);

      this.monster.moves.forEach((move) => {
        move.decreaseCooldown();
      });
      this.hero.moves.forEach((move) => {
        move.decreaseCooldown();
      });
    }
  }

  endGame() {
    this.monster = null;
    this.hero = null;

    resetGame();
  }
}

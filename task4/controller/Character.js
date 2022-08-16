import { getRandomInt } from "../utils.js";
import Move from "./Move.js";

export default class Character {
  constructor(name, maxHealth, moves = []) {
    this.name = name;
    this._maxHealth = maxHealth;

    this._moves = moves.map((move) => new Move(move));
  }

  get moves() {
    return this._moves;
  }

  get health() {
    return this._maxHealth;
  }

  get availableMoves() {
    return this._moves.filter(({ isOnCooldown }) => !isOnCooldown);
  }

  makeMove({ id, random = false }) {
    if (random) {
      return this.availableMoves[getRandomInt(0, this.availableMoves.length - 1)];
    }

    // Так-как пользователь не сможет получить айди скилла который находится в кулдауне
    // получать скилл можно из общего списка доступных скиллов
    return this._moves[id];
  }

  takeDamage(damage) {
    this._maxHealth -= damage;
  }
}

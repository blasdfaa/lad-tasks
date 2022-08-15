export default class Move {
  roundsToCooldown = 0;

  constructor({ name, physicalDmg, magicDmg, physicArmorPercents, magicArmorPercents, cooldown }) {
    this.name = name;
    this.physicalDmg = physicalDmg;
    this.magicDmg = magicDmg;
    this.physicArmorPercents = physicArmorPercents;
    this.magicArmorPercents = magicArmorPercents;
    this.cooldown = cooldown;
  }

  activate() {
    this.roundsToCooldown = this.cooldown;
  }

  decreaseCooldown() {
    if (this.isOnCooldown) {
      this.roundsToCooldown--;
    }
  }

  get isOnCooldown() {
    return this.roundsToCooldown > 0;
  }
}

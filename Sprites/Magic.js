import { KEYS } from "../config.js";

export default class Magic extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);

    this.setOrigin(1);
    this.setScale(.05);
    this.play(KEYS.ANIMATION.MAGIC.SHOOT);
  }
}
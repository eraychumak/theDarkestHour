import { KEYS } from "../config.js";

export default class Player {
  #scene;

  constructor(scene, x, y) {
    this.#scene = scene;

    this.player = this.#scene.physics.add.sprite(x, y);
    this.player.setOrigin(1);
    this.player.setScale(4);
    this.player.setCollideWorldBounds(true);
    this.player.play(KEYS.ANIMATION.OLD_MAN.IDLE);

    return this.player;
  }

  static loadAnimations(scene) {
    scene.anims.create({
      key: KEYS.ANIMATION.OLD_MAN.STILL,
      frames: scene.anims.generateFrameNumbers(KEYS.CHARACTERS.OLD_MAN, { frames: [ 0 ] }),
      frameRate: 6,
      repeat: 0
    });

    scene.anims.create({
      key: KEYS.ANIMATION.OLD_MAN.ATTACK,
      frames: scene.anims.generateFrameNumbers(KEYS.CHARACTERS.OLD_MAN, { frames: [ 1, 2, 3, 4, 0 ] }),
      frameRate: 6,
      repeat: 0
    });

    scene.anims.create({
      key: KEYS.ANIMATION.OLD_MAN.DEATH,
      frames: scene.anims.generateFrameNumbers(KEYS.CHARACTERS.OLD_MAN, { frames: [ 5, 6, 7, 8 ] }),
      frameRate: 6,
      repeat: 0
    });

    scene.anims.create({
      key: KEYS.ANIMATION.OLD_MAN.HURT,
      frames: scene.anims.generateFrameNumbers(KEYS.CHARACTERS.OLD_MAN, { frames: [ 9, 10 ] }),
      frameRate: 6,
      repeat: 0
    });

    scene.anims.create({
      key: KEYS.ANIMATION.OLD_MAN.IDLE,
      frames: scene.anims.generateFrameNumbers(KEYS.CHARACTERS.OLD_MAN, { frames: [ 11, 12, 13, 14 ] }),
      frameRate: 4,
      repeat: -1
    });

    scene.anims.create({
      key: KEYS.ANIMATION.OLD_MAN.WALK,
      frames: scene.anims.generateFrameNumbers(KEYS.CHARACTERS.OLD_MAN, { frames: [ 15, 16, 17, 18, 19, 20 ] }),
      frameRate: 6,
      repeat: -1
    });
  }
}
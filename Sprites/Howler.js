import { IMAGES, KEYS } from "../config.js";

export default class Howler extends Phaser.Physics.Arcade.Sprite {
  #soundAttack;
  #soundHurt;

  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);

    this.anims.play(KEYS.ANIMATION.HOWLER.IDLE);

    this.hp = 10;
    this.dead = false;
    this.currentLevel = sessionStorage.getItem("level");

    if (this.currentLevel === 2) { this.hp = 15; }
    if (this.currentLevel === 3) { this.hp = 20; }
    if (this.currentLevel === 4) { this.hp = 25; }
    if (this.currentLevel === 5) { this.hp = 30; }

    this.#soundAttack = scene.sound.add(KEYS.SOUND.HOWLER.ATTACK);
    this.#soundHurt = scene.sound.add(KEYS.SOUND.HOWLER.HURT);
  }

  setTarget(target) {
    if (this.dead) return;

    this.target = target;
    this.goToPlayer();
  }

  attackPlayer() {
    this.anims.play(KEYS.ANIMATION.HOWLER.ATTACK);
    this.anims.playAfterRepeat(KEYS.ANIMATION.HOWLER.WALK);
    this.#soundAttack.play();
  }

  goToPlayer() {
    if (this.dead) return;

    this.scene.physics.moveToObject(this, this.target);
    this.anims.play(KEYS.ANIMATION.HOWLER.WALK);
  }

  hurt(damage) {
    this.hp -= damage;
    this.setVelocity(0);
    this.#soundHurt.play();

    if (this.hp <= 0) {
      this.dead = true;
      this.anims.play(KEYS.ANIMATION.HOWLER.DEATH);

      setTimeout(() => {
        this.destroy();
      }, 5_000);
    } else {
      this.anims.play(KEYS.ANIMATION.HOWLER.HURT);

      setTimeout(() => {
        this.goToPlayer();
      }, 1_000);
    }

  }

  static spawn(scene, groupEnemy, target) {
    const x = Phaser.Math.Between(0, scene.game.config.width);
    const y = Phaser.Math.Between(0, scene.game.config.height);

    const enemy = groupEnemy.get(x, y, KEYS.CHARACTERS.HOWLER);

    enemy.setCollideWorldBounds(true);
    enemy.setTarget(target);
    enemy.setSize(64, 64);
    enemy.setOffset(34, 64);

    enemy.body.onWorldBounds = true;
    enemy.body.world.on("worldbounds", () => {
      enemy.goToPlayer();
    }, enemy);
  }

  static loadAnimations(scene) {
    scene.anims.create({
      key: KEYS.ANIMATION.HOWLER.STILL,
      frames: scene.anims.generateFrameNumbers(KEYS.CHARACTERS.HOWLER, { frames: [ 0 ] }),
      frameRate: 6,
      repeat: 0
    });

    scene.anims.create({
      key: KEYS.ANIMATION.HOWLER.ATTACK,
      frames: scene.anims.generateFrameNumbers(KEYS.CHARACTERS.HOWLER, { frames: [ 0, 1, 2, 3  ] }),
      frameRate: 6,
      repeat: 0
    });

    scene.anims.create({
      key: KEYS.ANIMATION.HOWLER.DEATH,
      frames: scene.anims.generateFrameNumbers(KEYS.CHARACTERS.HOWLER, { frames: [ 4, 5 ] }),
      frameRate: 6,
      repeat: 0
    });

    scene.anims.create({
      key: KEYS.ANIMATION.HOWLER.HURT,
      frames: scene.anims.generateFrameNumbers(KEYS.CHARACTERS.HOWLER, { frames: [ 6, 7 ] }),
      frameRate: 6,
      repeat: 0
    });

    scene.anims.create({
      key: KEYS.ANIMATION.HOWLER.IDLE,
      frames: scene.anims.generateFrameNumbers(KEYS.CHARACTERS.HOWLER, { frames: [ 8, 9, 10, 11, 12, 13, 14, 15] }),
      frameRate: 4,
      repeat: -1
    });

    scene.anims.create({
      key: KEYS.ANIMATION.HOWLER.WALK,
      frames: scene.anims.generateFrameNumbers(KEYS.CHARACTERS.HOWLER, { frames: [ 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26 ] }),
      frameRate: 6,
      repeat: -1
    });
  }
}
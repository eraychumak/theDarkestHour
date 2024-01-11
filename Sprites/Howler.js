import { IMAGES, KEYS } from "../config.js";

export default class Howler extends Phaser.Physics.Arcade.Sprite {
  #soundAttack;
  #soundHurt;

  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);

    this.anims.play(KEYS.ANIMATION.HOWLER.IDLE);

    this.dead = false;
    this.currentLevel = parseInt(sessionStorage.getItem("gameLevel"));
    // hp increases by 5 with each game level
    this.maxHP = 10 + (this.currentLevel * 5);
    this.hp = this.maxHP;

    this.#soundAttack = scene.sound.add(KEYS.SOUND.HOWLER.ATTACK);
    this.#soundHurt = scene.sound.add(KEYS.SOUND.HOWLER.HURT);

    this.showHP();
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    this.hpBar.x = this.x - (this.width / 4);
    this.hpBar.y = this.y - (this.height / 4);
    this.innerHPBar.x = this.x - (this.width / 4);
    this.innerHPBar.y = this.y - (this.height / 4);
  }

  updateHPBar() {
    const currentWidth = 50 * (this.hp / this.maxHP);
    this.innerHPBar.width = currentWidth;
  }

  removeHPBar() {
    this.innerHPBar.destroy();
    this.hpBar.destroy();
  }

  showHP() {
    const currentWidth = 50 * (this.maxHP / this.hp);

    this.hpBar = this.scene.add.rectangle(
      this.x - (this.width / 2), this.y,
      50, 8,
      0xff0000
    );

    this.hpBar.setOrigin(0);
    this.hpBar.setAlpha(.3);

    this.innerHPBar = this.scene.add.rectangle(
      this.x - (this.width / 2), this.y,
      currentWidth, 8,
      0x00ff00
    );

    this.innerHPBar.setOrigin(0);
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
    this.updateHPBar();
    this.#soundHurt.play();

    if (this.hp <= 0) {
      this.dead = true;
      this.anims.play(KEYS.ANIMATION.HOWLER.DEATH);
      this.removeHPBar();

      const howlerDeaths = parseInt(this.scene.data.get("howlerDeaths") || 0);
      this.scene.data.set("howlerDeaths", howlerDeaths + 1);

      const expParticles = this.scene.add.particles(0, 0, KEYS.GAME.EXP, {
        scale: .5,
        lifespan: 3_000,
        maxParticles: 10,
        maxVelocityX: 500,
        maxVelocityY: 500,
      });

      const emitterLocation = new Phaser.Geom.Rectangle(this.x, this.y + (this.height / 2), 10, 10);
      expParticles.addEmitZone({
        type: "random",
        source: emitterLocation
      });

      expParticles.createGravityWell({
        x: (this.scene.game.config.width / 4),
        y: this.scene.game.config.height * .95,
        power: 1,
        epsilon: 80,
        gravity: 10_00
      });

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
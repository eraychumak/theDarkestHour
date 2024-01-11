import { ACHIEVEMENTS, KEYS, STYLES } from "../config.js";
import Magic from "./Magic.js";

export default class Player {
  #scene;
  #soundShoot;
  #soundWalking;

  constructor(scene, x, y) {
    this.#scene = scene;

    this.bullets = this.#scene.physics.add.group({
      classType: Magic,
      immovable: true
    });

    this.damage = 10;
    this.hp = 3;
    this.dead = false;
    this.exp = 0;
    this.playerLevel = 0;
    this.playerLevelExpMax = 200;
    this.projectiles = 1;
    this.cooldown = 5_000;

    this.difficulty = sessionStorage.getItem("difficulty");

    if (this.difficulty === "hard") {
      this.hp = 1;
    }

    this.player = this.#scene.physics.add.sprite(x, y);

    this.player.setOrigin(1);
    this.player.setScale(4);

    /*
      colliding bounding box intentionally made
      smaller to allow room for slight overlap
    */
    this.player.setSize(16, 28);
    this.player.setOffset(5, 18);

    this.player.setCollideWorldBounds(true);
    this.player.play(KEYS.ANIMATION.OLD_MAN.IDLE);

    this.#soundShoot = this.#scene.sound.add(KEYS.SOUND.MAGIC_SPARKLE);

    this.#soundWalking = this.#scene.sound.add(KEYS.SOUND.FOOTSTEP, {
      loop: true,
      volume: .5,
      rate: 1.2
    });
  }

  get sprite() {
    return this.player;
  }

  enableControls() {
    if (this.dead) return;

    this.joystick = this.#scene.add.circle(0, 0, 80, 0xffffff);
    this.joystick.setAlpha(.3);
    this.joystickHandle = this.#scene.add.circle(0, 0, 40, 0xffffff);
    this.joystickHandle.setAlpha(.5);

    this.joystickContainer = this.#scene.add.container(this.#scene.game.config.width * .8, this.#scene.game.config.height * .8, [ this.joystick, this.joystickHandle ]);
    this.joystickContainer.setAlpha(0.00000001);


    this.joystickHandle.setInteractive({
      draggable: true
    });

    this.target = new Phaser.Math.Vector2();

    let pointerDown = false;

    this.#scene.input.on("pointermove", (pointer) => {
      // prevent movement at the very top of the screen for menu controls
      if (pointer.y <= this.#scene.game.config.height * .1) return;

      if (pointerDown) return;

      this.joystickContainer.setPosition(pointer.x, pointer.y);

      this.target.x = pointer.x;
      this.target.y = pointer.y;
    });

    this.#scene.input.on("pointerup", (pointer) => {
      // prevent movement at the very top of the screen for menu controls
      if (pointer.y <= this.#scene.game.config.height * .1) return;

      pointerDown = false;
      this.joystickContainer.setAlpha(0.00000001);
      this.#soundWalking.pause();
    });

    this.#scene.input.on('pointerdown', (pointer) => {
      // prevent movement at the very top of the screen for menu controls
      if (pointer.y <= this.#scene.game.config.height * .1) return;

      this.joystickContainer.setPosition(pointer.x, pointer.y);

      this.target.x = pointer.x;
      this.target.y = pointer.y;

      pointerDown = true;

      this.joystickContainer.setAlpha(1);

      if (this.dead) return;
      this.player.play(KEYS.ANIMATION.OLD_MAN.WALK);
      this.#soundWalking.play();
    });

    this.player.setMaxVelocity(50);

    this.#scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      // ? updates joystick handle position within the container
      const angle = Phaser.Math.Angle.Between(this.joystick.x, this.joystick.y, dragX, dragY);
      let distance = Phaser.Math.Distance.Between(this.joystick.x, this.joystick.y, dragX, dragY);

      // constrain the handle inside the container with a bit of bleed over the edges
      if (distance > 70) {
        distance = 70;
        dragX = this.joystick.x + distance * Math.cos(angle);
        dragY = this.joystick.y + distance * Math.sin(angle);
      }

      this.joystickHandle.x = dragX;
      this.joystickHandle.y = dragY;

      if (this.dead) return;

      // walk left
      if (dragX < 0) {
        this.player.body.setVelocityX(-50);
      }

      // walk right
      if (dragX > 0) {
        this.player.body.setVelocityX(50);
      }

      // walk up
      if (dragY < 0) {
        this.player.body.setVelocityY(-50);
      }

      // walk down
      if (dragY > 0) {
        this.player.body.setVelocityY(50);
      }
    });

    this.#scene.input.on('dragend', (pointer, gameObject) => {
      // Reset joystick handle's position
      this.joystickHandle.x = 0;
      this.joystickHandle.y = 0;

      if (this.dead) return;

      this.player.play(KEYS.ANIMATION.OLD_MAN.IDLE);
      this.player.body.reset(this.player.x, this.player.y)
    });

    const firstName = sessionStorage.getItem("firstName");
    this.firstName = this.#scene.add.text(this.player.x + 20, this.player.y - (this.player.height * 2), firstName, {
      font: `12px 'Viga'`
    });
    this.firstName.setOrigin(.5);
  }

  getRandomEnemy() {
    const randomNum = Phaser.Math.Between(0, this.enemies.length);
    const randomEnemy = this.enemies[randomNum];

    if (!randomEnemy || randomEnemy === this.target) {
      return this.getRandomEnemy();
    }

    return randomEnemy;
  }

  shoot() {
    if (this.dead) return;

    const bullet = this.bullets.get(this.player.x, this.player.y);
    this.#soundShoot.play();

    // specifically nearest enemy
    this.#scene.physics.moveToObject(bullet, {
      x: this.enemyTarget.x + this.enemyTarget.width / 2,
      y: this.enemyTarget.y + this.enemyTarget.height / 2
    }, 200);

    // any additional projectiles can go on different enemies or sometimes the same one
    if (this.projectiles > 1) {
      for (let x = 1; x < this.projectiles; x++) {
        const extraBullet = this.bullets.get(this.player.x, this.player.y);
        this.#soundShoot.play();

        const randomEnemy = this.getRandomEnemy();

        this.#scene.physics.moveToObject(extraBullet, {
          x: randomEnemy.x + randomEnemy.width / 2,
          y: randomEnemy.y + randomEnemy.height / 2
        }, 200);
      }
    }
  }

  updateTargets(enemies) {
    this.enemies = enemies;
  }

  hurt() {
    if (this.dead) return;

    this.player.play(KEYS.ANIMATION.OLD_MAN.HURT);
    this.player.playAfterRepeat(KEYS.ANIMATION.OLD_MAN.WALK);
    this.#soundWalking.play();

    if (this.difficulty === "easy") {
      this.hp -= .5;
    } else {
      this.hp -= 1;
    }

    this.updateHearts();

    if (this.hp <= 0) {
      this.player.setVelocity(0);
      this.player.copyPosition(this.player);
      this.player.play(KEYS.ANIMATION.OLD_MAN.DEATH);
      this.dead = true;

      const elapsedTime = this.#scene.data.get("time");

      if (elapsedTime <= 60) {
        localStorage.setItem(ACHIEVEMENTS.FASHIONABLY_EARLY, true);
      }

      setTimeout(() => {
        this.#scene.scene.start(KEYS.SCENE.GAME_OVER, {
          time: elapsedTime
        });
      }, 2_000);
    }
  }

  updateHearts() {
    const hearts = this.hearts.getChildren();

    if (this.hp === 2) {
      hearts[2].setAlpha(.1);
    }

    if (this.hp === 1) {
      hearts[1].setAlpha(.1);
      hearts[2].setAlpha(.1);
    }

    if (this.hp === 0) {
      hearts[0].setAlpha(.1);
      hearts[1].setAlpha(.1);
      hearts[2].setAlpha(.1);
    }

    if (this.hp === 2.5) {
      hearts[2].setAlpha(.5);
    }

    if (this.hp === 1.5) {
      hearts[1].setAlpha(.5);
    }

    if (this.hp === .5) {
      hearts[0].setAlpha(.5);
    }
  }

  showHearts() {
    this.hearts = this.#scene.add.group();

    this.hearts.createMultiple({
      key: KEYS.GAME.UI.HEART,
      frameQuantity: this.hp,
      setXY: { x: 20, y: 20, stepX: 60 },
      setOrigin: { x: 0, y: 0 },
      setScale: { x: 2, y: 2 }
    });
  }

  incProjectiles() {
    this.projectiles += 1;
  }

  reduceCooldown() {
    this.cooldown -= 1_000;
    this.cooldownTimer.delay = this.cooldown;
  }

  levelUp() {
    this.#scene.scene.pause();

    this.#scene.scene.launch(KEYS.SCENE.LEVEL_UP, {
      player: this
    });
  }

  updateEXP() {
    const maxWidth = this.#scene.game.config.width / 2;
    let currentWidth = maxWidth * (this.exp / this.playerLevelExpMax);

    if (currentWidth > maxWidth) {
      this.playerLevel += 1;
      this.exp -= this.playerLevelExpMax;
      this.playerLevelExpMax += 200;

      currentWidth = maxWidth * (this.exp / this.playerLevelExpMax);
      this.expBarMax.setText(this.playerLevelExpMax.toLocaleString());
      this.levelUp();
    }

    this.innerEXPBar.width = currentWidth;
    this.playerLevelText.setText(`Level: ${this.playerLevel}`);
    this.expBarCurrent.setText(`${this.exp}`);
  }

  showEXP() {
    const maxWidth = this.#scene.game.config.width / 2;
    let currentWidth = 0;

    if (this.playerLevel === 0) {
      currentWidth = maxWidth * (this.exp / 200);
    }

    this.innerEXPBar = this.#scene.add.rectangle(
      this.#scene.game.config.width / 4, (this.#scene.game.config.height * .95) - 40,
      currentWidth, 80,
      0x00ff00
    );

    this.innerEXPBar.setAlpha(.3);
    this.innerEXPBar.setOrigin(0);

    const expBar = this.#scene.add.nineslice(
      this.#scene.game.config.width / 2, this.#scene.game.config.height * .95,
      KEYS.GAME.UI.EXP_BORDER, 0, this.#scene.game.config.width / 2,
      80, 8, 8, 8, 8
    );

    expBar.setOrigin(.5);
    expBar.setTint(0x00ff00);

    this.playerLevelText = this.#scene.add.text(expBar.x, expBar.y, `Level: ${this.playerLevel}`, STYLES.TEXT.GAME);
    this.playerLevelText.setOrigin(.5);

    this.expBarCurrent = this.#scene.add.text(expBar.x - (expBar.width / 2) - 10, expBar.y - (expBar.height / 2) + 10, this.exp, STYLES.TEXT.GAME);
    this.expBarCurrent.setOrigin(1, 0);

    this.expBarMax = this.#scene.add.text(expBar.x + (expBar.width / 2) + 10, expBar.y - (expBar.height / 2) + 10, "200", STYLES.TEXT.GAME);
    this.expBarMax.setOrigin(0);
  }

  updateCurrentTarget(target) {
    this.enemyTarget = target;
  }

  enableShooting() {
    if (this.dead) return;

    // runs every 5 seconds
    this.cooldownTimer = this.#scene.time.addEvent({
      delay: this.cooldown,
      loop: true,
      callback: () => {
        if (!this.enemyTarget) return;
        this.shoot();
      }
    });
  }

  checkBulletCollision() {
    this.#scene.physics.collide(this.bullets, this.enemies, (target, magic) => {
      magic.destroy();
      target.hurt(this.damage);

      // estimate of when particles arrive at EXP bar ~ 3s.
      this.#scene.time.addEvent({
        delay: 3_000,
        callback: () => {
          // player gains +5 exp extra with level up. Minimum 30.
          this.exp += (30 + (this.playerLevel * 5));
          this.updateEXP();
        }
      });

      const defeatedHowlers = localStorage.getItem("defeatedHowlers") || 0;
      const newTotal = parseInt(defeatedHowlers) + 1;

      localStorage.setItem("defeatedHowlers", newTotal);

      if (newTotal>= 200) {
        localStorage.setItem(ACHIEVEMENTS.HOWLER_HUNTER, true);
      }
    });
  }

  update() {
    if (this.dead) return;

    this.firstName.setPosition(
      this.player.x - (this.player.width * 1.5),
      this.player.y - (this.player.height * 1.8)
    );

    this.checkBulletCollision();
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

    scene.anims.create({
      key: KEYS.ANIMATION.MAGIC.SHOOT,
      frames: scene.anims.generateFrameNumbers(KEYS.GAME.MAGIC, { frames: [ 0, 1, 2, 3, 4 ] }),
      frameRate: 6
    });
  }
}
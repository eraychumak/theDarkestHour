import { IMAGES, KEYS } from "../config.js";

export default class Player {
  #scene;

  constructor(scene, x, y) {
    this.#scene = scene;

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
  }

  get sprite() {
    return this.player;
  }

  enableControls() {
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
    });

    this.#scene.input.on('pointerdown', (pointer) => {
      // prevent movement at the very top of the screen for menu controls
      if (pointer.y <= this.#scene.game.config.height * .1) return;

      this.joystickContainer.setPosition(pointer.x, pointer.y);

      this.target.x = pointer.x;
      this.target.y = pointer.y;

      pointerDown = true;

      this.joystickContainer.setAlpha(1);
      this.player.play(KEYS.ANIMATION.OLD_MAN.WALK);
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
      // Reset joystick handle's position and alpha
      this.joystickHandle.x = 0;
      this.joystickHandle.y = 0;

      this.player.play(KEYS.ANIMATION.OLD_MAN.IDLE);
      this.player.body.reset(this.player.x, this.player.y)
    });

    const firstName = sessionStorage.getItem("firstName");
    this.firstName = this.#scene.add.text(this.player.x + 20, this.player.y - (this.player.height * 2), firstName, {
      font: `12px 'Viga'`
    });
    this.firstName.setOrigin(.5);
  }

  update() {
    this.firstName.setPosition(
      this.player.x - (this.player.width * 1.5),
      this.player.y - (this.player.height * 1.8)
    );
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
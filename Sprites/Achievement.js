import { KEYS, STYLES } from "../config.js";

export default class Achievement {
  #scene;
  #soundBtnSelect;
  #soundBtnClick;

  constructor(scene, config, callback) {
    this.#scene = scene;

    this.#soundBtnSelect = this.#scene.sound.add(KEYS.SOUND.BTN.SELECT);
    this.#soundBtnClick = this.#scene.sound.add(KEYS.SOUND.BTN.CLICK);

    this.key = config.key;
    this.x = config.x;
    this.y = config.y;
    this.width = scene.game.config.width / 3;
    this.height = scene.game.config.height * .15;
    this.achieved = this.checkAchieved();

    // x, y, texture, frame, width, height, leftCut
    const panel = this.#scene.add.nineslice(0, 0, KEYS.MENU.ACHIEVEMENT.BORDER, 0, this.width, this.height, 14, 14, 14, 14);
    panel.setOrigin(0);
    panel.setTint(0xe4943a);

    const bg = this.#scene.add.rectangle(0, 0, this.width, this.height, 0x2c121f, .5);
    bg.setOrigin(0);

    this.text = this.#scene.add.text(
      this.width * .05,
      (this.height / 2) - 20,
      config.label,
      STYLES.TEXT.NORMAL
    );

    this.text.setOrigin(0, .5);

    this.desc = this.#scene.add.text(
      this.width * .05,
      (this.height / 2) + 25,
      config.desc,
      STYLES.TEXT.ERR
    );

    this.desc.setOrigin(0, .5);

    this.container = this.#scene.add.container(config.x, config.y, [bg, panel, this.text, this.desc]);
    this.container.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.width, this.height), Phaser.Geom.Rectangle.Contains);

    if (!this.achieved) {
      this.container.setAlpha(.3);
    }

    this.container.on("pointerover", () => {
      bg.setFillStyle(0xffffff, .05);
      this.#soundBtnSelect.play();
    });

    this.container.on("pointerout", () => {
      bg.setFillStyle(0x2c121f, .5);
    });

    this.container.on("pointerdown", () => {
      this.#soundBtnClick.play();

      if (callback) {
        callback();
      }
    });
  }

  checkAchieved() {
    const achievement = localStorage.getItem(this.key);
    return !!achievement;
  }

  enableGlow() {
    const fx = this.text.postFX.addGlow(0xffffffaa, 0, 0, false, 0.1, 12);

    this.#scene.tweens.add({
        targets: fx,
        outerStrength: 1,
        yoyo: true,
        loop: -1,
        ease: "sine.inout"
    });
  }
}
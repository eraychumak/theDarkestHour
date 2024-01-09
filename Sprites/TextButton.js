import { KEYS, STYLES } from "../config.js";

export default class TextButton {
  #scene;
  #soundBtnSelect;
  #soundBtnClick;

  constructor(scene, x, y, label, callback, config = {}) {
    this.#scene = scene;

    this.#soundBtnSelect = this.#scene.sound.add(KEYS.SOUND.BTN.SELECT);
    this.#soundBtnClick = this.#scene.sound.add(KEYS.SOUND.BTN.CLICK);

    this.x = x;
    this.y = y;
    this.width = config.width || 250;
    this.height = config.height || 100;

    // x, y, texture, frame, width, height, leftCut
    const panel = this.#scene.add.nineslice(0, 0, KEYS.MENU.BTN.BORDER, 0, this.width, this.height, 12, 12, 12, 12);
    panel.setOrigin(0);
    panel.setTint(0xe4943a);

    const bg = this.#scene.add.rectangle(0, 0, this.width, this.height, 0x2c121f, .5);
    bg.setOrigin(0);

    this.text = this.#scene.add.text(
      this.width / 2,
      this.height / 2,
      label,
      STYLES.TEXT.NORMAL
    );

    this.text.setOrigin(.5);

    this.container = this.#scene.add.container(x, y, [bg, panel, this.text]);
    this.container.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.width, this.height), Phaser.Geom.Rectangle.Contains);

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
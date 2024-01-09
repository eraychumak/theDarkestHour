import { KEYS, STYLES } from "../config.js";
import Player from "../Sprites/Player.js";
import TextButton from "../Sprites/TextButton.js";

export default class DifficultySelectorScene extends Phaser.Scene {
  #soundBtnSelect;
  #soundBtnClick;
  #soundErr;

  constructor() {
    super({
      key: KEYS.SCENE.DIFFICULTY_SELECTOR
    })

    this.#soundBtnSelect;
    this.#soundBtnClick;
    this.#soundErr;
  }

  create() {
    console.log(`[${KEYS.SCENE.DIFFICULTY_SELECTOR}:init] Invoked`);

    /*
      For FX transition, a coloured background is needed
      to prevent visual gaps during scene transition.
    */
    this.add.rectangle(0, 0, this.game.config.width, this.game.config.height, 0x1F0E1C).setOrigin(0);

    this.#sound();
    this.#art();
    this.#fullscreenHandler();
    this.#sideBanner();
    this.#text();
  }

  #sound() {
    this.#soundBtnSelect = this.sound.add(KEYS.SOUND.BTN.SELECT);
    this.#soundBtnClick = this.sound.add(KEYS.SOUND.BTN.CLICK);
    this.#soundErr = this.sound.add(KEYS.SOUND.ERR);
  }

  #art() {
    const art = this.add.image(
      this.game.config.width,
      this.game.config.height,
      KEYS.MENU.ART
    );

    art.setOrigin(1);
    art.setScale(1.5);

    const bg = this.add.image(0, 0, KEYS.MENU.BG);
    bg.setOrigin(0);
    bg.setAlpha(.1);
  }

  #fullscreenHandler() {
    const btn = this.add.image(
      this.game.config.width - 48,
      48,
      KEYS.MENU.BTN.FULLSCREEN
    );

    btn.setInteractive();

    btn.on("pointerdown", () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        btn.setTexture(KEYS.MENU.BTN.EXIT_FULLSCREEN);
      } else {
        document.exitFullscreen();
        btn.setTexture(KEYS.MENU.BTN.FULLSCREEN);
      }
    });

    btn.on("pointerover", () => btn.setScale(1.1));
    btn.on("pointerout", () => btn.setScale(1));
  }

  #sideBanner() {
    const sideBanner = this.add.rectangle(0, 0, this.game.config.width * .1, this.game.config.height, 0x6F0F00)
    sideBanner.setOrigin(0);

    const shield = this.add.image(sideBanner.width, 50, KEYS.MENU.SHIELD);
    shield.setOrigin(.5, 0);

    shield.postFX.addShine(.5, .5, 5);

    new Player(
      this,
      192 + (sideBanner.width / 4),
      this.game.config.height
    );
  }

  #startGame() {
    const fx = this.cameras.main.postFX.addWipe(0.1, 0, 0);

    this.scene.transition({
      target: KEYS.SCENE.GAME,
      duration: 2000,
      moveBelow: true,
      onUpdate: (progress) => {
        fx.progress = progress;
      }
    });
  }

  #text() {
    const title = this.add.text(
      (this.game.config.width * .1) * 1.5,
      this.game.config.height * .28,
      "Select difficulty",
      STYLES.TEXT.TITLE
    );

    title.setOrigin(0);

    const btnEasy = new TextButton(this, title.x, title.y * 1.5, "Easy", () => {
      sessionStorage.setItem("difficulty", "easy");
      this.#startGame();
    });

    // ? Description - Difficulty Mode - Easy
    this.add.text(
      btnEasy.x, btnEasy.y * 1.3,
      "Take half the damage from enemies—lose only half a heart per hit.",
      {...STYLES.TEXT.SMALL, wordWrap: { width: 340 }, lineSpacing: 18}
    );

    const btnNormal = new TextButton(this, (btnEasy.x + btnEasy.width) + 150, btnEasy.y, "Normal", () => {
      sessionStorage.setItem("difficulty", "normal");
      this.#startGame();
    });

    // ? Description - Difficulty Mode - Normal
    this.add.text(
      btnNormal.x, btnNormal.y * 1.3,
      "Face enemies at standard difficulty—1 hit equals 1 heart lost.",
      {...STYLES.TEXT.SMALL, wordWrap: { width: 340 }, lineSpacing: 18}
    );

    const btnHard = new TextButton(this, (btnNormal.x + btnNormal.width) + 150, btnNormal.y, "Hard", () => {
      sessionStorage.setItem("difficulty", "hard");
      this.#startGame();
    });

    // ? Description - Difficulty Mode - Hard
    this.add.text(
      btnHard.x, btnHard.y * 1.3,
      "Brace yourself with just 1 heart—challenge accepted?",
      {...STYLES.TEXT.SMALL, wordWrap: { width: 340 }, lineSpacing: 18}
    );
  }
}
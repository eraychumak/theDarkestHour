import { KEYS, STYLES } from "../config.js";
import Player from "../Sprites/Player.js";

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

  #text() {
    const menu = this;

    const title = this.add.text(
      (this.game.config.width * .1) * 1.5,
      this.game.config.height * .28,
      "Select difficulty",
      STYLES.TEXT.TITLE
    );

    title.setOrigin(0);

    const btnIDs = ["difficultyEasy", "difficultyNormal", "difficultyHard"];
    const input = this.add.dom(title.x, title.y * 1.5).createFromCache(KEYS.MENU.INPUT_DIFFICULTY);
    input.setOrigin(0);

    input.addListener("click mouseover");

    input.on("mouseover", (e) => {
      if (!btnIDs.includes(e.target.id)) return;
      this.#soundBtnSelect.play();
    })

    input.on("click", function(e) {
      e.preventDefault();

      menu.#soundBtnClick.play();

      let difficultySelected = false;

      if (e.target.id === "difficultyEasy") {
        sessionStorage.setItem("difficulty", "easy");
        difficultySelected = true;
      }

      if (e.target.id === "difficultyNormal") {
        sessionStorage.setItem("difficulty", "normal");
        difficultySelected = true;
      }

      if (e.target.id === "difficultyHard") {
        sessionStorage.setItem("difficulty", "hard");
        difficultySelected = true;
      }

      if (!difficultySelected) return;

      const difficultySelector = document.getElementById("difficultySelector");
      difficultySelector.classList.add("hide");

      const fx = menu.cameras.main.postFX.addWipe(0.1, 0, 0);

      menu.scene.transition({
        target: KEYS.SCENE.GAME,
        duration: 2000,
        moveBelow: true,
        onUpdate: (progress) => {
          fx.progress = progress;
        }
      });
    });
  }
}
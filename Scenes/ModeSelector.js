import { KEYS, STYLES } from "../config.js";
import Player from "../Sprites/Player.js";
import TextButton from "../Sprites/TextButton.js";

export default class ModeSelector extends Phaser.Scene {
  #soundBtnSelect;
  #soundBtnClick;
  #soundErr;

  constructor() {
    super({
      key: KEYS.SCENE.MODE_SELECTOR
    });

    this.#soundBtnSelect;
    this.#soundBtnClick;
    this.#soundErr;
  }

  create() {
    console.log(`[${KEYS.SCENE.MODE_SELECTOR}:init] Invoked`);

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

    const player = this.add.sprite(192 + (sideBanner.width / 4), this.game.config.height, KEYS.CHARACTERS.OLD_MAN);
    player.setOrigin(1);
    player.setScale(4);
    player.play(KEYS.ANIMATION.OLD_MAN.IDLE);
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
      "Select mode",
      STYLES.TEXT.TITLE
    );

    title.setOrigin(0);

    const btnPvC = new TextButton(this, title.x, title.y * 1.5, "Player vs Computer", () => {
      sessionStorage.setItem("mode", "pvc");
      this.#startGame();
    }, { width: 500 });

    // ? Description - Mode - Player vs Computer
    this.add.text(
      btnPvC.x, btnPvC.y * 1.3,
      "It's a lonely world out there. Fend off the howlers by yourself.",
      {...STYLES.TEXT.SMALL, wordWrap: { width: 500 }, lineSpacing: 18}
    );

    const btnPvP = new TextButton(this, (btnPvC.x + btnPvC.width) + 100, btnPvC.y, "Player vs Player", () => {
      sessionStorage.setItem("mode", "pvp");
      this.#startGame();
    }, { width: 500 });

    // ? Description - Difficulty Mode - Normal
    this.add.text(
      btnPvP.x, btnPvP.y * 1.3,
      "The two of you against the world. However, only one of you can perform magic and the game will end if one of you dies.",
      {...STYLES.TEXT.SMALL, wordWrap: { width: 500 }, lineSpacing: 18}
    );
  }
}
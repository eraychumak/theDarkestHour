import { ACHIEVEMENTS, KEYS, STYLES, TEXT } from "../config.js";
import Player from "../Sprites/Player.js";
import TextButton from "../Sprites/TextButton.js";

export default class MenuScene extends Phaser.Scene {
  #soundBtnSelect;
  #soundBtnClick;
  #soundErr;

  constructor() {
    super({
      key: KEYS.SCENE.MENU
    })

    this.#soundBtnSelect;
    this.#soundBtnClick;
    this.#soundErr;
  }

  init() {
    console.log(`[${KEYS.SCENE.MENU}:init] Invoked`);

    // fade out any music music from previous scenes.
    const musicArray = this.sound.getAllPlaying();

    this.tweens.add({
      targets: musicArray,
      volume: 0,
      duration: 3_000
    });

    sessionStorage.removeItem("gameDifficulty");
    sessionStorage.removeItem("mode");
    sessionStorage.removeItem("gameLevel");
  }

  create() {
    console.log(`[${KEYS.SCENE.MENU}:create] Invoked`);

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
    const music01 = this.sound.add(KEYS.SOUND.BATTLE, {
      loop: true,
      volume: .3
    });

    const music02 = this.sound.add(KEYS.SOUND.NOMOREMAGIC, {
      loop: true,
      volume: .8
    });

    music01.play();
    music02.play();

    this.tweens.add({
      targets: music01,
      volume: {
        from: 0,
        to: .3
      },
      duration: 3_000
    });

    this.tweens.add({
      targets: music02,
      volume: {
        from: 0,
        to: .8
      },
      duration: 3_000
    });

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

  #text() {
    const menu = this;

    const title = this.add.text(
      (this.game.config.width * .1) * 1.5,
      this.game.config.height * .28,
      this.game.config.gameTitle,
      STYLES.TEXT.TITLE
    );

    title.setOrigin(0);

    const intro = this.add.text(title.x, title.y * 1.5, TEXT.INTRO);
    intro.setStyle({
      ...STYLES.TEXT.NORMAL,
      color: "#aaa"
    })
    intro.setOrigin(0);

    const input = this.add.dom(intro.x, intro.y * 1.5).createFromCache(KEYS.MENU.INPUT);
    input.setOrigin(0);
    input.addListener("click input mouseover");

    // check if first name already exists
    const sessionfirstName = sessionStorage.getItem("firstName");

    if (sessionfirstName) {
      const domElementInput = document.getElementById("firstName");
      domElementInput.value = sessionfirstName;
    }

    const errText = this.add.text(input.x, (input.y + input.height) + 15, "", STYLES.TEXT.ERR);
    errText.setVisible(false);

    input.on("input", (e) => {
      errText.setVisible(false);
    });

    const playBtn = new TextButton(this, input.x + input.width + 20, input.y + (input.height / 4), "Play", () => {
      const firstName = document.getElementById("firstName").value;

      if (firstName.length <= 2) {
        errText.setText(TEXT.ERR.SHORT_NAME);
        errText.setVisible(true);
        menu.#soundErr.play();
        return;
      }

      sessionStorage.setItem("firstName", firstName);
      localStorage.setItem(ACHIEVEMENTS.NEW_ADVENTURER, true);

      this.scene.start(KEYS.SCENE.DIFFICULTY_SELECTOR);
    });

    const achievementsBtn = new TextButton(this, playBtn.x + playBtn.width + 20, playBtn.y, "Achievements", () => {
      this.scene.start(KEYS.SCENE.ACHIEVEMENTS);

    }, { width: 350});

    const howToPlayBtn = new TextButton(this, playBtn.x, playBtn.y + playBtn.height + 20, "How To Play", () => {
      this.scene.start(KEYS.SCENE.HOW_TO_PLAY);

    }, { width: 620});

    playBtn.enableGlow();
  }
}
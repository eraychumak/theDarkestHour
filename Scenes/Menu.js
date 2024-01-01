import { KEYS, STYLES, TEXT } from "../config.js";
import Player from "../Sprites/Player.js";

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
  }

  create() {
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

    this.#soundBtnSelect = this.sound.add(KEYS.SOUND.BTN.SELECT);
    this.#soundBtnClick = this.sound.add(KEYS.SOUND.BTN.CLICK);
    this.#soundErr = this.sound.add(KEYS.SOUND.ERR);
  }

  #art() {
    const background = this.add.image(
      this.game.config.width,
      this.game.config.height,
      KEYS.MENU.BG
    );

    background.setOrigin(1);
    background.setScale(1.5);
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

    const errText = this.add.text(input.x, (input.y + input.height) + 15, "", STYLES.TEXT.ERR);
    errText.setVisible(false);

    input.addListener("click input mouseover");

    input.on("mouseover", (e) => {
      if (e.target.id !== "beginGame") return;
      this.#soundBtnSelect.play();
    })

    input.on("click", function(e) {
      e.preventDefault();

      menu.#soundBtnClick.play();

      if (e.target.id !== "beginGame") return;

      const firstName = this.getChildByID("firstName").value;

      if (firstName.length <= 2) {
        errText.setText(TEXT.ERR.SHORT_NAME);
        errText.setVisible(true);
        menu.#soundErr.play();
        return;
      }

      sessionStorage.setItem("firstName", firstName);

      menu.scene.stop(KEYS.SCENE.MENU)
      menu.scene.start(KEYS.SCENE.GAME);
    });

    input.on("input", (e) => {
      errText.setVisible(false);
    });
  }
}
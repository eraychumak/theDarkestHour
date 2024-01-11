import { KEYS, STYLES } from "../config.js";

/**
 * A blueprint class containing pre-defined objects
 * for each menu scene. For example, each menu scene
 * will have a sidebanner and a title.
 */
export default class MenuSceneFactory extends Phaser.Scene {
  #playMusic;

  constructor(sceneKey, playMusic = true) {
    super({ key: sceneKey });

    this.key = sceneKey;
    this.#playMusic = playMusic;
  }

  init() {
    console.log(`[${this.key}:init] Invoked`);

    if (!this.#playMusic) return;

    // fade out any music music from previous scenes.
    const musicArray = this.sound.getAllPlaying();

    this.tweens.add({
      targets: musicArray,
      volume: 0,
      duration: 3_000
    });
  }

  create() {
    console.log(`[${KEYS.SCENE.MENU}:create] Invoked`);

    /*
      For FX transition, a coloured background is needed
      to prevent visual gaps during scene transition.
    */
    this.add.rectangle(0, 0, this.game.config.width, this.game.config.height, 0x1F0E1C).setOrigin(0);

    if (this.#playMusic) {
      this.#sound();
    }

    this.#art();
    this.#fullscreenHandler();
    this.#sideBanner();
    this.mainContent();
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

    this.soundBtnSelect = this.sound.add(KEYS.SOUND.BTN.SELECT);
    this.soundBtnClick = this.sound.add(KEYS.SOUND.BTN.CLICK);
    this.soundErr = this.sound.add(KEYS.SOUND.ERR);
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

  mainContent(menuTitle) {
    const title = this.add.text(
      (this.game.config.width * .1) * 1.5,
      this.game.config.height * .28,
      menuTitle,
      STYLES.TEXT.TITLE
    );

    title.setOrigin(0);

    return title;
  }
}
import { ACHIEVEMENTS, KEYS, STYLES } from "../config.js";
import Achievement from "../Sprites/Achievement.js";
import TextButton from "../Sprites/TextButton.js";

export default class AchievementsScene extends Phaser.Scene {
  #soundBtnSelect;
  #soundBtnClick;
  #soundErr;

  constructor() {
    super({
      key: KEYS.SCENE.ACHIEVEMENTS
    })

    this.#soundBtnSelect;
    this.#soundBtnClick;
    this.#soundErr;
  }

  init(data) {
    const currentTime = data.time;

    const minutes = ("0" + Math.floor(currentTime / 60)).slice(-2);
    const seconds = ("0" + currentTime % 60).slice(-2);

    this.time = `${minutes}:${seconds}`;
  }

  create() {
    console.log(`[${KEYS.SCENE.ACHIEVEMENTS}:init] Invoked`);

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

  #text() {
    const title = this.add.text(
      (this.game.config.width * .1) * 1.5,
      this.game.config.height * .28,
      "Achievements",
      STYLES.TEXT.TITLE
    );

    title.setOrigin(0);

    const newAdventurer = new Achievement(
      this,
      {
        x: title.x,
        y: title.y * 1.5,
        key: ACHIEVEMENTS.NEW_ADVENTURER,
        label: "New Adventurer",
        desc: "Played the game for the first time."
      },
      () => {
      }
    );

    const blinkOfAnEye = new Achievement(
      this,
      {
        x: newAdventurer.x + newAdventurer.width + 50,
        y: newAdventurer.y,
        key: ACHIEVEMENTS.BLINK_OF_AN_EYE,
        label: "Blink of an Eye",
        desc: "Survive for at-least 60 seconds in the game"
      },
      () => {
      }
    );

    const howlerHunter = new Achievement(
      this,
      {
        x: newAdventurer.x,
        y: newAdventurer.y + newAdventurer.height + 50,
        key: ACHIEVEMENTS.HOWLER_HUNTER,
        label: "Howler Hunter",
        desc: "All-time record in defeating 200 howlers."
      },
      () => {
      }
    );

    const fashionablyEarly = new Achievement(
      this,
      {
        x: howlerHunter.x + howlerHunter.width + 50,
        y: howlerHunter.y,
        key: ACHIEVEMENTS.FASHIONABLY_EARLY,
        label: "Fashionably Early",
        desc: "Rushed to afterlife, dead before 60 seconds. "
      },
      () => {
      }
    );

    // const timeElapsed = this.add.text(
    //   title.x, title.y * 1.5,
    //   `New in Town\nAchieved: ${this.time}`,
    //   {...STYLES.TEXT.SMALL, wordWrap: { width: 340 }, lineSpacing: 18}
    // );

    // const btnResume = new TextButton(this, timeElapsed.x, timeElapsed.y * 1.2, "Resume", () => {
    //   this.scene.resume(KEYS.SCENE.GAME);
    //   this.scene.stop();
    // });

    const btnExit = new TextButton(this, howlerHunter.x, howlerHunter.y + howlerHunter.height + 50, "Menu", () => {
      this.scene.stop(KEYS.SCENE.GAME);
      this.scene.start(KEYS.SCENE.MENU);
    });
  }
}
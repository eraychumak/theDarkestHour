import { KEYS, STYLES } from "../config.js";
import Player from "../Sprites/Player.js";
import TextButton from "../Sprites/TextButton.js";

export default class LevelUpScene extends Phaser.Scene {
  #soundBtnSelect;
  #soundBtnClick;
  #soundErr;

  constructor() {
    super({
      key: KEYS.SCENE.LEVEL_UP
    })

    this.#soundBtnSelect;
    this.#soundBtnClick;
    this.#soundErr;
  }

  init(data) {
    this.player = data.player;
  }

  create() {
    console.log(`[${KEYS.SCENE.LEVEL_UP}:init] Invoked`);

    console.log(this.player);

    const bg = this.add.nineslice(
      this.game.config.width / 2,
      this.game.config.height / 2,
      KEYS.MENU.ACHIEVEMENT.BORDER,
      0, this.game.config.width * .3, this.game.config.height * .5, 14, 14, 14, 14
    );

    bg.setOrigin(.5);
    bg.setTint(0x000000);

    const title = this.add.text(bg.x, bg.y - (bg.height / 2.2), "LEVEL UP", STYLES.TEXT.TITLE);
    title.setOrigin(.5, 0);

    const subheading = this.add.text(title.x, title.y + title.height, "Select an upgrade", STYLES.TEXT.SMALL);
    subheading.setWordWrapWidth(300);
    subheading.setOrigin(.5);

    const extraProjectile = new TextButton(this, bg.x - (bg.width / 4), (subheading.y + subheading.height) * 1.1, "+1 Projectile", () => {
      this.player.incProjectiles();
      this.goBackToGame();
    }, {
      width: 300
    });

    // reduceCooldown
    new TextButton(this, bg.x - (bg.width / 4), (extraProjectile.y + extraProjectile.height) * 1.1, "-1s Cooldown", () => {
      this.player.reduceCooldown();
      this.goBackToGame();
    }, {
      width: 300
    });
  }

  goBackToGame() {
    this.scene.stop();
    this.scene.resume(KEYS.SCENE.GAME);
  }
}
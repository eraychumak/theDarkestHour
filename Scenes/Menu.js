import { KEYS, IMAGES, STYLES, TEXT, HTML } from "../config.js";

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({
      key: KEYS.SCENE.PRELOAD
    })
  }

  preload () {
    this.load.html(KEYS.MENU.INPUT, HTML.MENU.INPUT);

    this.load.image(KEYS.MENU.BG, IMAGES.MENU.BG);
    this.load.image(KEYS.MENU.SHIELD, IMAGES.MENU.SHIELD);
    this.load.image(KEYS.MENU.BTN, IMAGES.MENU.BTN);
  }

  create () {
    const game = this;

    const background = this.add.image(this.game.config.width, this.game.config.height, KEYS.MENU.BG);
    background.setOrigin(1);
    background.setScale(1.5);

    const sideBanner = this.add.rectangle(0, 0, this.game.config.width * .1, this.game.config.height, 0x6F0F00)
    sideBanner.setOrigin(0);

    const shield = this.add.image(sideBanner.width, 50, KEYS.MENU.SHIELD);
    shield.setOrigin(.5, 0);

    const title = this.add.text(sideBanner.width * 1.5, this.game.config.height * .28, this.game.config.gameTitle, STYLES.TEXT.TITLE);
    title.setOrigin(0);

    const intro = this.add.text(title.x, title.y * 1.5, TEXT.INTRO);
    intro.setStyle({
      ...STYLES.TEXT.NORMAL,
      color: "#aaa"
    })
    intro.setOrigin(0);

    const input = this.add.dom(intro.x, intro.y * 1.5).createFromCache(KEYS.MENU.INPUT);
    input.setOrigin(0);

    const errText = game.add.text(input.x, (input.y + input.height) + 15, "", STYLES.TEXT.ERR);
    errText.setVisible(false);

    input.addListener("click input");

    input.on("click", function(e) {
      e.preventDefault();

      if (e.target.id !== "beginGame") return;

      const firstName = this.getChildByID("firstName").value;

      if (firstName.length <= 2) {
        errText.setText(TEXT.ERR.SHORT_NAME);
        errText.setVisible(true);
        return;
      }

      sessionStorage.setItem("firstName", firstName);
    });

    input.on("input", e => {
      errText.setVisible(false);
    });
  }
}
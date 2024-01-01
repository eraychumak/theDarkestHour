import { KEYS, IMAGES, STYLES, TEXT, HTML, SPRITE_SHEETS, SOUND } from "../config.js";

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({
      key: KEYS.SCENE.PRELOAD
    })
  }

  preload () {
    this.load.html(KEYS.MENU.INPUT, HTML.MENU.INPUT);

    this.load.audio(KEYS.SOUND.BATTLE, [SOUND.BATTLE]);
    this.load.audio(KEYS.SOUND.NOMOREMAGIC, [SOUND.NOMOREMAGIC]);
    this.load.audio(KEYS.SOUND.BTN.SELECT, [SOUND.BTN.SELECT]);
    this.load.audio(KEYS.SOUND.BTN.CLICK, [SOUND.BTN.CLICK]);
    this.load.audio(KEYS.SOUND.ERR, [SOUND.ERR]);

    this.load.image(KEYS.MENU.BG, IMAGES.MENU.BG);
    this.load.image(KEYS.MENU.SHIELD, IMAGES.MENU.SHIELD);
    this.load.image(KEYS.MENU.BTN.FULLSCREEN, IMAGES.MENU.BTN.FULLSCREEN);
    this.load.image(KEYS.MENU.BTN.EXIT_FULLSCREEN, IMAGES.MENU.BTN.EXIT_FULLSCREEN);

    // 48x48 frame, 21 frames
    this.load.spritesheet(KEYS.CHARACTERS.OLD_MAN, SPRITE_SHEETS.CHARACTERS.OLD_MAN.PNG, {
      frameWidth: 48,
      frameHeight: 48
    });
  }

  create () {
    const game = this;

    const music01 = this.sound.add(KEYS.SOUND.BATTLE, {
      loop: true,
      volume: .3
    });

    const music02 = this.sound.add(KEYS.SOUND.NOMOREMAGIC, {
      loop: true,
      volume: .8
    });

    const soundBtnSelect = this.sound.add(KEYS.SOUND.BTN.SELECT);
    const soundBtnClick = this.sound.add(KEYS.SOUND.BTN.CLICK);
    const soundErr = this.sound.add(KEYS.SOUND.ERR);

    music01.play();
    music02.play();

    const background = this.add.image(this.game.config.width, this.game.config.height, KEYS.MENU.BG);
    background.setOrigin(1);
    background.setScale(1.5);

    const btnFullscreen = this.add.image(this.game.config.width - 48, 48, KEYS.MENU.BTN.FULLSCREEN);
    const btnExitFullscreen = this.add.image(this.game.config.width - 48, 48, KEYS.MENU.BTN.EXIT_FULLSCREEN);

    btnExitFullscreen.setVisible(false);
    btnExitFullscreen.setInteractive();
    btnExitFullscreen.on("pointerdown", function() {
      document.exitFullscreen();
      btnExitFullscreen.setVisible(false);
      btnFullscreen.setVisible(true);
    });
    btnExitFullscreen.on("pointerover", function() {
      btnExitFullscreen.setScale(1.1);
    })
    btnExitFullscreen.on("pointerout", function() {
      btnExitFullscreen.setScale(1);
    })

    btnFullscreen.setInteractive();
    btnFullscreen.on("pointerdown", function() {
      const body = document.getElementsByTagName("body").item(0)
      body.requestFullscreen();
      btnFullscreen.setVisible(false);
      btnExitFullscreen.setVisible(true);
    });
    btnFullscreen.on("pointerover", function() {
      btnFullscreen.setScale(1.1);
    });
    btnFullscreen.on("pointerout", function() {
      btnFullscreen.setScale(1);
    });

    const sideBanner = this.add.rectangle(0, 0, this.game.config.width * .1, this.game.config.height, 0x6F0F00)
    sideBanner.setOrigin(0);

    const shield = this.add.image(sideBanner.width, 50, KEYS.MENU.SHIELD);
    shield.setOrigin(.5, 0);

    shield.postFX.addShine(.5, .5, 5);

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

    input.addListener("click input mouseover");

    input.on("mouseover", (e) => {
      if (e.target.id !== "beginGame") return;
      soundBtnSelect.play();
    })

    input.on("click", function(e) {
      e.preventDefault();

      soundBtnClick.play();

      if (e.target.id !== "beginGame") return;

      const firstName = this.getChildByID("firstName").value;

      if (firstName.length <= 2) {
        errText.setText(TEXT.ERR.SHORT_NAME);
        errText.setVisible(true);
        soundErr.play();
        return;
      }

      sessionStorage.setItem("firstName", firstName);
    });

    input.on("input", (e) => {
      errText.setVisible(false);
    });

    this.anims.create({
      key: "still",
      frames: this.anims.generateFrameNumbers(KEYS.CHARACTERS.OLD_MAN, { frames: [ 0 ] }),
      frameRate: 6,
      repeat: 0
    });

    this.anims.create({
      key: "attack",
      frames: this.anims.generateFrameNumbers(KEYS.CHARACTERS.OLD_MAN, { frames: [ 1, 2, 3, 4, 0 ] }),
      frameRate: 6,
      repeat: 0
    });

    this.anims.create({
      key: "death",
      frames: this.anims.generateFrameNumbers(KEYS.CHARACTERS.OLD_MAN, { frames: [ 5, 6, 7, 8 ] }),
      frameRate: 6,
      repeat: 0
    });

    this.anims.create({
      key: "hurt",
      frames: this.anims.generateFrameNumbers(KEYS.CHARACTERS.OLD_MAN, { frames: [ 9, 10 ] }),
      frameRate: 6,
      repeat: 0
    });

    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers(KEYS.CHARACTERS.OLD_MAN, { frames: [ 11, 12, 13, 14 ] }),
      frameRate: 4,
      repeat: -1
    });

    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers(KEYS.CHARACTERS.OLD_MAN, { frames: [ 15, 16, 17, 18, 19, 20 ] }),
      frameRate: 6,
      repeat: -1
    });

    // 48 * 4 = 192
    this.player = this.physics.add.sprite(192 + (sideBanner.width / 4), this.game.config.height);
    this.player.setOrigin(1);
    this.player.setScale(4);
    this.player.setCollideWorldBounds(true);
    this.player.play("idle");
  }
}
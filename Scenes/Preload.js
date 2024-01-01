import { KEYS, IMAGES, HTML, SPRITE_SHEETS, SOUND } from "../config.js";
import Player from "../Sprites/Player.js";

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({
      key: KEYS.SCENE.PRELOAD
    })
  }

  init() {
    console.log(`[${KEYS.SCENE.PRELOAD}:init] Invoked`);
  }

  preload () {
    console.log(`[${KEYS.SCENE.PRELOAD}:preload] Invoked`);

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
    console.log(`[${KEYS.SCENE.PRELOAD}:create] Invoked`);

    Player.loadAnimations(this);
    this.scene.start(KEYS.SCENE.MENU);
  }
}
import { KEYS, IMAGES, HTML, SPRITE_SHEETS, SOUND } from "../config.js";
import Howler from "../Sprites/Howler.js";
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
    this.load.audio(KEYS.SOUND.RISING, [SOUND.RISING]);
    this.load.audio(KEYS.SOUND.FOOTSTEP, [SOUND.FOOTSTEP]);
    this.load.audio(KEYS.SOUND.MAGIC_SPARKLE, [SOUND.MAGIC_SPARKLE]);
    this.load.audio(KEYS.SOUND.BTN.SELECT, [SOUND.BTN.SELECT]);
    this.load.audio(KEYS.SOUND.BTN.CLICK, [SOUND.BTN.CLICK]);
    this.load.audio(KEYS.SOUND.ERR, [SOUND.ERR]);
    this.load.audio(KEYS.SOUND.HOWLER.ATTACK, [SOUND.HOWLER.ATTACK]);
    this.load.audio(KEYS.SOUND.HOWLER.HURT, [SOUND.HOWLER.HURT]);

    this.load.image(KEYS.MENU.BG, IMAGES.MENU.BG);
    this.load.image(KEYS.MENU.ART, IMAGES.MENU.ART);
    this.load.image(KEYS.MENU.SHIELD, IMAGES.MENU.SHIELD);
    this.load.image(KEYS.MENU.BTN.FULLSCREEN, IMAGES.MENU.BTN.FULLSCREEN);
    this.load.image(KEYS.MENU.BTN.EXIT_FULLSCREEN, IMAGES.MENU.BTN.EXIT_FULLSCREEN);
    this.load.image(KEYS.GAME.BTN.PAUSE, IMAGES.GAME.BTN.PAUSE);
    this.load.image(KEYS.GAME.UI.HEART, IMAGES.GAME.UI.HEART);
    this.load.image(KEYS.GAME.EXP, IMAGES.GAME.EXP);

    // 48x48 frame, 21 frames
    this.load.spritesheet(KEYS.CHARACTERS.OLD_MAN, SPRITE_SHEETS.CHARACTERS.OLD_MAN.PNG, {
      frameWidth: 48,
      frameHeight: 48
    });

    // 128x128 frame, 27 frames
    this.load.spritesheet(KEYS.CHARACTERS.HOWLER, SPRITE_SHEETS.CHARACTERS.HOWLER.PNG, {
      frameWidth: 128,
      frameHeight: 128
    });

    this.load.spritesheet(KEYS.GAME.MAGIC, SPRITE_SHEETS.MAGIC.PNG, {
      frameWidth: 512,
      frameHeight: 512
    });

    this.load.image(KEYS.GAME.GROUND_TILES, IMAGES.GAME.TILESETS.GROUND);
    this.load.atlas(KEYS.GAME.GROUND_OBJECTS, SPRITE_SHEETS.GROUND_OBJECTS.PNG, SPRITE_SHEETS.GROUND_OBJECTS.JSON);

    this.load.image(KEYS.MENU.BTN.BORDER, IMAGES.MENU.BTN.BORDER);
    this.load.image(KEYS.MENU.ACHIEVEMENT.BORDER, IMAGES.MENU.ACHIEVEMENT.BORDER);
    this.load.image(KEYS.GAME.UI.EXP_BORDER, IMAGES.GAME.UI.EXP_BORDER);
  }

  create () {
    console.log(`[${KEYS.SCENE.PRELOAD}:create] Invoked`);

    Player.loadAnimations(this);
    Howler.loadAnimations(this);

    this.scene.start(KEYS.SCENE.MENU);
  }
}
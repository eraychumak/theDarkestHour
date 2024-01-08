const KEYS = Object.freeze({
  SCENE: Object.freeze({
    PRELOAD: "SCENE_PRELOAD",
    MENU: "SCENE_MENU",
    DIFFICULTY_SELECTOR: "SCENE_DIFFICULTY_SELECTOR",
    GAME: "SCENE_GAME",
  }),
  MENU: Object.freeze({
    BG: "MENU_BG",
    ART: "MENU_ART",
    SHIELD: "MENU_SHIELD",
    INPUT: "MENU_INPUT_NAME",
    INPUT_DIFFICULTY: "MENU_INPUT_DIFFICULTY",
    BTN: Object.freeze({
      FULLSCREEN: "MENU_ENTER_FULLSCREEN",
      EXIT_FULLSCREEN: "MENU_EXIT_FULLSCREEN"
    })
  }),
  GAME: Object.freeze({
    GROUND_OBJECTS: "GAME_GROUND_OBJECTS",
    GROUND_TILES: "GAME_GROUND_TILES",
    BTN: Object.freeze({
      PAUSE: "GAME_BTN_PAUSE"
    })
  }),
  CHARACTERS: Object.freeze({
    OLD_MAN: "OLD_MAN"
  }),
  SOUND: Object.freeze({
    BATTLE: "SOUND_BATTLE",
    NOMOREMAGIC: "SOUND_NO_MORE_MAGIC",
    RISING: "SOUND_RISING",
    BTN: Object.freeze({
      SELECT: "SOUND_BTN_SELECT",
      CLICK: "SOUND_BTN_CLICK"
    }),
    ERR: "SOUND_ERROR"
  }),
  ANIMATION: Object.freeze({
    OLD_MAN: Object.freeze({
      STILL: "OLD_MAN_STILL",
      ATTACK: "OLD_MAN_ATTACK",
      DEATH: "OLD_MAN_DEATH",
      HURT: "OLD_MAN_HURT",
      IDLE: "OLD_MAN_IDLE",
      WALK: "OLD_MAN_WALK"
    })
  })
});

const IMAGES = Object.freeze({
  MENU: Object.freeze({
    BG: "./assets/menu/bg.jpg",
    ART: "./assets/menu/art.png",
    SHIELD: "./assets/menu/shield.png",
    BTN: Object.freeze({
      FULLSCREEN: "./assets/menu/fullscreen.png",
      EXIT_FULLSCREEN: "./assets/menu/exitFullscreen.png",
      PAUSE: "./assets/menu/pause.png"
    })
  }),
  GAME: Object.freeze({
    TILESETS: Object.freeze({
      GROUND: "./assets/game/groundObjects/tileset_ground.png"
    }),
    BTN: Object.freeze({
      PAUSE: "./assets/game/pause.png"
    })
  })
});

const SOUND = Object.freeze({
  BATTLE: "./assets/sound/battleTheme.mp3",
  NOMOREMAGIC: "./assets/sound/noMoreMagic.mp3",
  RISING: "./assets/sound/rising.mp3",
  BTN: Object.freeze({
    SELECT: "./assets/sound/select_001.ogg",
    CLICK: "./assets/sound/click_002.ogg"
  }),
  ERR: "./assets/sound/error_007.ogg"
});

const SPRITE_SHEETS = Object.freeze({
  CHARACTERS: Object.freeze({
    OLD_MAN: Object.freeze({
      PNG: "./assets/game/characters/OldMan.png",
      JSON: "./assets/game/characters/OldMan.json"
    })
  }),
  GROUND_OBJECTS: Object.freeze({
    PNG: "./assets/game/groundObjects/spritesheet.png",
    JSON: "./assets/game/groundObjects/spritesheet.json"
  })
});

const HTML = Object.freeze({
  MENU: Object.freeze({
    INPUT: "./nameInput.html",
    INPUT_DIFFICULTY: "./difficultyInput.html"
  })
})

const SIZES = Object.freeze({
  TITLE: "6rem",
  H1: "4rem",
  NORMAL: "3rem",
  ERR: "2rem"
});

const STYLES = Object.freeze({
  TEXT: Object.freeze({
    TITLE: { font: `${SIZES.TITLE} 'Viaoda Libre'` },
    NORMAL: { font: `${SIZES.NORMAL} 'Vidaloka'` },
    GAME: { font: `${SIZES.NORMAL} 'Viga'`},
    ERR: {
      font: `${SIZES.ERR} 'Vidaloka Regular'`,
      color: "#f5a54b"
    }
  })
});

const TEXT = Object.freeze({
  INTRO: [
    "In a land of myth and a time of magic,",
    "the destiny of a great kingdom rests",
    "on the shoulders of a young person."
  ],
  ERR: Object.freeze({
    SHORT_NAME: [
      "Please enter your first name.",
      "It must be 3 or more letters.",
    ]
  })
})

export {
  KEYS,
  IMAGES,
  HTML,
  SIZES,
  SOUND,
  STYLES,
  TEXT,
  SPRITE_SHEETS
};
const KEYS = Object.freeze({
  SCENE: Object.freeze({
    PRELOAD: "SCENE_PRELOAD",
    MENU: "SCENE_MENU",
    DIFFICULTY_SELECTOR: "SCENE_DIFFICULTY_SELECTOR",
    GAME: "SCENE_GAME",
    PAUSE: "SCENE_PAUSE",
    GAME_OVER: "SCENE_GAME_OVER",
    ACHIEVEMENTS: "SCENE_ACHIEVEMENTS",
    LEVEL_UP: "SCENE_LEVEL_UP",
    HOW_TO_PLAY: "SCENE_HOW_TO_PLAY",
    MODE_SELECTOR: "SCENE_MODE_SELECTOR"
  }),
  MENU: Object.freeze({
    BG: "MENU_BG",
    ART: "MENU_ART",
    SHIELD: "MENU_SHIELD",
    INPUT: "MENU_INPUT_NAME",
    BTN: Object.freeze({
      FULLSCREEN: "MENU_ENTER_FULLSCREEN",
      EXIT_FULLSCREEN: "MENU_EXIT_FULLSCREEN",
      BORDER: "MENU_BUTTON_BORDER"
    }),
    ACHIEVEMENT: Object.freeze({
      BORDER: "MENU_ACHIEVEMENT_BORDER"
    })
  }),
  GAME: Object.freeze({
    GROUND_OBJECTS: "GAME_GROUND_OBJECTS",
    GROUND_TILES: "GAME_GROUND_TILES",
    BTN: Object.freeze({
      PAUSE: "GAME_BTN_PAUSE"
    }),
    UI: Object.freeze({
      HEART: "GAME_UI_HEART",
      EXP_BORDER: "GAME_UI_EXP_BORDER"
    }),
    MAGIC: "GAME_MAGIC",
    EXP: "GAME_EXP"
  }),
  CHARACTERS: Object.freeze({
    OLD_MAN: "OLD_MAN",
    HOWLER: "HOWLER"
  }),
  SOUND: Object.freeze({
    BATTLE: "SOUND_BATTLE",
    NOMOREMAGIC: "SOUND_NO_MORE_MAGIC",
    RISING: "SOUND_RISING",
    FOOTSTEP: "SOUND_FOOTSTEP",
    MAGIC_SPARKLE: "SOUND_MAGIC_SPARKLE",
    HOWLER: Object.freeze({
      HURT: "SOUND_HOWLER_HURT",
      ATTACK: "SOUND_HOWLER_ATTACK"
    }),
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
    }),
    HOWLER: Object.freeze({
      STILL: "HOWLER_STILL",
      ATTACK: "HOWLER_ATTACK",
      DEATH: "HOWLER_DEATH",
      HURT: "HOWLER_HURT",
      IDLE: "HOWLER_IDLE",
      WALK: "HOWLER_WALK",
      RUN_ATTACK: "HOWLER_RUN_AND_ATTACK"
    }),
    MAGIC: Object.freeze({
      SHOOT: "MAGIC_SHOOT"
    })
  })
});

const IMAGES = Object.freeze({
  MENU: Object.freeze({
    BG: "./assets/menu/bg.avif",
    ART: "./assets/menu/art.avif",
    SHIELD: "./assets/menu/shield.png",
    BTN: Object.freeze({
      FULLSCREEN: "./assets/menu/fullscreen.png",
      EXIT_FULLSCREEN: "./assets/menu/exitFullscreen.png",
      PAUSE: "./assets/menu/pause.png",
      BORDER: "./assets/menu/btnBorder.png"
    }),
    ACHIEVEMENT: Object.freeze({
      BORDER: "./assets/menu/achievementBorder.png"
    })
  }),
  GAME: Object.freeze({
    TILESETS: Object.freeze({
      GROUND: "./assets/game/groundObjects/tileset_ground.png"
    }),
    BTN: Object.freeze({
      PAUSE: "./assets/game/pause.png"
    }),
    UI: Object.freeze({
      HEART: "./assets/game/heart.png",
      EXP_BORDER: "./assets/game/EXP_Border.png"
    }),
    EXP: "./assets/game/EXP.png"
  })
});

const SOUND = Object.freeze({
  BATTLE: "./assets/sound/battleTheme.mp3",
  NOMOREMAGIC: "./assets/sound/noMoreMagic.mp3",
  RISING: "./assets/sound/rising.mp3",
  FOOTSTEP: "./assets/sound/footstepGrass.mp3",
  MAGIC_SPARKLE: "./assets/sound/magicSparkle.mp3",
  HOWLER: Object.freeze({
    HURT: "./assets/sound/howlerHurt.mp3",
    ATTACK: "./assets/sound/howlerAttack.mp3"
  }),
  BTN: Object.freeze({
    SELECT: "./assets/sound/btnSelect.mp3",
    CLICK: "./assets/sound/btnClick.mp3"
  }),
  ERR: "./assets/sound/error.mp3"
});

const SPRITE_SHEETS = Object.freeze({
  CHARACTERS: Object.freeze({
    OLD_MAN: Object.freeze({
      PNG: "./assets/game/characters/OldMan.png",
      JSON: "./assets/game/characters/OldMan.json"
    }),
    HOWLER: Object.freeze({
      PNG: "./assets/game/characters/Howler.png",
      JSON: "./assets/game/characters/Howler.json"
    }),
  }),
  GROUND_OBJECTS: Object.freeze({
    PNG: "./assets/game/groundObjects/spritesheet.png",
    JSON: "./assets/game/groundObjects/spritesheet.json"
  }),
  MAGIC: Object.freeze({
    PNG: "./assets/game/magic/spritesheet.png",
    JSON: "./assets/game/magic/spritesheet.json"
  })
});

const HTML = Object.freeze({
  MENU: Object.freeze({
    INPUT: "./nameInput.html"
  })
})

const SIZES = Object.freeze({
  TITLE: "6rem",
  H1: "4rem",
  NORMAL: "3rem",
  SMALL: "2rem",
  ERR: "2rem"
});

const ACHIEVEMENTS = Object.freeze({
  NEW_ADVENTURER: "ACHIEVEMENT_NEW_ADVENTURE",
  BLINK_OF_AN_EYE: "ACHIEVEMENT_BLINK_OF_AN_EYE",
  HOWLER_HUNTER: "ACHIEVEMENT_HOWLER_HUNTER",
  FASHIONABLY_EARLY: "ACHIEVEMENT_FASHIONABLY_EARLY"
});

const STYLES = Object.freeze({
  TEXT: Object.freeze({
    TITLE: { font: `${SIZES.TITLE} 'Viaoda Libre'` },
    NORMAL: { font: `${SIZES.NORMAL} 'Vidaloka'` },
    SMALL: {
      font: `${SIZES.SMALL} 'Vidaloka'`,
      color: "#aaa",
    },
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
  HOW_TO: [
    "You shoot automatically at the nearest enemy.",
    "You can gain EXP, which allows you to level up",
    "and upgrade your abilities. To move, press anywhere",
    "on the screen and a joystick will appear for you to",
    "point in the direction you want to go.",
    "",
    "Survive as long as possible."
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
  SPRITE_SHEETS,
  ACHIEVEMENTS
};
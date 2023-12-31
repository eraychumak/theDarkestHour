const KEYS = Object.freeze({
  SCENE: Object.freeze({
    PRELOAD: "SCENE_PRELOAD",
  }),
  MENU: Object.freeze({
    BG: "MENU_BG",
    SHIELD: "MENU_SHIELD",
    INPUT: "MENU_INPUT_NAME",
    BTN: "MENU_BEGIN_GAME"
  })
});

const IMAGES = Object.freeze({
  MENU: Object.freeze({
    BG: "./assets/menu/bg.png",
    SHIELD: "./assets/menu/shield.png",
    BTN: "./assets/menu/beginGame.png"
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
  ERR: "2rem"
});

const STYLES = Object.freeze({
  TEXT: Object.freeze({
    TITLE: { font: `${SIZES.TITLE} 'Viaoda Libre Regular'` },
    NORMAL: { font: `${SIZES.NORMAL} 'Vidaloka Regular'` },
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
  STYLES,
  TEXT
};
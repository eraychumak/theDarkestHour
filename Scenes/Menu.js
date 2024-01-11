import { ACHIEVEMENTS, KEYS, STYLES, TEXT } from "../config.js";
import MenuSceneFactory from "../SceneFactory/Menu.js";
import TextButton from "../Sprites/TextButton.js";

export default class MenuScene extends MenuSceneFactory {
  constructor() {
    super(KEYS.SCENE.MENU);
  }

  init() {
    super.init();

    sessionStorage.removeItem("gameDifficulty");
    sessionStorage.removeItem("mode");
    sessionStorage.removeItem("gameLevel");
  }

  mainContent() {
    const title = super.mainContent(this.game.config.gameTitle);

    const menu = this;

    const intro = this.add.text(title.x, title.y * 1.5, TEXT.INTRO);
    intro.setStyle({
      ...STYLES.TEXT.NORMAL,
      color: "#aaa"
    })
    intro.setOrigin(0);

    const input = this.add.dom(intro.x, intro.y * 1.5).createFromCache(KEYS.MENU.INPUT);
    input.setOrigin(0);
    input.addListener("click input mouseover");

    // check if first name already exists
    const sessionfirstName = sessionStorage.getItem("firstName");

    if (sessionfirstName) {
      const domElementInput = document.getElementById("firstName");
      domElementInput.value = sessionfirstName;
    }

    const errText = this.add.text(input.x, (input.y + input.height) + 15, "", STYLES.TEXT.ERR);
    errText.setVisible(false);

    input.on("input", (e) => {
      errText.setVisible(false);
    });

    const playBtn = new TextButton(this, input.x + input.width + 20, input.y + (input.height / 4), "Play", () => {
      const firstName = document.getElementById("firstName").value;

      if (firstName.length <= 2) {
        errText.setText(TEXT.ERR.SHORT_NAME);
        errText.setVisible(true);
        menu.soundErr.play();
        return;
      }

      sessionStorage.setItem("firstName", firstName);
      localStorage.setItem(ACHIEVEMENTS.NEW_ADVENTURER, true);

      this.scene.start(KEYS.SCENE.DIFFICULTY_SELECTOR);
    });

    const achievementsBtn = new TextButton(this, playBtn.x + playBtn.width + 20, playBtn.y, "Achievements", () => {
      this.scene.start(KEYS.SCENE.ACHIEVEMENTS);

    }, { width: 350});

    const howToPlayBtn = new TextButton(this, playBtn.x, playBtn.y + playBtn.height + 20, "How To Play", () => {
      this.scene.start(KEYS.SCENE.HOW_TO_PLAY);

    }, { width: 620});

    playBtn.enableGlow();
  }
}
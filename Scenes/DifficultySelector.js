import { KEYS, STYLES } from "../config.js";
import MenuSceneFactory from "../SceneFactory/Menu.js";
import TextButton from "../Sprites/TextButton.js";

export default class DifficultySelectorScene extends MenuSceneFactory {
  constructor() {
    super(KEYS.SCENE.DIFFICULTY_SELECTOR);
  }

  #continueSelectMode() {
    this.scene.start(KEYS.SCENE.MODE_SELECTOR)
  }

  mainContent() {
    const title = super.mainContent("Select difficulty");

    const btnEasy = new TextButton(this, title.x, title.y * 1.5, "Easy", () => {
      sessionStorage.setItem("gameDifficulty", "easy");
      this.#continueSelectMode();
    });

    // ? Description - Difficulty Mode - Easy
    this.add.text(
      btnEasy.x, btnEasy.y * 1.3,
      "Take half the damage from enemies—lose only half a heart per hit.",
      {...STYLES.TEXT.SMALL, wordWrap: { width: 340 }, lineSpacing: 18}
    );

    const btnNormal = new TextButton(this, (btnEasy.x + btnEasy.width) + 150, btnEasy.y, "Normal", () => {
      sessionStorage.setItem("gameDifficulty", "normal");
      this.#continueSelectMode();
    });

    // ? Description - Difficulty Mode - Normal
    this.add.text(
      btnNormal.x, btnNormal.y * 1.3,
      "Face enemies at standard difficulty—1 hit equals 1 heart lost.",
      {...STYLES.TEXT.SMALL, wordWrap: { width: 340 }, lineSpacing: 18}
    );

    const btnHard = new TextButton(this, (btnNormal.x + btnNormal.width) + 150, btnNormal.y, "Hard", () => {
      sessionStorage.setItem("gameDifficulty", "hard");
      this.#continueSelectMode();
    });

    // ? Description - Difficulty Mode - Hard
    this.add.text(
      btnHard.x, btnHard.y * 1.3,
      "Brace yourself with just 1 heart—challenge accepted?",
      {...STYLES.TEXT.SMALL, wordWrap: { width: 340 }, lineSpacing: 18}
    );
  }
}
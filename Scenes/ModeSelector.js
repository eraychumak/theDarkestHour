import { KEYS, STYLES } from "../config.js";
import MenuSceneFactory from "../SceneFactory/Menu.js";
import TextButton from "../Sprites/TextButton.js";

export default class ModeSelector extends MenuSceneFactory {
  constructor() {
    super(KEYS.SCENE.MODE_SELECTOR);
  }

  #startGame() {
    const fx = this.cameras.main.postFX.addWipe(0.1, 0, 0);

    this.scene.transition({
      target: KEYS.SCENE.GAME,
      duration: 2000,
      moveBelow: true,
      onUpdate: (progress) => {
        fx.progress = progress;
      }
    });
  }

  mainContent() {
    const title = super.mainContent("Select mode");

    const btnPvC = new TextButton(this, title.x, title.y * 1.5, "Player vs Computer", () => {
      sessionStorage.setItem("mode", "pvc");
      this.#startGame();
    }, { width: 500 });

    // ? Description - Mode - Player vs Computer
    this.add.text(
      btnPvC.x, btnPvC.y * 1.3,
      "It's a lonely world out there. Fend off the howlers by yourself.",
      {...STYLES.TEXT.SMALL, wordWrap: { width: 500 }, lineSpacing: 18}
    );

    const btnPvP = new TextButton(this, (btnPvC.x + btnPvC.width) + 100, btnPvC.y, "Player vs Player", () => {
      sessionStorage.setItem("mode", "pvp");
      this.#startGame();
    }, { width: 500 });

    // ? Description - Difficulty Mode - Normal
    this.add.text(
      btnPvP.x, btnPvP.y * 1.3,
      "The two of you against the world. However, only one of you can perform magic and the game will end if one of you dies.",
      {...STYLES.TEXT.SMALL, wordWrap: { width: 500 }, lineSpacing: 18}
    );
  }
}
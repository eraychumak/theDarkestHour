import { KEYS, STYLES } from "../config.js";
import MenuSceneFactory from "../SceneFactory/Menu.js";
import TextButton from "../Sprites/TextButton.js";

export default class PauseScene extends MenuSceneFactory {
  constructor() {
    super(KEYS.SCENE.PAUSE, false);
  }

  init(data) {
    super.init();

    const currentTime = data.time;

    const minutes = ("0" + Math.floor(currentTime / 60)).slice(-2);
    const seconds = ("0" + currentTime % 60).slice(-2);

    this.time = `${minutes}:${seconds}`;
    this.howlerDeaths = parseInt(data.howlerDeaths || 0);
  }

  mainContent() {
    const title = super.mainContent("GAME PAUSED");

    const timeElapsed = this.add.text(
      title.x, title.y * 1.5,
      `Time Elapsed: ${this.time}`,
      {...STYLES.TEXT.SMALL, wordWrap: { width: 340 }, lineSpacing: 18}
    );

    const howlerDeaths = this.add.text(
      timeElapsed.x, (timeElapsed.y + timeElapsed.height) + 20,
      `Howlers Defeated: ${this.howlerDeaths}`,
      {...STYLES.TEXT.SMALL, wordWrap: { width: 340 }, lineSpacing: 18}
    );

    const btnResume = new TextButton(this, howlerDeaths.x, howlerDeaths.y * 1.2, "Resume", () => {
      this.scene.resume(KEYS.SCENE.GAME);
      this.scene.stop();
    });

    // btnExit
    new TextButton(this, btnResume.width + btnResume.x + 50, btnResume.y, "Exit Game", () => {
      this.scene.stop(KEYS.SCENE.GAME);
      this.scene.start(KEYS.SCENE.MENU);
    });
  }
}
import { KEYS, STYLES, TEXT } from "../config.js";
import MenuSceneFactory from "../SceneFactory/Menu.js";
import TextButton from "../Sprites/TextButton.js";

export default class HowToPlayScene extends MenuSceneFactory {
  constructor() {
    super(KEYS.SCENE.HOW_TO_PLAY);
  }

  mainContent() {
    const title = super.mainContent("How to play");

    const howTo = this.add.text(title.x, (title.y + title.height) * 1.1, TEXT.HOW_TO, STYLES.TEXT.SMALL);
    howTo.setLineSpacing(24);

    // btnExit
    new TextButton(this, howTo.x, howTo.y + howTo.height + 30, "Menu", () => {
      this.scene.start(KEYS.SCENE.MENU);
    });
  }
}
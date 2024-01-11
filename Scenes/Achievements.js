import { ACHIEVEMENTS, KEYS } from "../config.js";
import MenuSceneFactory from "../SceneFactory/Menu.js";
import Achievement from "../Sprites/Achievement.js";
import TextButton from "../Sprites/TextButton.js";

export default class AchievementsScene extends MenuSceneFactory {
  constructor() {
    super(KEYS.SCENE.ACHIEVEMENTS);
  }

  init(data) {
    super.init();

    const currentTime = data.time;

    const minutes = ("0" + Math.floor(currentTime / 60)).slice(-2);
    const seconds = ("0" + currentTime % 60).slice(-2);

    this.time = `${minutes}:${seconds}`;
  }

  mainContent() {
    const title = super.mainContent("Achievements");

    const newAdventurer = new Achievement(
      this,
      {
        x: title.x,
        y: title.y * 1.5,
        key: ACHIEVEMENTS.NEW_ADVENTURER,
        label: "New Adventurer",
        desc: "Played the game for the first time."
      },
      () => {
      }
    );

    // blinkOfAnEye achievement
    new Achievement(
      this,
      {
        x: newAdventurer.x + newAdventurer.width + 50,
        y: newAdventurer.y,
        key: ACHIEVEMENTS.BLINK_OF_AN_EYE,
        label: "Blink of an Eye",
        desc: "Survive for at-least 60 seconds in the game"
      },
      () => {
      }
    );

    const howlerHunter = new Achievement(
      this,
      {
        x: newAdventurer.x,
        y: newAdventurer.y + newAdventurer.height + 50,
        key: ACHIEVEMENTS.HOWLER_HUNTER,
        label: "Howler Hunter",
        desc: "All-time record in defeating 200 howlers."
      },
      () => {
      }
    );

    // fashionablyEarly button
    new Achievement(
      this,
      {
        x: howlerHunter.x + howlerHunter.width + 50,
        y: howlerHunter.y,
        key: ACHIEVEMENTS.FASHIONABLY_EARLY,
        label: "Fashionably Early",
        desc: "Rushed to afterlife, dead before 60 seconds. "
      },
      () => {
      }
    );

    // btnExit
    new TextButton(this, howlerHunter.x, howlerHunter.y + howlerHunter.height + 50, "Menu", () => {
      this.scene.stop(KEYS.SCENE.GAME);
      this.scene.start(KEYS.SCENE.MENU);
    });
  }
}
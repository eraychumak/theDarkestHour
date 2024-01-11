import PreloadScene from "./Scenes/Preload.js";
import MenuScene from "./Scenes/Menu.js";
import GameScene from "./Scenes/Game.js";
import DifficultySelectorScene from "./Scenes/DifficultySelector.js";
import PauseScene from "./Scenes/Pause.js";
import GameOverScene from "./Scenes/GameOver.js";
import AchievementsScene from "./Scenes/Achievements.js";
import LevelUpScene from "./Scenes/LevelUp.js";

const config = {
  type: Phaser.AUTO,
  parent: "game",
  dom: {
    createContainer: true
  },
  scene: [PreloadScene, MenuScene, DifficultySelectorScene, GameScene, PauseScene, GameOverScene, AchievementsScene, LevelUpScene],
  backgroundColor: "#1F0E1C",
  scale: {
    width: 1920,
    height: 1080,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.BOTH
  },
  title: "The Darkest Hour",
  version: 1,
  banner: {
    hidePhaser: true
  },
  pixelArt: true,
  physics: {
    default: "arcade"
  }
};

WebFont.load({
  google: {
    families: ["Viaoda Libre", "Vidaloka", "Viga"]
  },
  active: startGame
});

function startGame() {
  new Phaser.Game(config);
}

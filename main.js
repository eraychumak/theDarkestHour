import PreloadScene from "./Scenes/Preload.js";
import MenuScene from "./Scenes/Menu.js";
import GameScene from "./Scenes/Game.js";

const config = {
  type: Phaser.AUTO,
  parent: "game",
  dom: {
    createContainer: true
  },
  scene: [PreloadScene, MenuScene, GameScene],
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
  },
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

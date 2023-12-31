import MenuScene from "./Scenes/Menu.js";

const config = {
  type: Phaser.AUTO,
  parent: "game",
  dom: {
    createContainer: true
  },
  scene: [MenuScene],
  backgroundColor: "#1F0E1C",
  scale: {
    width: 1920,
    height: 1080,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.BOTH
  },
  title: "The Darkest Hour",
};

WebFont.load({
  google: {
    families: ["Viaoda Libre"]
  },
  active: startGame
});

function startGame() {
  new Phaser.Game(config);
}

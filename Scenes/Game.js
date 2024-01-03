import Player from "../Sprites/Player.js";
import { KEYS, STYLES } from "../config.js";

// .5% probability of getting True
const Probability_005 = () => Math.random() < .005;

// 1% probability of getting True
const Probability_01 = () => Math.random() < .01;

// 30% probability of getting True
const Probability_30 = () => Math.random() < .3;

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: KEYS.SCENE.GAME
    })
  }

  init() {
    // fade out any music music from previous scenes.
    const musicArray = this.sound.getAllPlaying();

    this.tweens.add({
      targets: musicArray,
      volume: 0,
      duration: 3_000
    });
  }

  create() {
    const music01 = this.sound.add(KEYS.SOUND.RISING, {
      loop: true,
      volume: 0
    });

    music01.play();

    this.tweens.add({
      targets: music01,
      volume: {
        from: 0,
        to: .8
      },
      duration: 3_000
    });

    const camera = this.cameras.main;
    camera.postFX.addVignette(0.5, 0.5, 1);

    let data = [];

    const maxChunkSize = Math.min(this.game.config.height / 32, this.game.config.width / 32) * 10;

    for (let x = 0; x < (this.game.config.height / 32); x++) {
      data[x] = [];

      for (let y = 0; y < (this.game.config.width / 32); y++) {
        data[x][y] = 37;
      }
    }

    const map = this.make.tilemap({
      data: data,
      tileWidth: 32,
      tileHeight: 32
    });

    map.addTilesetImage(KEYS.GAME.GROUND_TILES);
    map.createLayer(0, KEYS.GAME.GROUND_TILES, 0, 0);

    const atlasGroundObjects = this.textures.get(KEYS.GAME.GROUND_OBJECTS);
    const frames = atlasGroundObjects.getFrameNames();

    frames.forEach(frame => {
      for (let x = 0; x <= maxChunkSize; x++) {
        if (frame.includes("Shadow")) continue;

        let show = false;

        if (frame.includes("Grass")) show = Probability_30();
        if (frame.includes("Flower")) show = Probability_01();
        if (frame.includes("Stone")) show = Probability_005();
        if (frame.includes("Tree")) show = Probability_01();
        if (frame.includes("Bush")) show = Probability_01();
        if (frame.includes("Log")) show = Probability_005();

        if (!show) continue;

        const x = Phaser.Math.Between(0, this.game.config.width);
        const y = Phaser.Math.Between(0, this.game.config.height);

        // adds shadow to trees
        if (frame === "Tree_01") {
          this.add.image(x, y + 35, KEYS.GAME.GROUND_OBJECTS, "Shadow_06_Tree_01");
        }

        if (frame === "Tree_02") {
          this.add.image(x, y + 5, KEYS.GAME.GROUND_OBJECTS, "Shadow_03_Tree_02");
        }

        this.add.image(x, y, KEYS.GAME.GROUND_OBJECTS, frame).setScale(1);
      }
    });

    this.player = new Player(this, this.game.config.width / 2, this.game.config.height / 2);
    this.player.enableControls();

    const playerSprite = this.player.sprite;
    playerSprite.setScale(2);

    const timer = this.add.text(
      this.game.config.width / 2,
      this.game.config.height * .01,
      "00:00",
      STYLES.TEXT.GAME
    );

    timer.setPosition(
      this.game.config.width / 2,
      (timer.height / 2) + 10
    );

    timer.setDataEnabled();
    timer.data.set("time", 0);

    setInterval(() => {
      const currentTime = timer.data.get("time");
      const newTime = currentTime + 1;

      const minutes = ("0" + Math.floor(newTime / 60)).slice(-2);
      const seconds = ("0" + newTime % 60).slice(-2);

      timer.data.set("time", newTime);
      timer.setText(`${minutes}:${seconds}`);
    }, 1_000);

    timer.setOrigin(.5);

    const btn = this.add.image(
      this.game.config.width - 48,
      48,
      KEYS.GAME.BTN.PAUSE
    );

    btn.setOrigin(.5);
    btn.setInteractive();

    btn.on("pointerdown", () => {
      this.scene.start(KEYS.SCENE.MENU);
    });

    btn.on("pointerover", () => btn.setScale(1.1));
    btn.on("pointerout", () => btn.setScale(1));
  }

  update() {
    this.player.update();
  }
}
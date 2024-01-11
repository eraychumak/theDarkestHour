import Howler from "../Sprites/Howler.js";
import Player from "../Sprites/Player.js";
import { ACHIEVEMENTS, KEYS, STYLES } from "../config.js";

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
    });
  }

  init() {
    console.log(`[${KEYS.SCENE.GAME}:init] Invoked`);
    // fade out any music music from previous scenes.
    const musicArray = this.sound.getAllPlaying();

    this.tweens.add({
      targets: musicArray,
      volume: 0,
      duration: 3_000
    });

    sessionStorage.setItem("gameLevel", 0);
    this.mode = sessionStorage.getItem("mode");
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

    // ground objects which player can collide
    const collisionObjectKeys = ["Tree_01", "Tree_02", "Log_01", "Log_02", "Log_03", "Stone"];
    const collisionObjects = this.physics.add.staticGroup({
      immovable: true
  });;

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

        const groundObject = this.add.image(x, y, KEYS.GAME.GROUND_OBJECTS, frame).setScale(1);

        if (collisionObjectKeys.includes(frame)) {
          collisionObjects.add(groundObject);
          this.physics.add.existing(groundObject);
        }
      }
    });

    this.player = new Player(this, this.game.config.width / 2, this.game.config.height / 2, 0);
    this.player.enableControls();
    this.player.enableShooting();
    this.player.showName();
    this.player.showHearts();
    this.player.updateHearts();
    this.player.showEXP();

    const playerSprite = this.player.sprite;
    playerSprite.setScale(2);

    console.log(this.mode);

    if (this.mode === "pvp") {
      this.player2 = new Player(this, (this.game.config.width / 2) - 100, this.game.config.height / 2, 1);
      this.player2.enableControls();
      this.player2.showName();
      this.player2.showHearts();
      this.player2.updateHearts();

      this.input.addPointer(1);
    }

    this.enemies = this.physics.add.group({
      classType: Howler,
      collideWorldBounds: true,
      bounceX: 1,
      bounceY: 1
    });

    if (this.mode === "pvp") {
      const player2Sprite = this.player2.sprite;
      player2Sprite.setScale(2);

      this.physics.add.collider(player2Sprite, [ collisionObjects ]);
      this.physics.add.collider(player2Sprite, this.enemies, (_, enemy) => {
        if (enemy.dead) return;
        this.player2.hurt();
        enemy.attackPlayer();
      });
    }

    this.physics.add.collider(playerSprite, [ collisionObjects ]);
    this.physics.add.collider(playerSprite, this.enemies, (_, enemy) => {
      if (enemy.dead) return;
      this.player.hurt();
      enemy.attackPlayer();
    });

    const textTimer = this.add.text(
      this.game.config.width / 2,
      this.game.config.height * .01,
      "00:00",
      STYLES.TEXT.GAME
    );

    textTimer.setPosition(
      this.game.config.width / 2,
      (textTimer.height / 2) + 10
    );

    textTimer.setDataEnabled();
    this.data.set("time", 0);

    const players = [this.player.sprite];

    if (this.mode === "pvp") {
      players.push(this.player2.sprite);
    }

    // runs every second
    this.time.addEvent({
      delay: 1_000,
      loop: true,
      callback: this.timerHandler,
      args: [this, textTimer, this.enemies, players]
    });

    textTimer.setOrigin(.5);

    const btnPause = this.add.image(
      this.game.config.width - 48,
      48,
      KEYS.GAME.BTN.PAUSE
    );

    btnPause.setOrigin(.5);
    btnPause.setInteractive();

    btnPause.on("pointerdown", () => {
      this.scene.pause();
      this.scene.launch(KEYS.SCENE.PAUSE, {
        time: this.data.get("time"),
        howlerDeaths: this.data.get("howlerDeaths")
      });
    });

    btnPause.on("pointerover", () => btnPause.setScale(1.1));
    btnPause.on("pointerout", () => btnPause.setScale(1));
  }

  timerHandler(scene, textTimer, enemies, players) {
    const currentTime = scene.data.get("time");
    const newTime = currentTime + 1;

    const minutes = ("0" + Math.floor(newTime / 60)).slice(-2);
    const seconds = ("0" + newTime % 60).slice(-2);

    scene.data.set("time", newTime);
    textTimer.setText(`${minutes}:${seconds}`);

    // increase game level every minute
    if (newTime % 60 === 0) {
      const currentLevel = parseInt(sessionStorage.getItem("gameLevel") || 0);
      sessionStorage.setItem("gameLevel", currentLevel + 1);
    }

    if (newTime % 5 === 0) {
      let quantity = 1;

      if (newTime % 30 === 0) {
        const max = Phaser.Math.Between(2, 5);
        quantity = Phaser.Math.Between(1, max);
      }

      for (let x = 0; x < quantity; x++) {
        const targetPlayer = players[Phaser.Math.Between(0, players.length - 1)];
        Howler.spawn(scene, enemies, targetPlayer);
      }
    }

    if (newTime >= 60) {
      localStorage.setItem(ACHIEVEMENTS.BLINK_OF_AN_EYE, true);
    }
  }

  update() {
    this.player.update();

    if (this.mode === "pvp") {
      this.player2.update();
    }

    const closestEnemyToPlayer = this.physics.closest(this.player.sprite, this.enemies.getMatching("dead", false));
    this.player.updateCurrentTarget(closestEnemyToPlayer);
    this.player.updateTargets(this.enemies.getMatching("dead", false));
  }
}
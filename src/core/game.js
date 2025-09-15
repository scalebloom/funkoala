// src/core/game.js
import { player } from "./player/player.js";
import { Input } from "./input.js";
import { Renderer } from "./renderer.js";
import { Camera } from "./camera.js";

export class Game {
  constructor() {
    this.canvas = document.getElementById("gameCanvas");
    this.ctx = this.canvas.getContext("2d");

    this.init();
  }

  init() {
    this.resizeCanvas();
    player.init();
    player.setGroundLevel(this.canvas.height);
    Input.init(this.canvas);

    window.addEventListener("resize", () => this.resizeCanvas());

    this.gameLoop();
  }

  resizeCanvas() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
    player.setGroundLevel(this.canvas.height);
  }

  update() {
    player.update(this.canvas);
    Camera.update(this.canvas);
  }

  render() {
    Renderer.render(this.ctx, this.canvas);
    player.draw(this.ctx);
  }

  gameLoop() {
    this.update();
    this.render();
    requestAnimationFrame(() => this.gameLoop());
  }
}

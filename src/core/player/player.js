import { gameState } from "../gameState.js";
import { Sprite } from "../sprite.js";

export class player {
  static idleSprite = null;
  static runningSprite = null;
  static currentSprite = null;

  static idleConfig = {
    src: "./src/core/player/koala-idle-sprite.png",
    cols: 4,
    rows: 3,
    frameCount: 12,
    scale: 0.25, // Scale down the large sprite frames
    animated: true,
    animationSpeed: 8, // Frames to wait between animation frames
    anchor: "bottom-center", // How sprite is positioned relative to player coords
    // Game world dimensions (for collision detection and positioning)
    logicalWidth: 40,
    logicalHeight: 60,
  };

  static runningConfig = {
    src: "./src/core/player/koala-running-sprite.png",
    cols: 4,
    rows: 3,
    frameCount: 11, // Running sprite has 11 frames vs idle's 12
    scale: 0.25, // Scale down the large sprite frames
    animated: true,
    animationSpeed: 6, // Faster animation for running (6 vs idle's 8)
    anchor: "bottom-center", // How sprite is positioned relative to player coords
    // Game world dimensions (for collision detection and positioning)
    logicalWidth: 40,
    logicalHeight: 60,
  };

  static init() {
    this.idleSprite = new Sprite(this.idleConfig);
    this.runningSprite = new Sprite(this.runningConfig);
    this.currentSprite = this.idleSprite;
  }
  static update(canvas) {
    // Switch sprites based on movement state
    if (gameState.player.isMoving) {
      if (this.currentSprite !== this.runningSprite) {
        this.currentSprite = this.runningSprite;
        this.currentSprite.reset(); // Reset animation when switching
      }

      gameState.player.x += gameState.moveSpeed;
    } else {
      if (this.currentSprite !== this.idleSprite) {
        this.currentSprite = this.idleSprite;
        this.currentSprite.reset(); // Reset animation when switching
      }
    }

    // Update current sprite animation
    if (this.currentSprite) {
      this.currentSprite.update();
    }
  }

  static draw(ctx) {
    if (this.currentSprite) {
      this.currentSprite.draw(ctx, gameState.player.x - gameState.camera.x, gameState.player.y);
    }
  }

  static setGroundLevel(canvasHeight) {
    gameState.player.y = canvasHeight - gameState.player.height - 50;
  }
}

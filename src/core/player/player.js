import { gameState } from "../gameState.js";
import { Sprite } from "../sprite.js";

export class player {
  static idleSprite = null;
  static runningSprite = null;
  static currentSprite = null;

  static getResponsiveScale() {
    return window.innerWidth < 600 ? 0.22 : Math.max(0.24, window.innerWidth * 0.0002);
  } // Bigger on mobile, responsive on desktop

  static idleConfig = {
    src: "./src/core/player/koala-idle-sprite.png",
    cols: 4,
    rows: 3,
    frameCount: 12,
    get scale() {
      return player.getResponsiveScale();
    },
    animated: true,
    animationSpeed: 8, // Frames to wait between animation frames
    anchor: "bottom-center", // How sprite is positioned relative to player coords
    // Game world dimensions (for collision detection and positioning) - use responsive values
    get logicalWidth() {
      return gameState.player.width;
    },
    get logicalHeight() {
      return gameState.player.height;
    },
  };

  static runningConfig = {
    src: "./src/core/player/koala-running-sprite.png",
    cols: 4,
    rows: 3,
    frameCount: 11, // Running sprite has 11 frames vs idle's 12
    get scale() {
      return player.getResponsiveScale();
    },
    animated: true,
    animationSpeed: 6, // Faster animation for running (6 vs idle's 8)
    anchor: "bottom-center", // How sprite is positioned relative to player coords
    // Game world dimensions (for collision detection and positioning) - use responsive values
    get logicalWidth() {
      return gameState.player.width;
    },
    get logicalHeight() {
      return gameState.player.height;
    },
  };

  static init() {
    this.idleSprite = new Sprite(this.idleConfig);
    this.runningSprite = new Sprite(this.runningConfig);
    this.currentSprite = this.idleSprite;
  }
  static update(canvas) {
    // Switch sprites based on animation state
    if (gameState.player.isRunning) {
      if (this.currentSprite !== this.runningSprite) {
        this.currentSprite = this.runningSprite;
        this.currentSprite.reset(); // Reset animation when switching
      }
    } else {
      if (this.currentSprite !== this.idleSprite) {
        this.currentSprite = this.idleSprite;
        this.currentSprite.reset(); // Reset animation when switching
      }
    }

    // Handle movement based on movement type
    if (gameState.player.movementType === 'continuous') {
      gameState.player.x += gameState.moveSpeed;
    }
    // Dashing movement is handled by the input system's animation

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
    // Position player on ground (responsive)
    const groundLevel = canvasHeight * 0.905;
    gameState.player.y = groundLevel - gameState.player.height;
  }
}

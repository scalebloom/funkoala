import { gameState } from "./gameState.js";

export class Camera {
  static followThreshold = 0.15; // When to start following (as fraction of screen width)
  static followOffset = 0.15; // Where to position player when following

  static update(canvas) {
    // Always smooth toward target when player is beyond threshold
    if (gameState.player.x - gameState.camera.x > canvas.width * this.followThreshold) {
      const targetX = gameState.player.x - canvas.width * this.followOffset;
      gameState.camera.x += (targetX - gameState.camera.x) * 0.1;
    }
  }

  static setFollowSettings(threshold, offset) {
    this.followThreshold = threshold;
    this.followOffset = offset;
  }

  static reset() {
    gameState.camera.x = 0;
    gameState.camera.y = 0;
  }

  static getWorldToScreenX(worldX) {
    return worldX - gameState.camera.x;
  }

  static getWorldToScreenY(worldY) {
    return worldY - gameState.camera.y;
  }

  static getScreenToWorldX(screenX) {
    return screenX + gameState.camera.x;
  }

  static getScreenToWorldY(screenY) {
    return screenY + gameState.camera.y;
  }
}

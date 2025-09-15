import { gameState } from "./gameState.js";

export class Camera {
  static followThreshold = 0.15; // When to start following (as fraction of screen width)
  static followOffset = 0.15; // Where to position player when following

  static update(canvas) {
    // Follow player when they move beyond threshold
    if (gameState.player.isMoving) {
      if (gameState.player.x - gameState.camera.x > canvas.width * this.followThreshold) {
        gameState.camera.x = gameState.player.x - canvas.width * this.followOffset;
      }
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

import { gameState } from "./gameState.js";

export class Input {
  static init(canvas) {
    this.setupKeyboardControls();
    this.setupMouseControls(canvas);
    this.setupTouchControls(canvas);
  }

  static setupKeyboardControls() {
    document.addEventListener("keydown", (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        gameState.player.isMoving = true;
      }
    });

    document.addEventListener("keyup", (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        gameState.player.isMoving = false;
      }
    });
  }

  static setupMouseControls(canvas) {
    canvas.addEventListener("mousedown", (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Check if click is on player
      const charScreenX = gameState.player.x - gameState.camera.x;
      if (
        mouseX >= charScreenX &&
        mouseX <= charScreenX + gameState.player.width &&
        mouseY >= gameState.player.y &&
        mouseY <= gameState.player.y + gameState.player.height
      ) {
        gameState.player.isMoving = true;
      }
    });

    canvas.addEventListener("mouseup", (e) => {
      gameState.player.isMoving = false;
    });
  }

  static setupTouchControls(canvas) {
    canvas.addEventListener("touchstart", (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      const touchX = touch.clientX - rect.left;
      const touchY = touch.clientY - rect.top;

      // Check if touch is on player
      const charScreenX = gameState.player.x - gameState.camera.x;
      if (
        touchX >= charScreenX &&
        touchX <= charScreenX + gameState.player.width &&
        touchY >= gameState.player.y &&
        touchY <= gameState.player.y + gameState.player.height
      ) {
        gameState.player.isMoving = true;
      }
    }, { passive: false });

    canvas.addEventListener("touchend", (e) => {
      e.preventDefault();
      gameState.player.isMoving = false;
    }, { passive: false });
  }
}

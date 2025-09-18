import { gameState } from "./gameState.js";

export class Input {
  static pressStartTime = 0;
  static holdThreshold = 400; // ms to distinguish tap vs hold

  static init(canvas) {
    this.setupKeyboardControls();
    this.setupMouseControls(canvas);
    this.setupTouchControls(canvas);
  }

  static setupKeyboardControls() {
    document.addEventListener("keydown", (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        this.handleActionStart();
      }
    });

    document.addEventListener("keyup", (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        this.handleActionEnd();
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
        this.handleActionStart();
      }
    });

    canvas.addEventListener("mouseup", (e) => {
      this.handleActionEnd();
    });
  }

  static setupTouchControls(canvas) {
    canvas.addEventListener(
      "touchstart",
      (e) => {
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
          this.handleActionStart();
        }
      },
      { passive: false }
    );

    canvas.addEventListener(
      "touchend",
      (e) => {
        e.preventDefault();
        this.handleActionEnd();
      },
      { passive: false }
    );
  }

  static handleActionStart() {
    if (gameState.player.movementType !== "idle") return; // Prevent multiple actions

    this.pressStartTime = Date.now();

    // Start hold timer - if held longer than threshold, switch to continuous
    this.holdTimer = setTimeout(() => {
      gameState.player.movementType = "continuous";
      gameState.player.isRunning = true;
    }, this.holdThreshold);
  }

  static handleActionEnd() {
    const pressDuration = Date.now() - this.pressStartTime;

    // Clear hold timer
    if (this.holdTimer) {
      clearTimeout(this.holdTimer);
      this.holdTimer = null;
    }

    if (gameState.player.movementType === "continuous") {
      // End continuous movement
      gameState.player.movementType = "idle";
      gameState.player.isRunning = false;
    } else if (pressDuration < this.holdThreshold) {
      // Quick tap = dash
      this.performDash();
    } else {
      // Reset if something went wrong
      gameState.player.movementType = "idle";
      gameState.player.isRunning = false;
    }
  }

  static performDash() {
    gameState.player.movementType = "dashing";
    gameState.player.isRunning = true;

    // Animate the dash with natural acceleration/deceleration
    const dashDuration = 1000; // Longer duration for smoother  animation
    const startX = gameState.player.x;
    const targetX = startX + gameState.dashDistance;
    const startTime = Date.now();

    const animateDash = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / dashDuration, 1);

      // Natural ease-in-out curve (like a real jump/dash)
      // Starts slow, accelerates to middle, then decelerates
      let easeProgress;
      if (progress < 0.5) {
        // Ease in (acceleration phase)
        easeProgress = 2 * progress * progress;
      } else {
        // Ease out (deceleration phase)
        easeProgress = 1 - 2 * Math.pow(1 - progress, 2);
      }

      gameState.player.x = startX + (targetX - startX) * easeProgress;

      if (progress < 1) {
        requestAnimationFrame(animateDash);
      } else {
        // Dash complete
        gameState.player.movementType = "idle";
        gameState.player.isRunning = false;
      }
    };

    requestAnimationFrame(animateDash);
  }
}

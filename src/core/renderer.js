import { gameState } from "./gameState.js";

export class Renderer {
  static drawBackground(ctx, canvas) {
    ctx.strokeStyle = "#6d3b3bff";
    ctx.lineWidth = 2;

    // Vertical lines that move with camera
    for (let x = -gameState.camera.x % 100; x < canvas.width; x += 100) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    // Ground line
    ctx.strokeStyle = "#542828ff";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, canvas.height - 50);
    ctx.lineTo(canvas.width, canvas.height - 50);
    ctx.stroke();
  }

  static render(ctx, canvas) {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw game elements
    this.drawBackground(ctx, canvas);
  }
}

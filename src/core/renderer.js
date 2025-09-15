import { gameState } from "./gameState.js";

export class Renderer {
  static drawBackground(ctx, canvas) {
    ctx.strokeStyle = "#6d3b3bff";
    ctx.lineWidth = 2;

    // Vertical lines that move with camera (responsive spacing)
    const gridSpacing = Math.max(80, canvas.width * 0.06);
    for (let x = -gameState.camera.x % gridSpacing; x < canvas.width; x += gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    // Ground line (responsive - 90% down the screen)
    ctx.strokeStyle = "#542828ff";
    ctx.lineWidth = 4;
    ctx.beginPath();
    const groundLevel = canvas.height * 0.9;
    ctx.moveTo(0, groundLevel);
    ctx.lineTo(canvas.width, groundLevel);
    ctx.stroke();
  }

  static render(ctx, canvas) {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw game elements
    this.drawBackground(ctx, canvas);
  }
}

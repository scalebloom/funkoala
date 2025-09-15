export class Sprite {
  constructor(config) {
    this.config = config;
    this.image = null;
    this.loaded = false;
    this.currentFrame = 0;
    this.frameCounter = 0;
    this.frameWidth = config.frameWidth; // Use provided value if available
    this.frameHeight = config.frameHeight; // Use provided value if available

    this.load();
  }

  load() {
    this.image = new Image();
    this.image.onload = () => {
      // Auto-calculate frame dimensions if not provided
      if (!this.frameWidth && this.config.cols) {
        this.frameWidth = this.image.width / this.config.cols;
      }
      if (!this.frameHeight && this.config.rows) {
        this.frameHeight = this.image.height / this.config.rows;
      }
      this.loaded = true;
    };
    this.image.src = this.config.src;
  }

  update() {
    if (!this.config.animated) return;
    
    this.frameCounter++;
    if (this.frameCounter >= this.config.animationSpeed) {
      this.currentFrame = (this.currentFrame + 1) % this.config.frameCount;
      this.frameCounter = 0;
    }
  }

  draw(ctx, x, y, customFrame = null) {
    if (!this.loaded) {
      return; // Don't draw anything until sprite loads
    }

    const frame = customFrame !== null ? customFrame : this.currentFrame;
    
    // Calculate sprite sheet position
    const col = frame % this.config.cols;
    const row = Math.floor(frame / this.config.cols);

    // Calculate display dimensions
    const displayWidth = this.frameWidth * this.config.scale;
    const displayHeight = this.frameHeight * this.config.scale;
    
    // Calculate anchor-based positioning
    let drawX, drawY;
    
    switch (this.config.anchor) {
      case 'bottom-center':
        drawX = x - (displayWidth - this.config.logicalWidth) / 2;
        drawY = y + this.config.logicalHeight - displayHeight;
        break;
      case 'center':
        drawX = x - (displayWidth - this.config.logicalWidth) / 2;
        drawY = y - (displayHeight - this.config.logicalHeight) / 2;
        break;
      case 'top-left':
      default:
        drawX = x;
        drawY = y;
        break;
    }
    
    ctx.drawImage(
      this.image,
      col * this.frameWidth,
      row * this.frameHeight,
      this.frameWidth,
      this.frameHeight,
      drawX,
      drawY,
      displayWidth,
      displayHeight
    );
  }

  setFrame(frame) {
    this.currentFrame = Math.max(0, Math.min(frame, this.config.frameCount - 1));
  }

  reset() {
    this.currentFrame = 0;
    this.frameCounter = 0;
  }
}
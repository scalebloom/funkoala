// Centralized state store - holds all game data that multiple systems need to access
// This is the "model" while player.js and camera.js are "controllers" that manipulate this data
export const gameState = {
  player: {
    x: window.innerWidth * 0.1, // Start at 20% from left edge (responsive)
    y: 0,
    width: Math.max(30, window.innerWidth * 0.035), // Responsive width: 3.5% of screen, min 30px
    height: Math.max(45, window.innerWidth * 0.05), // Responsive height: 5% of screen, min 45px
    isMoving: false,
  },
  camera: {
    x: 0,
  },
  moveSpeed: 3,
};

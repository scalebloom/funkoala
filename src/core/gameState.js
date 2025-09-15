// Centralized state store - holds all game data that multiple systems need to access
// This is the "model" while player.js and camera.js are "controllers" that manipulate this data
export const gameState = {
  player: {
    x: window.innerWidth * 0.1, // Start at 20% from left edge (responsive)
    y: 0,
    width: 40,
    height: 60,
    isMoving: false,
  },
  camera: {
    x: 0,
  },
  moveSpeed: 3,
};

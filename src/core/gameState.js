// Centralized state store - holds all game data that multiple systems need to access
// This is the "model" while player.js and camera.js are "controllers" that manipulate this data
export const gameState = {
  player: {
    x: window.innerWidth * 0.1, // Start at 20% from left edge (responsive)
    y: 0,
    width: Math.max(60, window.innerWidth * 0.07), // Responsive width: 7% of screen, min 60px - sized for clickability
    height: Math.max(90, window.innerWidth * 0.1), // Responsive height: 10% of screen, min 90px - sized for clickability
    isRunning: false, // For animation state
    movementType: "idle", // 'idle', 'continuous', 'dashing'
  },
  camera: {
    x: 0,
  },
  moveSpeed: 3,
  dashDistance: 300,
};

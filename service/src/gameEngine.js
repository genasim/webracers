import { playerStoreService } from './playerStore.js';

export class GameEngine {
  constructor(io) {
    this.io = io;
    this.tickRate = 100;
    this.interval = null;
  }

  start() {
    this.interval = setInterval(() => {
      this.update();
    }, this.tickRate);
  }

  update() {
    playerStoreService.updatePlayerPositions();
    this.io.emit('game_update', {
      players: playerStoreService.getPlayers(),
    });
  }

  stop() {
    clearInterval(this.interval);
  }
}

import { io } from 'https://cdn.socket.io/4.8.1/socket.io.esm.min.js';

const canvas = document.getElementById('canvas');
export const ctx = canvas.getContext('2d');

export class Engine {
  players = [];
  socket;

  clientPlayerId = undefined;

  constructor() {
    window.addEventListener('keydown', () => {});
  }

  init() {
    this.socket = io('ws://localhost:4001');

    this.socket.on('connect', () =>
      this.registerPlayerHandshake(this.socket),
    );

    this.socket.on('game_update', (data) => {
      console.log(data);
    });
  }

  registerPlayerHandshake(socket) {
    socket.emit('register_player');

    socket.on('register_player_ackn', ({ playerId }) => {
      this.clientPlayerId = playerId;
    });
  }
}

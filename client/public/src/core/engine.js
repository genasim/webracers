import { io } from 'https://cdn.socket.io/4.8.1/socket.io.esm.min.js';
import { Player } from '../player.js';

const canvas = document.getElementById('canvas');
export const ctx = canvas.getContext('2d');

export class Engine {
  players = [];
  socket;

  clientPlayerId = undefined;
  clientPlayer = undefined;

  init() {
    this.socket = io('ws://localhost:4001');

    this.socket.on('connect', () => this.registerPlayerHandshake(this.socket));

    this.socket.on('game_update', (data) => {
      const { players } = data;

      players.forEach((player) => {
        const existingPlayer = this.players.find((p) => p.id === player.id);        

        if (existingPlayer) {
          existingPlayer.updatePosition(player.player.position);
        } else {
          this.players.push(new Player(player));
        }
      });
      this.draw();
    });
  }

  registerPlayerHandshake(socket) {
    socket.emit('register_player');

    socket.on('register_player_ackn', ({ player }) => {
      this.clientPlayerId = player.id;
      this.clientPlayer = new Player({ position: player.position });
      this.clientPlayer.init(socket);

      this.players.push(this.clientPlayer);
    });
  }

  draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'red';
    this.players.forEach((player) => player.render(ctx));
  }
}

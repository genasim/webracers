import { io } from 'https://cdn.socket.io/4.8.1/socket.io.esm.min.js';
import { Player } from '../player.js';

const canvas = document.getElementById('canvas');
export const ctx = canvas.getContext('2d');

export class Engine {
  players = new Map();
  socket;

  clientPlayerId = undefined;
  clientPlayer = undefined;

  init() {
    this.socket = io('ws://localhost:4001');

    this.socket.on('connect', () => this.registerPlayerHandshake(this.socket));

    this.socket.on('game_update', (data) => {
      const { players } = data;

      const updatedPlayers = new Map();
      
      players.forEach((playerData) => {
        let player = this.players.get(playerData.id);
        if (!player) {
          player = new Player({ position: playerData.position });
        } else {
          player.updatePosition(playerData.position);
        }
        updatedPladsyers.set(playerData.id, player);
      });

      this.players = updatedPlayers;
      this.draw();
    });
  }

  registerPlayerHandshake(socket) {
    socket.emit('register_player');

    socket.on('register_player_ackn', ({ player }) => {
      this.clientPlayerId = player.id;
      this.clientPlayer = new Player({ position: player.position });
      this.clientPlayer.init(socket);

      this.players.set(this.clientPlayerId, this.clientPlayer);
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

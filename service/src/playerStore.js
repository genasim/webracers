import { v4 as uuidv4 } from 'uuid';
import { Player } from './player.js';

const playerStore = new Map();

const registerPlayer = (socket) => {
  const playerId = uuidv4();
  const player = new Player(playerId, { x: 0, y: 0 });
  playerStore.set(socket.id, { player, socketId: socket.id });

  socket.emit('register_player_ackn', {
    player: {
      id: playerId,
      position: player.position,
    },
    players: Array.from(playerStore.values()),
  });
};

const unregisterPlayer = (socket) => {
  playerStore.delete(socket.id);
  socket.emit('unregister_player');
};

const getPlayer = (socket) => playerStore.get(socket.id);

const getPlayers = () => Array.from(playerStore.values());

export const playerStoreService = {
  registerPlayer,
  unregisterPlayer,
  getPlayer,
  getPlayers,
};

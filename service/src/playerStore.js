import { v4 as uuidv4 } from 'uuid';

const playerStore = new Map();

const registerPlayer = (socket) => {
  const playerId = uuidv4();
  playerStore.set(socket.id, { id: playerId, socketId: socket.id });
  socket.emit('register_player_ackn', { playerId });
};

const unregisterPlayer = (socket) => {
  playerStore.delete(socket.id);
  socket.emit('unregister_player');
};

const getPlayer = (playerId) => playerStore.get(playerId);

export const playerStoreService = {
    registerPlayer,
    unregisterPlayer,
    getPlayer,
}
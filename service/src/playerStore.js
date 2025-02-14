import { v4 as uuidv4 } from 'uuid';
import { Player } from './player.js';

const playerStore = new Map();

const registerPlayer = (socket) => {
  const playerId = uuidv4();
  const player = new Player(playerId, { x: 0, y: 0 });

  playerStore.set(socket.id, {
    player,
    socketId: socket.id,
    movementState: {},
  });

  socket.emit('register_player_ackn', {
    player: {
      id: playerId,
      position: player.position,
    },
    players: Array.from(playerStore.values()).map(({ player }) => player),
  });
};

const unregisterPlayer = (socket) => {
  playerStore.delete(socket.id);
};

const getPlayer = (socket) => playerStore.get(socket.id);

const getPlayers = () =>
  Array.from(playerStore.values()).map(({ player }) => ({
    id: player.id,
    position: player.position,
  }));

const updatePlayerMovement = (socket, movementState) => {
  const playerData = playerStore.get(socket.id);
  if (playerData) {
    playerData.movementState = movementState; // Store movement input state
  }
};

const updatePlayerPositions = () => {
  playerStore.forEach(({ player, movementState }) => {
    let { x, y } = player.position;
    const speed = 5;

    if (movementState.w) y -= speed;
    if (movementState.a) x -= speed;
    if (movementState.s) y += speed;
    if (movementState.d) x += speed;

    player.updatePosition({ x, y });
  });
};

export const playerStoreService = {
  registerPlayer,
  unregisterPlayer,
  getPlayer,
  getPlayers,
  updatePlayerMovement,
  updatePlayerPositions,
};

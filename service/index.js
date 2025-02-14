import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { playerStoreService } from './src/playerStore.js';
import { GameEngine } from './src/gameEngine.js';

const PORT = process.env.PORT || 3000;
const CLIENT_PORT = process.env.CLIENT_PORT || 4000;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: `http://localhost:${CLIENT_PORT}`,
  },
});

const gameEngine = new GameEngine(io);

app.get('/', (_, res) => {
  res.status(200).json({ message: 'Hello World' });
});

io.on('connection', (socket) => {
  socket.on('register_player', () => {
    console.log('register_player');
    playerStoreService.registerPlayer(socket);
  });

  socket.on('disconnect', () => {
    console.log(`user disconnected on ${socket.id}`);
    playerStoreService.unregisterPlayer(socket);
  });

  socket.on('move_player', (movementState) => {
    playerStoreService.updatePlayerMovement(socket, movementState);
  });
});

server.listen(PORT, () => {
  console.log('====================================');
  console.log(`Service is listening on container port ${PORT}`);
  gameEngine.start();
});

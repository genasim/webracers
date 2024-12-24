import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.CONTAINER_PORT || 3000;

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World' });
});

io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('message', (message) => {
    console.log('received message:', message);
    socket.emit('response', { message });
  });
});

server.listen(PORT, () => {
  console.log('====================================');
  console.log(`Service is listening on container port ${PORT}`);
});

import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const PORT = process.env.PORT || 3000;
const CLIENT_PORT = process.env.CLIENT_PORT || 4000;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: `http://localhost:${CLIENT_PORT}`,
  },
});

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World' });
});

io.on('connect', (socket) => {
  console.log('user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', data => {
    console.log('received message: ', data);
    io.emit('chat message', data);
  });
});

server.listen(PORT, () => {
  console.log('====================================');
  console.log(`Service is listening on container port ${PORT}`);
});

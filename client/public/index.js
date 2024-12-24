import { io } from 'https://cdn.socket.io/4.8.1/socket.io.esm.min.js';

const socket = io('ws://localhost:4001');

const onFormSubmit = (event) => {
  event.preventDefault(); // Prevent form reload

  const formEntries = new FormData(event.target);
  const formData = Object.fromEntries(formEntries.entries());

  socket.emit('chat message', formData);
  event.target.reset();
};

document
  .getElementById('message-form')
  .addEventListener('submit', onFormSubmit);

const appendMessage = (message) => {
  const messageElement = document.createElement('li');
  messageElement.innerText = message;
  document.getElementById('messages').appendChild(messageElement);
};

console.log(socket);

socket.on('chat message', ({ message }) => {
  appendMessage(message);
});

export class Player {
  constructor({ position }) {
    this.position = position;
    this.keysPressed = {};
  }

  render(ctx) {
    ctx.fillRect(this.position.x, this.position.y, 25, 25);
  }

  init(socket) {
    window.addEventListener('keydown', (event) => {
      this.keysPressed[event.key] = true;
    });

    window.addEventListener('keyup', (event) => {
      delete this.keysPressed[event.key];
    });

    this.movementInterval = setInterval(() => {
      let newX = this.position.x;
      let newY = this.position.y;
      let moved = false;

      if (this.keysPressed['w']) {
        newY -= 5;
        moved = true;
      }
      if (this.keysPressed['a']) {
        newX -= 5;
        moved = true;
      }
      if (this.keysPressed['s']) {
        newY += 5;
        moved = true;
      }
      if (this.keysPressed['d']) {
        newX += 5;
        moved = true;
      }

      if (moved) {
        socket.emit('move_player', { x: newX, y: newY });
      }
    }, 50); // Adjust interval for movement smoothness
  }

  updatePosition({ x, y }) {
    this.position = { x, y };
  }
}

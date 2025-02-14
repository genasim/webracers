export class Player {
  constructor({ position }) {
    this.position = position;
    this.keysPressed = {};
    this.socket = null;
  }

  render(ctx) {
    ctx.fillRect(this.position.x, this.position.y, 25, 25);
  }

  init(socket) {
    this.socket = socket;

    window.addEventListener('keydown', (event) => {
      this.keysPressed[event.key] = true;
      this.sendMovementUpdate();
    });

    window.addEventListener('keyup', (event) => {
      delete this.keysPressed[event.key];
      this.sendMovementUpdate();
    });

    setInterval(() => this.sendMovementUpdate(), 100); // Periodic update in case of missed events
  }

  sendMovementUpdate() {
    if (this.socket) {
      this.socket.emit('move_player', {
        w: this.keysPressed['w'] || false,
        a: this.keysPressed['a'] || false,
        s: this.keysPressed['s'] || false,
        d: this.keysPressed['d'] || false,
      });
    }
  }

  updatePosition({ x, y }) {
    this.position = { x, y };
  }
}
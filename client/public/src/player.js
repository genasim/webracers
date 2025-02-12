export class Player {
  constructor({ position }) {
    this.position = position;
  }

  render(ctx) {
    ctx.fillRect(this.position.x, this.position.y, 25, 25);
  }

  init(socket) {
    window.addEventListener('keydown', (event) => {
      let newX = this.position.x;
      let newY = this.position.y;

      switch (event.key) {
        case 'w':
          newY -= 5;
          break;
        case 'a':
          newX -= 5;
          break;
        case 's':
          newY += 5;
          break;
        case 'd':
          newX += 5;
          break;
      }

      socket.emit('move_player', { x: newX, y: newY });
    });
  }

  updatePosition({ x, y }) {
    this.position = { x, y };
  }
}

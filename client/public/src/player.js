export class Player {
  constructor({ position: { posX, posY }, color}) {
    this.position = { x: posX, y: posY };
    this.color = color;
  }

  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, 50, 50);
  }
}

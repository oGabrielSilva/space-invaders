import { canvas, ctx, space } from '../../utils';

const scale = 0.15;

export default class Player {
  constructor() {
    const image = new Image();
    image.src = space;

    image.onload = () => {
      this.image = image;
      this.width = this.image.width * scale;
      this.height = this.image.height * scale;
      this.position = {
        x: canvas.width / 2 - this.width / 2,
        y: canvas.height - this.height - 75,
      };
    };
    this.velocity = { x: 0, y: 0 };
    this.rotation = 0;
    this.opacity = 1;
    this.justFired = false;
    this.timing = 500;
  }

  draw() {
    // ctx.fillStyle = 'red';
    // ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    ctx.save();
    ctx.translate(
      this.position.x + this.width / 2,
      this.position.y + this.height / 2
    );
    ctx.globalAlpha = this.opacity;
    ctx.rotate(this.rotation);
    ctx.translate(
      -this.position.x - this.width / 2,
      -this.position.y - this.height / 2
    );
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );

    ctx.restore();
  }

  update() {
    if (this.image) {
      this.draw();
      this.position.x += this.velocity.x;
    }
  }
}

import { canvas, ctx, invader } from '../../utils';
import { InvaderProjectile } from '../Projectile';

const scale = 1;

export default class Invader {
  constructor({ position }) {
    const image = new Image();
    image.src = invader;

    image.onload = () => {
      this.image = image;
      this.width = this.image.width * scale;
      this.height = this.image.height * scale;
      this.position = { x: position.x, y: position.y };
    };
    this.velocity = { x: 0, y: 0 };
  }

  draw() {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update({ velocity }) {
    if (this.image) {
      this.draw();
      this.position.x += velocity.x;
      this.position.y += velocity.y;
    }
  }

  shoot(invaderProjectiles) {
    invaderProjectiles.push(
      new InvaderProjectile({
        position: {
          x: this.position.x + this.width / 2,
          y: this.position.y + this.height,
        },
        velocity: {
          x: 0,
          y: 5,
        },
      })
    );
  }
}

export class Grid {
  constructor() {
    this.position = { x: 0, y: 0 };
    this.velocity = { x: 3, y: 0 };
    this.invaders = [];

    const colums = Math.floor(Math.random() * 10 + 5);
    const rows = Math.floor(Math.random() * 5 + 2);
    for (let x = 0; x < colums; x++) {
      for (let y = 0; y < rows; y++) {
        this.invaders.push(new Invader({ position: { x: x * 30, y: y * 30 } }));
      }
    }

    this.width = colums * 30;
    console.log(this.invaders);
  }

  update() {
    this.position.x += this.velocity.x;
    this.velocity.y = 0;

    if (this.position.x + this.width > canvas.width || this.position.x <= 0) {
      this.velocity.x = -this.velocity.x;
      this.velocity.y = 30;
    }
  }
}

import { particles } from '../../..';
import { canvas, ctx } from '../../utils';

export default class Particle {
  constructor({ position, velocity, radius, color, fades = true }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = radius;
    this.color = color;
    this.opacity = 1;
    this.fades = fades;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.fades) this.opacity -= 0.01;
  }

  static CreateParticle({ object, color = '#8103ff', fades }) {
    for (let i = 0; i < 50; i++) {
      particles.push(
        new Particle({
          position: {
            x: object.position.x + object.width / 2,
            y: object.position.y + object.height / 2,
          },
          velocity: {
            x: (Math.random() - 0.5) * 2,
            y: (Math.random() - 0.5) * 2,
          },
          radius: Math.random() * 2,
          color,
        })
      );
    }
  }

  static CreateStars(color) {
    const nt = () => Math.random();

    for (let i = 0; i < 150; i++) {
      particles.push(
        new Particle({
          position: {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
          },
          velocity: {
            x: 0,
            y: 1 + nt(),
          },
          radius: Math.random() * 2,
          color,
          fades: false,
        })
      );
    }
  }
}

import './src/css/master.css';
import Game from './src/modules/Game';
import { Grid } from './src/modules/Invaders';
import Particle from './src/modules/Particle';
import Player from './src/modules/Player';
import Projectile from './src/modules/Projectile';
import { ctx, canvas, velocity, rotation } from './src/utils';

export const particles = [];
const game = new Game();
const player = new Player();
const projectiles = [];
const invaderProjectiles = [];
const grids = [];

const keys = {
  a: { pressed: false },
  d: { pressed: false },
  space: { pressed: false },
};

Particle.CreateStars('white');

function animate() {
  if (!game.active) return;
  requestAnimationFrame(animate);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  particles.forEach((particle, i) => {
    if (
      particle.position.y - particle.radius >= canvas.height &&
      !particle.fades
    ) {
      particle.position.x = Math.random() * canvas.width;
      particle.position.y = -particle.radius;
    }
    if (particle.opacity <= 0) setTimeout(() => particles.splice(i, 1), 0);
    else particle.update();
  });
  invaderProjectiles.forEach((projectile, index) => {
    if (projectile.position.y + projectile.height >= canvas.height)
      setTimeout(() => invaderProjectiles.splice(index, 1), 0);
    else projectile.update();

    if (
      projectile.position.y + projectile.height >= player.position.y &&
      projectile.position.x + projectile.width >= player.position.x &&
      projectile.position.x <= player.position.x + player.width
    ) {
      Particle.CreateParticle({ object: player, color: 'white', fades: true });
      setTimeout(() => {
        invaderProjectiles.splice(index, 1);
        player.opacity = 0;
        game.over = true;
      }, 0);
      setTimeout(() => (game.active = false), 2000);
    }
  });
  grids.forEach((grid, gridIndex) => {
    grid.update();

    if (game.frames % 100 === 0 && grid.invaders.length > 0) {
      grid.invaders[Math.floor(Math.random() * grid.invaders.length)].shoot(
        invaderProjectiles
      );
    }

    grid.invaders.forEach((invader, i) => {
      invader.update({ velocity: grid.velocity });
      projectiles.forEach((projectile, j) => {
        if (
          projectile.position.y - projectile.radius <=
            invader.position.y + invader.height &&
          projectile.position.x + projectile.radius >= invader.position.x &&
          projectile.position.x - projectile.radius <=
            invader.position.x + invader.width &&
          projectile.position.y + projectile.radius > invader.position.y
        ) {
          setTimeout(() => {
            const invaderFound = grid.invaders.find((elm) => elm === invader);
            const projectileFound = projectiles.find(
              (elm) => elm === projectile
            );
            if (invaderFound && projectileFound) {
              Particle.CreateParticle({ object: invader });
              grid.invaders.splice(i, 1);
              game.increaseScore();
              projectiles.splice(j, 1);

              if (grid.invaders.length > 0) {
                const firstInvader = grid.invaders[0];
                const lastInvader = grid.invaders[grid.invaders.length - 1];

                grid.width =
                  lastInvader.position.x -
                  firstInvader.position.x +
                  lastInvader.width;
                grid.position.x = firstInvader.position.x;
              } else {
                grids.splice(gridIndex, 1);
              }
            }
          }, 0);
        }
      });
    });
  });
  projectiles.forEach((projectile, index) => {
    if (projectile.position.y + projectile.radius <= 0)
      setTimeout(() => projectiles.splice(index, 1), 0);
    else projectile.update();
  });

  if (keys.a.pressed && player.position.x >= 0) {
    player.velocity.x = -velocity;
    player.rotation = -rotation;
  } else if (
    keys.d.pressed &&
    player.position.x + player.width <= canvas.width
  ) {
    player.velocity.x = velocity;
    player.rotation = rotation;
  } else {
    player.velocity.x = 0;
    player.rotation = 0;
  }

  if (game.frames % game.interval === 0) {
    grids.push(new Grid());
    game.interval = Math.floor(Math.random() * 500 + 500);
    game.frames = 0;
  }

  game.frames++;
}

animate();

addEventListener('keydown', ({ key }) => {
  if (game.over) return;
  switch (key.toLowerCase()) {
    case 'a':
      keys.a.pressed = true;
      break;
    case 'd':
      keys.d.pressed = true;
      break;
    case ' ':
      if (player.justFired) return;
      projectiles.push(
        new Projectile({
          position: {
            x: player.position.x + player.width / 2,
            y: player.position.y,
          },
          velocity: { x: 0, y: -5 },
        })
      );
      player.justFired = true;
      setTimeout(() => (player.justFired = false), player.timing);
      break;
    default:
      break;
  }
});

addEventListener('keyup', ({ key }) => {
  switch (key.toLowerCase()) {
    case 'a':
      keys.a.pressed = false;
      break;
    case 'd':
      keys.d.pressed = false;
      break;
    case ' ':
      keys.space.pressed = false;
      break;
    default:
      break;
  }
});

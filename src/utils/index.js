import space from '../assets/sprites/spaceship.png';
import invader from '../assets/sprites/invader.png';

document.querySelector('link').href = invader;

const velocity = 10;
const rotation = 0.15;
const canvas = document.querySelector('canvas');
const score = document.querySelector('span');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

export { canvas, ctx, space, invader, velocity, rotation, score };

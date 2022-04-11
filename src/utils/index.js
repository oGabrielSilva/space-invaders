import space from '../assets/sprites/spaceship.png';
import invader from '../assets/sprites/invader.png';
import spaceBtn from '../assets/sprites/space.svg';
import arrowLeft from '../assets/sprites/left-arrow.svg';
import arrowRight from '../assets/sprites/right-arrow.svg';

const setButtonsMobile = () => {
  mobile.forEach((scope) => {
    const img = document.createElement('img');
    img.setAttribute('src', scope.img);
    scope.local.classList.remove('null');
    scope.local.innerHTML = '';
    scope.local.appendChild(img);
  });
};

const canvas = document.querySelector('canvas');
const mobile = [
  { img: spaceBtn, local: document.querySelector('#space'), key: ' ' },
  { img: arrowLeft, local: document.querySelector('#left'), key: 'a' },
  { img: arrowRight, local: document.querySelector('#right'), key: 'd' },
];
const isMobile = navigator.userAgentData.mobile;
const score = document.querySelector('span');
const velocity = 10;
const rotation = 0.15;
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;
document.querySelector('link').href = invader;

if (isMobile || innerWidth < 500) setButtonsMobile();

addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  if (innerWidth < 500) setButtonsMobile();
});

export { canvas, ctx, space, invader, velocity, rotation, score, mobile };

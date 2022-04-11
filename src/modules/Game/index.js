import { score } from '../../utils';

export default class Game {
  constructor(increase = 100) {
    this.over = false;
    this.active = true;
    this.frames = 0;
    this.interval = Math.floor(Math.random() * 500 + 500);
    this.score = 0;
    this.increase = increase;
  }

  increaseScore() {
    this.score += this.increase;
    score.textContent = this.score;
  }
}

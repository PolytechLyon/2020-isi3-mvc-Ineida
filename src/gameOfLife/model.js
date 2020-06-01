import {
  GAME_SIZE,
  CELL_STATES,
  DEFAULT_ALIVE_PAIRS,
  RENDER_INTERVAL
} from "./constants";

export class Model {
  constructor() {
    this.width = GAME_SIZE;
    this.height = GAME_SIZE;
    this.raf = null;
  }

  init() {
    this.state = Array.from(new Array(this.height), () =>
      Array.from(new Array(this.width), () => CELL_STATES.NONE)
    );
    DEFAULT_ALIVE_PAIRS.forEach(([x, y]) => {
      this.state[y][x] = CELL_STATES.ALIVE;
    });
    this.updated();
  }

  run(date = new Date().getTime()) {
    this.raf = requestAnimationFrame(() => {
      const currentTime = new Date().getTime();
      if (currentTime - date > RENDER_INTERVAL) {

        for (let i = 0; i < this.width; i++) {
          for (let j = 0; j < this.width; j++) {
            const nbAlive = this.aliveNeighbours(i, j);
            // TODO implement Game of life logic
            switch (nbAlive) {
              case 2:
                this.state[i][j] = this.state[i][j];
                break;
              case 3:
                this.state[i][j] = CELL_STATES.ALIVE;
                break;
              default:
                if(isCellAlive(i,j)){
                  this.state[i][j] = CELL_STATES.DEAD;
                }
                break;
            }
          }
        }

        this.updated();
        this.run(currentTime);
      } else {
        this.run(date);
      }
    });
  }

  stop() {
    cancelAnimationFrame(this.raf);
    this.raf = null;
  }

  reset() {
    // TODO
    this.init();
  }

  isCellAlive(x, y) {
    return x >= 0 &&
      y >= 0 &&
      y < this.height &&
      x < this.height &&
      this.state[y][x] === CELL_STATES.ALIVE
      ? 1
      : 0;
  }
  aliveNeighbours(x, y) {
    let number = 0;
    // TODO
    if (this.isCellAlive(x, y - 1)) number++;
    if (this.isCellAlive(x, y + 1)) number++;
    if (this.isCellAlive(x + 1, y)) number++;
    if (this.isCellAlive(x + 1, y - 1)) number++;
    if (this.isCellAlive(x + 1, y + 1)) number++;
    if (this.isCellAlive(x - 1, y)) number++;
    if (this.isCellAlive(x - 1, y + 1)) number++;
    if (this.isCellAlive(x - 1, y - 1)) number++;
    return number;
  }

  updated() {
    // TODO update the view
    drawGame(this);
  }
}

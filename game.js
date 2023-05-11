const PLAYER1 = 1;
const PLAYER2 = 2;
const EMPTY = 0;
const HINT = 10;

class Player {
  constructor(name, x, y) {
    this.x = x;
    this.y = y;
    this.name = name;
  }

  //schimb nume
  setName(name) {
    this.name = name;
  }

  setX(x) {
    this.x = x;
  }

  setY() {
    this.y = y;
  }
}

class Table {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.table = [];

    for (let i = 0; i < this.rows; i++) {
      this.table[i] = [];
      for (let j = 0; j < this.cols; j++) {
        this.table[i][j] = EMPTY;
      }
    }

    this.table[player1.x][player1.y] = PLAYER1;
    this.table[player2.x][player2.y] = PLAYER2;
  }

  setValue(i, j, value) {
    this.table[i][j] = value;
  }
  //afisarea tablei
  draw(x, y) {
    let cellSize = 40;

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (i % 2 == 0 && j % 2 == 0) {
          let cellX = x + j * 0.7 * cellSize;
          let cellY = y + i * 0.7 * cellSize;

          stroke(0);

          if (this.table[i][j] == HINT) {
            fill("rgba(0,255,0, 0.50)");
          } else {
            fill("rgba(0,255,0, 0.25)");
          }
          rect(cellX, cellY, cellSize, cellSize);

          if (this.table[i][j] == 1) {
            fill("black");
            circle(
              x + j * 0.7 * cellSize + cellSize / 2,
              y + i * 0.7 * cellSize + cellSize / 2,
              20
            );
          }

          if (this.table[i][j] == 2) {
            fill("white");
            circle(
              x + j * 0.7 * cellSize + cellSize / 2,
              y + i * 0.7 * cellSize + cellSize / 2,
              20
            );
          }
        }
      }
    }
  }
}

//initializare jucatorii
let player1;
let player2;

let round = PLAYER1;

function setup() {
  createCanvas(800, 700);
  player1 = new Player("Mutulică", 0, 8);
  player2 = new Player("Mutulica", 16, 8);
  createInputs();
  table = new Table(17, 17);
}

function createInputs() {
  let inputName1 = createInput("");
  inputName1.position(650, 10);
  inputName1.size(150);
  inputName1.input(setName1);
  inputName1.value("player1");

  let inputName2 = createInput("");
  inputName2.position(650, 650);
  inputName2.size(150);
  inputName2.input(setName2);
  inputName2.value("player2");
}

function draw() {
  background("pink");
  textSize(32);
  fill("black");
  text(player1.name, 650, 50);
  text(player2.name, 650, 690);
  table.draw(50, 100);
}

function mouseClicked() {
  for (i = 0; i < table.rows; i++) {
    for (j = 0; j < table.cols; j++) {
      if (i % 2 == 0 && j % 2 == 0) {
        if (
          mouseX > 50 + j * 0.7 * 40 &&
          mouseX < 50 + j * 0.7 * 40 + 40 &&
          mouseY > 100 + i * 0.7 * 40 &&
          mouseY < 100 + i * 0.7 * 40 + 40
        ) {
          if (table.table[i][j] == PLAYER1 && round == PLAYER1) {
            if (i < 16) table.setValue(i + 2, j, HINT);
            if (i > 0) table.setValue(i - 2, j, HINT);
            if (j < 16) table.setValue(i, j + 2, HINT);
            if (j > 0) table.setValue(i, j - 2, HINT);
          }

          if (table.table[i][j] == PLAYER2 && round == PLAYER2) {
            if (i < 16) table.setValue(i + 2, j, HINT);
            if (i > 0) table.setValue(i - 2, j, HINT);
            if (j < 16) table.setValue(i, j + 2, HINT);
            if (j > 0) table.setValue(i, j - 2, HINT);
          }
        }
      }
    }
  }
}

function setName1() {
  player1.setName(this.value());
}

function setName2() {
  player2.setName(this.value());
}

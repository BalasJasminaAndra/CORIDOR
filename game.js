class Player {
  constructor(name) {
    this.name = name;
  }

  //schimb nume
  setName(name) {
    this.name = name;
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
        this.table[i][j] = 0;
      }
    }
  }

  //afisarea tablei
  draw(x, y) {
    let cellSize = 40;

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (i % 2 == 0 && j % 2 == 0) {
          let cellX = x + j * 0.7 * cellSize;
          let cellY = y + i * 0.7 * cellSize;

          fill("rgba(0,255,0, 0.25)");
          stroke(0);
          rect(cellX, cellY, cellSize, cellSize);
        }
      }
    }
  }
}

//initializare jucatorii
let player1;
let player2;

function setup() {
  createCanvas(800, 700);
  player1 = new Player("Mutulică");
  player2 = new Player("Mutulica");
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

function setName1() {
  player1.setName(this.value());
}

function setName2() {
  player2.setName(this.value());
}

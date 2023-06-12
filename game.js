const PLAYER1 = 1;
const PLAYER2 = 2;
const EMPTY = 0;
const HINT = 10;
const WALL = 3;

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

  setY(y) {
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

let round = PLAYER1; //player 1 incepe

function setup() {
  createCanvas(1000, 700);
  player1 = new Player("Mutulică", 14, 0);
  player2 = new Player("Mutulica", 16, 8);
  createInputs();
  table = new Table(17, 17);
}

function hello() {
  alert("Pacea Domnului, frate Radu! Vă place jocul meu? :)");
}

function createInputs() {
  button = createButton("Butonul magic");
  button.position(15, 15);
  button.mousePressed(hello);

  resetButton = createButton("reset");
  resetButton.position(15, 680);
  resetButton.mousePressed(setup);

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

  let verticalWall = createButton("Perete vertical");
  verticalWall.position(650, 300);
  verticalWall.mousePressed(addVerticalWall);

  let horizontalWall = createButton("Perete orizontal");
  horizontalWall.position(650, 350);
  horizontalWall.mousePressed(addHorizontalWall);

  selected = false;
  selectVerticalWall = false;
  selectHorizontalWall = false;
  winnerPlayer1 = false;
  winnerPlayer2 = false;
}

function draw() {
  background("pink");
  textSize(32);
  fill("black");
  text(player1.name, 650, 50);
  text(player2.name, 650, 690);
  table.draw(50, 100);

  if (selectVerticalWall) {
    rect(mouseX, mouseY, 10, 100);
  }

  if (selectHorizontalWall) {
    rect(mouseX, mouseY, 100, 10);
  }

  textSize(40);
  fill("yellow");
  strokeWeight(3);
  stroke("black");
  if (winnerPlayer1) {
    text(`${player1.name} a castigat! <3`, 300, 300);
  }

  fill("green");
  if (winnerPlayer2) {
    text(`${player2.name} a castigat! <3`, 300, 360);
  }
}
let selectVerticalWall = false;
function addVerticalWall() {
  selectVerticalWall = true;
}

let selectHorizontalWall = false;
function addHorizontalWall() {
  selectHorizontalWall = true;
}

let winnerPlayer1 = false;
let winnerPlayer2 = false;

function winnerWinnerChickenDinner() {
  if (player1.x == 16) {
    //din source
    winnerPlayer1 = true;
  }

  if (player2.x == 0) {
    //din source
    winnerPlayer2 = true;
  }
}

let selected = false;

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
          if (table.table[i][j] == PLAYER1 && round == PLAYER1 && !selected) {
            selected = true;
            selectVerticalWall = false;
            selectHorizontalWall = false;
            if (i < 16) table.setValue(i + 2, j, HINT);
            if (i > 0) table.setValue(i - 2, j, HINT);
            if (j < 16) table.setValue(i, j + 2, HINT);
            if (j > 0) table.setValue(i, j - 2, HINT);
          }

          if (table.table[i][j] == HINT && round == PLAYER1 && selected) {
            selected = false;
            round = PLAYER2;
            for (let i = 0; i < table.rows; i++) {
              for (let j = 0; j < table.cols; j++) {
                if (table.table[i][j] == HINT) table.setValue(i, j, EMPTY);
                if (table.table[i][j] == PLAYER1) table.setValue(i, j, EMPTY);
              }
            }
            table.setValue(i, j, PLAYER1);
            player1.setX(i);
            player1.setY(j);
            winnerWinnerChickenDinner();
          }

          if (table.table[i][j] == PLAYER2 && round == PLAYER2 && !selected) {
            selected = true;
            selectVerticalWall = false;
            selectHorizontalWall = false;
            if (i < 16) table.setValue(i + 2, j, HINT);
            if (i > 0) table.setValue(i - 2, j, HINT);
            if (j < 16) table.setValue(i, j + 2, HINT);
            if (j > 0) table.setValue(i, j - 2, HINT);
          }

          if (table.table[i][j] == HINT && round == PLAYER2 && selected) {
            selected = false;
            round = PLAYER1;
            for (let i = 0; i < table.rows; i++) {
              for (let j = 0; j < table.cols; j++) {
                if (table.table[i][j] == HINT) table.setValue(i, j, EMPTY);
                if (table.table[i][j] == PLAYER2) table.setValue(i, j, EMPTY);
              }
            }
            table.setValue(i, j, PLAYER2);
            player2.setX(i);
            player2.setY(j);
            winnerWinnerChickenDinner();
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

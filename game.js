class Player {
  constructor(name) {
    this.name = name;
  }

  setName(name) {
    this.name = name;
  }
}

let player1;
let player2;

function setup() {
  createCanvas(800, 740);
  player1 = new Player("Mutulică");
  player2 = new Player("Mutulica");
  createInputs();
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

function setName1() {
  player1.setName(this.value());
}

function setName2() {
  player2.setName(this.value());
}

function draw() {
  background(220);
  text(player1.name, 650, 50);
  text(player2.name, 650, 690);
}

function playerName() {}

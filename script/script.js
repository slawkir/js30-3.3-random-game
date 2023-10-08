'use strict';
const gameField = document.getElementById('game-field');
const context = gameField.getContext('2d');
let tileSize = 20;
let tileCount = gameField.width / tileSize;

let speed = {
  x: 0,
  y: 0
};

let food = {
  x: 20,
  y: 20
};

let snake = [];
let snakeHead = {
  x: 60,
  y: 60
};

let snakeTailCount = 1;

// functions
function drawGameField() {
  context.fillStyle = "black";
  context.fillRect(0, 0, gameField.width, gameField.height);
}
drawGameField();


console.log(gameField.width);
console.log(gameField.height);
// document.addEventListener('')
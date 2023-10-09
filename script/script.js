'use strict';
const gameField = document.getElementById('game-field');
const context = gameField.getContext('2d');
gameField.width = 600;
gameField.height = 600;
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
  x: 10,
  y: 10
};
// snake = [snakeHead, snakeHead];

let snakeTailCount = 1;

// functions
function drawGameField() {
  context.fillStyle = "black";
  context.fillRect(0, 0, gameField.width, gameField.height);
}
function drawSnake() {
  context.fillStyle = "green";
  for (let i = 0; i < snake.length; i++) {
    // context.fillStyle = "green";
    context.fillRect(snake[i].x * tileSize, snake[i].y * tileSize, tileSize, tileSize);

    if (snake[i].x === snakeHead.x && snake[i].y === snakeHead.y) { 
      snakeTailCount = 1;
    }
  }
};

function drawFood() { 
  context.fillStyle = "red";
  context.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);
}

function updateSnakeHead() { 
  snakeHead.x += speed.x;
  snakeHead.y += speed.y;

  if (snakeHead.x < 0) {
    snakeHead.x = tileCount - 1;
  }
  if (snakeHead.x > tileCount - 1) {
    snakeHead.x = 0;
  }
  if (snakeHead.y < 0) {
    snakeHead.y = tileCount - 1;
  }
  if (snakeHead.y > tileCount - 1) {
    snakeHead.y = 0;
  }
}

function updateSnakeBody() { 
  snake.push({ x: snakeHead.x, y: snakeHead.y });
  while (snake.length > snakeTailCount) {
    snake.shift();
  }
}

function eatFood() { 
  if (food.x === snakeHead.x && food.y === snakeHead.y) {
    snakeTailCount++;

    // snake.unshift(snakeHead);

    food.x = Math.floor(Math.random() * tileCount);
    food.y = Math.floor(Math.random() * tileCount);
    // drawFood();
  }
}

const keyDownHandlers = {
  'ArrowLeft': () => {
    speed.x = -1;
    speed.y = 0;
  },
  'ArrowRight': () => {
    speed.x = 1;
    speed.y = 0;
  },
  'ArrowUp': () => {
    speed.x = 0;
    speed.y = -1;
  },
  'ArrowDown': () => {
    speed.x = 0;
    speed.y = 1;
  },
};

function onKeyDown(event) { 
  if (keyDownHandlers.hasOwnProperty(event.key)) { 
    keyDownHandlers[event.key]();
  }
}

function updateGame() { 
  updateSnakeHead();
  drawGameField();
  drawSnake();
  eatFood();
  drawFood();
  updateSnakeBody();
}

//events
document.addEventListener('keydown', onKeyDown);
setInterval(updateGame, 200);

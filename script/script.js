'use strict';
const gameField = document.getElementById('game-field');
const intro = document.querySelector('.intro');
const context = gameField.getContext('2d');
gameField.width = 600;
gameField.height = 600;
let tileSize = 20;
let tileCount = gameField.width / tileSize;
const audioCrunch = new Audio();
audioCrunch.src = "./audio/crunch.mp3";
const audioScream = new Audio();
audioScream.src = "./audio/scream.mp3";
const scoreTitle = document.querySelector('.score-title');
let score = document.querySelector('.score');
let count = 0;
const startButton = document.querySelector('.start');
const arrowsInfoBlock = document.querySelector('.arrows');
const inputName = document.getElementById('player-name');
const inputLevel = document.getElementById('player-level');
const gameContainer = document.querySelector('.game-container');
const buttonReload = document.querySelector('.reload');



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

let snakeTailCount = 1;

// functions
function createUser() { 
  let userName = inputName.value;
  // let userLevel = inputLevel.value;
  let userCount = 0;

 
  return {
    name: userName,
    // level: userLevel,
    points: userCount
  };
}
let user;

function startProccess() {
  startGame();
  console.log(user);
  // setTimeout(intro.remove(), 3000); 
  intro.remove(); 
}

function startGame() { 
  gameField.style.display = 'block';
  arrowsInfoBlock.style.display = 'flex';
  user = createUser();
  // console.log(user);
}
// function setSpeed() { 
//   if (user.level === "easy") {
//     return 220;
//   } else if (user.level === "medium") { 
//     return 150;
//   } else if (user.level === "hard") {
//     return 75;
//   }
// }
function drawGameField() {
  context.fillStyle = "lightgray";
  context.fillRect(0, 0, gameField.width, gameField.height);
}

function endGame() { 
  gameField.remove();
  intro.remove();
  intro.remove();
  arrowsInfoBlock.remove();
  scoreTitle.remove();

  let div = document.createElement('div');
  gameContainer.append(div);
  gameContainer.style.justifyContent = 'center';
  div.className = 'alert';
  div.innerHTML = `Your result, ${user.name}: ${user.points}`;

  let btnReload = document.createElement('button');
  gameContainer.append(btnReload);
  btnReload.className = 'reload';
  btnReload.innerHTML = 'Continue';
}

function drawSnake() {
  for (let i = 0; i < snake.length; i++) {
    if (i === snake.length - 1) {
      context.fillStyle = "yellow";
      context.fillRect(snake[i].x * tileSize, snake[i].y * tileSize, tileSize, tileSize);
    } else { 
      context.fillStyle = "green";
      context.fillRect(snake[i].x * tileSize, snake[i].y * tileSize, tileSize, tileSize);
    }
    if ((snakeTailCount > 1) && snake[i].x === snakeHead.x && snake[i].y === snakeHead.y) { 
      audioScream.play();
      endGame();
    }

    if (snake[i].x === snakeHead.x && snake[i].y === snakeHead.y) { 
      snakeTailCount = 1;
      count = 0;
      score.innerHTML = count;
    }
  }
};

function drawFood() { 
  context.fillStyle = "red";
  context.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);
}
function countGame() { 
  count++;
  score.innerHTML = count;
  user.points = count;
};

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

function changeHead() {
  for (let i = 0; i < snake.length; i++) {
    if (i === snake.length - 1) {
      context.fillStyle = "orange";
      context.fillRect(snake[i].x * tileSize, snake[i].y * tileSize, tileSize*1.5, tileSize*1.5);
    }
  }
}

function eatFood() { 
  if (food.x === snakeHead.x && food.y === snakeHead.y) {
    snakeTailCount++;
    audioCrunch.play();
    countGame();
    changeHead();

    food.x = Math.floor(Math.random() * tileCount);
    food.y = Math.floor(Math.random() * tileCount);
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
    
    arrowsInfoBlock.style.display = "none";
    scoreTitle.style.visibility = 'visible';
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
startButton.addEventListener('click', startProccess);
document.addEventListener('keydown', onKeyDown);
setInterval(updateGame, 200); 
document.addEventListener('click', (e) => {
  if (e.target.className === 'reload') {
    console.log('+');
    document.location.reload();
  }
});



var CANVAS_WIDTH = 1000;
var CANVAS_HEIGHT = 500;

var DIRECTION_MAZE = "image/mazePackman.png";
var DIRECTION_FOOD = "image/food.png";
var DIRECTION_SPRITE = "image/game_sprite.png";
var DIRECTION_SPRITE_PACKMAN_RIGHT = "image/pacman_right.png";
var DIRECTION_SPRITE_PACKMAN_LEFT = "image/pacman_left.png";

var canvas;
var context;

var gameStart = document.getElementById('game_start');
var gameEnd = document.getElementById('game_over');

var packman = new Packman(26, 52, 0, 0, 0, 105, 105, 6, 4, DIRECTION_SPRITE_PACKMAN_RIGHT);
var firstEnemy = new Enemy(431, 130, 0, 199.5, 32, 32, 0, 1);
var secondEnemy = new Enemy(296, 490, 0, 112.5, 32, 32, 0, 0);
var thirdEnemy = new Enemy(674, 289, 0, 140.65, 32, 32, 0, 0);

var enemys = [firstEnemy, secondEnemy, thirdEnemy];

var setMelon = [{x: 70, y: 55}, {x: 135, y: 55}, {x: 200, y: 55}, {x: 265, y: 55}, {x: 330, y: 55}, {x: 284, y: 193},
                {x: 284, y: 247}, {x: 216, y: 376}, {x: 156, y: 250}, {x: 232, y: 530}, {x: 152, y: 99}, {x: 23, y: 99},
                {x: 167, y: 530}, {x: 102, y: 530}, {x: 25, y: 488}, {x: 55, y: 364}, {x: 28, y: 250}, {x: 93, y: 250},
                {x: 35, y: 530}, {x: 297, y: 530}, {x: 362, y: 530}, {x: 427, y: 535}, {x: 492, y: 535}, {x: 557, y: 535},
                {x: 622, y: 535}, {x: 687, y: 535}, {x: 752, y: 535}, {x: 770, y: 67}, {x: 770, y: 132}, {x: 770, y: 197},
                {x: 770, y: 262}, {x: 770, y: 327}, {x: 770, y: 392}, {x: 770, y: 457}, {x: 453, y: 450}, {x: 516, y: 450},
                {x: 579, y: 450}, {x: 264, y: 439}, {x: 159, y: 436}, {x: 96, y: 436}, {x: 33, y: 436}, {x: 23, y: 144},
                {x: 88, y: 144}, {x: 153, y: 144}, {x: 218, y: 144}, {x: 283, y: 144}, {x: 340, y: 144}, {x: 331, y: 100},
                {x: 349, y: 193}, {x: 414, y: 193}, {x: 479, y: 193}, {x: 438, y: 54}, {x: 503, y: 54}, {x: 568, y: 54},
                {x: 633, y: 54}, {x: 698, y: 54}, {x: 705, y: 262}, {x: 640, y: 262}, {x: 580, y: 262}];


window.onload = function () {

  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  canvas.style.display = 'none';

  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  animationTick();
};

function animationTick() {
  
  gameEnd.style.display = 'none';
  drawMaze(DIRECTION_MAZE, 0, 0);
  drawFood(context, DIRECTION_FOOD, setMelon, packman);
  drawScore(packman, context);

  packman.update();
  packman.draw(packman._x, packman._y);
  redraw(packman);
  packman.collisions();

  drawEnemy(context, enemys,  DIRECTION_SPRITE);
  enemys[0].redrawEnemy();
  

  addEventListener("keydown", findDirection);

  if (packman._score === setMelon.length) {
    gameOver();
  } else {
    window.requestAnimationFrame(animationTick)
  }
}

function noneStart() {
  gameStart.style.display = 'none';
  canvas.style.display = 'block';
}

function gameOver() {
  gameEnd.style.display = 'block';
  canvas.style.display = 'none';
}

function findDirection(event) {
  packman.dx = 0;
  packman.dy = 0;

  switch (event.keyCode) {
    case keys['RIGHT']:
      packman.dx = 1.6;
      packman.path = DIRECTION_SPRITE_PACKMAN_RIGHT;
      packman.updateImg();
      break;
    case keys['DOWN']:
      packman.dy = 1.6;
      break;
    case keys['UP']:
      packman.dy = -1.6;
      break;
    case keys['LEFT']:
      packman.dx = -1.6;
      packman.path = DIRECTION_SPRITE_PACKMAN_LEFT;
      packman.updateImg();
      break;
  }
}

function redraw(packman) {
  if (packman.dx !== 0 || packman.dy !== 0) {

    packman._x += packman.dx;
    packman._y += packman.dy

  }
}

function drawScore(packman, context) {
    context.beginPath();
    context.fillStyle = "#505050";
    context.font = 'bold 25px sans-serif';
    context.fillText("Score " + packman._score, 40, 24);
}

function drawFood(context, foodFile, setMelon, packman) {
  var imgFood = new Image();
  imgFood.onload = function () {

    for (var i = 0; i != setMelon.length; i++) {   // рисуем все арбузы
      context.drawImage(imgFood, setMelon[i].x, setMelon[i].y);
    }

    for (var k = 0; k != setMelon.length; k++) {
      if ((setMelon[k].x != undefined) && (setMelon[k].y) != undefined) {
        if ((((packman._x) >= setMelon[k].x) && ((packman._x + 5) <= (setMelon[k].x + 23))) && (((packman._y + 8) >= (setMelon[k].y)) && ((packman._y) <= (setMelon[k].y + 18)))) {
          delete setMelon[k].x;
          delete setMelon[k].y;
          packman._score += 1;
        }
      }
    }
  };
  imgFood.src = foodFile;
}

function drawMaze(mazeFile) {
  var imgMaze = new Image();
  imgMaze.onload = function () {

    canvas.width = imgMaze.width;
    canvas.height = imgMaze.height;
    context.drawImage(imgMaze, 0, 0);

  };
  imgMaze.src = mazeFile;
}

function checkCollisions(packman) {
  var imageData = context.getImageData(packman._x - 1, packman._y - 1, 27, 27);
  var pixels = imageData.data;

  for (var i = 0; n = pixels.length, i < n; i += 4) {
    var red = pixels[i];
    var green = pixels[i + 1];
    var blue = pixels[i + 2];

    if (red === 63 && green === 72 && blue === 204) {
      return true;
    }
  }
  return false;
}


var image = new Image();
var framesPerRow;

image.onload = function () {
  framesPerRow = Math.floor(image.width / 105);
};
image.src = packman.path;

function Packman(x, y, dx, dy, score, frameWidth, frameHeight, frameSpeed, endFrame, path) {
  
  this.dx = dx;
  this.dy = dy;

  this._x = x;
  this._y = y;
  
  this._score = score;

  this.path = path;

  this.currentFrame = 0;
  this.counter = 0;

  this.collisions = function () {
    if (checkCollisions(this)) {
      this._x -= this.dx;
      this._y -= this.dy;
      this.dx = 0;
      this.dy = 0;
    }
  };

  this.updateImg = function () {
    image.src = this.path;
  };

  this.update = function () {

    if (this.counter == (frameSpeed - 1)) {
      this.currentFrame = (this.currentFrame + 1) % endFrame;
    }
    this.counter = (this.counter + 1) % frameSpeed
  };

  this.draw = function (x, y) {
    var row = Math.floor(this.currentFrame / framesPerRow);
    var col = Math.floor(this.currentFrame % framesPerRow);

    context.drawImage(image, col * frameWidth, row * frameHeight, frameWidth, frameHeight, x, y, 23, 23)
  }
}

function drawEnemy(context, enemys, imgFile) {
  var enemyImage = new Image();
  enemyImage.onload = function () {
    context.drawImage(enemyImage, enemys[0].xOnMap, enemys[0].yOnMap, 28.125, 28.125, enemys[0]._x, enemys[0]._y, enemys[0].enemyWidth, enemys[0].enemyHeight);
    context.drawImage(enemyImage, enemys[1].xOnMap, enemys[1].yOnMap, 28.125, 28.125, enemys[1]._x, enemys[1]._y, enemys[1].enemyWidth, enemys[1].enemyHeight);
    context.drawImage(enemyImage, enemys[2].xOnMap, enemys[2].yOnMap, 28.125, 28.125, enemys[2]._x, enemys[2]._y, enemys[2].enemyWidth, enemys[2].enemyHeight);
  };
  enemyImage.src = imgFile;
}

function Enemy(x, y, xOnMap, yOnMap, sizeWidth, sizeHeight, dx, dy) {
  this._x = x;
  this._y = y;
  this.enemyWidth = sizeWidth;
  this.enemyHeight = sizeHeight;

  this.xOnMap = xOnMap;
  this.yOnMap = yOnMap;
  this.widthOnMap = 28.125;
  this.heightOnMap = 28.125;

  this.dxSpeed = dx;
  this.dySpeed = dy;


  this.redrawEnemy = function () {

    if (checkCollisions(this)) {

      if (this.dySpeed != 0) {
        if (randomInteger(0, 1)) {
            this.dxSpeed = 1
        } else {
            this.dxSpeed = -1
        }
        this.dySpeed = 0;
      } else {
        if (this.dxSpeed != 0) {
          if (randomInteger(0, 1)) {
            this.dySpeed = 1
          } else {
            this.dySpeed = -1
          }
          this.dxSpeed = 0;
        }
      }
    }

    this._x += this.dxSpeed;
    this._y += this.dySpeed;
  }
}


function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

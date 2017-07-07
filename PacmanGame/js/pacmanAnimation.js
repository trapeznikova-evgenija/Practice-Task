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
var gameEndWon = document.getElementById('game_over_won');
var gameEndLos = document.getElementById('game_over_loser');
var startButton = document.getElementById('startButton');

var game = new Game();

var packman = new Packman(26, 52, 0, 0, 0, 105, 105, 6, 4, DIRECTION_SPRITE_PACKMAN_RIGHT);
var firstEnemy = new Enemy(431, 130, 0, 140.65, 32, 32, 0, 0);
var secondEnemy = new Enemy(296, 490, 0, 112.5, 32, 32, 0, 0);
var thirdEnemy = new Enemy(674, 289, 0, 140.65, 32, 32, 0, 0);
var fourthEnemy = new Enemy(85, 141, 0, 140.65, 32, 32, 0, 0);
var fifthEnemy = new Enemy(446, 316, 0, 140.65, 32, 32, 0, 0);
var sixthEnemy = new Enemy(51, 252, 0, 112.5, 32, 32, 0, 0);

var enemys = [firstEnemy, secondEnemy, thirdEnemy, fourthEnemy, fifthEnemy, sixthEnemy];

var setMelon = [{x: 70, y: 55}, {x: 135, y: 55}, {x: 200, y: 55}, {x: 265, y: 55}, {x: 330, y: 55}, {x: 284, y: 193},
                {x: 284, y: 247}, {x: 216, y: 376}, {x: 156, y: 250}, {x: 232, y: 530}, {x: 152, y: 99}, {x: 23, y: 99},
                {x: 167, y: 530}, {x: 102, y: 530}, {x: 25, y: 488}, {x: 55, y: 364}, {x: 28, y: 250}, {x: 93, y: 250},
                {x: 35, y: 530}, {x: 297, y: 530}, {x: 362, y: 530}, {x: 427, y: 535}, {x: 492, y: 535}, {x: 557, y: 535},
                {x: 622, y: 535}, {x: 687, y: 535}, {x: 752, y: 535}, {x: 770, y: 96}, {x: 770, y: 145}, {x: 770, y: 197},
                {x: 770, y: 262}, {x: 770, y: 327}, {x: 770, y: 392}, {x: 770, y: 457}, {x: 453, y: 450}, {x: 516, y: 450},
                {x: 579, y: 450}, {x: 264, y: 439}, {x: 159, y: 436}, {x: 96, y: 436}, {x: 33, y: 436}, {x: 23, y: 144},
                {x: 88, y: 144}, {x: 153, y: 144}, {x: 218, y: 144}, {x: 283, y: 144}, {x: 340, y: 144}, {x: 331, y: 100},
                {x: 349, y: 193}, {x: 414, y: 193}, {x: 479, y: 193}, {x: 438, y: 54}, {x: 503, y: 54}, {x: 568, y: 54},
                {x: 633, y: 54}, {x: 698, y: 54}, {x: 705, y: 262}, {x: 640, y: 262}, {x: 580, y: 262}, {x: 437, y: 100},
                {x: 437, y: 145}, {x: 501, y: 145}, {x: 565, y: 145}, {x: 629, y: 145}, {x: 693, y: 145}, {x: 632, y: 95},
                {x: 433, y: 312}, {x: 433, y: 362}, {x: 433, y: 412}, {x: 475, y: 250}, {x: 601, y: 198}, {x: 497, y: 312},
                {x: 561, y: 312}, {x: 625, y: 312}, {x: 689, y: 312}, {x: 497, y: 360}, {x: 561, y: 360}, {x: 610, y: 360},
                {x: 593, y: 410}, {x: 169, y: 334}, {x: 233, y: 334}, {x: 297, y: 334}];

window.onload = function () {

  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  canvas.style.display = 'none';

  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  startButton.addEventListener('click', startTheGame);
};

function animationTick() {

  drawMaze(DIRECTION_MAZE, 0, 0);
  drawFood(context, DIRECTION_FOOD, setMelon, packman);
  drawScore(packman, context);

  packman.redraw();

  drawEnemy(context, enemys, DIRECTION_SPRITE);
  getTheEnemiesMoving(enemys);

  addEventListener("keydown", findDirection);

  switch (game.status) {
  case game.STATUS.PLAY:
    window.requestAnimationFrame(animationTick);
    break;
  case game.STATUS.GAMEOVER:
    gameOverLos();
    break;
  case game.STATUS.GAMEWIN:
    gameOverWon();
    break;
  }
}

function Game() {
  this.status = 1;
  this.STATUS = {
    PLAY: 0,
    NONE: 1,
    GAMEOVER: 2,
    GAMEWIN: 3
  };
}

function startTheGame() {
  gameStart.style.display = 'none';
  canvas.style.display = 'block';
  game.status = 0;
  if (game.status == game.STATUS.PLAY) {
    animationTick();
  }
}

function gameOverWon() {
  gameEndWon.style.display = 'block';
  var scoreTable = document.createElement('p');
  scoreTable.className = 'font_for_score';
  scoreTable.innerHTML = packman._score;
  gameEndWon.insertBefore(scoreTable, gameEndWon.lastChild);
  canvas.style.display = 'none';
}

function gameOverLos() {
  gameEndLos.style.display = 'block';
  var scoreTable = document.createElement('p');
  scoreTable.className = 'font_for_score';
  scoreTable.innerHTML = packman._score;
  gameEndLos.insertBefore(scoreTable, gameEndLos.lastChild);
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
        if (((packman._x + 18 > setMelon[k].x) && (packman._x <= setMelon[k].x + 18)) && ((packman._y + 18 > setMelon[k].y) && (packman._y <= setMelon[k].y + 18)))  {
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

function checkCollisions(packman, context) {
  var imageData = context.getImageData(packman._x - 1, packman._y - 1, 27, 27);
  var pixels = imageData.data;

  for (var i = 0; n = pixels.length, i < n; i += 4) {
    var red = pixels[i];
    var green = pixels[i + 1];
    var blue = pixels[i + 2];

    if(((red > 60) && (red < 68)) && ((green > 69) && (green < 80)) && ((blue > 200) && (blue < 206)))  {
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

  this.collisionsAndRedraw = function () {

    if (packman.dx !== 0 || packman.dy !== 0) {
      packman._x += packman.dx;
      packman._y += packman.dy
    }

    if (checkCollisions(this, context)) {
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
  };

  this.redraw = function () {
    this.update();
    this.draw(this._x, this._y);
    this.collisionsAndRedraw();
  }
}

function drawEnemy(context, enemys, imgFile) {
  var enemyImage = new Image();
  enemyImage.onload = function () {
    for (var i = 0; i <= enemys.length; i++) {
      context.drawImage(enemyImage, enemys[i].xOnMap, enemys[i].yOnMap, enemys[i].widthOnMap, enemys[i].heightOnMap, enemys[i]._xEnemy, enemys[i]._yEnemy, enemys[i].enemyWidth, enemys[i].enemyHeight);
    }
  };
  enemyImage.src = imgFile;
}

function getTheEnemiesMoving(enemys) {
  enemys[0].mind();
  enemys[1].mind();
  enemys[2].mind();
  enemys[3].mind();
  enemys[4].mind();
  enemys[5].mind();
}

function Enemy(x, y, xOnMap, yOnMap, sizeWidth, sizeHeight, dx, dy) {
  this._xEnemy = x;
  this._yEnemy = y;
  this.enemyWidth = sizeWidth;
  this.enemyHeight = sizeHeight;

  this.xOnMap = xOnMap;
  this.yOnMap = yOnMap;
  this.widthOnMap = 28.125;
  this.heightOnMap = 28.125;

  this.dxSpeed = dx;
  this.dySpeed = dy;

  var directions = [ { x: -1, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 } ];
  var randomDirection;
  var getDirections = true;
  
  this.mind = function () {

    if (!checkCollisionsEnemy(this, context)) {

      if (getDirections) {
        randomDirection = randomInteger(0, 3);
        getDirections = false;
      }

        this.dxSpeed = directions[randomDirection].x;
        this.dySpeed = directions[randomDirection].y;
        this._xEnemy += this.dxSpeed;
        this._yEnemy += this.dySpeed;

      } else {

        switch (randomDirection) {
          case 0:
            this._xEnemy += 1;
            break;
          case 1:
            this._xEnemy += -1;
            break;
          case 2:
            this._yEnemy += 1;
            break;
          case 3:
            this._yEnemy += -1;
            break;
        }
        getDirections = true;
      
      }

    if (((this._xEnemy + 23 > packman._x) && (this._xEnemy <= packman._x + 23)) && ((this._yEnemy + 23 > packman._y) && (this._yEnemy <= packman._y + 23))) {
      game.status = 2;
    } else if (packman._score === setMelon.length) {
      game.status = 3;
    }
  }
}

function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

function checkCollisionsEnemy(enemyNumber, context) {
  var imageData = context.getImageData(enemyNumber._xEnemy - 2, enemyNumber._yEnemy - 2, 35, 35);
  var pixels = imageData.data;

  for (var i = 0; n = pixels.length, i < n; i += 4) {
    var red = pixels[i];
    var green = pixels[i + 1];
    var blue = pixels[i + 2];

    if (((red > 60) && (red < 68)) && ((green > 69) && (green < 80)) && ((blue > 200) && (blue < 206))) {
      return true;
    }
  }
  return false;
}
var CANVAS_WIDTH = 1000;
var CANVAS_HEIGHT = 500;

var DIRECTION_MAP = "image/mazePackman.png";
var DIRECTION_FOOD = "image/food.png";
var DIRECTION_SPRITE = "image/game_sprite.png";
var DIRECTION_SPRITE_PACKMAN_RIGHT = "image/pacman_right.png";
var DIRECTION_SPRITE_PACKMAN_LEFT = "image/pacman_left.png";
var ENEMY_PICTURE_WIDTH = 23;
var MELON_PICTURE_HEIGHT = 18;
var NUMBER_OF_ENEMIES = 7;

var canvas;
var context;

var gameStart = document.getElementById('game_start');
var gameEndWon = document.getElementById('game_over_won');
var gameEndLos = document.getElementById('game_over_loser');
var startButton = document.getElementById('startButton');

var game = new Game();

var packman = new Packman(26, 52, 0, 0, 0, 105, 105, 6, 4, DIRECTION_SPRITE_PACKMAN_RIGHT);
var enemies = [];

window.onload = function () {

  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  createEnemy();
  startButton.addEventListener('click', game.startTheGame);

};

function animationTick() {

  drawMap(DIRECTION_MAP, 0, 0);
  drawFood(context, DIRECTION_FOOD, setMelon, packman);
  drawScore(packman, context);

  packman.redraw();

  if (NUMBER_OF_ENEMIES === enemies.length) {
    drawEnemy(enemies, DIRECTION_SPRITE);
    getTheEnemiesMoving();
  }

  addEventListener("keydown", packman.findDirection);

  switch (game.curStatus) {
  case game.STATUS.PLAY:
    window.requestAnimationFrame(animationTick);
    break;
  case game.STATUS.GAMEOVER:
    game.gameOverLos();
    break;
  case game.STATUS.GAMEWIN:
    game.gameOverWon();
    break;
  }
}

function Game() {
  this.curStatus = 1;
  this.STATUS = {
    PLAY: 0,
    NONE: 1,
    GAMEOVER: 2,
    GAMEWIN: 3
  };
  
  this.startTheGame = function () {
    gameStart.style.display = 'none';
    canvas.style.display = 'block';
    game.curStatus = 0;
    if (game.curStatus == game.STATUS.PLAY) {
      animationTick();
    }
  };

  this.gameOverWon = function () {
    gameEndWon.style.display = 'block';
    var scoreTable = document.createElement('p');
    scoreTable.className = 'font_for_score';
    scoreTable.innerHTML = packman._score;
    gameEndWon.insertBefore(scoreTable, gameEndWon.lastChild);
    canvas.style.display = 'none';
  };

  this.gameOverLos = function () {
    gameEndLos.style.display = 'block';
    var scoreTable = document.createElement('p');
    scoreTable.className = 'font_for_score';
    scoreTable.innerHTML = packman._score;
    gameEndLos.insertBefore(scoreTable, gameEndLos.lastChild);
    canvas.style.display = 'none';
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

    for (var k = 0; k != setMelon.length; k++) {
      if ((setMelon[k].x !== undefined) && (setMelon[k].y) !== undefined) {
        context.drawImage(imgFood, setMelon[k].x, setMelon[k].y);
        if (((packman._x + MELON_PICTURE_HEIGHT > setMelon[k].x) && (packman._x <= setMelon[k].x + MELON_PICTURE_HEIGHT)) && ((packman._y + MELON_PICTURE_HEIGHT > setMelon[k].y) && (packman._y <= setMelon[k].y + MELON_PICTURE_HEIGHT)))  {
          delete setMelon[k].x;
          delete setMelon[k].y;
          packman._score += 1;
        }
      }
    }
  };
  imgFood.src = foodFile;
}

function drawMap(mazeFile) {
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
  };
  
  this.findDirection = function (event) {
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
}

function createEnemy() {
  var enemyNumber;
  for (var g = 0; g < NUMBER_OF_ENEMIES; g++) {
    enemyNumber = new Enemy(placeOfEnemy[g].x, placeOfEnemy[g].y, 0, 140.65, 32, 32, 0, 0);
    enemies[g] = enemyNumber;
  }
}

function drawEnemy(enemies, imgEnemy) {
  var enemyImage = new Image;
  enemyImage.onload = function () {
    for (var i = 0; i < NUMBER_OF_ENEMIES; i++) {
      context.drawImage(enemyImage, enemies[i].xOnMap, enemies[i].yOnMap, enemies[i].widthOnMap, enemies[i].heightOnMap, enemies[i]._xEnemy, enemies[i]._yEnemy, enemies[i].enemyWidth, enemies[i].enemyHeight);
    }
  };
  enemyImage.src = imgEnemy;
}

function getTheEnemiesMoving() {
  for (var g = 0; g < NUMBER_OF_ENEMIES; g++) {
    enemies[g].mind();
  }
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

    if (((this._xEnemy + ENEMY_PICTURE_WIDTH > packman._x) && (this._xEnemy <= packman._x + ENEMY_PICTURE_WIDTH)) && ((this._yEnemy + ENEMY_PICTURE_WIDTH > packman._y) && (this._yEnemy <= packman._y + ENEMY_PICTURE_WIDTH))) {
      game.curStatus = 2;
    } else if (packman._score === setMelon.length) {
      game.curStatus = 3;
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
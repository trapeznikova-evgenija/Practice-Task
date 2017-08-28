var CANVAS_WIDTH = 550;
var CANVAS_HEIGHT = 620;

var DIRECTION_MAP = "image/mapPacman.png";
var DIRECTION_FOOD = "image/food.png";
var DIRECTION_SPRITE = "image/game_sprite.png";
var DIRECTION_SPRITE_PACKMAN_RIGHT = "image/pacman_right.png";
var DIRECTION_SPRITE_PACKMAN_LEFT = "image/pacman_left.png";

var ENEMY_PICTURE_SIZE = 28;
var PACMAN_PICTURE_SIZE = 23;
var PACMAN_SIZE_ON_MAP = 105;
var SCORE_X = 40;
var SCORE_Y = 24;
var SIZE_OF_BONUS_MEAL = 23;
var MELON_PICTURE_HEIGHT = 18;
var FOOD_PICTURE_SIZE = 28;
var NUMBER_OF_ENEMIES = 4;
var NUMBER_OF_LIVES = 3;
var VICTORY_SCORE = 128;

var gameStart = document.getElementById('gameStart');
var gameEndWon = document.getElementById('gameOverWon');
var gameEndLos = document.getElementById('gameOverLoser');
var startButton = document.getElementById('startButton');
var getReady = document.getElementById('getReadyBlock');

var canvas;
var context;

var bonus = false;
var existenceOfLives = false;
var counterScore = 0;

var enemies = [];
var lives = [];

var game = new Game();
var packman = new Packman(26, 51, 0, 0, 0, PACMAN_SIZE_ON_MAP, PACMAN_SIZE_ON_MAP, 6, 4, DIRECTION_SPRITE_PACKMAN_RIGHT);

window.onload = function () {

  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  createStaticFood();
  createObjectLive();
  startButton.addEventListener('click', game.startTheGame);

};

function animationTick() {

  drawMap(DIRECTION_MAP, 0, 0);
  drawFood(context, DIRECTION_FOOD, DIRECTION_SPRITE, setStrawberry, setMelon, packman);
  drawScore(packman, context);
  drawLive(DIRECTION_SPRITE_PACKMAN_RIGHT, context);
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

function drawScore(packman, context) {

    context.beginPath();
    context.fillStyle = "#505050";
    context.font = 'bold 25px sans-serif';
    context.fillText("Score " + packman._score, SCORE_X, SCORE_Y);
    context.closePath();

}

function createObjectLive() {

  var live;
  for (var x = 450; x < canvas.width - 15; x += 20) {
    live = new Live(x, 8);
    lives.push(live);
  }

}

function drawLive(liveFile, context) {

  var liveImage = new Image();
  liveImage.onload = function () {
    for (var i = 0; i < NUMBER_OF_LIVES; i++) {
      if (lives[i].xLive !== undefined && lives[i].yLive !== undefined) {
        context.drawImage(liveImage, 0, 0, PACMAN_SIZE_ON_MAP, PACMAN_SIZE_ON_MAP, lives[i].xLive, lives[i].yLive, 17, 17);
      }
    }
  };
  liveImage.src = liveFile;

}

function drawBlackRect(context) {

    context.beginPath();
    context.fillStyle = 'black';
    context.fillRect(450, 8, 17, 17);
    context.stroke();

}


function createStaticFood() {

  var foodNumber;

  for (var xYOne = 58; xYOne < canvas.width - 15; xYOne += 40) {
    foodNumber = new StaticFood(xYOne, 51);
    setMelon.push(foodNumber);
  }

  for (var xYTree = 28; xYTree < canvas.width - 50; xYTree += 40) {
    foodNumber = new StaticFood(xYTree, 129);
    setMelon.push(foodNumber);
  }

  for (var xYFour = 28; xYFour < canvas.width - 15; xYFour += 39) {
    foodNumber = new StaticFood(xYFour, 182);
    setMelon.push(foodNumber);
  }

  for (var xYFive = 25; xYFive < 100; xYFive += 38) {
    foodNumber = new StaticFood(xYFive, 215);
    setMelon.push(foodNumber);
  }

  for (var xYSix = 125; xYSix < 433; xYSix += 40) {
    foodNumber = new StaticFood(xYSix, 245);
    setMelon.push(foodNumber);
  }

  for (var xYSeven = 30; xYSeven < 120; xYSeven += 38) {
    foodNumber = new StaticFood(xYSeven, 300);
    setMelon.push(foodNumber);
  }

  for (var xYSevenPart = 412; xYSevenPart < canvas.width - 40; xYSevenPart += 38) {
    foodNumber = new StaticFood(xYSevenPart, 300);
    setMelon.push(foodNumber);
  }

  for (var xYEight = 180; xYEight < 370; xYEight += 40) {
    foodNumber = new StaticFood(xYEight, 355);
    setMelon.push(foodNumber);
  }


  for (var xYTen = 25; xYTen < canvas.width - 15; xYTen += 40) {
    foodNumber = new StaticFood(xYTen, 415);
    setMelon.push(foodNumber);
  }

  for (var xYEleven = 140; xYEleven < 410; xYEleven += 40) {
    foodNumber = new StaticFood(xYEleven, 470);
    setMelon.push(foodNumber);
  }

  for (var xYTwelve = 25; xYTwelve < 375; xYTwelve += 40) {
    foodNumber = new StaticFood(xYTwelve, 528);
    setMelon.push(foodNumber);
  }

  for (var xYThirtn = 25; xYThirtn < canvas.width - 15; xYThirtn += 40) {
    foodNumber = new StaticFood(xYThirtn, 582);
    setMelon.push(foodNumber);
  }

}

function drawFood(context, foodFile, strawFile, setStraw, setMelon, packman) {

  var imgFood = new Image();
  imgFood.onload = function () {

    for (var k = 0; k !== setMelon.length; k++) {
       if ((setMelon[k].xStatic !== undefined) && (setMelon[k].yStatic) !== undefined) {
         if (!checkCollisionsFood(setMelon[k], context)) {
           context.drawImage(imgFood, setMelon[k].xStatic, setMelon[k].yStatic)
         }

         if (((packman._x + MELON_PICTURE_HEIGHT > setMelon[k].xStatic)
           && (packman._x <= setMelon[k].xStatic + MELON_PICTURE_HEIGHT))
           && ((packman._y + MELON_PICTURE_HEIGHT > setMelon[k].yStatic)
           && (packman._y <= setMelon[k].yStatic + MELON_PICTURE_HEIGHT)))  {
             delete setMelon[k].xStatic;
             counterScore++;
             delete setMelon[k].yStatic;
             loadFile("sound/pacmanEatFruit.mp3");
             packman._score += 1;
         }
       }
    }

  };
  imgFood.src = foodFile;

  var strawImage = new Image();
  strawImage.onload = function () {
    for (var m = 0; m < setStraw.length; m++) {
      if ((setStraw[m].x !== undefined) && (setStraw[m].y !== undefined)) {
        context.drawImage(strawImage, 196.875, 28.125, FOOD_PICTURE_SIZE, FOOD_PICTURE_SIZE, setStraw[m].x,
                          setStraw[m].y, SIZE_OF_BONUS_MEAL, SIZE_OF_BONUS_MEAL);

        if (((packman._x + MELON_PICTURE_HEIGHT > setStraw[m].x)
          && (packman._x <= setStraw[m].x + MELON_PICTURE_HEIGHT))
          && ((packman._y + MELON_PICTURE_HEIGHT > setStraw[m].y)
          && (packman._y <= setStraw[m].y + MELON_PICTURE_HEIGHT)))  {
            bonus = true;
            delete setStraw[m].x;
            counterScore++;
            delete setStraw[m].y;
            packman._score += 3;
            setTimeout(function () {
              bonus = false;
            }, 5000);
        }
      }
    }
  };
  strawImage.src = strawFile;

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

function drawEnemy(enemies, imgEnemy) {

  var enemyImage = new Image;
  enemyImage.onload = function () {
    for (var i = 0; i < NUMBER_OF_ENEMIES; i++) {
      if (bonus) {
        context.drawImage(enemyImage, enemies[i].xBonusMode, enemies[i].yBonusMode, enemies[i].widthOnMap,
                          enemies[i].heightOnMap, enemies[i]._xEnemy, enemies[i]._yEnemy, enemies[i].enemyWidth,
                          enemies[i].enemyHeight);
      } else {
        context.drawImage(enemyImage, enemies[i].xOnMap, enemies[i].yOnMap, enemies[i].widthOnMap,
                          enemies[i].heightOnMap, enemies[i]._xEnemy, enemies[i]._yEnemy, enemies[i].enemyWidth,
                          enemies[i].enemyHeight);
      }
    }
  };
  enemyImage.src = imgEnemy;

}

function getTheEnemiesMoving() {

  for (var g = 0; g < NUMBER_OF_ENEMIES; g++) {
      enemies[g].mind();
      enemies[g].findCondition();
  }

}

function createEnemy() {

  var enemyNumber;

  for (var yOnMap = 112.5; yOnMap < 225; yOnMap += 28.125) {
    enemyNumber = new Enemy(placeOfEnemy[0].x, placeOfEnemy[0].y, 0, yOnMap, 28, 28, 0, 0);
    enemies.push(enemyNumber);
  }

}

function randomInteger(min, max) {

  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;

}

function checkCollisionsEnemy(enemyNumber, context) {

  var imageData = context.getImageData(enemyNumber._xEnemy, enemyNumber._yEnemy, ENEMY_PICTURE_SIZE + 1, ENEMY_PICTURE_SIZE + 1);
  var pixels = imageData.data;

  for (var i = 0; n = pixels.length, i < n; i += 4) {
    var red = pixels[i];
    var green = pixels[i + 1];
    var blue = pixels[i + 2];

    if (((red > 1) && (red < 20)) && ((green > 80) && (green < 120)) && ((blue > 180) && (blue < 215))) {
      return true;
    }
  }
  return false;

}

function checkCollisions(packman, context) {

  var imageData = context.getImageData(packman._x, packman._y, PACMAN_PICTURE_SIZE, PACMAN_PICTURE_SIZE);
  var pixels = imageData.data;

  for (var i = 0; n = pixels.length, i < n; i += 4) {
    var red = pixels[i];
    var green = pixels[i + 1];
    var blue = pixels[i + 2];

    if (((red > 1) && (red < 20)) && ((green > 80) && (green < 120)) && ((blue > 180) && (blue < 215)))  {
      return true;
    }
  }
  return false;

}

function checkCollisionsFood(food, context) {

  var imageData = context.getImageData(food.xStatic, food.yStatic, 23, 18);
  var pixels = imageData.data;

  for (var i = 0; n = pixels.length, i < n; i += 4) {
    var red = pixels[i];
    var green = pixels[i + 1];
    var blue = pixels[i + 2];

    if ((red !== 0) && (green !== 0) && (blue !== 0))  {
      return true;
    }
  }
  return false;

}

function Game() {

  this.curStatus = 1;
  this.STATUS = {
    PLAY: 0,
    NONE: 1,
    GAMEOVER: 2,
    GAMEWIN: 3,
    NEXTLEVEL: 4
  };

  this.startTheGame = function () {

    gameStart.style.display = 'none';
    canvas.style.display = 'block';
    game.curStatus = 0;
    getReady.style.display = 'block';

    setTimeout(createEnemy, 2000);

    setTimeout(function () {
      getReady.style.display = 'none';
    }, 2000);

    if (game.curStatus === game.STATUS.PLAY) {
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

  };
}

function StaticFood(x, y) {

  this.xStatic = x;
  this.yStatic = y;

}

function Live(x, y) {

  this.xLive = x;
  this.yLive = y;

}

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

    if (this.counter === (frameSpeed - 1)) {
      this.currentFrame = (this.currentFrame + 1) % endFrame;
    }

    this.counter = (this.counter + 1) % frameSpeed

  };

  this.draw = function (x, y) {

    var row = Math.floor(this.currentFrame / framesPerRow);
    var col = Math.floor(this.currentFrame % framesPerRow);

    context.drawImage(image, col * frameWidth, row * frameHeight, frameWidth, frameHeight,
                      x, y, PACMAN_PICTURE_SIZE, PACMAN_PICTURE_SIZE);

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
        packman.dx = 3;
        packman.path = DIRECTION_SPRITE_PACKMAN_RIGHT;
        packman.updateImg();
        break;
      case keys['DOWN']:
        packman.dy = 3;
        break;
      case keys['UP']:
        packman.dy = -3;
        break;
      case keys['LEFT']:
        packman.dx = -3;
        packman.path = DIRECTION_SPRITE_PACKMAN_LEFT;
        packman.updateImg();
        break;
    }

  }

}

var image = new Image();
var framesPerRow;

image.onload = function () {
  framesPerRow = Math.floor(image.width / 105);
};
image.src = packman.path;

function Enemy(x, y, xOnMap, yOnMap, sizeWidth, sizeHeight, dx, dy) {

  this._xEnemy = x;
  this._yEnemy = y;

  this.enemyWidth = sizeWidth;
  this.enemyHeight = sizeHeight;

  this.xOnMap = xOnMap;
  this.yOnMap = yOnMap;

  this.widthOnMap = ENEMY_PICTURE_SIZE;
  this.heightOnMap = ENEMY_PICTURE_SIZE;

  this.xBonusMode = 168.75;
  this.yBonusMode = 84.375;

  this.dxSpeed = dx;
  this.dySpeed = dy;

  var directions = [ { x: -2, y: 0 }, { x: 2, y: 0 }, { x: 0, y: -2 }, { x: 0, y: 2 } ];
  var randomDirection;
  var oldDirection;
  var start = true;
  var getDirections = true;
  
  this.mind = function () {

    if (!checkCollisionsEnemy(this, context)) {

      if (getDirections || start) {
        if (start) {
          randomDirection = way.up;
          start = false;
        } else {
          randomDirection = randomInteger(0, 3);
        }
        getDirections = false;
      }

      oldDirection = randomDirection;

    } else {

      switch (randomDirection) {
        case way.left:
          this._xEnemy += 2;
          break;
        case way.right:
          this._xEnemy += -2;
          break;
        case way.up:
          this._yEnemy += 2;
          break;
        case way.down:
          this._yEnemy += -2;
          break;
      }

      switch (oldDirection) {
        case way.left :
          do {
            randomDirection = randomInteger(0, 3);
          } while (randomDirection === way.right);
          break;
        case way.right:
          do {
            randomDirection = randomInteger(0, 3);
          } while (randomDirection === way.left);
          break;
        case way.up:
          do {
            randomDirection = randomInteger(0, 3);
          } while (randomDirection === way.down);
          break;
        case way.down:
          do {
            randomDirection = randomInteger(0, 3);
          } while (randomDirection === way.up)
      }
    }

    this.dxSpeed = directions[randomDirection].x;
    this.dySpeed = directions[randomDirection].y;
    this._xEnemy += this.dxSpeed;
    this._yEnemy += this.dySpeed;

  };

  this.findCondition = function () {

    if (((this._xEnemy + ENEMY_PICTURE_SIZE > packman._x) && (this._xEnemy <= packman._x + PACMAN_PICTURE_SIZE))
      && ((this._yEnemy + ENEMY_PICTURE_SIZE > packman._y) && (this._yEnemy <= packman._y + PACMAN_PICTURE_SIZE))
      && !(bonus)) {
      loadFile("sound/pacmanDeath.wav");
      game.curStatus = 2;
    } else if (((this._xEnemy + ENEMY_PICTURE_SIZE > packman._x) && (this._xEnemy <= packman._x + PACMAN_PICTURE_SIZE))
      && ((this._yEnemy + ENEMY_PICTURE_SIZE > packman._y) && (this._yEnemy <= packman._y + PACMAN_PICTURE_SIZE))
      && (bonus)) {
      packman._score += 1;
    } else if (counterScore === VICTORY_SCORE) {
      loadFile("sound/pacmanWon.mp3");
      game.curStatus = 3;
    }

  }

}

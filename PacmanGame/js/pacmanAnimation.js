var CANVAS_WIDTH = 550;
var CANVAS_HEIGHT = 620;

var DIRECTION_MAP = "image/mapPacman.png";
var DIRECTION_FOOD = "image/food.png";
var DIRECTION_SPRITE = "image/game_sprite.png";
var DIRECTION_SPRITE_PACKMAN_RIGHT = "image/pacman_right.png";
var DIRECTION_SPRITE_PACKMAN_LEFT = "image/pacman_left.png";
var ENEMY_PICTURE_WIDTH = 28;
var PACMAN_PICTURE_SIZE = 23;
var MELON_PICTURE_HEIGHT = 18;
var FOOD_PICTURE_SIZE = 29;
var NUMBER_OF_ENEMIES = 4;
var VICTORY_SCORE = 137;

var canvas;
var context;

var gameStart = document.getElementById('game_start');
var gameEndWon = document.getElementById('game_over_won');
var gameEndLos = document.getElementById('game_over_loser');
var startButton = document.getElementById('startButton');
var nextLevelButton = document.getElementById('nextLevel');
var nextLevel = document.getElementById('next_level');
var getReady = document.getElementById('getReadyBlock');

var game = new Game();

var bonus = false;

var packman = new Packman(26, 51, 0, 0, 0, 105, 105, 6, 4, DIRECTION_SPRITE_PACKMAN_RIGHT);

var enemies = [];

window.onload = function () {

  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  createStaticFood();
  startButton.addEventListener('click', game.startTheGame);

};

function animationTick() {

  drawMap(DIRECTION_MAP, 0, 0);
  drawFood(context, DIRECTION_FOOD, DIRECTION_SPRITE, setStrawberry, setMelon, packman);
  drawScore(packman, context);
  packman.redraw();

  if (bonus) {
    setTimeout(function () {
      bonus = false;
    }, 5000);
  }

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
    case game.STATUS.NEXTLEVEL:
      game.nextLevel();
      break;
  }
}

function drawScore(packman, context) {
    context.beginPath();
    context.fillStyle = "#505050";
    context.font = 'bold 25px sans-serif';
    context.fillText("Score " + packman._score, 40, 24);
    context.closePath();
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
         if (((packman._x + MELON_PICTURE_HEIGHT > setMelon[k].xStatic) && (packman._x <= setMelon[k].xStatic + MELON_PICTURE_HEIGHT)) && ((packman._y + MELON_PICTURE_HEIGHT > setMelon[k].yStatic) && (packman._y <= setMelon[k].yStatic + MELON_PICTURE_HEIGHT)))  {
           delete setMelon[k].xStatic;
           delete setMelon[k].yStatic;
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
        context.drawImage(strawImage, 196.875, 28.125, 28.125, 28.125, setStraw[m].x, setStraw[m].y, 23, 23);
        if (((packman._x + MELON_PICTURE_HEIGHT > setStraw[m].x) && (packman._x <= setStraw[m].x + MELON_PICTURE_HEIGHT)) && ((packman._y + MELON_PICTURE_HEIGHT > setStraw[m].y) && (packman._y <= setStraw[m].y + MELON_PICTURE_HEIGHT)))  {
          bonus = true;
          delete setStraw[m].x;
          delete setStraw[m].y;
          packman._score += 3;
        }
      }
    }
  };
  strawImage.src = strawFile;
}

function StaticFood(x, y) {
  this.xStatic = x;
  this.yStatic = y;
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
        context.drawImage(enemyImage, 168.75, 84.375, enemies[i].widthOnMap, enemies[i].heightOnMap, enemies[i]._xEnemy, enemies[i]._yEnemy, enemies[i].enemyWidth, enemies[i].enemyHeight);
      } else {
        context.drawImage(enemyImage, enemies[i].xOnMap, enemies[i].yOnMap, enemies[i].widthOnMap, enemies[i].heightOnMap, enemies[i]._xEnemy, enemies[i]._yEnemy, enemies[i].enemyWidth, enemies[i].enemyHeight);
      }

    }
  };
  enemyImage.src = imgEnemy;
}

function getTheEnemiesMoving() {
  for (var g = 0; g < NUMBER_OF_ENEMIES; g++) {
      enemies[g].mind();
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
  var imageData = context.getImageData(enemyNumber._xEnemy, enemyNumber._yEnemy, 29, 29);
  var pixels = imageData.data;

  for (var i = 0; n = pixels.length, i < n; i += 4) {
    var red = pixels[i];
    var green = pixels[i + 1];
    var blue = pixels[i + 2];

    if (((red > 1) && (red < 15)) && ((green > 90) && (green < 110)) && ((blue > 190) && (blue < 206))) {
      return true;
    }
  }
  return false;
}

function checkCollisions(packman, context) {
  var imageData = context.getImageData(packman._x, packman._y, 23, 23);
  var pixels = imageData.data;

  for (var i = 0; n = pixels.length, i < n; i += 4) {
    var red = pixels[i];
    var green = pixels[i + 1];
    var blue = pixels[i + 2];

    if (((red > 1) && (red < 15)) && ((green > 90) && (green < 110)) && ((blue > 190) && (blue < 206)))  {
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

  this.nextLevel = function () {
    nextLevel.style.display = 'block';
    var scoreTable = document.createElement('p');
    scoreTable.className = 'font_for_score_next_level';
    scoreTable.innerHTML = packman._score;
    nextLevel.insertBefore(scoreTable, nextLevel.lastChild);
    canvas.style.display = 'none';
    packman._score = 0;
    packman._x = 26;
    packman._y = 52;
    packman.dx = 0;
    packman.dy = 0;
    nextLevelButton.addEventListener('click', goToNextLevel);
    
  }
}

function goToNextLevel() {
  canvas.style.display = 'block';
  nextLevel.style.display = 'none';
  game.curStatus = 0;
  if (game.curStatus === game.STATUS.PLAY) {
    animationLevelTwo();
  }
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

    context.drawImage(image, col * frameWidth, row * frameHeight, frameWidth, frameHeight, x, y, PACMAN_PICTURE_SIZE, PACMAN_PICTURE_SIZE);
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
        packman.dx = 2;
        packman.path = DIRECTION_SPRITE_PACKMAN_RIGHT;
        packman.updateImg();
        break;
      case keys['DOWN']:
        packman.dy = 2;
        break;
      case keys['UP']:
        packman.dy = -2;
        break;
      case keys['LEFT']:
        packman.dx = -2;
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
  this.widthOnMap = 28.125;
  this.heightOnMap = 28.125;

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
          randomDirection = 2;
          start = false;
        } else {
          randomDirection = randomInteger(0, 3);
        }
        getDirections = false;
      }

      oldDirection = randomDirection;

    } else {

      switch (randomDirection) {
        case 0:
          this._xEnemy += 2;
          break;
        case 1:
          this._xEnemy += -2;
          break;
        case 2:
          this._yEnemy += 2;
          break;
        case 3:
          this._yEnemy += -2;
          break;
      }

      switch (oldDirection) {
        case 0:
          do {
            randomDirection = randomInteger(0, 3);
          } while (randomDirection === 1);
          break;
        case 1:
          do {
            randomDirection = randomInteger(0, 3);
          } while (randomDirection === 0);
          break;
        case 2:
          do {
            randomDirection = randomInteger(0, 3);
          } while (randomDirection === 3);
          break;
        case 3:
          do {
            randomDirection = randomInteger(0, 3);
          } while (randomDirection === 2)
      }

    }

    this.dxSpeed = directions[randomDirection].x;
    this.dySpeed = directions[randomDirection].y;
    this._xEnemy += this.dxSpeed;
    this._yEnemy += this.dySpeed;

    if (((this._xEnemy + ENEMY_PICTURE_WIDTH > packman._x) && (this._xEnemy <= packman._x + PACMAN_PICTURE_SIZE)) && ((this._yEnemy + ENEMY_PICTURE_WIDTH > packman._y) && (this._yEnemy <= packman._y + PACMAN_PICTURE_SIZE)) && !(bonus)) {
      game.curStatus = 2;
    } else if (((this._xEnemy + ENEMY_PICTURE_WIDTH > packman._x) && (this._xEnemy <= packman._x + PACMAN_PICTURE_SIZE)) && ((this._yEnemy + ENEMY_PICTURE_WIDTH > packman._y) && (this._yEnemy <= packman._y + PACMAN_PICTURE_SIZE)) && (bonus)) {
      packman._score += 1;
    } else if (packman._score >= VICTORY_SCORE) {
      game.curStatus = 4;
    }

  }
}
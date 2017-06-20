var CANVAS_WIDTH = 1000;
var CANVAS_HEIGHT = 500;

var DIRECTION_MAZE = "image/maze.png";
var DIRECTION_FOOD = "image/food.png";

var canvas;
var context;

var gameStart = document.getElementById('game_start');
var gameEnd = document.getElementById('game_over');

var packman = new Packman(267, 4, 7, "green", 0, 0, 0);
var setMelon = [{x: 330, y: 70, score: 0}, {x: 400, y: 334}, {x: 195, y: 158}, {x: 125, y: 246}, {x: 140, y: 510},
                {x: 93, y: 400}, {x: 230, y: 290}, {x: 513, y: 180}, {x: 294, y: 444}, {x: 414, y: 444},
                {x: 400, y: 509}, {x: 309, y: 540}];

window.onload = function () {

  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  animationTick();
};

function animationTick() {

  gameEnd.style.display = 'none';
  drawMaze(DIRECTION_MAZE, 0, 0);
  drawFood(context, DIRECTION_FOOD, setMelon, packman);
  drawScore(packman, context);
  packman.calcSmileAngle();

  drawPackman(context, packman);

  redraw(packman);
  packman.collisions();

  addEventListener("keydown", findDirection);

  if ((packman._x > 288  && packman._x < 314) && (packman._y > 565 && packman._y < 590) && (packman._score === 12)) {
    gameOver();
  } else {
    window.requestAnimationFrame(animationTick)
  }
}

function noneStart() {
  gameStart.style.display = 'none';
}

function gameOver() {
  gameEnd.style.display = 'block';
}

function findDirection(event) {
  packman.dx = 0;
  packman.dy = 0;

  switch (event.keyCode) {
    case keys['RIGHT']:
      packman.dx = 1.5;
      break;
    case keys['DOWN']:
      packman.dy = 1.5;
      break;
    case keys['UP']:
      packman.dy = -1.5;
      break;
    case keys['LEFT']:
      packman.dx = -1.5;
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
    context.font = 'bold 30px sans-serif';
    context.fillText('Score', 15, 39);
    context.fillText(packman._score, 50, 68);
}

function drawFood(context, foodFile, setMelon, packman) {
  var imgFood = new Image();
  imgFood.onload = function () {

    for (var i = 0; i != setMelon.length; i++) {   // рисуем все арбузы
      context.drawImage(imgFood, setMelon[i].x, setMelon[i].y);
    }

    for (var k = 0; k != setMelon.length; k++) {
      if ((setMelon[k].x != undefined) && (setMelon[k].y) != undefined) {
        if ((packman._x >= setMelon[k].x && packman._x <= (setMelon[k].x + 20)) && (packman._y >= setMelon[k].y && packman._y <= (setMelon[k].y + 18))) {
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
  var imageData = context.getImageData(packman._x - 1, packman._y - 1, 15 + 2, 15 + 2);
  var pixels = imageData.data;

  for (var i = 0; n = pixels.length, i < n; i += 4) {
    var red = pixels[i];
    var green = pixels[i + 1];
    var blue = pixels[i + 2];

    if (red === 0 && green === 0 && blue === 0) {
      return true;
    }
    if (red === 169 && green === 169 && blue === 169) {
      return true;
    }
  }
  return false;
}

function drawPackmanFigure(context, x, y, radius, color, endAngle) {

  var startPoint = {
    x: x + Math.cos(0) * radius,
    y: y + Math.sin(0) * radius
  };

  var endPoint = {
    x: x + Math.cos(endAngle) * radius,
    y: y + Math.sin(endAngle) * radius
  };

  context.fillStyle = color;
  context.beginPath();

  //вырез рта
  context.moveTo(x, y);
  context.lineTo(startPoint.x, startPoint.y);
  context.moveTo(x, y);
  context.lineTo(endPoint.x, endPoint.y);

  //теперь тело
  context.arc(x, y, radius, endAngle, 0, false);
  context.fillStyle = color;
  context.strokeStyle = color;
  context.fill();
  context.stroke();
  context.closePath();
}

function Packman(x, y, radius, color, dx, dy, score) {
  this._color = color;
  this._radius = radius;

  this.dx = dx;
  this.dy = dy;

  this._x = x;
  this._y = y;

  this._SMILE_ANGLE = 1;
  this._SMILE_ANGLE_STEP = 5;

  this._score = score;

  this.getX = function () {
    return this._x;
  };

  this.getY = function () {
    return this._y;
  };

  this.getSmileAngle = function () {
    return this._SMILE_ANGLE;
  };

  this.calcSmileAngle = function () {

    this._SMILE_ANGLE += this._SMILE_ANGLE_STEP;
    if ((this._SMILE_ANGLE >= 90) || (this._SMILE_ANGLE <= 1)) {
      this._SMILE_ANGLE_STEP = -this._SMILE_ANGLE_STEP;
    }
  };

  this.collisions = function () {
    if (checkCollisions(this)) {
      this._x -= this.dx;
      this._y -= this.dy;
      this.dx = 0;
      this.dy = 0;
    }
  }
}

function degToRad(deg) {
  inDeg = (Math.PI / 180) * deg;
  return inDeg;
}

function drawPackman(context, packman) {
  var cordX = packman.getX() + packman._radius;
  var cordY = packman.getY() + packman._radius;
  var smileAngle = degToRad(packman.getSmileAngle());

  context.translate(cordX, cordY);
  context.rotate(-smileAngle / 2);
  drawPackmanFigure(context, 0, 0, packman._radius, packman._color, smileAngle);
  context.rotate(smileAngle / 2);
  context.translate(-cordX, -cordY);
}

/* switch (frame) {
 case 0:
 context.drawImage(imgPackman, 0, 28.125, 28.125, 28.125, packman._x, packman._y, 15, 15);
 frame = 1;
 break;
 case 1:
 context.drawImage(imgPackman, 28.125, 28.125, 28.125, 28.125, packman._x, packman._y, 15, 15);
 frame = 2;
 break;
 case 2:
 context.drawImage(imgPackman, 56.25, 28.125, 28.125, 28.125, packman._x, packman._y, 15, 15);
 frame = 3;
 break;
 case 3:
 context.drawImage(imgPackman, 84.375, 28.125, 28.125, 28.125, packman._x, packman._y, 15, 15);
 frame = 0;
 } */
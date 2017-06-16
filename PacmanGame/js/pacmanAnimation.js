var CANVAS_WIDTH = 1000;
var CANVAS_HEIGHT = 500;

var DIRECTION_MAZE = "image/maze.png";
var DIRECTION_FOOD = "image/food.png";
var DIRECTION_SCORE_TABLE = "image/scoreTable.png";

var canvas;
var context;

window.onload = function () {

  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  animationTick();
};

var packman = new Packman(267, 4, 8, "green", 0, 0);



function animationTick() {

  drawMaze(DIRECTION_MAZE, 0, 0);
  drawFood(context, DIRECTION_FOOD);
  drawScoreTable(DIRECTION_SCORE_TABLE, 10, 4);
  packman.calcSmileAngle();
 // eat(packman);
  drawPackman(context, packman);

  redraw(packman);
  packman.collisions();

  /* if (packman._x === 330) {
    eat(packman);
    context.beginPath();
    context.fillStyle = "orange";
    context.fillRect(0, 0, 120, 50);
    context.fill();
  } */


  addEventListener("keydown", findDirection);
  window.requestAnimationFrame(animationTick);
}
function findDirection(event) {
  packman.dx = 0;
  packman.dy = 0;

  switch (event.keyCode) {
    case keys['RIGHT']:
      packman.dx = 2;
      break;
    case keys['DOWN']:
      packman.dy = 2;
      break;
    case keys['UP']:
      packman.dy = -2;
      break;
    case keys['LEFT']:
      packman.dx = -2;
      break;
  }
}
 function eat(packman) {
    context.beginPath();
    context.fillStyle = "blue";
    context.rect(packman._x, packman._y, 16, 15);
    context.fill();
  }

function redraw(packman) {

  if (packman.dx !== 0 || packman.dy !== 0) {

    packman._x += packman.dx;
    packman._y += packman.dy

  }
}

function drawScoreTable(scoreTableFile) {
  var imgScore = new Image();
  imgScore.onload = function () {
    context.drawImage(imgScore, 5, 5);
  };
  imgScore.src = scoreTableFile
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

function drawFood(context, foodFile) {

  var imgFood = new Image();
  imgFood.onload = function () {

    context.drawImage(imgFood, 330, 70);
    context.drawImage(imgFood, 400, 334);
    context.drawImage(imgFood, 195, 158);
    context.drawImage(imgFood, 125, 246);
    context.drawImage(imgFood, 140, 510);
    context.drawImage(imgFood, 93, 400);
    context.drawImage(imgFood, 230, 290);
    context.drawImage(imgFood, 513, 180);
    context.drawImage(imgFood, 294, 444);
    context.drawImage(imgFood, 414, 444);
    context.drawImage(imgFood, 400, 509);
    context.drawImage(imgFood, 309, 540);

  };
  imgFood.src = foodFile;
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

function Packman(x, y, radius, color, dx, dy) {
  this._color = color;
  this._radius = radius;

  this.dx = dx;
  this.dy = dy;

  this._x = x;
  this._y = y;

  this._SMILE_ANGLE = 1;
  this._SMILE_ANGLE_STEP = 5;

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


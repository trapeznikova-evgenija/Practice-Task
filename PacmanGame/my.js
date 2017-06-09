/**
 * Created by zena on 03.06.17.
 */
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var CANVAS_WIDTH = 1000;
var CANVAS_HEIGHT = 500;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

var circle = new Circle(100, 100, 0.03, 0.03, 10, "green");
drawCircle(context, circle);
function drawCircle() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();
  context.fillStyle = circle.circleColor;
  context.arc(circle.corX, circle.corY, circle.circleRadius, 0, Math.PI * 2, true);
  context.closePath();
  context.fill();

  //circle.corX += circle.dx;

    function handler(event) {
      switch (event.keyCode) {
        case keys['RIGHT']:
          circle.corX += circle.dx;
          break;
        case keys['DOWN']:
          circle.corY += circle.dy;
          break;
        case keys['UP']:
          circle.corY += -circle.dy;
          break;
        case keys['LEFT']:
          circle.corX += -circle.dx;
          break;
      }
    }

  if (circle.corX > canvas.width - circle.circleRadius) {
    circle.corX = canvas.width - circle.circleRadius - 5;
  } else {
    if (circle.corX < 0 + circle.circleRadius + 5) {
      circle.corX = 0 + circle.circleRadius + 5;
    }
  }

  if (circle.corY > canvas.height - circle.circleRadius) {
    circle.corY = canvas.height - circle.circleRadius - 5;
  } else {
    if (circle.corY < 0 + circle.circleRadius + 5) {
      circle.corY = 0 + circle.circleRadius + 5
    }
  }

  addEventListener("keydown", handler);
  requestAnimationFrame(drawCircle);
}

function Circle(x, y, dx, dy, radius, color) {  //конструктор для круга

  this.corX = x;
  this.corY = y;

  this.dx = dx;
  this.dy = dy;

  this.circleRadius = radius;
  this.circleColor = color;
}






/*var circle = new Circle(100, 100, 20, "green");
drawCircle(context, circle);
function drawCircle() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();
  context.fillStyle = circle.circleColor;
  context.arc(circle.corX, circle.corY, circle.circleRadius, 0, Math.PI * 2, true);
  context.closePath();
  context.fill();

  //circle.corX += circle.dx;

  console.log("я рисую облака");
   function handler(event) {
    switch(event.keyCode) {
      case 39:
        return 0;
      break;
      case 40:
        return 1;
      break;
      case 38:
        return 2;
      break;
      case 37:
        return 3;
      break;
      default:
        return 4;
      break;
    }
  }

  var dx = [1, 0, -1, 0, 0];
  var dy = [0, -1, 0, 1, 0];
  var direction;
  direction = handler(event);
  console.log(direction);

  //определяем direction по результату foundDirections
  circle.corX += dx[direction];
  circle.corY += dy[direction];
  addEventListener("keydown", handler);
  requestAnimationFrame(drawCircle);
}

function Circle(x, y, radius, color) {  //конструктор для круга

  this.corX = x;
  this.corY = y;

  this.circleRadius = radius;
  this.circleColor = color;
} */
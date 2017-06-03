/**
 * Created by zena on 03.06.17.
 */
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var CANVAS_WIDTH = 1000;
var CANVAS_HEIGHT = 500;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

var circle = new Circle(100, 100, 0.05, 0.05, 20, "green");
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
        circle.corX += circle.dx;
      break;
      case 40:
        return circle.corY += circle.dy;
      break;
      case 38:
        return circle.corY += -circle.dy;
      break;
      case 37:
        return circle.corX += -circle.dx;
      break;
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
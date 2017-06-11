var canvas;
var context;
window.onload = function () {

  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  var CANVAS_WIDTH = 1000;
  var CANVAS_HEIGHT = 500;

  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;


   initTick(context);


   function initTick(context) {
     var packman = new Packman(267, 4, 8, "green", 0, 0);
     animationTick();
     function animationTick() {
       drawMaze("maze.png", 0, 0);

       packman.calcSmileAngle();
       drawPackman(context, packman);

       function handler(event) {
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

       drawFood(context, "food1.png");
       //eat(packman);
       redraw(packman);

       if (checkCollisions(packman)) {
         packman._x -= packman.dx;
         packman._y -= packman.dy;
         packman.dx = 0;
         packman.dy = 0;
       }

       addEventListener("keydown", handler);
       window.requestAnimationFrame(animationTick);
     }

   }


/*  function eat(packman) {
    context.beginPath();
    context.fillStyle = "white";
    context.rect(packman._x, packman._y, 15, 15);
    context.fill();
  } */

  function redraw(packman) {

    if (packman.dx != 0 || packman.dy != 0) {

      packman._x += packman.dx;
      packman._y += packman.dy
    }

    if (packman._y > 593) {
      alert('Ты победил!');
    }
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

      if (red == 0 && green == 0 && blue == 0) {
        return true;
      }
      if (red == 169 && green == 169 && blue == 169) {
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
     this.COLOR = color;
     this.RADIUS = radius;

     this.dx = dx;
     this.dy = dy;

     this._x = x;
     this._y = y;
     this._smileAngle = 1;
     this._smileAngleStep = 5;

     this.getX = function () {
       return this._x;
     };
     this.getY = function () {
       return this._y;
     };
     this.getSmileAngle = function () {
       return this._smileAngle;
     };
     this.calcSmileAngle = function () {
       this._smileAngle += this._smileAngleStep;
       if ((this._smileAngle >= 90) || (this._smileAngle <= 1)) {
         this._smileAngleStep = -this._smileAngleStep;
       }
     };
   }


   function degToRad(deg) {
     inDeg = (Math.PI / 180) * deg;
     return inDeg;
   }

   function drawPackman(context, Packman) {
     var cordX = Packman.getX() + Packman.RADIUS;
     var cordY = Packman.getY() + Packman.RADIUS;
     var smileAngle = degToRad(Packman.getSmileAngle());

     context.translate(cordX, cordY);
     context.rotate(-smileAngle / 2);
     drawPackmanFigure(context, 0, 0, Packman.RADIUS, Packman.COLOR, smileAngle);
     context.rotate(smileAngle / 2); 
     context.translate(-cordX, -cordY);
     Packman.isOpened = !Packman.isOpened;
     
   }
};

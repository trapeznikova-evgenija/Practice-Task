window.onload = function () {

  var canvas = document.getElementById("SOS");
  var context = canvas.getContext("2d");

  var CANVAS_WIDTH = 1000;
  var CANVAS_HEIGHT = 600;

  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;


  initTick(context);


  function initTick(context) {
    var packman = new Packman(100, 100, 20, "#efef11");
    animationTick();

    function animationTick() {
      packman.calcSmileAngle();
      context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      drawPackman(context, packman);
      window.requestAnimationFrame(animationTick);
    }
  }
  function drawPackmanFigure(x, y, radius, color, endAngle) {

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


  function Packman(x, y, radius, color)
  {
    this.COLOR = color;
    this.RADIUS = radius;

    this._x = x;
    this._y = y;
    this._smileAngle = 1;
    this._smileAngleStep = 5;

    this.getX = function ()
    {
      return this._x;
    };
    this.getY = function ()
    {
      return this._y;
    };
    this.getSmileAngle = function()
    {
      return this._smileAngle;
    };
    this.calcSmileAngle = function ()
    {
      this._smileAngle += this._smileAngleStep;
      if ((this._smileAngle >= 90) || (this._smileAngle <= 1))
      {
        this._smileAngleStep = - this._smileAngleStep;
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
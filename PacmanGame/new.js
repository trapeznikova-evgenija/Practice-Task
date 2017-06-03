/**
 * Created by zena on 02.06.17.
 */

window.onload = function () {
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");

  canvas.width = 1000;
  canvas.height= 800;

  requestAnimationFrame(drawFrame);

  var currX = 10;
  var currY = 0;

  function drawFrame() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.beginPath();
    context.fillStyle = "red";
    context.fillRect(currX, currY, 30, 30);
    context.closePath();

  addEventListener('keydown', function (event) {
    if (event.keyCode = 39)
    {
      currX += 1;
    }
  });
  requestAnimationFrame(drawFrame);
  }

};
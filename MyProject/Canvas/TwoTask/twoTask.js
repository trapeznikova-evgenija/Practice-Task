/**
 * Created by zena on 25.05.17.
 */
var cx = document.querySelector("canvas").getContext("2d");
cx.beginPath();

function createBee(x, y) {
  cx.moveTo(x, y);
  cx.lineTo(x+15, y-5);
  cx.lineTo(x+30, y);
  cx.lineTo(x+30, y+5);
  cx.lineTo(x+15, y+10);
  cx.lineTo(x, y+5);
  cx.lineTo(x, y);

  cx.fillStyle = "#EDB71D";
  cx.strokeStyle = "#F39F18";
  cx.lineWidth = 1;
  cx.fill();
  cx.stroke();
}

var k = 20;
while (k < 580) {

  for (var i = 20; i < 490; i += 35) {
    createBee(i, k);
  }

  for ( i = 35; i < 505; i += 35) {
    createBee(i, k+15);
  }
  k += 30;
}

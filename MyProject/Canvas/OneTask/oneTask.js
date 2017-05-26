
var colors = ["rgba(24, 209, 255, 0.53)", "#26A661", "#1F613D", "#3CC37B", "#714B23", "#B07D2B",
               "#86702D", "#6E6E6E", "#8B351D", "#1D898B", "#C4E9F8", "#1CA9C9"];



function createImage() {

  var canvas = document.getElementById("home");
  var context = canvas.getContext("2d");
  context.beginPath();
  context.moveTo(10, 15);
 // context.globalAlpha = 0.333;
  context.fillStyle = colors[0];
  context.fillRect(0, 0, 800, 500);
  context.stroke();
  context.closePath();

  context.beginPath();
  context.moveTo(0, 120);
  context.lineWidth = 4;
  context.strokeStyle = colors[2];
  context.quadraticCurveTo(350, 120, 400,150);
  context.stroke();
  context.fillStyle = colors[1];
  context.lineTo(0, 150);
  context.stroke();
  context.moveTo(0, 120);
  context.lineTo(0, 200);
  context.stroke();
  context.moveTo(400,120);
  context.lineTo(400, 200);
  context.stroke();
  context.fill();
  context.closePath();

  context.beginPath();
  context.lineWidth = 2;
  context.strokeStyle = colors[4];
  context.fillStyle = colors[5];
  context.fillRect(80, 60, 100, 60);
  context.strokeRect(80, 60, 100, 60);
  context.closePath();

  context.beginPath();
  context.moveTo(180,60);
  context.lineTo(220,55);
  context.stroke();
  context.lineTo(220,122);
  context.stroke();
  context.lineTo(180,120);
  context.stroke();
  context.fill();

  context.beginPath();
  context.fillStyle = colors[6];
  context.moveTo(190, 80);
  context.lineTo(190, 122);
  context.stroke();
  context.moveTo(190,80);
  context.lineTo(210,77);
  context.stroke();
  context.lineTo(210,122);
  context.stroke();
  context.lineTo(190,121);
  context.stroke();
  context.fill();

  context.beginPath();
  context.fillStyle = colors[7];
  context.moveTo(180,60);
  context.lineTo(200,30);
  context.stroke();
  context.lineTo(220,55);
  context.closePath();
  context.stroke();
  context.fill();

  context.beginPath();  /* крыша */
  context.fillStyle = colors[8];
  context.moveTo(200,30);
  context.lineTo(100,30);
  context.stroke();
  context.lineTo(80,60);
  context.stroke();
  context.lineTo(180,60);
  context.stroke();
  context.fill();

  context.beginPath(); /* окно */
  context.strokeStyle = "black";
  context.lineWidth = 0.5;
  context.fillStyle = colors[9];
  context.fillRect(112,75,30,30);
  context.strokeRect(112,75,30,30);
  context.strokeRect(112,75,15,15);
  context.strokeRect(112,90,15,15);
  context.strokeRect(127,90,15,15);
  context.strokeRect(127,75,15,15);
  context.stroke();
  context.fill();

  context.beginPath();
  context.fillStyle = colors[10];
  context.strokeStyle = colors[11];
  context.lineWidth = 1;
  context.moveTo(20,25);
  context.bezierCurveTo(20,20,25,20,35,20);
  context.bezierCurveTo(40,15,48,10,55,20);
  context.bezierCurveTo(80,25,58,30,35,30);
  context.bezierCurveTo(20,25,20,30,20,25);
  context.fill();
  context.stroke();
  context.closePath();

  context.beginPath();
  context.lineWidth = 0.5;
  context.strokeStyle = colors[4];
  context.fillStyle = colors[7];
  context.fillRect(135,15,10,15);
  context.strokeRect(135,15,10,15);




}

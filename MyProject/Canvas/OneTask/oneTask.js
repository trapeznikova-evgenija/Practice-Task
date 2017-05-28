var colors = ["rgba(24, 209, 255, 0.53)", "#26A661", "#1F613D", "#3CC37B", "#714B23", "#B07D2B",
               "#86702D", "#6E6E6E", "#8B351D", "#1D898B", "#C4E9F8", "#1CA9C9"];

var canvas = document.getElementById("home");
var context = canvas.getContext("2d");
context.beginPath();
context.moveTo(10, 15);
context.fillStyle = colors[0];
context.fillRect(0, 0, 800, 500);
context.stroke();
context.closePath();

function drawingGrass() {

  context.beginPath();
  context.lineWidth = 4;
  context.strokeStyle = colors[2];
  context.fillStyle = colors[3];
  context.moveTo(0, 400);
  context.quadraticCurveTo(400, 380, 800, 400);
  context.lineTo(800, 500);
  context.lineTo(0, 500);
  context.stroke();
  context.fill();
  context.closePath();
}

function drawingHome() {

  context.beginPath();
  context.strokeStyle = colors[4];
  context.fillStyle = colors[5];
  context.fillRect(200, 240, 250, 150);
  context.strokeRect(200, 240, 250, 150);
  context.fillRect(450, 240, 75, 150);
  context.strokeRect(450, 240, 75, 150);
  context.stroke();
  context.closePath();
}

function drawingBlocks() {
  var homeWidth = 400 - 75;
  var homeHeight = 150;
  var homeX = 200;
  var homeY = 235;
  context.beginPath();
  context.strokeStyle = colors[4];
  context.lineWidth = 1;

  for (var i = 5; i < homeHeight; i += 26) {
    context.beginPath();
    context.moveTo(homeX, homeY + i);
    context.lineTo(homeX + homeWidth, homeY + i);
    context.stroke();
  }

  for (var k = homeX; k < homeWidth + 170; k += 25) {
    context.beginPath();
    context.moveTo(k + 25, 240);
    context.lineTo(k + 25, 390);
    context.stroke();
    context.closePath();
  }
}

function drawingRoof() {

  context.beginPath();
  context.lineWidth = 4;
  context.strokeStyle = "#474747";
  context.moveTo(200, 240);
  context.lineTo(240, 150);
  context.lineTo(480, 150);
  context.lineTo(450, 240);
  context.closePath();
  context.fill();
  context.stroke();
  context.fillStyle = colors[7];
  context.moveTo(482, 150);
  context.lineTo(525, 240);
  context.lineTo(450, 240);
  context.fill();
  context.stroke();
  context.closePath();

  var x = 240;
  var y = 240;
  for (var g = 1; g < 180; g += 35) {
    context.moveTo(x + g, y);// line
    context.lineTo(x + 35 + g, y - 90);
    context.stroke();
  }

  //труба
  context.beginPath();
  context.fillStyle = "rgba(0, 0, 0, 0.8)";
  context.fillRect(280, 120, 20, 30);
  context.strokeRect(280, 120, 20, 30);
  context.closePath();
}

function drawingWindow() {

  context.beginPath();
  context.fillStyle = colors[9];
  context.strokeStyle = colors[7];
  context.fillRect(250, 280, 50, 50);
  context.strokeRect(250, 280, 50, 50);
  context.moveTo(275, 280);
  context.lineTo(275, 330);
  context.stroke();


  context.fillRect(350, 280, 50, 50);
  context.strokeRect(350, 280, 50, 50);
  context.moveTo(375, 280);
  context.lineTo(375, 330);
  context.stroke();
  context.closePath();

  context.beginPath();
  context.strokeStyle = "#474747";
  context.fillStyle = colors[9];
  context.strokeRect(475, 200, 20, 20);
  context.fillRect(475, 200, 20, 20);
  context.stroke();
  context.closePath();
}

function drawingDoor() {

  context.beginPath();
  context.fillStyle = colors[6];
  context.strokeStyle = colors[4];
  context.strokeRect(468, 288, 40, 100);
  context.fillRect(468, 288, 40, 100);
  context.moveTo(472, 330);
  context.lineTo(478, 330);
  context.lineTo(478, 344);
  context.lineTo(472, 344);
  context.stroke();
  context.closePath();
}

function drawingCloud(cloudX, cloudY) {

  context.beginPath();
  context.strokeStyle = colors[9];
  context.fillStyle = colors[10];
  context.lineWidth = 2;

  context.moveTo(cloudX, cloudY);
  context.quadraticCurveTo(cloudX + 15, cloudY - 10, cloudX + 40, cloudY - 10);
  context.quadraticCurveTo(cloudX + 70, cloudY - 40, cloudX + 95, cloudY - 10);
  context.quadraticCurveTo(cloudX + 120, cloudY - 25, cloudX + 140, cloudY);
  context.quadraticCurveTo(cloudX + 110, cloudY + 50, cloudX + 50, cloudY + 30);
  context.quadraticCurveTo(cloudX - 10, cloudY + 30, cloudX, cloudY);

  context.fill();
  context.stroke();
  context.closePath();
}

function drawingSun() {

  context.beginPath();
  context.fillStyle = "#FFFF00";
  context.strokeStyle = "#FFD700";
  context.lineWidth = 8;
  context.arc(500, 60, 25, 0, 2 * Math.PI, true);
  context.fill();
  context.stroke();
  context.closePath();

}

function drawingFlower(x, y) {

  context.beginPath();
  context.fillStyle = "#FA8072";
  context.strokeStyle = "#DC143C";
  context.lineWidth = 7;
  context.moveTo(x, y);
  context.quadraticCurveTo(x + 10, y - 15, x + 20, y);
  context.quadraticCurveTo(x + 45, y + 10, x + 12, y + 15);
  context.quadraticCurveTo(x - 4, y + 24, x - 8, y + 10);
  context.closePath();
  context.arc(x + 8, y + 5, 3, 0, 2 * Math.PI, true);
  context.fill();
  context.stroke();
  context.closePath();
}


drawingGrass();
drawingHome();
drawingBlocks();
drawingRoof();
drawingWindow();
drawingDoor();
drawingCloud(110, 100);
drawingCloud(600, 80);
drawingCloud(620, 180);
drawingCloud(40, 200);
drawingSun();
drawingFlower(150, 460);
drawingFlower(30, 450);
drawingFlower(620, 440);
drawingFlower(320, 430);
drawingFlower(480, 470);
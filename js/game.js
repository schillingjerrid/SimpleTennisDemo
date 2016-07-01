// Simple Tennis Game
// Jerrid Schilling

// VARIABLES
var canvas;
var canvasContext;

var ballX = 20;
var ballY = 300;
var ballSize = 10;
var ballSpeedX = 5;
var ballSpeedY = 2;

var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_HEIGHT = 100;

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  var framesPerSecond = 60;
  setInterval(()=>{
    moveEverything();
    drawEverything();
  }, 1000/framesPerSecond);
};

function moveEverything() {
  ballX = ballX + ballSpeedX;
  ballY = ballY + ballSpeedY;
  if(ballX+10 > canvas.width || ballX-10 < 0) {
    ballSpeedX *= -1;
  }
  if(ballY+10 > canvas.height || ballY-10 < 0) {
    ballSpeedY *= -1;
  }
}

function drawEverything() {
  // Draws the black background
  colorRect(0,0,canvas.width, canvas.height, 'black');

  // Draws the left player paddle
  colorRect(10, 250, 10, 100, 'white');

  // Draws the game ball
  colorCircle(ballX, ballY, 10, 'white');
}

function colorRect(leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX,topY,width, height);
}

function colorCircle(centerX, centerY, radius, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, (Math.PI*2), true);
  canvasContext.fill();
}

// Simple Tennis Game
// Jerrid Schilling

// VARIABLES
var canvas;
var canvasContext;

var ballX = 400;
var ballY = 300;
var ballSize = 10;
var ballSpeedX = 5;
var ballSpeedY = 2;

var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;

var showingWinScreen = false;

var player1Score = 0;
var player2Score = 0;
const WINNING_SCORE = 3;

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  var framesPerSecond = 60;
  setInterval(()=>{
    moveEverything();
    drawEverything();
  }, 1000/framesPerSecond);

  canvas.addEventListener('mousedown', handleMouseClick);

  canvas.addEventListener('mousemove', (evt)=>{
    var mousePos = calculateMousePos(evt);
    paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
  });
};

function handleMouseClick(evt) {
  if(showingWinScreen) {
    player1Score = 0;
    player2Score = 0;
    showingWinScreen = false;
  }
}

function calculateMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top - root.scrollTop;
  return {
    x:mouseX,
    y:mouseY
  };
}

function ballReset() {
  if(player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE) {
    showingWinScreen = true;
  }

  ballSpeedX *= -1;
  ballX = canvas.width/2;
  ballY = canvas.height/2;
}

function computerMovement() {
  if((paddle2Y+(PADDLE_HEIGHT/2)) < ballY-35) {
    paddle2Y += 5;
  } else if((paddle2Y+(PADDLE_HEIGHT/2)) > ballY+35) {
    paddle2Y -= 5;
  }
}

function moveEverything() {
  if(showingWinScreen) {
    return;
  }
  computerMovement();

  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if(ballX-10 < 20) {
    if(ballY > paddle1Y && ballY < paddle1Y+PADDLE_HEIGHT) {
      ballSpeedX *= -1;
      var deltaY = ballY - (paddle1Y+PADDLE_HEIGHT/2);
      ballSpeedY = deltaY * 0.20;
    }
    else if(ballX-10 < 0) {
      player2Score++;
      ballReset();
    }
  }
  if(ballX+10 > canvas.width-20) {
    if(ballY > paddle2Y && ballY < paddle2Y+PADDLE_HEIGHT) {
      ballSpeedX *= -1;
      var deltaY = ballY - (paddle2Y+PADDLE_HEIGHT/2);
      ballSpeedY = deltaY * 0.20;
    }
    else if(ballX+10 < canvas.width) {
      player1Score++;
      ballReset();
    }
  }
  if(ballY+10 > canvas.height || ballY-10 < 0) {
    ballSpeedY *= -1;
  }
}

function drawNet() {
  for(var i = 10; i<canvas.height; i+=40) {
    colorRect(canvas.width/2 -1, i, 2, 20, 'white');
  }
}

function drawEverything() {

  // Draws the black background
  colorRect(0,0,canvas.width, canvas.height, 'black');

  if(showingWinScreen) {
    canvasContext.fillStyle = 'white';

    if(player1Score >= WINNING_SCORE) {
      canvasContext.fillText("You won!", 350, 200);
    }
    else if(player2Score >= WINNING_SCORE) {
      canvasContext.fillText("You lost!", 350, 200);
    }

    canvasContext.fillText("Click to Continue", 350, 500);
    return;
  }

  drawNet();

  // Draws the player 1 paddle
  colorRect(10, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');

  // Draws the player 2 paddle
  colorRect(canvas.width-20, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');

  // Draws the game ball
  colorCircle(ballX, ballY, 10, 'white');

  canvasContext.fillText(player1Score, 100, 100);
  canvasContext.fillText(player2Score, canvas.width-100, 100);
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

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const paddleWidth = 20;
const paddleHeight = 100;
const ballSize = 10;

let player1Y = (canvas.height - paddleHeight) / 2;
let player2Y = (canvas.height - paddleHeight) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;

let player2YSpeed = 0;

let player1Score = 0;
let player2Score = 0;

function drawPaddle(x, y) {
    ctx.fillStyle = '#fff';
    ctx.fillRect(x, y, paddleWidth, paddleHeight);
}

function drawBall(x, y) {
    ctx.fillStyle = '#fff';
    ctx.fillRect(x, y, ballSize, ballSize);
}

function drawScores() {
    ctx.font = '24px Arial';
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    // Puntaje del jugador 1
    ctx.fillText(`${player1Score}`, 100, 20);

    // Puntaje del jugador 2
    ctx.fillText(`${player2Score}`, canvas.width - 100, 20);
}


function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPaddle(0, player1Y);
    drawPaddle(canvas.width - paddleWidth, player2Y);
    drawBall(ballX, ballY);
    drawScores();

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    player2Y += player2YSpeed;

    if (player2Y < 0) {
        player2Y = 0;
    } else if (player2Y > canvas.height - paddleHeight) {
        player2Y = canvas.height - paddleHeight;
    }

    if (ballY <= 0 || ballY >= canvas.height - ballSize) {
        ballSpeedY = -ballSpeedY;
    }

    if (ballX <= paddleWidth && ballY >= player1Y && ballY <= player1Y + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    if (ballX >= canvas.width - paddleWidth - ballSize && ballY >= player2Y && ballY <= player2Y + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    if (ballX <= 0) {
        player2Score++;
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballSpeedX = 5;
        ballSpeedY = 5;
    }

    if (ballX >= canvas.width) {
        player1Score++;
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballSpeedX = -5;
        ballSpeedY = -5;
    }

    requestAnimationFrame(update);
}

window.addEventListener('mousemove', (event) => {
    player1Y = event.clientY - paddleHeight / 2;
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
        player2YSpeed = -5;
    } else if (event.key === 'ArrowDown') {
        player2YSpeed = 5;
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        player2YSpeed = 0;
    }
});

update();
// script.js

document.addEventListener('DOMContentLoaded', () => {
    const player = document.getElementById('player');
    const note = document.getElementById('note');
    const obstacle = document.getElementById('obstacle');
    const scoreDisplay = document.getElementById('score');
    const startButton = document.getElementById('start-button');

    // Mobile control buttons
    const leftButton = document.getElementById('left-btn');
    const rightButton = document.getElementById('right-btn');

    let score = 0;
    let gameInterval;
    let noteSpeed = 4;
    let obstacleSpeed = 5;

    function startGame() {
        score = 0;
        scoreDisplay.textContent = score;
        startButton.disabled = true;

        note.style.top = '-30px';
        note.style.left = Math.floor(Math.random() * 270) + 'px';
        obstacle.style.top = '-30px';
        obstacle.style.left = Math.floor(Math.random() * 270) + 'px';

        gameInterval = setInterval(() => {
            moveNote();
            moveObstacle();
        }, 20);
    }

    function moveNote() {
        let noteTop = parseInt(window.getComputedStyle(note).getPropertyValue('top'));
        note.style.top = noteTop + noteSpeed + 'px';

        if (noteTop >= 470) {
            note.style.top = '-30px';
            note.style.left = Math.floor(Math.random() * 270) + 'px';
        }

        if (isColliding(player, note)) {
            score++;
            scoreDisplay.textContent = score;
            note.style.top = '-30px';
            note.style.left = Math.floor(Math.random() * 270) + 'px';
        }
    }

    function moveObstacle() {
        let obstacleTop = parseInt(window.getComputedStyle(obstacle).getPropertyValue('top'));
        obstacle.style.top = obstacleTop + obstacleSpeed + 'px';

        if (obstacleTop >= 470) {
            obstacle.style.top = '-30px';
            obstacle.style.left = Math.floor(Math.random() * 270) + 'px';
        }

        if (isColliding(player, obstacle)) {
            endGame();
        }
    }

    function endGame() {
        clearInterval(gameInterval);
        alert('Game Over! Your score: ' + score);
        startButton.disabled = false;
    }

    function isColliding(div1, div2) {
        let rect1 = div1.getBoundingClientRect();
        let rect2 = div2.getBoundingClientRect();

        return !(rect1.top > rect2.bottom || 
                 rect1.bottom < rect2.top || 
                 rect1.right < rect2.left || 
                 rect1.left > rect2.right);
    }

    function movePlayer(direction) {
        let playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue('left'));
    
        if (direction === 'left' && playerLeft > 0) {
            player.style.left = playerLeft - 50 + 'px';
        } else if (direction === 'right' && playerLeft < 250) {
            player.style.left = playerLeft + 50 + 'px';
        }
    }
    

    // Arrow key controls
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            movePlayer('left');
        } else if (e.key === 'ArrowRight') {
            movePlayer('right');
        }
    });

    

    // Mobile touch controls
    leftButton.addEventListener('touchstart', () => movePlayer('left'));
    rightButton.addEventListener('touchstart', () => movePlayer('right'));

    startButton.addEventListener('click', startGame);
});

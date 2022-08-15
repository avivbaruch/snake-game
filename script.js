document.addEventListener('keydown', (e) => {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;

    if (e.which === LEFT_KEY && !goingRight) {
        dx = -10;
        dy = 0;
    }
    if (e.which === RIGHT_KEY && !goingLeft) {
        dx = 10;
        dy = 0;
    }
    if (e.which === UP_KEY && !goingDown) {
        dx = 0;
        dy = -10;
    }
    if (e.which === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 10;
    }
})
// switch דרך נוספת עם 
/* switch (e.which) {
      case LEFT_KEY && ! goingRight:
          dx = -10;
          dy = 0;
          break;
      case UP_KEY:
          dx = 0;
          dy = -10;
          break;
      case RIGHT_KEY:
          dx = 10;
          dy = 0;
          break;
      case DOWN_KEY:
          dx = 0;
          dy = 10;
          break;
  }
});
*/
const snakeboard = document.getElementById("gameCanvas");
const snakeboard_ctx = gameCanvas.getContext("2d");
let snake = [
    { x: 200, y: 200 },
    { x: 190, y: 200 },
    { x: 180, y: 200 },
    { x: 170, y: 200 },
    { x: 160, y: 200 }
]

function drawSnakePart(snakePart) {
    snakeboard_ctx.fillStyle = 'lightblue';
    snakeboard_ctx.strokeStyle = "white";
    snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

/*Function that prints the parts*/
function drawSnake() {
    snake.forEach(drawSnakePart);
}

function clear() {
    snakeboard_ctx.fillStyle = 'white';
    snakeboard_ctx.strokeStyle = "white";
    snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
    snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}

let dx = 10;
let dy = 0;
let score = 0;
let head = 0;

function moveSnake() {
    head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    const has_eaten_food = snake[0].x === food_x && snake[0].y === food_y;
    if (has_eaten_food == true) {
        getFood();
        score += 1
        document.getElementById("score").innerHTML = score
    } else {
        snake.pop();
    }
}

function randomFood(min, max) {
    return Math.round((Math.random() * (max - min) / 10)) * 10;
}

function getFood() {
    food_x = randomFood(0, snakeboard.width - 10)
    food_y = randomFood(0, snakeboard.height - 10)
    snake.forEach((part) => {
        const has_eaten = part.x == food_x && part.y == food_y;
        if (has_eaten) getFood();
    })
}

function drawFood() {
    snakeboard_ctx.fillStyle = 'lightgreen';
    snakeboard_ctx.strokestyle = 'darkgreen';
    snakeboard_ctx.fillRect(food_x, food_y, 10, 10);
    snakeboard_ctx.strokeRect(food_x, food_y, 10, 10,);
}
const text = document.getElementById("alerts");
const alert_ctx = text.getContext("2d");

function has_game_ended() {
    for (let i = 1; i < snake.length; i++) {
        let snakePart = snake[i];
        if (snakePart.x === head.x && snakePart.y === head.y) {
            alert_ctx.font = "20px Verdana";;
            alert_ctx.fillText("Game Over", 30, 30);
            restart()
            return true
        }
    }
    const snakeMoving = head.x >= 0 && head.x < 400 && head.y >= 0 && head.y < 400;
    if (snakeMoving == true) {
        return false
    } else {
        alert_ctx.font = "20px Verdana";;
        alert_ctx.fillText("Game Over", 30, 30);
        restart()
        return true
    }
}


 let=gameOver = false
function main() {

    if (gameOver == false) {

        setTimeout(() => {
            clear()
            drawFood()
            moveSnake();
            drawSnake();

            gameOver = has_game_ended()
            main()
        }, 100);
    }
}
getFood()
main();

function restart(){
    snake = [
        { x: 200, y: 200 },
        { x: 190, y: 200 },
        { x: 180, y: 200 },
        { x: 170, y: 200 },
        { x: 160, y: 200 },
    ]
    dx=10
    dy=0
    main();
}
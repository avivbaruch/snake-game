document.addEventListener('keydown',(e)=> {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;
    switch (e.which) {
        case LEFT_KEY:
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
    const lastIndex = snake[4]
    snakeboard_ctx.fillStyle = 'white';
    snakeboard_ctx.strokeStyle = "white";
    snakeboard_ctx.fillRect(lastIndex.x, lastIndex.y, 10, 10);
    snakeboard_ctx.strokeRect(lastIndex.x, lastIndex.y, 10, 10,);
}

let dx = 10;
let dy = 0;

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y+dy };
    snake.unshift(head);
    snake.pop();
}


function main() {
    setTimeout(() => {
        drawSnake();
        clear()
        moveSnake();
        main()
    }, 150);

}
main();
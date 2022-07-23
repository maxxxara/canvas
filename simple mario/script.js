// GAME CONSTS
const player_width = 30;
const player_height = 70;
const player_color = 'red';
const player_velocity = 3;

const brick_width = 60;
const brick_height = 10;
const brick_color = 'black';

// GAME CONSTS


var canvas = document.getElementById("canvas");
var screenW = window.innerWidth - 100;
var screenH = window.innerHeight - 100;
canvas.width = screenW;
canvas.height = screenH;
var ctx = canvas.getContext("2d");

var active_key = undefined;




function Rect(x, y, width, height, color, role) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.role = role;

    this.draw = () => {
        ctx.beginPath();
        ctx.rect(x, y, width, height);
        ctx.fillStyle = color;
        ctx.fill();
    }

    this.update = () => {
        this.draw();
        if(role == 'player') {
            window.addEventListener('keydown', function(e) {
                if(e.code == "ArrowRight") {
                    x += 0.1;
                }
                if(e.code == "ArrowLeft") {
                    x -= 0.1;
                }
                if(e.code == "ArrowUp") {
                    y -= 3;
                }
            })
        }
    }
}

var x = 100;

var player = new Rect(x, screenH - player_height, player_width, player_height, player_color, 'player')
var brick = new Rect(600, 300, brick_width, brick_height, brick_color)

window.addEventListener('keydown', function(e) {
    if(e.code == "ArrowRight") {
        active_key = 'right';
    } else {
        active_key = undefined
    }
    if(e.code == "ArrowLeft") {
        active_key = 'left';
    }
    if(e.code == "ArrowUp") {
        active_key = 'up';
    }
    if(e.code == "ArrowDown") {
        active_key = 'down';
    }
})

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, screenW, screenH)
    player.update();
    brick.update();

    

}
animate();


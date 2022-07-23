var canvas = document.getElementById("canvas");
var screenW = window.innerWidth;
var screenH = window.innerHeight;
canvas.width = screenW
canvas.height = screenH;
var ctx = canvas.getContext("2d")

function Ball(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;

    this.draw = function() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fillStyle = 'red';
        ctx.fill();
    }

    this.update = function() {
        this.draw()
        if(this.y + this.radius + this.dy > canvas.height) {
            this.dy = -this.dy * 0.99;
        } else {
            this.dy += 2;
        }
        console.log(this.dy)
        this.y += this.dy;

    }
}
var dx = 2;
var dy = 4;
var ball = new Ball(screenW / 2, screenH / 2, dx, dy, 30, 'red')

function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, screenW, screenH)
    ball.update()
}

animate()
var canvas = document.getElementById("canvas");
var screenW = window.innerWidth;
var screenH = window.innerHeight;
canvas.width = screenW;
canvas.height = screenH;
var ctx = canvas.getContext("2d");


function Circle(x, y, radius, color, dx, dy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.dx = dx;
    this.dy = dy;

    this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'red';
        ctx.fill();
    }

    this.update = function() {
        this.draw();

        this.x += this.dx;
        this.y += this.dy;

        if(this.x + this.radius> screenW || this.x < 0 + this.radius) {
            this.dx = -this.dx
        }
        if(this.y + this.radius > screenH || this.y  < 0 + this.radius) {
            this.dy = -this.dy
        }
    }
}
var circle = new Circle(100, 100, 30, 'green', 10, 10)
function animate() {
    ctx.clearRect(0,0, screenW, screenH);
    circle.update()

    requestAnimationFrame(animate);
}
animate()
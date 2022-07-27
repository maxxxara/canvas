var canvas = document.getElementById("canvas");
var screenW = window.innerWidth;
var screenH = window.innerHeight;
canvas.width = screenW;
canvas.height = screenH;
var mouseX;
var mouseY;
var ctx = canvas.getContext("2d");

window.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
})
function getDistance(x1, y1, x2, y2) {
    var xValue = x2 - x1;
    var yValue = y2 - y1;
    return Math.sqrt(Math.pow(xValue, 2) + Math.pow(yValue, 2))
}


function Circle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = this.color;
        ctx.fill()
    }

    this.update = function() {
        this.draw();
    }
}


var circle1 = new Circle(300, 300, 100, 'black');
var circle2 = new Circle(40, 40, 30, 'red')
function animate() {
    circle2.x = mouseX;
    circle2.y = mouseY;
    
    ctx.clearRect(0,0, screenW, screenH)
    circle2.update();
    
    circle1.update();

    requestAnimationFrame(animate);
}
animate()
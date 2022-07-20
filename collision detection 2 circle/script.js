var canvas = document.getElementById("canvas");
var screenW = window.innerWidth;
var screenH = window.innerHeight;
canvas.width = screenW;
canvas.height = screenH;
var ctx = canvas.getContext("2d");

function Circle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.draw() = function() {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0,)
    }
}
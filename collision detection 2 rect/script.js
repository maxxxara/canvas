var canvas = document.getElementById("canvas");
var screenW = window.innerWidth;
var screenH = window.innerHeight;
canvas.width = screenW;
canvas.height = screenH;
var ctx = canvas.getContext("2d");
var mouseX;
var mouseY;
window.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
})

function Rect(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;

    this.draw = () => {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = color;
        ctx.fill();
    }
    this.update = () => {
        this.draw()
    }

}
var rect1 = new Rect(screenW / 2 - 150, screenH / 2 - 100, 150, 100, 'red')
var rect2 = new Rect(10, 10, 150, 100, 'blue');
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, screenW, screenH)
    rect1.update();
    rect2.x = mouseX;
    rect2.y = mouseY;

    if(rect2.x + rect2.width >= rect1.x &&
        rect2.x <= rect1.x + rect1.width &&
        rect2.y + rect2.height >= rect1.y &&
        rect2.y <= rect1.y + rect1.height) {
        console.log("asdsa")
    }
    rect2.update();
}

animate();
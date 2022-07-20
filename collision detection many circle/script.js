var canvas = document.getElementById("canvas");
var screenW = window.innerWidth;
var screenH = window.innerHeight;
canvas.width = screenW;
canvas.height = screenH;
var ctx = canvas.getContext("2d");

function getDistance(x1, y1, x2, y2) {
    var xCord = x2 - x1;
    var yCord = y2 - y1;
    return Math.sqrt(Math.pow(xCord, 2) + Math.pow(yCord, 2))
}

function circle1(x,y) {
    this.x = x;
    this.y = y
    
    this.draw = () => {
        ctx.beginPath();
        ctx.arc(x, y, 30, 0, 2 * Math.PI);
        ctx.fillStyle = 'red';
        ctx.fill()
        x += 1
        return x;
    }
}
function circle2(x, y) {
    this.x = x;
    this.y = y

    this.draw = () => {
        ctx.beginPath();
        ctx.arc(x, y, 30, 0, 2 * Math.PI);
        ctx.fillStyle = 'red';
        ctx.fill()
        x -= 1
        return x;
    }
}


var circle1 = new circle1(100, screenH / 2)
var circle2 = new circle2(screenW - 100 - 30, screenH / 2)
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, screenW, screenH);
    circle1.draw()
    circle2.draw()
}

animate()
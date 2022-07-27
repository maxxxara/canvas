var canvas = document.getElementById('canvas')
var screenW = window.innerWidth;
var screenH = window.innerHeight - 100;
canvas.width = screenW
canvas.height = screenH
var ctx = canvas.getContext('2d')
var mouse = {
    x: 0,
    y: 0
}
var playerScore = 0
var computerScore = 0
var playerScoreInit = document.getElementById('playerScoreInit')
var computerScoreInit = document.getElementById('computerScoreInit')

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
})
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
function getDistance(x1, y1, x2, y2) {
    var xValue = x2 - x1;
    var yValue = y2 - y1;
    return Math.sqrt(Math.pow(xValue, 2) + Math.pow(yValue, 2))
}


class Player {
    constructor({y}) {
        this.x = 20
        this.y = y
        this.width = 10
        this.height = 60
        this.color = 'white'
    }
    draw() {
        ctx.beginPath()
        ctx.fillStyle =  this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    update() {
        this.draw()
    }
}

class Computer {
    constructor({dy}) {
        this.x = screenW - 30
        this.y = 10
        this.dy = dy
        this.width = 10
        this.height = 60
        this.color = 'white'
    }
    draw() {
        ctx.beginPath()
        ctx.fillStyle =  this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    update() {
        this.draw()
        if(this.y + this.height >= screenH) {
            this.dy = -this.dy
        } else if(this.y < 0) {
            this.dy = -this.dy
        }
        this.y += this.dy
    }
}

class Ball {
    constructor({position, velocity}) {
        this.position = position
        this.velocity = velocity
        this.radius = 20
        this.color = '#FF5733'
    }

    draw() {
        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, true)
        ctx.fillStyle = this.color
        ctx.fill()
    }

    update() {
        this.draw()
        if(this.position.y + this.radius >= screenH || this.position.y <= 0) {
            this.velocity.y = -this.velocity.y
        }
        if(this.position.x + this.radius >= screenW || this.position.x <= 0) {
            this.velocity.x = -this.velocity.x
        }
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}



var player = new Player({
    y: mouse.y
})
var computer = new Computer({
    dy: 20
})
var ball = new Ball({
    position: {
        x: 100,
        y: 300
    },
    velocity: {
        x: getRandom(5, 10),
        y: getRandom(5, 10)
    }
})

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, screenW, screenH)
    player.update()
    player.y = mouse.y
    computer.update()
    ball.update()

    var distX = Math.abs(ball.position.x - player.x-player.width/2);
    var distY = Math.abs(ball.position.y - player.y-player.height/2);

    var distX2 = Math.abs(ball.position.x - computer.x-computer.width/2);
    var distY2 = Math.abs(ball.position.y - computer.y-computer.height/2);
    if (distX <= (player.width/2) && distY <= (player.height/2) + ball.radius) { 
        ball.velocity.x = -ball.velocity.x
        ball.velocity.y = -ball.velocity.y
    }
    if (distX2 <= (computer.width/2) && distY2 <= (computer.height/2) + ball.radius) { 
        ball.velocity.x = -ball.velocity.x
        ball.velocity.y = -ball.velocity.y
    }

    if(ball.position.x <= 0) {
        computerScore++
        console.log(computerScore)
        ball.velocity = {
            x: getRandom(5, 10),
            y: getRandom(5, 10)
        }
        ball.position.x = 100
        ball.position.y = 200

    }
    if(ball.position.x + ball.radius >= screenW) {
        playerScore++
        console.log(playerScore)
        ball.velocity = {
            x: getRandom(5, 10),
            y: getRandom(5, 10)
        }
        ball.position.x = 100
        ball.position.y = 200
    }
    playerScoreInit.innerText = playerScore
    computerScoreInit.innerText = computerScore

}

animate()
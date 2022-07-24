var canvas = document.getElementById('canvas')
var screenW = window.innerWidth;
var screenH = window.innerHeight;
canvas.width = screenW;
canvas.height = screenH;
var ctx = canvas.getContext('2d');
var radius = 14
var boundary_width = 40
var boudnary_height = 40
var scoreElement = document.getElementById("scoreElement");
var score = 0
var maxScore = 0
var gameEnd = false

function getDistance(x1, y1, x2, y2) {
    var xValue = x2 - x1;
    var yValue = y2 - y1;
    return Math.sqrt(Math.pow(xValue, 2) + Math.pow(yValue, 2))
}
function boundaryImage(src) {
    var img = new Image()
    img.src = src
    return img
}
class Boundary {
    static width = boundary_width;
    static height = boundary_width;
    constructor({position, image}) {
        this.position = position;
        this.width = 40;
        this.height = 40;
        this.image = image
    }
    draw() {
        ctx.drawImage(this.image, this.position.x, this.position.y)        
    }
}
class Player {
    constructor({position, radius, velocity}) {
        this.position = position
        this.radius = radius
        this.velocity = velocity
        this.color = 'yellow'
    }
    draw() {
        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
    }
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}
class Pellet {
    constructor({position, radius}) {
        this.position = position
        this.radius = radius
        this.color = 'white'
    }
    draw() {
        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
    }
}
class Ghost {
    constructor({position, radius, velocity}) {
        this.position = position
        this.radius = radius
        this.velocity = velocity
        this.color = 'red'
    }
    draw() {
        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
    }
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}


var boundaries = []
var pellets = []
var ghosts = []

var map = [
    ['1','-','-','-','-', '-', '-', '-', '2'],
    ['|','.','.','.','.', '.', '.', 'g', '|'],
    ['|','.','.','b','.', 'b', '.', '.', '|'],
    ['|','.','.','.','.', '.', '.', '.', '|'],
    ['|','.','.','.','b', '.', 'b', '.', '|'],
    ['|','.','b','.','.', 'g', '.', '.', '|'],
    ['4','-','-','-','-', '-', '-', '-', '3'],
]
map.forEach((row, i) => {
    row.forEach((symbol, j) => {
        switch(symbol) {
            case '-':
                boundaries.push(new Boundary({
                    position: {
                        x: j * boundary_width,
                        y: i * boudnary_height
                    },
                    image: boundaryImage("./img/pipeHorizontal.png")
                }))
                break;
            case '|':
                boundaries.push(new Boundary({
                    position: {
                        x: j * boundary_width,
                        y: i * boudnary_height
                    },
                    image: boundaryImage("./img/pipeVertical.png")
                }))
                break;
            case '1':
                boundaries.push(new Boundary({
                    position: {
                        x: j * boundary_width,
                        y: i * boudnary_height
                    },
                    image: boundaryImage("./img/pipeCorner1.png")
                }))
                break;
            case '2':
                boundaries.push(new Boundary({
                    position: {
                        x: j * boundary_width,
                        y: i * boudnary_height
                    },
                    image: boundaryImage("./img/pipeCorner2.png")
                }))
                break;
            case '3':
                boundaries.push(new Boundary({
                    position: {
                        x: j * boundary_width,
                        y: i * boudnary_height
                    },
                    image: boundaryImage("./img/pipeCorner3.png")
                }))
                break;
            case '4':
                boundaries.push(new Boundary({
                    position: {
                        x: j * boundary_width,
                        y: i * boudnary_height
                    },
                    image: boundaryImage("./img/pipeCorner4.png")
                }))
                break;
            case 'b':
                boundaries.push(new Boundary({
                    position: {
                        x: j * boundary_width,
                        y: i * boudnary_height
                    },
                    image: boundaryImage("./img/block.png")
                }))
                break;
            case '.':
                pellets.push(new Pellet({
                    position: {
                        x: j * boundary_width + boundary_width / 2,
                        y: i * boudnary_height + boudnary_height / 2
                    },
                    radius: 3
                }))
                maxScore++;
                break;
            case 'g':
            ghosts.push(new Ghost({
                    position: {
                        x: boundary_width + radius + radius / 2 + ((j - 1) * boundary_width),
                        y: boudnary_height + radius + radius / 2 + ((i - 1) * boudnary_height)
                    },
                    radius: radius,
                    velocity: {
                        x: 0,
                        y: 0
                    }
                }))
        }
    })
})
var player = new Player({
    position: {
        x: boundary_width + radius + radius / 2,
        y: boudnary_height + radius + radius / 2
    },
    radius: radius,
    velocity: {
        x: 0,
        y: 0
    }
})

var clickedKey = ''
window.addEventListener('keydown', (e) => {
    switch(e.code) {
        case "KeyW":
            player.velocity = {
                x: 0,
                y: -2
            }
            break
        case "KeyA":
            player.velocity = {
                x: -2,
                y: 0
            }
            break
        case "KeyS":
            player.velocity = {
                x: 0,
                y: 2
            }
            break
        case "KeyD":
            player.velocity = {
                x: 2,
                y: 0
            }
            break
    }
})
// window.addEventListener('keyup', (e) => {
//     switch(e.code) {
//         case "KeyW":
//             player.velocity = {
//                 x: 0,
//                 y: 0
//             }
//             break
//         case "KeyA":
//             player.velocity = {
//                 x: 0,
//                 y: 0
//             }
//             break
//         case "KeyS":
//             player.velocity = {
//                 x: 0,
//                 y: 0
//             }
//             break
//         case "KeyD":
//             player.velocity = {
//                 x: 0,
//                 y: 0
//             }
//             break
//     }
// })

ghosts.forEach(ghost => {
    ghost.velocity = {
        x: 0,
        y: -1
    }
})
var moves = ["left", "right", "top", "bottom"]
function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, screenW, screenH)
    boundaries.map((boundary, i) => {
        boundary.draw()
        

        if(player.position.y - player.radius + player.velocity.y <= boundary.position.y + boudnary_height 
            && player.position.x + player.radius + player.velocity.x >= boundary.position.x
            && player.position.y + player.radius + player.velocity.y >= boundary.position.y
            && player.position.x - player.radius + player.velocity.x <= boundary.position.x + boundary_width) {
            player.velocity = {
                x: 0,
                y: 0
            }
        }
        
        var randomMove = Math.floor(Math.random() * 4);
        ghosts.forEach(ghost => {
            if(ghost.position.y - ghost.radius + ghost.velocity.y <= boundary.position.y + boudnary_height 
                && ghost.position.x + ghost.radius + ghost.velocity.x >= boundary.position.x
                && ghost.position.y + ghost.radius + ghost.velocity.y >= boundary.position.y
                && ghost.position.x - ghost.radius + ghost.velocity.x <= boundary.position.x + boundary_width) {
                    
                    
                if(Math.hypot(ghost.position.x - player.position.x,
                    ghost.position.y - player.position.y) < ghost.radius * 2) {
                    gameEnd = true
                    console.log("sadas")
                }


                ghost.velocity = {
                    x: 0,
                    y: 0
                }
                
                // right    
                if(randomMove == 0) {
                    ghost.velocity = {
                        x: 2,
                        y: 0
                    }   
                }
                // left
                if(randomMove == 1) {
                    ghost.velocity = {
                        x: -2,
                        y: 0
                    }   
                }
                // top
                if(randomMove == 2) {
                    ghost.velocity = {
                        x: 0,
                        y: -2
                    }   
                }
                // bottom
                if(randomMove == 3) {
                    ghost.velocity = {
                        x: 0,
                        y: 2
                    }   
                }

            } 
        })
    })
    pellets.map((pellet, i) => {
        pellet.draw()
        if(getDistance(player.position.x, player.position.y, pellet.position.x, pellet.position.y) < player.radius + pellet.radius) {
           pellets.splice(i, 1)
           score += 10; 
           scoreElement.innerText = score
        }
    })
    if(score == maxScore * 10) {
        alert("You win")
    }
    ghosts.forEach(ghost => {
        ghost.update()
    })
    player.update();
    if(gameEnd) {
        alert("You lose game")
    }
}
animate()

var canvas = document.getElementById('canvas')
var screenW = window.innerWidth - 30;
var screenH = window.innerHeight - 30;
canvas.width = screenW;
canvas.height = screenH;
var ctx = canvas.getContext("2d");
var gravity = 0.8;
var scrollCounter = 0
var jumpCounter = 0

function createImage(imageSrc) {
    var image = new Image()
    image.src = imageSrc
    return image    
}

class Player {
    constructor({position, velocity}) {
        this.image = createImage('./img/spriteStandRight.png')
        this.position = position
        this.velocity = velocity
        this.width = 66
        this.height = 150
        this.frame = 1
        this.sprites = {
            stand: {
                right: createImage('./img/spriteStandRight.png'),
                left: createImage('./img/spriteStandLeft.png'),
                cropWidth: 177,
                width: 66
            },
            run: {
                right: createImage('./img/spriteRunRight.png'),
                left: createImage('./img/spriteRunLeft.png'),
                cropWidth: 340,
                width: 127.875
            }
        }
        this.currentSprite = this.sprites.stand.right
        this.currentCropWidth = 177
    }

    draw() {
        // ctx.beginPath()
        // ctx.fillStyle = 'red'
        // ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
        ctx.drawImage(
            this.currentSprite,
            this.currentCropWidth * this.frame,
            0,
            this.currentCropWidth,
            400, 
            this.position.x, 
            this.position.y,
            this.width,
            this.height)
    }
    update() {
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x

        if(this.position.y + this.height + this.velocity.y <= screenH) {
            this.velocity.y += gravity            
        } else {
            this.velocity.y = 0
        }

    }
}
class Platform {
    constructor({position, image}) {
        this.image = image
        this.position = position
        this.width = image.width
        this.height = image.height
    }
    draw() {
        // ctx.fillStyle = 'blue'
        // ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
        ctx.drawImage(this.image, this.position.x, this.position.y)
    }
}
class AdditionObjects {
    constructor({position, image}) {
        this.position = position
        this.image = image
    }
    draw() {
        ctx.drawImage(this.image, this.position.x, this.position.y)
    }
}




var player = new Player({
    position: {
        x: 100,
        y: 100
    },
    velocity: {
        x: 0,
        y: 3
    }
})
var platforms = [new Platform({
    position: {
        x: 0,
        y: screenH - 125
    },
    image: createImage('./img/platform.png')
}), new Platform({
    position: {
        x: 1 * 580 - 3,
        y: screenH - 125
    },
    image: createImage('./img/platform.png')
}), new Platform({
    position: {
        x: 1 * 580 - 3,
        y: screenH - 227 - 124
    },
    image: createImage('./img/platformSmallTall.png')
}), new Platform({
    position: {
        x: 1 * 1000,
        y: screenH - 227 - 124
    },
    image: createImage('./img/platformSmallTall.png')
}), new Platform({
    position: {
        x: 1 * 1000,
        y: screenH - 227 - 200
    },
    image: createImage('./img/platformSmallTall.png')
})]
var additionObjects = [
    new AdditionObjects({
        position: {
            x: 0,
            y: 0
        },
        image: createImage('./img/background.png')
    }),
    new AdditionObjects({
        position: {
            x: 0,
            y: 0
        },
        image: createImage('./img/hills.png')
    })
]


var keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
    top: {
        pressed: false
    }
}
var jumped = false
var lastKey = ''
window.addEventListener('keydown', ({code}) => {
    switch(code) {
        case 'KeyW':
            jumpCounter++
            if(jumpCounter <= 2) {
                player.velocity.y = -20
            }
            keys.top.pressed = true
            break
        case 'KeyA':
            keys.left.pressed = true
            lastKey = 'left'
            break
        case 'KeyD':
            lastKey = 'right'
            keys.right.pressed = true
            break
    }
})
window.addEventListener('keyup', ({code}) => {
    switch(code) {
        case 'KeyW':
            keys.top.pressed = true
            break
        case 'KeyA':
            keys.left.pressed = false
            player.currentSprite = player.sprites.stand.left
            player.currentCropWidth = player.sprites.stand.cropWidth
            player.width = player.sprites.stand.width
            break
        case 'KeyD':
            keys.right.pressed = false
            player.currentSprite = player.sprites.stand.right
            player.currentCropWidth = player.sprites.stand.cropWidth
            player.width = player.sprites.stand.width
            break
    }
})




function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, screenW, screenH)
    additionObjects.forEach(additionObject => {
        additionObject.draw()
    })

    if(player.position.y + player.height >= screenH ) {
        jumpCounter = 0
    }
    platforms.forEach(platform => {
        platform.draw()
        if(player.position.y + player.height <= platform.position.y 
            && player.position.y + player.height + player.velocity.y >= platform.position.y
            && player.position.x + player.width >= platform.position.x
            && player.position.x <= platform.position.x + platform.width) {
            player.velocity.y = 0
            jumpCounter = 0
        }
    })
    if(keys.left.pressed) {
        player.image = createImage('./img/spriteStandLeft.png')
    } else if(keys.right.pressed) {
        player.image = createImage('./img/spriteStandRight.png')
    }

    if(lastKey == 'right' && keys.right.pressed && player.currentSprite !== player.sprites.run.right) {
        player.frame = 1
        player.currentSprite = player.sprites.run.right
        player.currentCropWidth = player.sprites.run.cropWidth
        player.width = player.sprites.run.width
    } else if(lastKey == 'left' && keys.left.pressed && player.currentSprite !== player.sprites.run.left) {
        player.currentSprite = player.sprites.run.left
        player.currentCropWidth = player.sprites.run.cropWidth
        player.width = player.sprites.run.width
    }

    player.velocity.x = 0
    platforms.forEach(platform => {
        additionObjects.forEach(additionObject => {
            if(player.position.x < 400 && keys.right.pressed) {
                player.velocity.x = 5
            } else if(player.position.x > 50 && keys.left.pressed) {
                player.velocity.x = -5
            } else {
                player.velocity.x = 0
                if(keys.right.pressed) {
                    platform.position.x -= 5
                    additionObject.position.x -= 2
                    scrollCounter += 5
                } else if(keys.left.pressed && scrollCounter > 0) {
                    platform.position.x += 5
                    additionObject.position.x += 2
                    scrollCounter -= 5
                }
            }
        })
    })
    if(player.frame > 28 && (player.currentSprite === player.sprites.stand.right || player.currentSprite === player.sprites.stand.left)) {
        player.frame = 0
    } else if(player.frame > 28 && (player.currentSprite === player.sprites.run.right || player.currentSprite === player.sprites.run.left)) {
        player.frame = 0
    } 
    
    player.frame++
    
    player.update()
    // if(scrollCounter >= 2000) {
    //     alert("win")
    // }
}
animate()
var bg
var ss,ssimg
var alien,a1,a2,a3,a4,a5,a6,a7,a8
var score = 0
var gamestate = "play"
var laser
var aliengroup,lasergroup
var edges

function preload(){
bg = loadImage("assets/bg4.jpg")
ssimg = loadImage("assets/ss2.png")
a1 = loadImage("assets/alien1.png")
a2 = loadImage("assets/alien2.png")
a3 = loadImage("assets/alien3.png")
a4 = loadImage("assets/alien4.png")
a5 = loadImage("assets/alien5.png")
a6 = loadImage("assets/alien6.png")
a7 = loadImage("assets/alien7.png")
a8 = loadImage("assets/alien8.png")
}

function setup(){
createCanvas(1600,800)
edges = createEdgeSprites()
aliengroup = new Group()
lasergroup = new Group()
ss = createSprite(50,400)
ss.addImage(ssimg)
}

function draw(){


background(bg)

drawSprites()

fill(255)
textSize(30)
text("S C O R E : " + score,1300,50)
textSize(20)
text("Made by Shreyas",1400,750)

if(gamestate==="play") {
    if(keyDown(UP_ARROW)){
        ss.y -= 8
    }
    if(keyDown(DOWN_ARROW)) {
        ss.y += 8
    }
    ss.collide(edges)
    if(keyDown("space")) {
        releaseLaser()
    }

spawnaliens()
lasergroup.isTouching(aliengroup,destroyalien)

if(aliengroup.isTouching(ss)) {
gamestate = "end"
}
}
if(gamestate === "end") {
gameover()
}
}
function gameover(){
    aliengroup.destroyEach()
    swal ({
        title:"Game over!",
        text:"you lost",
        imageUrl:"assets/ss2.png",
        imageSize:"200x200",
        confirmButtonText:"play again"
    },
    function(isConfirm) {
        if(isConfirm) {
            location.reload()
        }
    }
    )
}

function releaseLaser() {
    laser = createSprite(250,ss.y,60,5)
    laser.shapeColor = "aqua"
    laser.velocityX = 10
    laser.lifetime = 1600/10
    lasergroup.add(laser)
}



function spawnaliens() {
 if(frameCount%50===0) {
var rand = random(100,700)
alien = createSprite(1700,rand)
alien.velocityX = -6
var randimg = Math.round(random(1,8))
switch(randimg) {
    case 1:
        alien.addImage(a1)
        alien.scale = 0.75
        alien.velocityX = -18
        break
    case 2:
        alien.addImage(a2)
        alien.scale = 0.75
        alien.velocityX = -14
        break
    case 3:
        alien.addImage(a3)
        alien.velocityX = -15
        break
    case 4:
        alien.addImage(a4)
        alien.scale = 0.5
        alien.velocityX = -16
        break
    case 5:
        alien.addImage(a5)
        alien.scale = 0.5
        alien.velocityX = -19
        break
    case 6:
        alien.addImage(a6)
        alien.scale = 0.8
        alien.velocityX = -18
        break
    case 7:
        alien.addImage(a7)
        alien.scale = 0.8
        alien.velocityX = -15
        break
    case 8:
        alien.addImage(a8)
        alien.scale = 0.5
        alien.velocityX = -15
        break
}

alien.lifetime = 1600/6
aliengroup.add(alien)
 }   
}
function destroyalien(laser,alien) {
alien.destroy()
lasergroup.destroyEach()
score += 10
}












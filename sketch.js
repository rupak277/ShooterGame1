var score =0;
var gun,bluebubble,redbubble, bullet, backBoard;
var barrier;

var gunImg,bubbleImg, bulletImg, blastImg, backBoardImg;

var redBubbleGroup, redBubbleGroup, bulletGroup;


var life =3;
var score=0;
var gameState=0;

function preload(){
  gunImg = loadImage("gun1.png")
  blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet1.png")
  blueBubbleImg = loadImage("waterBubble.png")
  redBubbleImg = loadImage("redbubble.png")
  backBoardImg= loadImage("back.jpg")
}
function setup() {
  createCanvas(800, 800);

  backBoard= createSprite(400,-1000, 100,150);
  backBoard.addImage(backBoardImg);
  backBoard.scale=1.5;

  barrier=createSprite(400,0,1000,25);
  barrier.shapeColor=("red");
  
  gun= createSprite(100, height/2, 50,50);
  gun.addImage(gunImg)
  gun.scale=0.2
  
  bulletGroup = createGroup();   
  blueBubbleGroup = createGroup();   
  redBubbleGroup = createGroup();   
  
  heading= createElement("h1");
  scoreboard= createElement("h1");
}

function draw() {
  background("#BDA297");
  textSize(50);
  fill("yellow");
  text("do not allow the bubbles to touch ",25,50);
  text(" the red bar",200,100);
  text("press H key to begin",75,150);
  
  heading.html("Life: "+life)
  heading.style('color:red'); 
  heading.position(150,20)

  scoreboard.html("Score: "+score)
  scoreboard.style('color:red'); 
  scoreboard.position(width-200,20)
  if(keyDown("h"))
  {
    gameState=1;
  }
  if(gameState===1){
    gun.y=mouseY  
    background("Purple");


    if (frameCount % 80 === 0) {
      drawblueBubble();
    }

    if (frameCount % 100 === 0) {
      drawredBubble();
    }

    if(keyDown("space")){
      shootBullet();
    }

    if (blueBubbleGroup.collide(barrier)){
      handleGameover(blueBubbleGroup);
    }
    
    if (redBubbleGroup.collide(barrier)) {
      handleGameover(redBubbleGroup);
    }
    
    /*if(blueBubbleGroup.(bulletGroup)){
      handleBubbleCollision(blueBubbleGroup);
    }*/

   /* if(blueBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision();
    }*/
    
    /*if(blueBubbleGroup.collide()){
      handleBubbleCollision(blueBubbleGroup);
    }*/
    
    if(blueBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(blueBubbleGroup);
    }

    if(redBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(redBubbleGroup);
    }

    drawSprites();
  }
    
  
}

function drawblueBubble(){
  bluebubble = createSprite(random(78,780),800,40,40);
  bluebubble.addImage(blueBubbleImg);
  bluebubble.scale = 0.1;
  bluebubble.velocityY = -8;
  bluebubble.lifetime = 1000;
  blueBubbleGroup.add(bluebubble);
}
function drawredBubble(){
  redbubble = createSprite(random(78,780),800,40,40);
  redbubble.addImage(redBubbleImg);
  redbubble.scale = 0.1;
  redbubble.velocityY = -8;
  redbubble.lifetime = 1000;
  redBubbleGroup.add(redbubble);
}

function shootBullet(){
  bullet= createSprite(150, width/2, 50,20)
  bullet.y= gun.y-20
  bullet.addImage(bulletImg)
  bullet.scale=0.12
  bullet.velocityX= 12;
  bulletGroup.add(bullet)
}

function handleBubbleCollision(bubbleGroup){
    if (life > 0) {
       score=score+1;
    }

    blast= createSprite(bluebubble.x, bluebubble.y, 50,50);
    blast.addImage(blastImg);
    blast.scale=0.2;
    blast.lifetime=100;

    blast1= createSprite(redbubble.x, redbubble.y, 50,50);
    blast1.addImage(blastImg);
    blast1.scale=0.2;
    blast1.lifetime=100;

    /* blast= sprite(bullet.x+60, bullet.y, 50,50);
    blast.addImage(blastImg) */

    /* blast= createSprite(bullet.x+60, bullet.y, 50,50);
    blast.add(blastImg) */

    /* blast= createSprite(bullet.x+60, bullet.y, 50,50);
    image(blastImg) */
    
    blast.scale=0.3
    blast.life=20
    bulletGroup.destroyEach()
    bubbleGroup.destroyEach()
}

function handleGameover(bubbleGroup){
  
    life=life-1;
    bubbleGroup.destroyEach();
    

    if (life === 0) {
      gameState=2
      
      
      swal({
        title: `Game Over`,
        text: "Oops you lost the game....!!!",
        text: "Your Score is " + score,
        imageUrl:
          "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
        imageSize: "100x100",
        confirmButtonText: "Thanks For Playing"
      });
    }
  
}
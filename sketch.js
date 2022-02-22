var score =0;
var gun,bluebubble,redbubble, bullet, backBoard;

var gunImg,bubbleImg, bulletImg, blastImg, backBoardImg;

var redBubbleGroup, redBubbleGroup, bulletGroup, redBlastImg, redBlast;
var gameOver, gameOverImage

var backGroundImg;


var life =3;
var score=0;
var gameState=1

function preload(){
  gunImg = loadImage("policeGun.png")
 // blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet1.png")
  blueBubbleImg = loadImage("robber.png")
  redBubbleImg = loadImage("robber.png")
  backBoardImg= loadImage("back.jpg")
  backGroundImg= loadImage("background1.png")
 // gameOverImage=loadImage("gameOver1.png")
 
}
function setup() {
  createCanvas(windowWidth, windowHeight);

  backBoard= createSprite(10, width/2, 100,height);
  backBoard.addImage(backBoardImg)
  
  gun= createSprite(100, height/2, 50,50);
  gun.addImage(gunImg)
  gun.scale=0.3
  
  bulletGroup = createGroup();   
  blueBubbleGroup = createGroup();   
  //redBubbleGroup = createGroup();   
  
  heading= createElement("h1");
  scoreboard= createElement("h1");
}

function draw() {
  background(backGroundImg);
  
  heading.html("Life: "+life)
  heading.style('color:red'); 
  heading.position(150,20)

  scoreboard.html("Score: "+score)
  scoreboard.style('color:red'); 
  scoreboard.position(width-200,20)
  backBoard.visible=false;

  if(gameState===1){
    gun.y=mouseY  

    if (frameCount % 150 === 0) {
      drawblueBubble();
      blueBubbleGroup.visible=true;
    }

    //if (frameCount % 100 === 0) {
      //drawredBubble();
    //}

    if(keyDown("space")){
      shootBullet();
    }

    if (blueBubbleGroup.collide(backBoard)){
      handleGameover(blueBubbleGroup);
    }
    
    //if (redBubbleGroup.collide(backBoard)) {
      //handleGameover(redBubbleGroup);
    //}

    
    if(blueBubbleGroup.collide(bulletGroup)){
      //blueBubbleGroup.visible=false;
      
      handleBubbleCollision(blueBubbleGroup);
    }

    //if(redBubbleGroup.collide(bulletGroup)){
      //handleBubbleCollision(redBubbleGroup);
    //}

    drawSprites();
  }
    
  
}

function drawblueBubble(){
  bluebubble = createSprite(windowWidth,random(150,600),40,40);
  bluebubble.addImage(blueBubbleImg);
  bluebubble.scale = 0.25;
  bluebubble.velocityX = -8;
  bluebubble.lifetime = 400;
  blueBubbleGroup.add(bluebubble);
}
/*function drawredBubble(){
  redbubble = createSprite(800,random(20,780),40,40);
  redbubble.addImage(redBubbleImg);
  redbubble.scale = 0.3;
  redbubble.velocityX = -8;
  redbubble.lifetime = 400;
  redBubbleGroup.add(redbubble);
}*/

function shootBullet(){
  bullet= createSprite(178, width/2,50,20)
  bullet.y= gun.y-60;
  bullet.addImage(bulletImg)
  bullet.scale=0.02
  bullet.velocityX= 7
  bulletGroup.add(bullet)
}

function handleBubbleCollision(bubbleGroup){
    if (life > 0) {
       score=score+1;
    }

    //blast= createSprite(bullet.x+60, bullet.y, 50,50);
    //blast.addImage(blastImg)

    //blast.scale=0.3;
    //blast.life=20;
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
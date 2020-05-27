var PLAY = 1;
var END = 0;
var gameState = PLAY;

var player, player_running;
var bg, invisibleGround, bgImage;

var extraPointGroup;
var BoxGroup,boxImage;
var ObstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4;
var backgroundImg;
var score=0;
//var jumpSound, collidedSound;

//var gameOver, restart;


function preload(){
  //jumpSound = loadSound("assets/sounds/jump.wav")
  //collidedSound = loadSound("assets/sounds/collided.wav")
  
  backgroundImg = loadImage("assets/backgroundImg.png")
  sunAnimation = loadImage("assets/sun.png");
  
  player_running = loadImage("image/player.png");
  
  obstacle1 = loadImage("assets/obstacle1.png");
  obstacle2 = loadImage("assets/obstacle2.png");
  obstacle3 = loadImage("assets/obstacle3.png");
  
  
  gameOverImg = loadImage("assets/gameOver.png");
  restartImg = loadImage("assets/restart.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  player = createSprite(50,height-70,20,50);
  
  
  player.addImage("running", player_running);
  
  player.setCollider('circle',0,0,350);
  player.scale = 0.08
  // player.debug=true
  
  invisibleGround = createSprite(width/2,height-10,width,125);  
  //invisibleGround.shapeColor = "#f4cbaa";
  invisibleGround.visible = false;
  
  ground = createSprite(width/2,height,width,2);
  //ground.addImage("ground",groundImage);
  ground.x = width/2
  ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(width/2,height/2- 50);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(width/2,height/2);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.1;

  gameOver.visible = false;
  restart.visible = false;
  
  extraPointGroup = new Group();
  obstaclesGroup = new Group();
  BoxGroup = new Group();
  
  score = 0;
}

function draw() {
  //display score
  //console.log(count);
  
    if(gameState === PLAY){
      
    //move the ground
    bg.velocityX = -(1 + 3*count/50.5);
       
    //scoring
    count = count + Math.round(World.frameRate/20);
    
     //if (count>0 && count%100 === 0){
     // playSound("Sonic-Checkpoint.mp3");
   // }
     
    if (bg.x < 0){
      bg.x = bg.width/2;
    }
    
     if((touches.length > 0 || keyDown("SPACE")) && player.y >= height-120) {
      jumpSound.play( )
      player.velocityY = -10;
       touches = [];
    }
  
    //add gravity
    player.velocityY = player.velocityY + 0.7;
    
    //spawn obstacles
    spawnObstacles();
    
    //extra points
    extraPoints();
    
    Box();
    
    if(BoxGroup.isTouching(player)){
     BoxGroup.destroyEach();
    }
    
    //End the game when trex is touching the obstacle
    if(ObstaclesGroup.isTouching(player)){
      gameState = END;
      playSound("Minecraft-death-sound.mp3");
    }
    }
    
 else if (gameState === END){
    gameOver.visible = true;
    restart.visible = true;
   
    bg.velocityX = 0;
    player.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    extraPointGroup.setVelocityXEach(0);
    BoxGroup.setVelocityXEach(0);
    
    ObstaclesGroup.setLifetimeEach(-1);
    extraPointGroup.setLifetimeEach(-1);

   
 }
 
 if(gameState === END2){
   bg.velocityX = 0;
    player.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    extraPointGroup.setVelocityXEach(0);
    BoxGroup.setVelocityXEach(0);
 }
 

  if(touches.length>0 || keyDown(restart)) {      
      reset();
      touches = []
    }
  //if(mousePressedOver(restart)) {
   // reset();
  //}
  
  player.collide(invisibleGround);

  drawSprites(); 
  text("Score: " + count,250, 100);
  
  if(count === 1000){
   text("YOU WON!", 159, 19); 
   text("Found vaccine for CoronaVirus", 48,40);
   textSize(14);
   vaccine.visible = true;
   gameState = END2;
  }
}

function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  vaccine.visible = false;
  
  ObstaclesGroup.destroyEach();
  extraPointGroup.destroyEach();
  
  player.addImage("Player");
  
  count = 0;
}
function spawnObstacles(){
if(World.frameCount % 60 === 0) {
var obstacle = createSprite(400,335,20,20);

//var count = 0;
obstacle.velocityX = -5 ;

var rand = randomNumber(1,3);
obstacle.addImage("Obstacle" + rand);
//use switch expression here

obstacle.scale = 0.2;
obstacle.lifetime = 80;

ObstaclesGroup.add(obstacle);
}
}

function extraPoints(){

 if(World.frameCount % 100 === 0) {
  var lifeline = createSprite(400,158,20,20);
  
  var rand = randomNumber(1,4);
  lifeline.addImage("lifeline" + rand);
  //use switch expression here
  lifeline.velocityX = -7;
  lifeline.scale = 0.3;
  lifeline.lifetime = 80;
  //lifeline.depth = box.depth;
 // box.depth = box.depth + 1;
  
  extraPointGroup.add(lifeline);
}
}

function Box(){
if(World.frameCount % 100 === 0){
         var box = createSprite(400,158,20,20);
          box.setAnimation("Mystery Box");
          box.velocityX = -7;
          box.scale = 0.4;
          box.lifetime = 80;
          BoxGroup.add(box);
      }
}

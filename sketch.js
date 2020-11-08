var monkey , monkey_running
var banana ,bananaImage;
var obstaclesGroup, obstacle, obstacleImage;
var foodGroup;
var ground, groundImage;
var survivalTime = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage = loadImage("Line.png");
 
}



function setup() {
  
  createCanvas(600,600);

  monkey = createSprite(70,490,40,40);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.2;
  
  ground = createSprite(300,550,600,10);
  
  obstaclesGroup = createGroup();
  foodGroup = createGroup();

}


function draw() {

  background("white");
  
  if(gameState === PLAY){

survivalTime = survivalTime + Math.round(getFrameRate()/60);     
    
    if (ground.x<0){
      ground.x = 300;
    }
    
    ground.velocityX = -4;
    
    if(keyDown("space")&&(monkey.y >= 100)){
      monkey.velocityY = -12;
    }
    
    monkey.velocityY = monkey.velocityY + 0.8;
    
    
    
    if(obstaclesGroup.isTouching(monkey)){
      gameState = END;
    }
   
    food();
  
    obstacles();
    
  }
  
  
  else if(gameState === END){
    ground.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
  }

  
 monkey.collide(ground);

  drawSprites();
  
  text("SurvivalTime = " + survivalTime, 300,100);
  
}

function food(){
  
  if (frameCount%80 === 0){
    var banana = createSprite(450,150,20,20);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.velocityX = -5;
    banana.lifetime = 150;
    foodGroup.add(banana);
    banana.scale = 0.1;
  }
  
}

function obstacles(){
  
  if(frameCount%300 === 0){
    var obstacle = createSprite(500,490,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -4;
    obstacle.lifetime = 600/4;
    obstaclesGroup.add(obstacle);
  }
  
}



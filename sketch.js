var bg, bgimg, ground_invisible; 
var player, playerimg;
var coin, coinimg, coinsGroup;
var obstacle, obstacleimg, obstaclesGroup;
var PLAY = 1, END = 0;
var gameState = PLAY;
var gameOver,gameOverimage,restart, restartimage;
var heart1, heart2, heart3;


function preload(){
    bgimg= loadImage("Images/image.jpg")
    playerimg= loadAnimation("Images/player0.png","Images/player1.png","Images/player2.png",
    "Images/player3.png","Images/player4.png","Images/player5.png","Images/player6.png","Images/player7.png",
    "Images/player8.png","Images/player9.png","Images/player10.png","Images/player11.png",
    "Images/player12.png","Images/player13.png","Images/player14.png","Images/player15.png")

    coinimg= loadAnimation("Images/coin1.png","Images/coin2.png",
    "Images/coin3.png","Images/coin4.png","Images/coin5.png")

    obstacleimage= loadAnimation("Images/enemy0.png","Images/enemy1.png",
    "Images/enemy2.png","Images/enemy3.png","Images/enemy4.png","Images/enemy5.png",
    "Images/enemy6.png","Images/enemy7.png","Images/enemy8.png","Images/enemy9.png",
    "Images/enemy10.png","Images/enemy11.png")

    gameOverimage=loadImage("Images/gameOver.png");
    restartimage=loadImage("Images/restart.png");

    heartImage= loadImage("Images/heart.png")
}

function setup(){
    createCanvas(1400,700)

    bg = createSprite(0,0,1400,700)
    bg.addImage("bg",bgimg)
    bg.scale=2

    player = createSprite(80,550,20,20)
    player.addAnimation("player",playerimg)
    player.setCollider("circle",0,0,150)

    ground_invisible=createSprite(700,690,1400,5);
    ground_invisible.visible = false;  

    gameOver=createSprite(700,200,20,20);
    gameOver.addImage(gameOverimage);
    gameOver.visible=false;
  
  restart=createSprite(700,250,20,20);
  restart.addImage(restartimage);
  restart.scale=0.5;
  restart.visible=false;

  heart1= createSprite(1300,50,10,10)
  heart1.addImage("heart",heartImage)
  heart1.scale= 0.4



    coinsGroup = new Group();
    obstaclesGroup = new Group();
}

function draw(){
    background("black")

    if(gameState===PLAY){

      if(keyDown("space")){
        player.velocityY=-10; 
      
      }

      player.velocityY=player.velocityY+0.8;

    bg.velocityX=-5

    if(bg.x<0){
        bg.x = bg.width/2;
    } 
    
    if(player.isTouching(obstaclesGroup)){
      gameState=END;
    }
    
    spawnCoins();
    spawnObstacles();

  }

  else if(gameState===END){
    bg.velocityX=0;
    player.velocityY=0;
   obstaclesGroup.setVelocityXEach(0);
  coinsGroup.setVelocityXEach(0);
    
    obstaclesGroup.setLifetimeEach(-1);
    coinsGroup.setLifetimeEach(-1);
    
    gameOver.visible=true;
    restart.visible=true;
    
  if (mousePressedOver(restart)){
    reset();
  }  
}
    player.collide(ground_invisible)

    

    drawSprites()
}

function spawnCoins() {
    if (frameCount % 160 === 0) {
      var coin = createSprite(600,150,40,10);
      coin.y = Math.round(random(200,500));
      coin.addAnimation("coin",coinimg);
      coin.scale = 0.5;
      coin.velocityX = -3;
      
      coin.lifetime = 200;
      
      coinsGroup.add(coin);
    } 
  }

  function spawnObstacles() {
    if (frameCount % 200 === 0) {
      var obstacle = createSprite(600,600,40,10);
      obstacle.setCollider("circle",0,0,40)
      obstacle.addAnimation("obstacle",obstacleimage);
      obstacle.scale = 0.5;
      obstacle.velocityX = -3;
      
      obstacle.lifetime = 200;
      
      obstaclesGroup.add(obstacle);
    } 
  }

 function reset(){
 gameState=PLAY;
  gameOver.visible=false;
restart.visible=false;
obstaclesGroup.destroyEach();
 coinsGroup.destroyEach();
}
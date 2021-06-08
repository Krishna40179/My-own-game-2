var bg;
var James;
var enemy;
var en1,en2,en3;
var live=3;
var score=0
var enemygrp,bulletgrp;
var gamestate="play";
var boss,bomb;
function preload(){
  bg=loadImage("Images/bg.jpg")
  Jamesimg=loadImage("Images/spaceship.png")
en1=loadImage("Images/Enemy ship.png")
en2=loadImage("Images/miniboss.png")
en3=loadImage("Images/Tank enemy.png")
bg2=loadImage("Images/sPaCe.jpg");
bossimg=loadImage("Images/boss.png")
}

function setup() {
  createCanvas(1000,750);
  James=createSprite(500,700)
  James.addImage(Jamesimg)
  James.setCollider("rectangle",0,-10,200,100)
  bulletgrp=createGroup();
   enemygrp=createGroup();

}

function draw() {

  James.depth+=10;
  if(keyDown("left")) {
    James.x-=15
  }
  if(keyDown("right")) {
    James.x+=15
  }
  if(keyWentDown("space")){
   bullets();
  }
  if(gamestate=="play"){
    background(bg); 
  
  for(var i=0;i<enemygrp.length;i++){
    if(enemygrp.get(i).isTouching(bulletgrp)){
        enemygrp.get(i).destroy();
       bulletgrp.destroyEach();
       score+=10;
    }
  }
    for(var i=0;i<enemygrp.length;i++){
      if(James.isTouching(enemygrp)){
          enemygrp.get(i).destroy();
          live-=1;
      }
  }
  if(score==50){
    main();
  }
if(live<=0){
  gamestate="end"
}
  enemyship();
}else if(gamestate=="end"){
  background(0); 
  fill("white")
  textSize(40)
  stroke("red");
  strokeWeight(4);
  text("GAME OVER",350,250);
  text("PRESS R TO RESTART",300,350);
  if(keyWentDown("r")){
    reset();
  }
  enemygrp.destroyEach();
}
else if(gamestate=="green"){
  background(bg2); 
}
 drawSprites();
fill("white")
textSize(40)
stroke("red");
strokeWeight(4);
text("Lives left: "+live,100,50);
text("Score: "+score,800,50);
}


function reset(){
  gamestate="play";
  live=3;
  score=0;
}


function enemyship(){
  if(frameCount%100==0){
enemy=createSprite(random(120,900),-10)
enemy.setCollider("rectangle",0,10,300,200)
var rand=Math.round(random(1,3))
switch(rand){
  case 1 :enemy.addImage(en1)
  break;
  case 2 :enemy.addImage(en2)
  break;
  case 3 :enemy.addImage(en3)
  break;
  default:break;

}
enemy.velocityY=random(6,10);
enemy.lifetime=180
enemy.scale=0.5;

enemygrp.add(enemy);
  }
}
function bullets(){
  var gun=createSprite(500,700,5,20)
  gun.shapeColor="red";
  gun.x=James.x;
  gun.y=James.y;
  gun.velocityY=-12;
  bulletgrp.add(gun);
}
function main(){
  boss=createSprite(400,-50)
  boss.addImage(bossimg)
  boss.velocityY=0.2;
  if(frameCount%50==0){
  bomb=createSprite(350,-50,8,12)
  bomb.shapeColor="purple"
  bomb.velocityY=random(6,10)
  }
}
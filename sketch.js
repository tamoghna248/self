var boy,boyImg;
var coin,coinImg;
var backImg,back;
var coinGroup;
var ground;
var score;
var survivalTime;
var lives;
var coinSound;
var danger,dangerImg;
var dangerGroup;
var dangerSound;
var gameState=0;
var drink,drinkImg;
var drinkGroup;
var bomb,bombImg;
var bombGroup;
function preload(){
boyImg=loadAnimation("a1.png","b1.png","c1.png",
"d1.png")
coinImg=loadImage("coin.png")
backImg=loadImage("back1.jpg")
coinSound=loadSound("COINS Collect Jackpot Win 03.ogg")
dangerImg=loadImage("O1.png")
dangerSound=loadSound("SPLAT Crush 01.ogg")
drinkImg=loadImage("2070275.png")
bombImg=loadImage("Bomb1.png")




}
function setup(){
createCanvas(windowWidth,windowHeight);
back=createSprite(0,0)
back.addAnimation("s",backImg)
back.scale=4.5

boy=createSprite(70,height-90);
boy.addAnimation("t",boyImg);

//boy.setCollider("circle",0,0,100)
boy.debug=true;



ground=createSprite(width/2,650,width,5)
ground.visible=false;


score=0;
survivalTime=0;
lives=3;


coinGroup=createGroup();
dangerGroup=createGroup();
drinkGroup=createGroup();
bombGroup=createGroup();


}
function draw(){
background(0);
if(gameState===0){
textSize(30)
text("Anil is a boy who loved marathon very much.",50,100)
text("He wanted to be  slected in the OLYMPIC 2022 so he was running.",50,150)
text("If he collected 50 points then he will be slected for world olympic 2022",50,200)
text ("press "+"S "+"start",width/2,500)
}
if(keyDown("s")){
    gameState=1;
}
 if(gameState===1){


if(back.x<0){
back.x=back.width/2

}
back.velocityX=-2
//if(keyDown("up_arrow")&&boy.y>490){
  //  boy.y=boy.y-3;
    
//}

console.log(boy.y)

if(keyDown("space")){
    boy.velocityY=-20;
    
}
boy.collide(ground)
boy.velocityY=boy.velocityY+0.8
if(coinGroup.isTouching(boy)){
    coinGroup[0].destroy();
    score++
    coinSound.play()
}
if(dangerGroup.isTouching(boy)){
   dangerGroup[0].destroy();
    lives=lives-1
    dangerSound.play()
}

if(drinkGroup.isTouching(boy)){
    drinkGroup[0].destroy();
     lives=lives+1
}
if(bombGroup.isTouching(boy)){
    bombGroup[0].destroy();
     lives=lives-1
}
survivalTime=survivalTime+Math.round(getFrameRate()/60);




spawncoin();
spawnDanger();
spawnDrink();
spawnBomb();


drawSprites();
textSize(30);
stroke ("red")
strokeWeight(3)
fill ("white")
text ("score: "+score,width-200,50)
textSize(30)
stroke("blue")
fill("red")
text("survivalTime- "+survivalTime,width-1300,50)
stroke("black");
strokeWeight(6)
fill("orange")
text("lives- "+lives,width-600,50)
if(score===5){
    stroke("silver")
    fill("golden")
    text("You Completed "+500+"m",width/2-100,height/2)
}
if(lives===0){
gameState=2
}
}
 if(gameState===2){
    textSize(30)
    stroke("orange")
    fill("red")
    text("GAME "+"OVER",width/2,height/2);
    textSize(30)
    text("survivalTime- "+survivalTime,500,500)
    text("press "+"R "+"to "+"restart",200,200)
 }
 if(keyDown("r")&&gameState===2){
    restart();
    }

   
if(score===10){
    gameState=3
}
if(gameState===3){
    textSize(30)
    text("WOW!YOUR ARE QUALIFIED FOR OLYMPICS",width/2,100);
    text ("your portfolio:-",width/2,150)
    text("survivalTime- "+survivalTime,width/2,200);
    text("score- "+score,width/2,250);
    text("lives- "+lives,width/2,300)
     }
     if(keyDown("a")&&gameState===3){
       olympics();
    
}

}
function spawncoin(){
if(frameCount%100===0){
    var coin = createSprite(width,150)
    coin.addImage("a",coinImg);
    coin.y=Math.round(random(200,400));
    coin.velocityX=-2;
    coin.scale=0.2
    coinGroup.add(coin);
}

}
function spawnDanger(){
    if(frameCount%200===0){
        var danger = createSprite(width,width-20)
        danger.addImage("a",dangerImg);
        danger.y=Math.round(random(500,600));
        danger.velocityX=-3;
        danger.scale=1
        dangerGroup.add(danger);
    }
    
}
function spawnDrink(){
    if(frameCount%400===0){
        var drink = createSprite(width,150)
        drink.addImage("a",drinkImg);
        drink.y=Math.round(random(200,300));
        drink.velocityX=-3;
        drink.scale=0.5
        drinkGroup.add(drink);
    }
    
}
function spawnBomb(){
    if(frameCount%600===0){
        var bomb = createSprite(width,150)
        bomb.addImage("a",bombImg);
        bomb.y=Math.round(random(100,300));
        bomb.velocityX=-3;
        bomb.scale=0.1;
        bombGroup.add(bomb);
    }
}

function restart(){
     gameState=0
     survivalTime=0;
     lives=3;
     score=0;
     boy.collide(ground)
     boy.velocityY=boy.velocityY+0.8
     dangerGroup.destroyEach();
     coinGroup.destroyEach();
     drinkGroup.destroyEach();
}
/*function olympics(){
gameState=1;
score=11;
boy.collide(ground)
boy.velocityY=boy.velocityY+0.8
dangerGroup.destroyEach();
coinGroup.destroyEach();
drinkGroup.destroyEach();
}*/




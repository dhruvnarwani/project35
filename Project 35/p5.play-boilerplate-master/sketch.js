var balloon;
var database, position;

function preload(){

backgroundImg = loadImage("pro-C35 images/Hot Air Ballon-01.png");
balloonImg = loadImage("pro-C35 images/Hot Air Ballon-02.png")
balloonImg2 = loadImage("pro-C35 images/Hot Air Ballon-03.png")
balloonImg3 = loadImage("pro-C35 images/Hot Air Ballon-04.png")
}


function setup() {
  createCanvas(500,500);
  

  balloon = createSprite(250,250,10,10);
    database = firebase.database();
    var balloonPos = database.ref("balloon/position");
    balloonPos.on("value", readPosition, showError);

    var balloonPosition = database.ref('balloon/height');
    balloonPosition.on("value", readPosition, showError);
}

function draw() {
  background(backgroundImg);  

  textSize(20);
  fill("red");
  strokeWeight(4);
  text("HOT AIR BALLOON GAME", 250, 250);

  if(keyDown(LEFT_ARROW)){
    balloon.x = balloon.x - 10;
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.x = balloon.x + 10;
  }
  else if(keyDown(UP_ARROW)){
    balloon.y = balloon.y - 10;
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.y = balloon.y + 10;
  }

  if(keyDown(UP_ARROW)){
    updateHeight(0, -10);
    balloon.addAnimation("hotAirBalloon", balloonImage2);
    balloon.scale = balloon.scale - 0.01;
  }

  if(keyDown(DOWN_ARROW)){
    updateHeight(0, -10);
    balloon.addAnimation("hotAirBalloon", balloonImage2);
    balloon.scale = balloon.scale + 0.01;
  }

  drawSprites();
}

function updateHeight(){
  database.ref('balloon/height').set({
    'x': height.x + x,
    'y': height.y + y
  })
}

function readHeight(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
 console.log("Error in writing of the database");
}
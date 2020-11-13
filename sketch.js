var dogHappy,dogNormal,database,foodS,foodStock;

function preload(){
  dogNormal = loadImage("images/dogImg.png");
  dogHappy = loadImage("images/dogImg1.png");
}

 function setup() {
  createCanvas(500, 500);

  database = firebase.database();
  
  dog = createSprite(250,350,20,20);
  dog.addImage("normal",dogNormal);
  dog.scale = 0.1

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  
}

function draw() {  
  background(46, 139, 87);

  textSize(10);
  fill("white");

  
  

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappy);
  }

  if(foodS){
    text("food remaining = " + foodS,100,200);
  }

  if(foodS === 0){
    text("No food remaining" ,100,200);
  }

  

  drawSprites();
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x !== 0){
    x--;
  }


  database.ref('/').update({"Food":x});
  
}
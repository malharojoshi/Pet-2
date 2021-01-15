//Create variables here

var dog, dogImg, happyDogImg, database;
var foodStock = 0;
var milkBottles = [];
var emptyBottle;
var filledBottle;
function preload() {
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
  //load images here
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  dog = createSprite(200, 300, 1, 1);
  dog.addImage(dogImg);
  dog.scale = 0.1;
  button1 = createButton("Eat");
  button1.position(350, 50);
  button1.mousePressed(eatFood);
  button2 = createButton("Add Food");
  button2.position(450, 50);
  button2.mousePressed(addFood);
  food = database.ref("pet/food");
  food.on("value", readStock);
}
function readStock(data) {
  console.log("read Stock");
  foodStock = data.val();
  if (milkBottles.length === 0) {
    for (var a = 0; a < foodStock; a++) {
      milkBottles.push(new Food(10 + a * 25, 200));
    }
  }
}
function draw() {
  background(46, 139, 870);

  for (b = 0; b < foodStock; b++) {
    milkBottles[b].display();
    //console.log()
  }
  drawSprites();
  //add styles here
  text("Food: " + foodStock, 100, 100);
}

function writeStock(x) {
  if (x > 0) {
    x = x - 1;
    filledBottle = firstFilledBottle();
    filledBottle.hide();
    console.log(milkBottles);
  } else {
    x = 0;
  }
  database.ref("pet/").update({ food: x });
}
function emptyBottles() {
  for (c = 0; c < foodStock; c++) {
    if (milkBottles[c].hidden === true) {
      return milkBottles[c];
    }
  }
}
function firstFilledBottle() {
  for (d = 0; d < foodStock; d++) {
    if (milkBottles[d].hidden === false) {
      return milkBottles[d];
    }
  }
}
function eatFood() {
  writeStock(foodStock);
  dog.addImage(happyDogImg);
}

function addFood() {
  emptyBottle = emptyBottles();
  if (emptyBottle) {
    emptyBottle.show();
    console.log(milkBottles);
    console.log(foodStock);
    database.ref("pet/").update({ food: foodStock + 1 });
  }
}

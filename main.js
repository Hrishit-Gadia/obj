img = "";
Status = "";
objects = [];
img = [];
value=0;

function preload() {
  img1 = loadImage('red-bedroom-chair.jpeg');
  img2 = loadImage('bottles.jpeg');
  img3 = loadImage('DEsk.jpeg');
  img4 = loadImage('fruits.jpeg');
  img5 = loadImage('TVAC.jpeg');
  img.push(img1,img2,img3,img4,img5)
}


function setup() {
  canvas = createCanvas(700, 700);
  canvas.center();
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("bedroom-status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
  console.log("Model Loaded!")
  Status = true;
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}
function next(){
  if(value == 5){
    value = 0;
  }
  else if(value < 5){
    value = value+1
  }
}

function draw() {
  image(img[value], 0, 0, 700, 700);
  if (Status != "") {
    r = random(255);
    g = random(255);
    b = random(255);
    objectDetector.detect(img[value], gotResult);
    for (i = 0; i < objects.length; i++) {
      document.getElementById('bedroom-info').innerHTML = 'Objects Detected ' + objects.length;
      document.getElementById('bedroom-status').innerHTML = 'Objects Detected';
      fill(r, g, b);
      percent = floor(objects[i].confidence * 100);
      text(objects[i].label + ' ' + percent + '%', objects[i].x + 15, objects[i].y + 15);
      noFill();
      stroke(r, g, b);
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
      console.log(objects[i].x , objects[i].y, objects[i].width, objects[i].height);
    }
  }
}
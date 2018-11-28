var mySong;
myRate = 1
var analyser;
var amp;
var num = 2000;
var range = 6;

var ax = [];
var ay = [];



function preload() {

  mySong = loadSound("./library/peakyblinders.mp3");

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0)
  for (var i = 0; i < num; i++) {
    ax[i] = width / 2;
    ay[i] = height / 2;
  }

  frameRate(200);
  angleMode(DEGREES);

  analyser = new p5.Amplitude();
  analyser.setInput(mySong)
  mySong.play();
  loop()
}

function draw() {
  background(0)

  //sonido


  var volume = analyser.getLevel();
  volume = map(volume, 0, 1, 25, width / 2)
  mySong.amp(mouseY / height);

  //círculo central
  push()
  strokeWeight(2)
  stroke(250, 120)
  noFill()
  ellipse(width / 2, height / 2, volume * 8)
  pop()
  push()
  strokeWeight(3)
  stroke(160, 33, 5, 120)
  noFill()
  ellipse(width / 2, height / 2, volume * 4)
  pop()

  //bolas random
  push()
  noStroke()
  fill(random(255), random(255), random(255))
  ellipse(random(windowWidth), random(windowHeight), random(volume))
  pop()


  //linea central
  push();
  var radius = (100)
  stroke(250)
  strokeWeight(3)
  translate(width / 2, height / 2);
  rotate(frameCount * 1)
  noFill()
  strokeWeight(1)
  line(0, 0, 1, -radius * sin(frameCount * 1), radius * cos(frameCount * 2));
  line(0, 0, 0, radius * sin(frameCount * 1), -radius * cos(frameCount * 2));
  line(0, 0, -1, -radius * cos(frameCount * 1), radius * sin(frameCount * 2));
  line(0, 0, -0, radius * cos(frameCount * 1), -radius * sin(frameCount * 2));
  if (frameCount == 180)
    pop();


    stroke(255,120)
    line(100,100,volume,volume)
    line(150,150,volume,volume)
    line(volume,volume,200,200)
    line(250,250,volume,volume)

    //texto
    pop()
      noStroke()
      textFont('ROBOTO')
      textStyle('BOLD')
      fill(255,120)
      textSize(20)
      textAlign(CENTER)
      text('Smoking is mandatory to be a Peaky Blinder',windowWidth/2,windowHeight/1.2)
  push()
  //linea intermitente
  pop()
  for (var i = 1; i < num; i++) {
    ax[i - 1] = ax[i];
    ay[i - 1] = ay[i];
  }

  // Nueva variable
  ax[num - 1] += random(-range, range);
  ay[num - 1] += random(-range, range);

  // Puntos en la pantalla
  ax[num - 1] = constrain(ax[num - 1], 0, width);
  ay[num - 1] = constrain(ay[num - 1], 0, height);

  // Linea que conecta los puntos
  for (var j = 1; j < num; j++) {
    var val = j / num * 204.0 + 51;
    stroke(val);
    line(ax[j - 1], ay[j - 1], ax[j], ay[j]);

  }
  push()







}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

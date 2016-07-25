// The Nature of Code
// http://natureofcode.com

// Blob Example
// Example 5.13 adapted by Zach Lieberman

var physics;

var particles = [];
var particles_tit = [];
var particles_tit_tit = [];
var particles2 = [];
var particles_tit2 = [];
var particles_tit_tit2 = [];
var springs = [];
var attractor;
var attractor2;
var capture;
var motionHistoryImage;
var repeler;

function addNewBoob(boot, tit_1, tit_2) {
  
}

function setup() {

  var w = 1280, h = 960;

  createCanvas(w, h);

  capture = createCapture(VIDEO);
  capture.size(w, h);
  capture.hide();

  // Initialize the physics
  physics = new VerletPhysics2D();
  physics.setDrag(0.03);

  for (var i = 0; i < 50; i++) {
    particles.push(new Particle(new Vec2D(random(width), random(height)), 4, 80, -1));
  }
  for (var i = 0; i < 25; i++) {
    particles_tit.push(new Particle(new Vec2D(random(width), random(height)), 4, 80, -8));
  }
  for (var i = 0; i < 10; i++) {
    particles_tit_tit.push(new Particle(new Vec2D(random(width), random(height)), 4, 80, -8));
  }

  for (var i = 0; i < 50; i++) {
    particles2.push(new Particle(new Vec2D(random(width), random(height)), 4, 80, -1));
  }
  for (var i = 0; i < 25; i++) {
    particles_tit2.push(new Particle(new Vec2D(random(width), random(height)), 4, 80, -8));
  }
  for (var i = 0; i < 10; i++) {
    particles_tit_tit2.push(new Particle(new Vec2D(random(width), random(height)), 4, 80, -8));
  }

  attractor = new Particle(new Vec2D((width/4),height/2), 100, width * 10, 0.3);
  attractor2 = new Particle(new Vec2D(((width/4)*3),height/2), 100, width * 10, 0.3);
  repeler = new Particle(new Vec2D(mouseX, mouseY), 100, 50, -4);
  //attractor.lock();
  


  for (var i = 0; i < 50; i++) {
    var spring1 = new VerletSpring2D(particles[i], particles[(i + 1) % particles.length], 5, 0.01);
    springs.push(spring1);
    physics.addSpring(spring1);
    if (i % 2 == 0) {
      var spring2 = new VerletSpring2D(particles[i], particles[(i + 25) % particles.length], 400, 0.001);
      springs.push(spring2);
      physics.addSpring(spring2);
    }
    if (i % 1 == 0) {
      var spring2 = new VerletSpring2D(particles[i], attractor, 200, 0.001);
      springs.push(spring2);
      physics.addSpring(spring2);
    }

  }

  for (var i = 0; i < 25; i++) {
    var spring1 = new VerletSpring2D(particles_tit[i], particles_tit[(i + 1) % particles_tit.length], 1, 0.01);
    springs.push(spring1);
    physics.addSpring(spring1);
    if (i % 1 == 0) {
      var spring2 = new VerletSpring2D(particles_tit[i], particles_tit[(i + 12) % particles_tit.length], 400, 0.001);
      springs.push(spring2);
      physics.addSpring(spring2);
    }
    if (i % 1 == 0) {
      var spring2 = new VerletSpring2D(particles_tit[i], attractor, 10, 0.01);
      springs.push(spring2);
      physics.addSpring(spring2);
    }

  }

  for (var i = 0; i < 10; i++) {
    var spring1 = new VerletSpring2D(particles_tit_tit[i], particles_tit_tit[(i + 1) % particles_tit_tit.length], 1, 0.1);
    springs.push(spring1);
    physics.addSpring(spring1);
    if (i % 1 == 0) {
      var spring2 = new VerletSpring2D(particles_tit_tit[i], particles_tit_tit[(i + 4) % particles_tit_tit.length], 400, 0.001);
      springs.push(spring2);
      physics.addSpring(spring2);
    }
    if (i % 1 == 0) {
      var spring2 = new VerletSpring2D(particles_tit_tit[i], attractor, 1, 0.01);
      springs.push(spring2);
      physics.addSpring(spring2);
    }

  }

    for (var i = 0; i < 50; i++) {
    var spring1 = new VerletSpring2D(particles2[i], particles2[(i + 1) % particles2.length], 5, 0.01);
    springs.push(spring1);
    physics.addSpring(spring1);
    if (i % 2 == 0) {
      var spring2 = new VerletSpring2D(particles2[i], particles2[(i + 25) % particles2.length], 400, 0.001);
      springs.push(spring2);
      physics.addSpring(spring2);
    }
    if (i % 1 == 0) {
      var spring2 = new VerletSpring2D(particles2[i], attractor2, 200, 0.001);
      springs.push(spring2);
      physics.addSpring(spring2);
    }

  }

  for (var i = 0; i < 25; i++) {
    var spring1 = new VerletSpring2D(particles_tit2[i], particles_tit2[(i + 1) % particles_tit2.length], 1, 0.01);
    springs.push(spring1);
    physics.addSpring(spring1);
    if (i % 1 == 0) {
      var spring2 = new VerletSpring2D(particles_tit2[i], particles_tit2[(i + 12) % particles_tit2.length], 400, 0.001);
      springs.push(spring2);
      physics.addSpring(spring2);
    }
    if (i % 1 == 0) {
      var spring2 = new VerletSpring2D(particles_tit2[i], attractor2, 10, 0.01);
      springs.push(spring2);
      physics.addSpring(spring2);
    }

  }

  for (var i = 0; i < 10; i++) {
    var spring1 = new VerletSpring2D(particles_tit_tit2[i], particles_tit_tit2[(i + 1) % particles_tit_tit2.length], 1, 0.1);
    springs.push(spring1);
    physics.addSpring(spring1);
    if (i % 1 == 0) {
      var spring2 = new VerletSpring2D(particles_tit_tit2[i], particles_tit_tit2[(i + 4) % particles_tit_tit2.length], 400, 0.001);
      springs.push(spring2);
      physics.addSpring(spring2);
    }
    if (i % 1 == 0) {
      var spring2 = new VerletSpring2D(particles_tit_tit2[i], attractor2, 1, 0.01);
      springs.push(spring2);
      physics.addSpring(spring2);
    }

  }


}

var backgroundPixels;
function resetBackground(){
  backgroundPixels = undefined;
}



function draw() {

  var repelers = [];

  //randomSeed(99);
  background(55);
  /////////////for the motion history js part

  image(capture, 0, 0);
  capture.loadPixels();
  if(capture.pixels.length>0){
    var w = capture.width, h = capture.height;
    if(!backgroundPixels){
      // copy the camera pixels for storing the background
      backgroundPixels = copyImage(capture.pixels, backgroundPixels);
      // make a grayscale image for storing the motion history
      motionHistoryImage = new Uint8ClampedArray(w*h);
    }
    var pixels = capture.pixels;
    var thresholdAmount = select('#thresholdAmount').value() / 100;
    var sumSquaredThreshold = thresholdAmount * (255*255)*3;
    var iRgb = 0, iGray = 0;
    for (var y = 0; y < h; y++) {
      for (var x = 0; x < w; x++) {
        var rdiff = pixels[iRgb+0] - backgroundPixels[iRgb+0];
        var gdiff = pixels[iRgb+1] - backgroundPixels[iRgb+1];
        var bdiff = pixels[iRgb+2] - backgroundPixels[iRgb+2];
        var sumSquaredDiff = rdiff * rdiff + gdiff * gdiff + bdiff * bdiff;
        //if this is a foreground pixel
        if(sumSquaredDiff > sumSquaredThreshold){
          //set the motion history image to white
          motionHistoryImage[iGray] = 255;
        } else{
          //otherwise make it fade towards black
          motionHistoryImage[iGray]--;
        }
        var output = motionHistoryImage[iGray];
        pixels[iRgb++] = output;
        pixels[iRgb++] = output;
        pixels[iRgb++] = output;
        iRgb++; // skip alpha in rgbindex
        iGray++; // next grayscale index
      };
    };

    //some parameteres for calculating the motion vectors
    var stepSize = 16;
    var radius = 8;
    var maximumDiff = 8; //ignore big "motion edges"
    var minimumValue = 245; //ignore very old values
    var arrowWidth = .25;
    stroke(255);
    noFill();


    // pre-processing some values outside the loop
    var upOffset = -radius * w;
    var downOffset = +radius * w;
    var leftOffset = -radius;
    var rightOffset = +radius;
    var maximumLength = Math.sqrt(maximumDiff * maximumDiff *2);
    var i_for_r = 0;
    for(var y = radius; y + radius < h; y += stepSize){
      for(var x = radius; x + radius < w; x += stepSize){
        var i = y*w +x;
        var center = motionHistoryImage[i];
        var dx = 0, dy = 0;
        if(center > minimumValue){
          var up = motionHistoryImage[i+upOffset];
          var down = motionHistoryImage[i+downOffset];
          var left = motionHistoryImage[i+leftOffset];
          var right = motionHistoryImage[i+rightOffset];

          dx = right - left;
          dy = down - up;
          //ignore big "motion edges"
          if(dx > maximumDiff || dy > maximumDiff || -dx > maximumDiff || - dy > maximumDiff){
            dx = 0, dy = 0;
          }else{
            //big changes are slow motion, small changes are fast motion
            var length = Math.sqrt(dx*dx + dy*dy);
            var rescale = (maximumLength - length) / length;
            dx *= rescale;
            dy *= rescale;
            if(i_for_r%50 == 0){
            repelers[i_for_r] = new Particle(new Vec2D(x, y), 100, 50, -4);
            repelers[i_for_r].set(x,y);
            }
            i_for_r++;
          }
        }
        line(x + dx, y + dy, x - arrowWidth*dy, y + arrowWidth*dx);
        line(x + dx, y + dy, x + arrowWidth*dy, y - arrowWidth*dx);
      }
    }
  }

  ////////////////

  seconds = millis() / 1000;
  // Update the physics world
  physics.update();

  //attractor.display();

  attractor.set((width/4),height/2);
  attractor2.set(((width/4)*3),height/2);
  
  repeler.set(mouseX,mouseY);

  noStroke();


  fill(255,195,160);
  beginShape();
  for (var i = 0; i < particles.length; i++) {
    //particles[i].display();
    vertex(particles[i].x, particles[i].y);

    // this doesn't work the way I expect !!  I'd like to be able to change the repulsion radius over time....
    particles[i].behavior.radius = 100 + 40 * sin(seconds + i / 30.0);
    particles[i].behavior.radiusSquared = particles[i].behavior.radius * particles[i].behavior.radius;
  }
  endShape(CLOSE);

  fill(138,73,77,120);

  beginShape();
  for (var i = 0; i < particles_tit.length; i++) {
    //particles[i].display();
    vertex(particles_tit[i].x, particles_tit[i].y);

    // this doesn't work the way I expect !!  I'd like to be able to change the repulsion radius over time....
    particles_tit[i].behavior.radius = 10 + 1 * sin(seconds + i / 30.0);
    particles_tit[i].behavior.radiusSquared = particles_tit[i].behavior.radius * particles_tit[i].behavior.radius;
  }
  endShape(CLOSE);

  fill(138,73,77);

  beginShape();
  for (var i = 0; i < particles_tit_tit.length; i++) {
    //particles[i].display();
    vertex(particles_tit_tit[i].x, particles_tit_tit[i].y);

    // this doesn't work the way I expect !!  I'd like to be able to change the repulsion radius over time....
    particles_tit_tit[i].behavior.radius = 10 + 1 * sin(seconds + i / 30.0);
    particles_tit_tit[i].behavior.radiusSquared = particles_tit_tit[i].behavior.radius * particles_tit_tit[i].behavior.radius;
  }
  endShape(CLOSE);

  fill(255,195,160);
  beginShape();
  for (var i = 0; i < particles2.length; i++) {
    //particles[i].display();
    vertex(particles2[i].x, particles2[i].y);

    // this doesn't work the way I expect !!  I'd like to be able to change the repulsion radius over time....
    particles2[i].behavior.radius = 100 + 40 * sin(seconds + i / 30.0);
    particles2[i].behavior.radiusSquared = particles2[i].behavior.radius * particles2[i].behavior.radius;
  }
  endShape(CLOSE);

  fill(138,73,77,120);

  beginShape();
  for (var i = 0; i < particles_tit2.length; i++) {
    //particles[i].display();
    vertex(particles_tit2[i].x, particles_tit2[i].y);

    // this doesn't work the way I expect !!  I'd like to be able to change the repulsion radius over time....
    particles_tit2[i].behavior.radius = 10 + 1 * sin(seconds + i / 30.0);
    particles_tit2[i].behavior.radiusSquared = particles_tit2[i].behavior.radius * particles_tit2[i].behavior.radius;
  }
  endShape(CLOSE);

  fill(138,73,77);

  beginShape();
  for (var i = 0; i < particles_tit_tit2.length; i++) {
    //particles[i].display();
    vertex(particles_tit_tit2[i].x, particles_tit_tit2[i].y);

    // this doesn't work the way I expect !!  I'd like to be able to change the repulsion radius over time....
    particles_tit_tit2[i].behavior.radius = 10 + 1 * sin(seconds + i / 30.0);
    particles_tit_tit2[i].behavior.radiusSquared = particles_tit_tit2[i].behavior.radius * particles_tit_tit2[i].behavior.radius;
  }
  endShape(CLOSE);

  for (var i = 0; i < springs.length; i++) {
    ///stroke(0, 50);
    //line(springs[i].a.x, springs[i].a.y, springs[i].b.x, springs[i].b.y);
  }

  /*fill(138,73,77,120);
  ellipse(width/2,height/2,120,120);
  fill(138,73,77);
  ellipse(width/2,height/2,40,40);*/

}

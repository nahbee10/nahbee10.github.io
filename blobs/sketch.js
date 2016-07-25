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
var tracker;
var w = 640, h = 480;

function addNewBoob(boot, tit_1, tit_2) {
  
}

function setup() {
  createCanvas(960, 720);

  capture = createCapture(VIDEO);
  capture.size(960, 720);
  //capture.size(1100, 700);
  capture.hide();

  colorMode(HSB);

  tracker = new clm.tracker;
  tracker.init(pModel);
  tracker.start(capture.elt);

  // Initialize the physics
  physics = new VerletPhysics2D();
  physics.setDrag(0.03);

  /*for (var i = 0; i < 50; i++) {
    particles.push(new Particle(new Vec2D(random(width), random(height)), 4, 80, -1));
  }*/
  for (var i = 0; i < 25; i++) {
    particles_tit.push(new Particle(new Vec2D(random(width), random(height)), 4, 80, -8));
  }
  for (var i = 0; i < 16; i++) {
    particles_tit_tit.push(new Particle(new Vec2D(random(width), random(height)), 4, 80, -8));
  }

  /*for (var i = 0; i < 50; i++) {
    particles2.push(new Particle(new Vec2D(random(width), random(height)), 4, 80, -1));
  }*/
  for (var i = 0; i < 25; i++) {
    particles_tit2.push(new Particle(new Vec2D(random(width), random(height)), 4, 80, -8));
  }
  for (var i = 0; i < 16; i++) {
    particles_tit_tit2.push(new Particle(new Vec2D(random(width), random(height)), 4, 80, -8));
  }

  attractor = new Particle(new Vec2D((width/4),height/2), 100, width * 10, 0.3);
  attractor2 = new Particle(new Vec2D(((width/4)*3),height/2), 100, width * 10, 0.3);
  repeler = new Particle(new Vec2D(mouseX, mouseY), 100, 50, -4);
  //attractor.lock();
  


  /*for (var i = 0; i < 50; i++) {
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

  }*/

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

  for (var i = 0; i < 16; i++) {
    var spring1 = new VerletSpring2D(particles_tit_tit[i], particles_tit_tit[(i + 1) % particles_tit_tit.length], 1, 0.1);
    springs.push(spring1);
    physics.addSpring(spring1);
    if (i % 1 == 0) {
      var spring2 = new VerletSpring2D(particles_tit_tit[i], particles_tit_tit[(i + 8) % particles_tit_tit.length], 400, 0.001);
      springs.push(spring2);
      physics.addSpring(spring2);
    }
    if (i % 1 == 0) {
      var spring2 = new VerletSpring2D(particles_tit_tit[i], attractor, 1, 0.01);
      springs.push(spring2);
      physics.addSpring(spring2);
    }

  }

  /*for (var i = 0; i < 50; i++) {
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

  }*/

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

  for (var i = 0; i < 16; i++) {
    var spring1 = new VerletSpring2D(particles_tit_tit2[i], particles_tit_tit2[(i + 1) % particles_tit_tit2.length], 1, 0.01);
    springs.push(spring1);
    physics.addSpring(spring1);
    if (i % 1 == 0) {
      var spring2 = new VerletSpring2D(particles_tit_tit2[i], particles_tit_tit2[(i + 8) % particles_tit_tit2.length], 400, 0.001);
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

function draw() {

  //randomSeed(99);
  background(55);

  image(capture, 0, 0, 960, 720);

  var positions = tracker.getCurrentPosition();

  seconds = millis() / 1000;
  // Update the physics world
  physics.update();

  //attractor.display();

  if(positions.length > 0){
    attractor.set(positions[27][0],positions[27][1]);
    attractor2.set(positions[32][0],positions[32][1]);
  }else{
    attractor.set((width/4),height/2);
    attractor2.set(((width/4)*3),height/2);
  }
  
  repeler.set(mouseX,mouseY);

  noStroke();


  fill(255,195,160);
  /*beginShape();
  for (var i = 0; i < particles.length; i++) {
    //particles[i].display();
    vertex(particles[i].x, particles[i].y);

    // this doesn't work the way I expect !!  I'd like to be able to change the repulsion radius over time....
    particles[i].behavior.radius = 100 + 40 * sin(seconds + i / 30.0);
    particles[i].behavior.radiusSquared = particles[i].behavior.radius * particles[i].behavior.radius;
  }
  endShape(CLOSE);*/

  //rgb-for-boob-fill(255,195,160);
  fill(22,37,100);

  beginShape();
  for (var i = 0; i < particles_tit.length; i++) {
    //particles[i].display();
    vertex(particles_tit[i].x, particles_tit[i].y);

    // this doesn't work the way I expect !!  I'd like to be able to change the repulsion radius over time....
    particles_tit[i].behavior.radius = 10 + 1 * sin(seconds + i / 30.0);
    particles_tit[i].behavior.radiusSquared = particles_tit[i].behavior.radius * particles_tit[i].behavior.radius;
  }
  endShape(CLOSE);

  //rgb-for-tit-fill(138,73,77);
  fill(356,47,54);

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
  /*beginShape();
  for (var i = 0; i < particles2.length; i++) {
    //particles[i].display();
    vertex(particles2[i].x, particles2[i].y);

    // this doesn't work the way I expect !!  I'd like to be able to change the repulsion radius over time....
    particles2[i].behavior.radius = 100 + 40 * sin(seconds + i / 30.0);
    particles2[i].behavior.radiusSquared = particles2[i].behavior.radius * particles2[i].behavior.radius;
  }
  endShape(CLOSE);*/

  fill(22,37,100);

  beginShape();
  for (var i = 0; i < particles_tit2.length; i++) {
    //particles[i].display();
    vertex(particles_tit2[i].x, particles_tit2[i].y);

    // this doesn't work the way I expect !!  I'd like to be able to change the repulsion radius over time....
    particles_tit2[i].behavior.radius = 10 + 1 * sin(seconds + i / 30.0);
    particles_tit2[i].behavior.radiusSquared = particles_tit2[i].behavior.radius * particles_tit2[i].behavior.radius;
  }
  endShape(CLOSE);

  //rgb-for-tit-fill(138,73,77);
  fill(356,47,54);

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
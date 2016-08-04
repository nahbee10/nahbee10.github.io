// The Nature of Code
// http://natureofcode.com

// Blob Example
// Example 5.13 adapted by Zach Lieberman

var physics;

var particles = [];
var springs = [];
var attractor;
var gravity;
var repeler;

var mainCircleRadius = 70;

  var c, d;
  var pPoints = [];


function setup() {


  var w = 960, h = 640;

  createCanvas(w, h);

  // Initialize the physics
  physics = new VerletPhysics2D(); // * put this in the setup();
  physics.setDrag(0.03); // * this too;
  //physics.addBehavior(new GravityBehavior(new Vec2D(0, -0.2)));

  c = $('#c')[0]; 
  c.width = w;
  c.height = h;

  d = new Degas( c );

  baseColor = "#FFC3A0";
  titColor = "#c88979";
  tit_titColor = "#8a494d";

  p = new Degas.Path( pPoints );
  p.stroke = baseColor;
  p.fill = baseColor;
  p.smoothPointsNumber = 20;
  p.closed = true;


  d.addChild( p ); 

  var x_el = [0,200,200,0];
  var y_el = [0,0,200,200];
  for (var i = 0; i < 4; i++) {
    var x = x_el[i]+200;
    var y = y_el[i]+200;
    particles.push(new Particle(new Vec2D(x, y), 0.01, 300, -1));
    pPoints.push( new Degas.Point( x, y ) );
  }

  //attractor1 = new Particle(new Vec2D(((width/4)*3),height/2), 80, width * 10, 0.1);
  repeler = new Particle(new Vec2D(mouseX, mouseY), 0.01, 300, -0.7); // * add thisone to setup();

  for (var i = 0; i < 4; i++) {
    var spring1 = new VerletSpring2D(particles[i], particles[(i + 1) % particles.length], 200, 0.2);
      //springs.push(spring1);
      physics.addSpring(spring1);

    if (i % 2 == 1) {
      var spring2 = new VerletSpring2D(particles[i], particles[(i + 2) % particles.length], 200*(Math.sqrt(2)), 0.2);
      //springs.push(spring2);
      physics.addSpring(spring2);
    }
    /*if (i % 1 == 0) {
      var spring2 = new VerletSpring2D(particles[i], attractors[i], 200, 0.001);
      springs.push(spring2);
      physics.addSpring(spring2);
    }*/

  }


}

function draw() {

  //randomSeed(99);
  background(55);
  /////////////for the motion history js part

  seconds = millis() / 1000;
  // Update the physics world
  physics.update();

  //attractor.display();

  //attractor.set(((width/4)*1),height/2);
  
  repeler.set(mouseX,mouseY);

  for( var i = 0; i < particles.length; i++ ){
     p.points[i].x = particles[i].x;
     p.points[i].y = particles[i].y;

     particles[i].behavior.radius = 100 + 40 * sin(seconds + i / 30.0);
     particles[i].behavior.radiusSquared = particles[i].behavior.radius * particles[i].behavior.radius;
   }

  p.smooth();
  /*p2.smooth();
  p_tit.smooth();
  p_tit_tit.smooth();*/

  d.render();


}

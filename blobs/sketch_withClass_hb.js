// The Nature of Code
// http://natureofcode.com

// Blob Example
// Example 5.13 adapted by Zach Lieberman

var c,d;
var physics;

var repeler;

var first_class_blob;
var first_class_blob2;


function setup() {


  var w = 960, h = 640;

  createCanvas(w, h);

  // Initialize the physics
  physics = new VerletPhysics2D();
  physics.setDrag(0.03);
  
  c = $("#c")[0]; 
  c.width = width;
  c.height = height; 
  
  d = new Degas(c);

  first_class_blob = new Bblob(d,"#FFC3A0",new Vec2D(((67.1-2.8)*4/20)+200, 60),new Vec2D(((67.1-2.8)*4*19/20)+200, 60),200);
  first_class_blob2 = new Bblob(d,"#FFC3A0",new Vec2D(((67.1-2.8)*4/20)+500, 60),new Vec2D(((67.1-2.8)*4*19/20)+500, 60),500);

  repeler = new Particle(new Vec2D(mouseX, mouseY), 100, 100, -10);

  first_class_blob.pushParticles();
  first_class_blob2.pushParticles();
  first_class_blob.addSp();
  first_class_blob2.addSp();


}

function draw() {

  //randomSeed(99);
  background(55);

  physics.update();
  
  repeler.set(mouseX,mouseY);

  first_class_blob.updateBlobs();
  first_class_blob2.updateBlobs();

  d.render();

}

function Bblob(which_Degas, color, fir_att, sec_att, x_cord) {
  this.particles = [];
  this.attractor = new Particle(fir_att, 50, 50, 5);
  this.attractor2 = new Particle(sec_att, 50, 50, 5);
  this.pPoints = [];

    this.baseColor = color;

    this.p = new Degas.Path(this.pPoints);
    this.p.stroke = this.baseColor;
    this.p.fill = this.baseColor;
    this.p.smoothPointsNumber = 20;
    this.p.closed = true;
    which_Degas.addChild(this.p);

    this.pushParticles = function(){
      this.x_el = [2.8, 7.2, 3.9, 10.4, 26.1, 43.8, 59.5, 65.9, 62.7, 67.1];
      this.y_el = [3.1, 24.6, 44.6, 59.1, 65.4, 65.4, 59.1, 44.6, 24.6, 3.1];
      for (var i = 0; i < this.x_el.length; i++) {
        this.x = this.x_el[i]*4+x_cord;
        this.y = this.y_el[i]*4+40;
        this.particles.push(new Particle(new Vec2D(this.x, this.y), 0.01, 300, -1));
        this.pPoints.push( new Degas.Point( this.x, this.y ) );
      }
    }

    this.addSp = function(){
      for (var i = 0; i < this.x_el.length; i++) {
        this.distance1 = Math.hypot(this.particles[(i + 1) % this.particles.length].x-this.particles[i].x, this.particles[(i + 1) % this.particles.length].y-this.particles[i].y);
        this.spring1 = new VerletSpring2D(this.particles[i], this.particles[(i + 1) % this.particles.length], this.distance1, 0.2);
          physics.addSpring(this.spring1);

        if (i % 2 == 0) {
            this.distance2 = Math.hypot(this.particles[(i + Math.floor((this.x_el.length)/2)) % this.particles.length].x-this.particles[i].x, this.particles[(i + Math.floor((this.x_el.length)/2)) % this.particles.length].y-this.particles[i].y);
            this.spring2 = new VerletSpring2D(this.particles[i], this.particles[(i + Math.floor((this.x_el.length)/2)) % this.particles.length], this.distance2, 0.2);
            physics.addSpring(this.spring2);
        }
          this.spring3 = new VerletSpring2D(this.particles[i], this.attractor, Math.hypot(this.attractor.x-this.particles[i].x,this.attractor.y-this.particles[i].y), 0.005);
          this.spring4 = new VerletSpring2D(this.particles[i], this.attractor2, Math.hypot(this.attractor2.x-this.particles[i].x,this.attractor2.y-this.particles[i].y), 0.005);
          physics.addSpring(this.spring3);
          physics.addSpring(this.spring4);
      }
  }

  this.updateBlobs = function(){
    this.seconds = millis() / 1000;
    this.attractor.set(fir_att.x, fir_att.y);
    this.attractor2.set(sec_att.x, sec_att.y);
    for( var i = 0; i < this.particles.length; i++ ){
       this.p.points[i].x = this.particles[i].x;
       this.p.points[i].y = this.particles[i].y;

       this.particles[i].behavior.radius = 100 + 400 * sin(this.seconds + i / 3.0);
       this.particles[i].behavior.radiusSquared = this.particles[i].behavior.radius * this.particles[i].behavior.radius;
     }

    this.p.smooth();

    
  }


}

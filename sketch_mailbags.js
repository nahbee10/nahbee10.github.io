// The Nature of Code
// http://natureofcode.com

// Blob Example
// Example 5.13 adapted by Zach Lieberman

var c,d;
var physics;

var repeler;

var first_class_blob;
var first_class_blob2;

var x_el = [2.8, 7.2, 3.9, 10.4, 26.1, 43.8, 59.5, 65.9, 62.7, 67.1];
var y_el = [3.1, 24.6, 44.6, 59.1, 65.4, 65.4, 59.1, 44.6, 24.6, 3.1];

var x_el_t = [26.1, (26.1*3/4)+(43.8*1/4), (26.1*1/4)+(43.8*3/4), 43.8];
var y_el_t = [65.4, 75, 75, 65.4];


function setup() {


  var w = 960, h = 480;

  createCanvas(w, h);

  // Initialize the physics
  physics = new VerletPhysics2D();
  physics.setDrag(0.03);
  
  c = $("#c")[0]; 
  c.width = width;
  c.height = height;
  
  d = new Degas(c);

  var colors_b = ["#f4d7c0", "#fcdcb6", "#e6bc98", "#512e23", "#d4aa78", "#a16e4b"];
  var colors_b_t = ["#a37a62", "#bc7d77", "#a37a62","#331d17","#a37a62", "#7c514a"];
  var colors_b_t_t = ["#895650","#965d59","#895650","#140b09","#895650","#603d3b"];

  var c_index = getRandomInt(0,6);

  first_class_blob = new Bblob(d,colors_b[c_index], colors_b_t_t[c_index], x_el, y_el, x_el_t, y_el_t, new Vec2D(((67.1-2.8)*4/20)+200, 60),new Vec2D(((67.1-2.8)*4*19/20)+200, 60),200);
  first_class_blob2 = new Bblob(d,colors_b[c_index], colors_b_t_t[c_index], x_el, y_el, x_el_t, y_el_t, new Vec2D(((67.1-2.8)*4/20)+500, 60),new Vec2D(((67.1-2.8)*4*19/20)+500, 60),500);

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
  
  //repeler.set(mouseX,mouseY);
  var x_rela = mouseX - $('#c').offset().left;
  var y_rela = mouseY - $('#c').offset().top;

  repeler.set(x_rela,y_rela);

  first_class_blob.updateBlobs();
  first_class_blob2.updateBlobs();

  d.render();

}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function Bblob(which_Degas, color, t_color, x_el, y_el, x_el_t, y_el_t, fir_att, sec_att, x_cord) {
  this.particles = [];
  this.attractor = new Particle(fir_att, 50, 50, 5);
  this.attractor2 = new Particle(sec_att, 50, 50, 5);
  this.pPoints = [];
  this.pPoints_t = [];

    this.baseColor = color;
    this.titColor = t_color;

    this.p = new Degas.Path(this.pPoints);
    this.p.stroke = this.baseColor;
    this.p.fill = this.baseColor;
    this.p.smoothPointsNumber = 20;
    this.p.closed = true;

    this.p_t = new Degas.Path(this.pPoints_t);
    this.p_t.stroke = this.titColor;
    this.p_t.fill = this.titColor;
    this.p_t.smoothPointsNumber = 20;
    this.p_t.closed = true;


    which_Degas.addChild(this.p);
    which_Degas.addChild(this.p_t);

    this.pushParticles = function(){
      for (var i = 0; i < x_el.length; i++) {
        this.x = x_el[i]*4+x_cord;
        this.y = y_el[i]*4+40;
        this.particles.push(new Particle(new Vec2D(this.x, this.y), 0.01, 300, -1));
        this.pPoints.push( new Degas.Point( this.x, this.y ) );
      }

      for (var i = 0; i < x_el_t.length; i++) {
        this.x = x_el_t[i]*4+x_cord;
        this.y = y_el_t[i]*4+40;
        this.pPoints_t.push( new Degas.Point( this.x, this.y ) );
      }
    }

    this.addSp = function(){

      for (var i = 0; i < x_el.length; i++) {
        this.distance1 = Math.hypot(this.particles[(i + 1) % this.particles.length].x-this.particles[i].x, this.particles[(i + 1) % this.particles.length].y-this.particles[i].y);
        this.spring1 = new VerletSpring2D(this.particles[i], this.particles[(i + 1) % this.particles.length], this.distance1, 0.2);
          physics.addSpring(this.spring1);

        if (i % 2 == 0) {
            this.distance2 = Math.hypot(this.particles[(i + Math.floor((x_el.length)/2)) % this.particles.length].x-this.particles[i].x, this.particles[(i + Math.floor((x_el.length)/2)) % this.particles.length].y-this.particles[i].y);
            this.spring2 = new VerletSpring2D(this.particles[i], this.particles[(i + Math.floor((x_el.length)/2)) % this.particles.length], this.distance2, 0.2);
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
    //this.attractor_t.set(this.particles[4].x+10, this.particles[4].y);
    //this.attractor2_t.set(this.particles[5].x-10, this.particles[5].y);
    for( var i = 0; i < this.particles.length; i++ ){
       this.p.points[i].x = this.particles[i].x;
       this.p.points[i].y = this.particles[i].y;

       this.particles[i].behavior.radius = 100 + 400 * sin(this.seconds + i / 3.0);
       this.particles[i].behavior.radiusSquared = this.particles[i].behavior.radius * this.particles[i].behavior.radius;
     }
    this.fourth_x = Math.floor(this.particles[4].x);
    this.fourth_y = Math.floor(this.particles[4].y);
    this.fifth_x = Math.floor(this.particles[5].x);
    this.fifth_y = Math.floor(this.particles[5].y);
    //this.x_changed = [this.fourth_x, (this.fourth_x+this.fifth_x)/2, this.fifth_x, (this.fourth_x+this.fifth_x)*3/5, (this.fourth_x+this.fifth_x)*2/5];
    //this.y_changed = [this.fourth_y, (this.fourth_y+this.fifth_y)/2+10, this.fifth_y, (this.fourth_y+this.fifth_y)/2-40, (this.fourth_y+this.fifth_y)/2-40];
        this.x_changed = [this.fourth_x, (this.fourth_x+this.fifth_x)/2, this.fifth_x, (this.fourth_x+this.fifth_x)/2];
    this.y_changed = [this.fourth_y, (this.fourth_y+this.fifth_y)/2-10, this.fifth_y, (this.fourth_y+this.fifth_y)/2+20];
    for( var i = 0; i < this.p_t.points.length; i++ ){
       this.p_t.points[i].x = this.x_changed[i];
       this.p_t.points[i].y = this.y_changed[i];
     }

    this.p.smooth();
    this.p_t.smooth();

    
  }


}

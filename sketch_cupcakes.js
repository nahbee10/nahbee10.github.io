// The Nature of Code
// http://natureofcode.com

// Blob Example
// Example 5.13 adapted by Zach Lieberman

/////////print svg points
var x_el = [];
var y_el = [];
var pearDots = document.getElementsByClassName('st0');
for(var i = 0; i<pearDots.length; i++){
  //console.log(pearDots.getAttributeNS(null, 'cx'));
  var pearDot = pearDots[i];
  var pearDot_value = pearDot.getAttributeNS(null, 'cx');
  x_el.push(pearDot_value);
  pearDot_value = pearDot.getAttributeNS(null, 'cy');
  y_el.push(pearDot_value);
} 

console.log(x_el);
console.log(y_el);

/////////

var c,d;
var physics;

var repeler;

var first_class_blob;
var first_class_blob2;

var x_el_t = [x_el[4],(x_el[4]+x_el[5])/2,x_el[5]];
var y_el_t = [y_el[4],((y_el[4]+y_el[5])/2)+20,y_el[5]];

var magnif = 5;


function setup() {


  var w = 960, h = 640;

  createCanvas(w, h);

  // Initialize the physics
  physics = new VerletPhysics2D();
  physics.setDrag(0.03);
  physics.addBehavior(new GravityBehavior(new Vec2D(0, 2.5)));
  
  c = $("#c")[0]; 
  c.width = width;
  c.height = height;
  
  d = new Degas(c);

  var vec_att = new Vec2D(((x_el[0]/10+x_el[x_el.length - 1]*9/10)*magnif+30),(y_el[0]/10+y_el[x_el.length - 1]*9/10)*magnif + 100);
  var vec_att2 = new Vec2D(((x_el[0]*9/10+x_el[x_el.length - 1]/10)*magnif-30),(y_el[0]*9/10+y_el[x_el.length - 1]/10)*magnif + 100);
  console.log(vec_att);
  console.log(vec_att2);
  var vec_att_next = new Vec2D(vec_att.x+250, vec_att.y);
  var vec_att2_next = new Vec2D(vec_att2.x+250, vec_att2.y);
  first_class_blob = new Bblob(d,"#FFC3A0", "#8A494D", x_el, y_el, x_el_t, y_el_t, vec_att, vec_att2, 0);
  first_class_blob2 = new Bblob(d,"#FFC3A0", "#8A494D", x_el, y_el, x_el_t, y_el_t, vec_att_next, vec_att2_next, 250);

  repeler = new Particle(new Vec2D(mouseX, mouseY), 80, 80, -5);

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
        this.x = x_el[i]*magnif+x_cord;
        this.y = y_el[i]*magnif;
        this.particles.push(new Particle(new Vec2D(this.x, this.y), 0.01, 300, -1));
        this.pPoints.push( new Degas.Point( this.x, this.y ) );
      }

      for (var i = 0; i < x_el_t.length; i++) {
        this.x = x_el_t[i]*magnif+x_cord;
        this.y = y_el_t[i]*magnif;
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

       this.particles[i].behavior.radius = 100 + 40 * sin(this.seconds + i / 3.0);
       this.particles[i].behavior.radiusSquared = this.particles[i].behavior.radius * this.particles[i].behavior.radius;
     }
    this.fourth_x = Math.floor(this.particles[4].x);
    this.fourth_y = Math.floor(this.particles[4].y);
    this.fifth_x = Math.floor(this.particles[5].x);
    this.fifth_y = Math.floor(this.particles[5].y);
    //this.x_changed = [this.fourth_x, (this.fourth_x+this.fifth_x)/2, this.fifth_x, (this.fourth_x+this.fifth_x)*3/5, (this.fourth_x+this.fifth_x)*2/5];
    //this.y_changed = [this.fourth_y, (this.fourth_y+this.fifth_y)/2+10, this.fifth_y, (this.fourth_y+this.fifth_y)/2-40, (this.fourth_y+this.fifth_y)/2-40];
    this.x_changed = [this.fourth_x, (this.fourth_x+this.fifth_x)/2, this.fifth_x];
    this.y_changed = [this.fourth_y, (this.fourth_y+this.fifth_y)/2+20, this.fifth_y];
    for( var i = 0; i < this.p_t.points.length; i++ ){
       this.p_t.points[i].x = this.x_changed[i];
       this.p_t.points[i].y = this.y_changed[i];
     }

    this.p.smooth();
    this.p_t.smooth();

    
  }


}

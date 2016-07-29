function Bblob(name_of_canvas, color) {
	this.particles = [];
	this.attractor;
	this.pPoints = [];

	this.c = $(name_of_canvas)[0]; 
  	this.c.width = width;
  	this.c.height = height;	

  	this.d = new Degas(c);

  	this.baseColor = color;

  	this.p = new Degas.Path(pPoints);
  	this.p.stroke = baseColor;
  	this.p.fill = baseColor;
  	this.p.smoothPointsNumber = 20;
  	this.p.closed = true;

  	this.d.addChild(p);
  	this.pushParticles = function(){
  		this.x_el = [0,200,200,0];
		this.y_el = [0,0,200,200];
	  	for (var i = 0; i < 4; i++) {
		    this.x = this.x_el[i]+200;
		    this.y = this.y_el[i]+200;
		    this.particles.push(new Particle(new Vec2D(this.x, this.y), 0.01, 300, -1));
		    this.pPoints.push( new Degas.Point( this.x, this.y ) );
	  	}
  	}

  	this.addSp = function(){
  		for (var i = 0; i < 4; i++) {
	    	this.spring1 = new VerletSpring2D(this.particles[i], this.particles[(i + 1) % this.particles.length], 200, 0.2);
	      	physics.addSpring(this.spring1);

	    	if (i % 2 == 1) {
	      		this.spring2 = new VerletSpring2D(this.particles[i], this.particles[(i + 2) % this.particles.length], 200*(Math.sqrt(2)), 0.2);
	      		physics.addSpring(this.spring2);
	    	}
	  	}
	}

	this.updateBlobs = function(){
		this.seconds = millis() / 1000;
		for( var i = 0; i < this.particles.length; i++ ){
	     this.p.points[i].x = this.particles[i].x;
	     this.p.points[i].y = this.particles[i].y;

	     this.particles[i].behavior.radius = 100 + 40 * sin(this.seconds + i / 30.0);
	     this.particles[i].behavior.radiusSquared = this.particles[i].behavior.radius * this.particles[i].behavior.radius;
	   }

	  this.p.smooth();

	  this.d.render();
	}


}
var c, d, baseColor;
var pPoints = [];

var balles = [];
var maxSphere = 10;
var mainCircleRadius = 100;
var mainCircleCenter = { 'x': window.innerWidth/2, 'y': window.innerHeight/2 };
var engine;
var mouse;
var mousePos = { 'x': 0, 'y': 0 } ;
var mainAnchor;

// Matter.js module aliases
var Engine = Matter.Engine,
   World = Matter.World,
   Body = Matter.Body,
   Bodies = Matter.Bodies,
   Composites = Matter.Composites,
   Composite = Matter.Composite,
   Constraint = Matter.Constraint;

$(document).ready(function(){


 $(window).bind('mousemove', function(e){ 
   mousePos.x = e.pageX;
   mousePos.y = e.pageY;
 })

 engine = Engine.create(document.body, { render: { options: { wireframes: true } } });
 engine.world.gravity.y = 0;
 resize( window.innerWidth, window.innerHeight );

 mouse = Bodies.circle(window.innerWidth/2, window.innerHeight/2-150, 30);
 mouse.groupId = 8;

 mainAnchor = Bodies.circle(window.innerWidth/2, window.innerHeight/2, 5);
 mainAnchor.isStatic = true;
 mainAnchor.groupId = 8;

createBalls();

  World.add( engine.world, [ mouse, mainAnchor ] );

  // run the engine
  Engine.run(engine); 


  c = $('#degas')[0]; 
  c.width = window.innerWidth;
  c.height = window.innerHeight;

  d = new Degas( c );
  baseColor = "#f2f2f2";
  p = new Degas.Path( pPoints );
  p.stroke = baseColor;
  p.fill = baseColor;
  p.smoothPointsNumber = 20;
  p.closed = true;
  p.smooth();

  d.addChild( p );


  loop();
  engine.render.canvas.style.opacity = 0
  
  $(window).resize(function(){
    resize( window.innerWidth, window.innerHeight );
    d.resize();
  });
}); 

function resize( width, height ){
 engine.world.bounds.max = { x: width, y: height };
 engine.render.canvas.width = width;
 engine.render.canvas.height = height;
 engine.render.canvas.style.width = width + 'px';
 engine.render.canvas.style.height = height + 'px';
}

function createConstrainteObjObj( ba, bb, stiffness ){ 
 return Constraint.create({ bodyA: ba, bodyB: bb, stiffness: stiffness||0.05 }) 
}

function createConstrainteObjPts( ba, pa, stiffness ){ 
 return Constraint.create({ bodyA: ba, pointB: pa, stiffness: stiffness||0.05 }) 
}

function loop(){
	requestAnimationFrame( loop );
 //mouse.position = mousePos;

 Body.translate( mouse, { x: mousePos.x - mouse.positionPrev.x,  y: mousePos.y - mouse.positionPrev.y} );

 for( var i = 0; i < balles.length; i++ ){
   p.points[i].x = balles[i].position.x;
   p.points[i].y = balles[i].position.y
 }

 d.render();
}

function createBalls(){
 for( var i = 0; i < maxSphere; i++ ){
   var x = mainCircleRadius * Math.cos( Math.PI*2/maxSphere*i ) + window.innerWidth/2;
   var y = mainCircleRadius * Math.sin( Math.PI*2/maxSphere*i ) + window.innerHeight/2;
   var b = Bodies.circle( x, y, 20 );
   balles.push( b ) 
   World.add( engine.world, [ b ] );
   World.add( engine.world, [ createConstrainteObjPts( b, { x: x, y: y} ) ] );

   pPoints.push( new Degas.Point( x, y ) );
 }
}
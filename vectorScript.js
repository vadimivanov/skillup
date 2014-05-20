function balls(x, y, r,c){
    this.x = x;
    this.y = y;
    this.r = r;
    this.c = c;
    this.color = '#' + Math.floor(0xffffff * Math.random()).toString(16);
    this.speedX = 5*Math.random();
    this.speedY = 5*Math.random();
}

balls.prototype.paint = function(){
    this.c.fillStyle = this.color;
    this.c.beginPath();
    this.c.arc( this.x, this.y, this.r, 0, Math.PI * 2, true );
    this.c.fill();
};

balls.prototype.move = function(){
    this.x += this.speedX;
    this.y += this.speedY;
};

if ( !window.requestAnimationFrame ) {

    window.requestAnimationFrame = ( function() {
        return window.webkitRequestAnimationFrame ||
            function(  callback, element ) {
                window.setTimeout( callback, 1000 / 60 );
            };

    })();
}

var canvas, context, ball,map,ballsArr = [];

init();
animate();

function init() {
    canvas = document.getElementById("example");
    canvas.width = 400;
    canvas.height = 300;
    context = canvas.getContext( '2d' );
    map = new field(0, 0, 400, 300);
    ball = new balls(canvas.width/2, canvas.height/2, 20,context);
}

function animate() {
    requestAnimationFrame( animate );
    draw();

}

canvas.addEventListener('click', function(){
    create();

//    console.log(ballsArr.length);
});

function field(x, y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.paint = function(color){
        context.fillStyle = color;
        context.fillRect( this.x, this.y, this.width, this.height );
    }
}

function updateItems(ball)
{
    if (ball.y - ball.r < 0 || ball.y + ball.r > 300)
    {
        ball.speedY = -ball.speedY;
    }
    if (ball.x - ball.r < 0 || ball.x + ball.r > 400)
    {
        ball.speedX = -ball.speedX;
    }

    ball.move();
    monitoring(ballsArr);
}

function create(){
    ballsArr.push(new balls(canvas.width/2, canvas.height/2, 10,context));
//    monitoring(ballsArr);
}

function draw() {
    map.paint("#000");
    var ball;
    for (var i = 0; i < ballsArr.length; i++){
        ball = ballsArr[i];
        ball.paint();
        updateItems(ball);
    }
}
function monitoring(ball){
    for (var i = 0; i < ball.length; i++){
          var item1 = ball[i];
        for (var j = 0; j < ball.length; j++){
            var item2 = ball[j];
            if(item1 !== item2 ){

                console.log(item1,item2);
            }
        }
    }
}

//vector coordinate

//Collider.prototype.collideSphereVsSphere = function (s1, s2, dt) {
//    var s2x = s2.x + (s2.velocity.x * dt/1000),
//        s2y = s2.y + (s2.velocity.y * dt/1000),
//        s1x = s1.x + (s1.velocity.x * dt/1000),
//        s1y = s1.y + (s1.velocity.y * dt/1000);
//    var distance = new Vector(s2x - s1x, s2y - s1y);
//    var radiusSum = s1.radius + s2.radius;
//    var isColliding = Math.vDot(distance, distance) <= radiusSum * radiusSum;
//    var overlap = radiusSum - distance.getMagnitude();
//
//    if (!isColliding) {
//        return false;
//    }
//    return {
//        overlap: overlap,
//        normal: distance.normalize(),
//        collidedObj: s2
//    };        //TODO: Return distance vector & overlap
//};
// this.colliderCallback = function (collObj, result) {
//    var overlapVector = this.velocity.normalize().multiply(Math.ceil(result.overlap)),
//        normal;
////        this.x -= overlapVector.x;
////  this.y -= overlapVector.y;
////        normal = new Vector(collObj.x - this.x, collObj.y - this.y).normalize();
//    normal = result.normal;
//    this.velocity = Math.vSubtr(this.velocity, normal.multiply(2 * Math.vDot(this.velocity, normal)));
//};



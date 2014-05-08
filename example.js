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
    console.log(ballsArr.length);
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
}

function create(){
    ballsArr.push(new balls(canvas.width/2, canvas.height/2, 10,context));
}

function draw(ballNext) {
    map.paint("#000");
    var ball;
    for (var i = 0; i < ballsArr.length; i++){
        ball = ballsArr[i];
        ball.paint();
        updateItems(ball);
    }
}



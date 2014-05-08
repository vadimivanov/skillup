if ( !window.requestAnimationFrame ) {

    window.requestAnimationFrame = ( function() {
        return window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(  callback, element ) {

                window.setTimeout( callback, 1000 / 60 );

            };

    })();
}

var canvas, context, ball,map;

init();
animate();

function init() {
    canvas = document.getElementById("example");
    canvas.width = 400;
    canvas.height = 300;
    context = canvas.getContext( '2d' );
    moveX = 5;
    moveY = 5;
    map = new field(0, 0, 400, 300);
    ball = new balls(canvas.width/2, canvas.height/2, 20);
}

function animate() {
    requestAnimationFrame( animate );
    draw();
}

function balls(x, y, r){

    this.x = x;
    this.y = y;
    this.r = r;
    this.draw = function(color){
        context.fillStyle = color;
        context.beginPath();
        context.arc( this.x, this.y, this.r, 0, Math.PI * 2, true );
        context.fill();
    }

}
function field(x, y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.draw = function(color){
        context.fillStyle = color;
        context.fillRect( this.x, this.y, this.width, this.height );
    }
}
function updateItems()
{
    if (ball.y - ball.r < 0 || ball.y + ball.r > 300)
    {
        moveY = -moveY;
    }
    if (ball.x - ball.r < 0 || ball.x + ball.r > 400)
    {
        moveX = -moveX;
    }

    ball.x += moveX;
    ball.y += moveY;
}

function draw() {
    map.draw("#000");
    ball.draw("#f00");
    updateItems();

}


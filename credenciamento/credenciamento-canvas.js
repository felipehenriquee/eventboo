var img = new Image();

var canvas;
var ctx;

var proportion = screen.width / screen.height;

window.addEventListener('load',function(){
    console.log('load canvas');

    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");

    img.src = '../3DImages/Credenciamento_R02_V02.jpg';
    
    img.onload = function(){
        console.log('loaded');
        ctx.drawImage(img, 0, 0, screen.width, screen.height);
        
        //setInterval(loop, 100);
    };
});

function loop() {
    ctx.drawImage(img, 0, 0, screen.width, screen.height);
}
var img = new Image();

var canvas;
var ctx;

var proportion = screen.width / screen.height;



window.addEventListener('load',function(){
    

    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");

    img.src = '../3DImages/Credenciamento_R02_V02.jpg';
    
    img.onload = function(){
        document.getElementById('comeceAqui').focus();

        console.log('loaded');
        ctx.drawImage(img, 0, 0, 1920, 1080);
        
        // setInterval(loop, 100);
    };
});

function loop() {
    ctx.drawImage(img, 0, 0, 1920, 1080);
    document.getElementById("myCanvas").scrollIntoView({block: "center"});

}
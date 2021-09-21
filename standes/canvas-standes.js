var img = new Image();

var canvas;
var ctx;

var proportion = screen.width / screen.height;

window.addEventListener('load', function () {
    console.log('load canvas');
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");

    img.src = '../3DImages/standes.png';
    
    img.onload = function(){
        const tagA = document.getElementById('comeceAqui');
        tagA.focus();
        tagA.removeAttribute("href")
        ctx.drawImage(img, 0, 0, 1920, 1080);
        
        setInterval(loop, 100);
    };
});

function loop() {
    ctx.drawImage(img, 0, 0, screen.width, screen.height);
}

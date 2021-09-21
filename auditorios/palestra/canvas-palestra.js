var img = new Image();

var canvas;
var ctx;

var proportion = screen.width / screen.height;

window.addEventListener('load', function () {
    console.log('load canvas');
    canvas = document.getElementById("myCanvas");  
    ctx = canvas.getContext("2d");
    img.src = '../../3DImages/Auditorio_R02_v02.jpg';


    if (window.localStorage.getItem("video")){
        video = document.getElementById("videoFrame");
        video.src = window.localStorage.getItem("video");
    }
   
    
    img.onload = function(){
        console.log('loaded');
        document.getElementById('comeceAqui').focus();

        ctx.drawImage(img, 0, 0, 1920, 1080);
        
        //setInterval(loop, 100);
    };
});

function loop() {
    ctx.drawImage(img, 0, 0, screen.width, screen.height);
}
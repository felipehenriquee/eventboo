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
        titulo = document.getElementById("tituloPalestra");
        console.log(titulo)
        video.src = window.localStorage.getItem("video");
        titulo.innerHTML = window.localStorage.getItem("tituloPalestra")
    }
   
    
    img.onload = function(){
        console.log('loaded');
        const tagA = document.getElementById('comeceAqui');
        tagA.focus();
        tagA.removeAttribute("href")

        ctx.drawImage(img, 0, 0, 1920, 1080);
        
        //setInterval(loop, 100);
    };
});

function loop() {
    ctx.drawImage(img, 0, 0, screen.width, screen.height);
}
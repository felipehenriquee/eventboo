var img = new Image();

var canvas;
var ctx;

var proportion = screen.width / screen.height;



window.addEventListener('load',function(){
    

    canvas = document.getElementById("myCanvas");
    imgBg = document.getElementById("bgImage");
    ctx = canvas.getContext("2d");

    img.src = '../3DImages/Credenciamento_R02_V02.jpg';
    
    img.onload = function(){
        const tagA = document.getElementById('comeceAqui');
        const tagB = document.getElementById('comeceAqui2');
        tagA.focus();
        tagB.focus();

    

        tagA.removeAttribute("href")
        tagB.removeAttribute("href")
        if(window.localStorage.getItem("Token")) {
            const elemento = document.querySelector('#comeceAqui');
            elemento.parentNode.removeChild(elemento);
            
           }

        console.log('loaded');
        
        ctx.drawImage(img, 0, 0, 1920, 1080);
        imgBg.style.backgroundImage = "url('../3DImages/Credenciamento_R02_V02.jpg')";
        
        // setInterval(loop, 100);
    };
});

function loop() {
    ctx.drawImage(img, 0, 0, 1920, 1080);
    document.getElementById("myCanvas").scrollIntoView({block: "center"});

}
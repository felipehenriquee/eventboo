var img = new Image();

var canvas;
var ctx;

var proportion = screen.width / screen.height;

window.onload = function () {
    console.log('load canvas');
    canvas = document.getElementById("myCanvas");
    imgBg = document.getElementById("bgImage");
    ctx = canvas.getContext("2d");

    var date = new Date();
    console.log(date.getHours())
    
    if (date.getHours()>=18 || date.getHours()<=4){
        img.src = './3DImages/ExternaNoturnaR01V02.jpg';
        imgBg.style.backgroundImage = "url('./3DImages/ExternaNoturnaR01V02.jpg')";
       
    }
    else{
        img.src = './3DImages/Externa_Diurna_R01_v02.jpg';
        imgBg.style.backgroundImage = "url('./3DImages/Externa_Diurna_R01_v02.jpg')";

    }

    
    img.onload = function(){
    document.getElementById('comeceAqui').focus();

        console.log('loaded');
        ctx.drawImage(img, 0, 0, 1920, 1080);
        
        // setInterval(loop, 100);
    };
};

function loop() {
    ctx.drawImage(img, 0, 0, 1920, 1080);
}
function openCloseVideo(escolha){
    const elemento = document.getElementById("vidBgH");
    if (escolha){
        
        elemento.classList.add("bg-active");
    }
    else{
        elemento.classList.remove("bg-active");

    }
    
    
}

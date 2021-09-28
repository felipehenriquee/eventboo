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
        img.src = './3DImages/Externa2.jpg';
        imgBg.style.backgroundImage = "url('./3DImages/Externa2.jpg')";
       
    }
    else{
        img.src = './3DImages/Externa2.jpg';
        imgBg.style.backgroundImage = "url('./3DImages/Externa2.jpg')";

    }

    
    img.onload = function(){
    document.getElementById('comeceAqui').focus();
    
        console.log('loaded');
        ctx.drawImage(img, 0, 0, 1920, 1080);
        
        // ctx.drawImage(img, 0, 0, screen.width*2, screen.height*2);
        
        
    };
};

function loop() {
    // if (window.matchMedia("(orientation: landscape)").matches) {
        
    //     document.getElementById("myCanvas").style.display = "none"
    // }
    // else{
    //     ctx.drawImage(img, 0, 0, 1920, 1080);
    // }
    
}

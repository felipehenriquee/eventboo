var img = new Image();


var canvas;
var ctx;

var proportion = screen.width / screen.height;



async function getStand(){
    // verificaLogin();
    console.log(cor)
    const idStand = window.localStorage.getItem("idStand")

    let token = JSON.parse(localStorage.getItem('Token'));
    let myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);
    myHeaders.append('signal', signal);
    //console.log(`Bearer ${token}`);

    let myInit = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors'
    };

    let baseseUrl = `${baseApi}/estande/${idStand}`;
    let request = new Request(baseseUrl, myInit)

    standFromServer = await fetch(request)
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                console.log('Fail');
            }
        });
    console.log(standFromServer);
    verificaCor(standFromServer.result.Modelo);
    preencheDados(standFromServer.result);
}

window.addEventListener('load', function () {
    getStand();

    console.log('load canvas');
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    
    if(cor=="Vermelho"){
        img.src = './../../3DImages/Stand_Vermelho.png';

    }
    else if(cor=="Verde"){
        img.src = './../../3DImages/Stand_Verde.png';

    }
    else if(cor=="Roxo"){
        img.src = './../../3DImages/Stand_Roxo.png';

    }
    else if(cor=="Azul"){
        img.src = './../../3DImages/Stand_Azul.png';

    }
    
    img.onload = function(){
        console.log('loaded');
        ctx.drawImage(img, 0, 0, screen.width, screen.height);
        
        //setInterval(loop, 100);
    };
});

function loop() {
    ctx.drawImage(img, 0, 0, screen.width, screen.height);
}

function verificaLogin(){
    const token = window.localStorage.getItem("Token");
    if (!token){
        location.href = "/index.html"
    }
}
function verificaCor(modelo){
    console.log(location.href)
    if (modelo == "Azul" && cor!="Azul"){
        location.href = "/standes/stand-padrao/stand-Azul.html"

    }
    else if (modelo == "Verde" && cor!="Verde"){
        location.href = "/standes/stand-padrao/stand-Verde.html"

    }
    else if (modelo == "Roxo" && cor!="Roxo"){
        location.href = "/standes/stand-padrao/stand-Roxo.html"

    }
    else if (modelo == "Vermelho" && cor!="Vermelho"){
        location.href = "/standes/stand-padrao/stand-Vermelho.html"

    }
}
function preencheDados(dado){
    var buttonTwitter = document.getElementById('twitterBtn');
    var buttonFacebook = document.getElementById('facebookBtn');
    var buttonInstagram = document.getElementById('instagramBtn');
    var buttonWpp = document.getElementById('whatappButton');
    var pageTitle = document.getElementById('page-title');
    var logoStand = document.getElementById('logoStand');
    var siteStand = document.getElementById('siteStand');
    var portfolioStand = document.getElementById('portfolioStand');
    var videoYoutube = document.getElementById('videoFrame');
    
    
    buttonTwitter.href = dado.Twitter;
    buttonFacebook.href = dado.Facebook;
    buttonInstagram.href = dado.Instagram;
    buttonWpp.href = dado.Wpp;
    siteStand.href = dado.Site;
    portfolioStand.href = dado.Portfolio
    pageTitle.innerHTML = "Stand "+dado.Nome;
    videoYoutube.src = dado.Youtube;
    
    logoStand.style.backgroundImage = `url('${dado.images[0].Path}')`;
    console.log(logoStand.src)

}

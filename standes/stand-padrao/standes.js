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
        img.src = './../../3DImages/Stand_Vermelho.jpg';

    }
    else if(cor=="Verde"){
        img.src = './../../3DImages/Stand_Verde.jpg';

    }
    else if(cor=="Roxo"){
        img.src = './../../3DImages/Stand_Roxo.jpg';

    }
    else if(cor=="Azul"){
        img.src = './../../3DImages/Stand_Azul.jpg';

    }
    
    img.onload = function(){
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
    buttonTwitter.href = dado.Twitter;

    
    var buttonFacebook = document.getElementById('facebookBtn');
    var buttonInstagram = document.getElementById('instagramBtn');
    var buttonWpp = document.getElementById('whatappButton');
    var pageTitle = document.getElementById('page-title');
    var logoStand = document.getElementById('logoStand');
    var logoStandLand = document.getElementById('logoStandLand');
    var siteStand = document.getElementById('siteStand');
    var siteStandLand = document.getElementById('siteStandLand');
    var portfolioStand = document.getElementById('portfolioStand');
    var portfolioStandLand = document.getElementById('portfolioStandLand');
    var videoYoutube = document.getElementById('videoFrame');
    var videoStand = document.getElementById('videoStand');
    var videoStandLand = document.getElementById('videoStandLand');
    
    buttonFacebook.href = dado.Facebook;
    buttonInstagram.href = dado.Instagram;
    buttonWpp.href = dado.Wpp;
    siteStand.href = dado.Site;
    siteStandLand.href = dado.Site;
    portfolioStand.href = dado.Portfolio
    portfolioStandLand.href = dado.Portfolio
    pageTitle.innerHTML = "Estande "+dado.Nome;
    videoYoutube.src = dado.Youtube+"?enablejsapi=1";
    document.title = "Estande "+dado.Nome;

    if (!dado.Twitter){
        buttonTwitter.classList.add("bottomBtnDisable");
    }
    if (!dado.Facebook){
        buttonFacebook.classList.add("bottomBtnDisable");
        
    }
    if (!dado.Instagram){
        buttonInstagram.classList.add("bottomBtnDisable");
        
    }
    if (!dado.Wpp){
        buttonWpp.classList.add("bottomBtnDisable");
        
    }

    if (!dado.Site){
        siteStand.classList.add("bottomBtnDisable");
        siteStandLand.classList.add("bottomBtnDisable");
    }
    if (!dado.Portfolio){
        portfolioStand.classList.add("bottomBtnDisable");
        portfolioStandLand.classList.add("bottomBtnDisable");
        
    }
    if (!dado.Youtube){
        videoStand.classList.add("bottomBtnDisable");
        videoStandLand.classList.add("bottomBtnDisable");
        
    }
    

    if (dado.images[0]) {
        logoStand.style.backgroundImage = `url('${dado.images[0].Path}')`;
        logoStandLand.style.backgroundImage = `url('${dado.images[0].Path}')`;
        
    }
    if (dado.Imagem) {
        logoStand.style.backgroundImage = `url('${dado.Imagem}')`;
        logoStandLand.style.backgroundImage = `url('${dado.Imagem}')`;
        
    }
    
    
    
    contaEstande(dado.Acessos+1, dado.Id);

}

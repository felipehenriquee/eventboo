//subscribe modal
var openSubscribeBtn;
var closeSubscribeBtn;
var subscribeBg;
var subscribeBtn;
var subscribeConfirmationBg;

//login modal
var openLoginBtn;
var closeLoginBtn;
var loginBg;
var loginBtn;

window.addEventListener('load', function(){
    initCredentials();
    bindSingInInputs();
    bindLogInInputs();
});

function initCredentials() {
    let hasLocalStorage;
    if(localStorage.getItem("user") !== null && localStorage.getItem("user") !== "") hasLocalStorage = true;
    
    //Header Buttons
    var ajudaBtn = document.getElementById('ajudaC');
    if(ajudaBtn) ajudaBtn.addEventListener('click', this.help, false);

    //Footer Left Buttons
    var entrada = document.getElementById('entrada');
    if(entrada) entrada.addEventListener('click', this.toEntrance, false);

    //var credenciamentoBtn = document.getElementById('credenciamento');
    //if(credenciamentoBtn) credenciamentoBtn.addEventListener('click', this.accreditation, false);

    var hallBtn = document.getElementById('hall');    

    var auditoriosBtn = document.getElementById('auditorios');    

    var standsBtn = document.getElementById('standes');    
    
    

    //Footer Right Buttons
    //var entrarNoEventoBtn = document.getElementById('entrarNoEvento');
    //if(entrarNoEventoBtn) entrarNoEventoBtn.addEventListener('click', this.enterTheEvent, false);
    
    //subscribe modal
    openSubscribeBtn = document.getElementById('credenciar');
    closeSubscribeBtn = document.getElementById('closeSubscribeBtn');
    subscribeBg = document.getElementById('subscribeBg');
    subscribeBtn = document.getElementById('subscribeBtn');
    subscribeConfirmationBg = document.getElementById('subscribeConfirmationBg');

    openSubscribeBtn.addEventListener('click', openSubscribePanel);

    closeSubscribeBtn.addEventListener('click', function () {
        subscribeBg.classList.remove('bg-active');
    });
/*
    subscribeBtn.addEventListener('click', function () {
        subscribeConfirmationBg.classList.add('bg-active');
    });
*/
    //login modal
    openLoginBtn = document.getElementById('login');
    closeLoginBtn = document.getElementById('closeLoginBtn');
    loginBg = document.getElementById('loginbg');
    loginBtn = document.getElementById('loginBtn');

    closeLoginBtn.addEventListener('click', function () {
        loginBg.classList.remove('bg-active');
    });

    loginBg.addEventListener('click', function () {
        //loginBg.classList.remove('bg-active');
    });
/*
    loginBtn.addEventListener('click', function () {
        subscribeConfirmationBg.classList.add('bg-active');
    });
*/
    var subscribeConfirmation = document.getElementById('subscribeConfirmation');
    subscribeConfirmation.addEventListener('click', function() {
        window.location.href = '../hall/hall.html';
    });
    
    var duvida = document.getElementById('duvida');
    //duvida.addEventListener('click', help);
    
    if(hasLocalStorage) {
        //openLoginBtn.classList.add('bottomBtnDisable');
        openLoginBtn.children[0].innerHTML = 'Entrar';
        openLoginBtn.addEventListener('click', function() {
            window.location.href = '../hall/hall.html';
        });        
        
        document.getElementById('credenciar').classList.add('bottomBtnDisable');
        
        /*
        if(hallBtn) hallBtn.addEventListener('click', function() {
            window.location.href = '../hall/hall.html';
        }, false);
        */
        //if(auditoriosBtn) auditoriosBtn.addEventListener('click', this.toAuditoriums, false);
        
        //if(standsBtn) standsBtn.addEventListener('click', this.toStands, false);
    } else {        
        hallBtn.classList.add('disabled');
        auditoriosBtn.classList.add('disabled');
        standsBtn.classList.add('disabled');        
        
        console.log(openLoginBtn);
        openLoginBtn.addEventListener('click', function () {
            loginBg.classList.add('bg-active');
        });
    }
}

function openSubscribePanel() {    
    subscribeBg.classList.add('bg-active');    
}

function openLoginPanel() {    
    let loginBg = document.getElementById('loginbg');
    loginBg.classList.add('bg-active');
}
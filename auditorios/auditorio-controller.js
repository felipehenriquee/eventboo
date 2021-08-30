/*jshint esversion: 6 */
var openTalkSearch;
var listBg;

var listCloseButton;
var videoDetailBg;
var lecture0;

window.onload = initAuditorios;

function initAuditorios() {
    console.log('init audit');
    bindAuditorios();
    requestPalestraStage(true);
};

function bindAuditorios() {
    //Header Buttons
    var ajudaBtn = document.getElementById('ajudaA');
    if(ajudaBtn) ajudaBtn.addEventListener('click', this.help, false);

    //Footer Left Buttons
    var entrada = document.getElementById('entrada');
    if(entrada) entrada.addEventListener('click', this.toEntrance, false);

    var credenciamentoBtn = document.getElementById('credenciamento');
    if(credenciamentoBtn) credenciamentoBtn.addEventListener('click', this.accreditation, false);

    var hallBtn = document.getElementById('hall');
    if(hallBtn) hallBtn.addEventListener('click', this.toHall, false);

    var auditoriosBtn = document.getElementById('auditorios');
    //if(auditoriosBtn) auditoriosBtn.addEventListener('click', this.toAuditoriums, false);

    var standsBtn = document.getElementById('standes');
    if(standsBtn) standsBtn.addEventListener('click', this.toStands, false);

    //Footer Right Buttons
    
    //CSS UI
    //openTalkSearch = document.getElementById('openTalkSearchA');
    listBg = document.getElementById('listBgA');
    listCloseButton = document.getElementById('listCloseButtonA');
    //lecture0 = document.getElementById('lectureA0');
    videoDetailBg = document.getElementById('videoDetailBgA');

    console.log('adicionando');
    //openTalkSearch.onclick = this.initButton;
    //console.log(openTalkSearch.onclick);
    
    listCloseButton.addEventListener('click', function(){
        listBg.classList.remove('bg-active');
    });
    
    var paraStandes = document.getElementById('paraStandes');
    paraStandes.addEventListener('click', function() {
        window.location.href = '../standes/standes.html'
    });
    
    var detailCloseButton = document.getElementById('detailCloseButtonA');
    detailCloseButton.addEventListener('click', function(){
        videoDetailBg.classList.remove('bg-active');
    });
    /*
    var stageLecture0 = document.getElementById('stageLectureA0');
    stageLecture0.addEventListener('click', function(){
        videoDetailBg.classList.add('bg-active');
    });
    */
    //var assitir = document.getElementById('assitirA');
    //assitir.addEventListener('click', this.toWatchTalk);
};

function initButton() {
    console.log(openTalkSearch.onclick);
    listBg.classList.add('bg-active');
};

function toWatchTalk() {
    
};
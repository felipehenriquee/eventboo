var screenTitle;
var listBg;

var listCloseButton;
var videoDetailBg;
//var lecture0;

window.onload = initHall;

function initHall() {
    console.log('initing hall');
    bindHall();
    requestPalestra(true, 'H');
    requestStands(false, 'H');
};

function bindHall() {
    console.log('binding hall');

    //Header Buttons
    var ajudaBtn = document.getElementById('ajudaH');
    console.log(ajudaBtn);
    if(ajudaBtn) ajudaBtn.addEventListener('click', help, false);

    //Footer Left Buttons
    var entrada = document.getElementById('entrada');
    if(entrada) entrada.addEventListener('click', this.toEntrance, false);

    var credenciamentoBtn = document.getElementById('credenciamento');
    if(credenciamentoBtn) credenciamentoBtn.addEventListener('click', this.accreditation, false);

    //var hallBtn = document.getElementById('hall');
    //if(hallBtn) hallBtn.addEventListener('click', this.toHall, false);

    var auditoriosBtn = document.getElementById('auditorios');
    if(auditoriosBtn) auditoriosBtn.addEventListener('click', this.toAuditoriums, false);

    var standsBtn = document.getElementById('standes');
    if(standsBtn) standsBtn.addEventListener('click', this.toStands, false);

    //Footer Right Buttons
    //var entrarNoEventoBtn = document.getElementById('entrarNoEvento');
    //if(entrarNoEventoBtn) entrarNoEventoBtn.addEventListener('click', this.enterTheEvent, false);
    
    screenTitle = document.getElementById('openTalkSearchH');
    console.log(screenTitle);

    listBg = document.getElementById('listBgH');
    listCloseButton = document.getElementById('listCloseButtonH');
    //lecture0 = document.getElementById('lectureH0');
    videoDetailBg = document.getElementById('videoDetailBgH');

    screenTitle.addEventListener('click', function(){
        listBg.classList.add('bg-active');
    });

    listCloseButton.addEventListener('click', function(){
        listBg.classList.remove('bg-active');
    });
    /*
    lecture0.addEventListener('click', function(){
        videoDetailBg.classList.add('bg-active');
    });
    */
   /*
    var paraStands = document.getElementById('paraStands');
    paraStands.addEventListener('click', this.toStands);
    
    var paraAuditorios = document.getElementById('paraAuditorios');
    paraAuditorios.addEventListener('click', this.toAuditoriums);
    */
   
    var videoDetailCloseButtonH = document.getElementById('videoDetailCloseButtonH');
    videoDetailCloseButtonH.addEventListener('click', function () {
        videoDetailBg.classList.remove('bg-active');
    });
    
    //var assitir = document.getElementById('assitirH');
    //assitir.addEventListener('click', this.toWatchTalk);
};
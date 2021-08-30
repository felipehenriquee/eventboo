window.onload = bindEntrance;

function bindEntrance() {
    console.log('bind entrance');
    init();
    requestEvento();

    var hasLocalStorage;
    if(localStorage.getItem("user") !== null && localStorage.getItem("user") !== "") hasLocalStorage = true;
    
    //Header Buttons
    var ajudaBtn = document.getElementById('ajuda');
    if(ajudaBtn) ajudaBtn.addEventListener('click', help, false);

    //Footer Left Buttons
    //var entrada = this.div.querySelector('#entrada');
    //if(entrada) entrada.addEventListener('click', this.toEntrance, false);

    var credenciamentoBtn = document.getElementById('credenciamento');
    if(credenciamentoBtn) credenciamentoBtn.addEventListener('click', this.accreditation, false);

    var hallBtn = document.getElementById('hall');    

    var auditoriosBtn = document.getElementById('auditorios');    

    var standsBtn = document.getElementById('standes');    

    //Footer Right Buttons
    var entrarNoEventoBtn = document.getElementById('entrarNoEvento');
    if(entrarNoEventoBtn) entrarNoEventoBtn.addEventListener('click', this.enterTheEvent, false);
    
    if(hasLocalStorage) {
        if(hallBtn) hallBtn.addEventListener('click', this.toHall, false);
        
        if(auditoriosBtn) auditoriosBtn.addEventListener('click', this.toAuditoriums, false);
        
        if(standsBtn) standsBtn.addEventListener('click', this.toStands, false);
    } else {        
        hallBtn.classList.add('disabled');
        auditoriosBtn.classList.add('disabled');
        standsBtn.classList.add('disabled');
    }

    initCanvasEntrance();
};

function init(){
    if(localStorage.getItem("user") !== null) {
        localStorage.removeItem("user");
    }
    
    if(localStorage.getItem("Token") !== null) {
        localStorage.removeItem("Token");
    }    
    
    requestEvento('386ccc7829916b40cd031b41');
}
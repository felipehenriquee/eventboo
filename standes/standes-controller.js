var screenTitle;
var listBg;

var listCloseButton;
//var lecture0;

window.onload = initStandes;

function initStandes() {
    standFilter = 'all';
    
    bindStands();
    requestStandFilters();
    requestStands(true, 'S');
};

 function bindStands() {
    //Header Buttons
    var ajudaBtn = document.getElementById('ajudaS');
    if(ajudaBtn) ajudaBtn.addEventListener('click', this.help, false);

    //Footer Left Buttons
    //var entrada = document.getElementById('entrada');
    //if(entrada) entrada.addEventListener('click', this.toEntrance, false);

    //var credenciamentoBtn = document.getElementById('credenciamento');
    //if(credenciamentoBtn) credenciamentoBtn.addEventListener('click', this.accreditation, false);

    //var hallBtn = document.getElementById('hall');
    //if(hallBtn) hallBtn.addEventListener('click', this.toHall, false);

    //var auditoriosBtn = document.getElementById('auditorios');
    //if(auditoriosBtn) auditoriosBtn.onclick = this.toAuditoriums;
    //console.log(auditoriosBtn.onclick);

    //var standsBtn = document.getElementById('standes');
    //if(standsBtn) standsBtn.addEventListener('click', this.toStands, false);

    //Footer Right Buttons
    
    screenTitle = document.getElementById('openTalkSearchS');
    listBg = document.getElementById('listBgS');
    listCloseButton = document.getElementById('listCloseButtonS');
    //lecture0 = document.getElementById('lectureS0');
    
    screenTitle.addEventListener('click', function () {
        listBg.classList.add('bg-active');
    });    

    listCloseButton.addEventListener('click', function () {
        listBg.classList.remove('bg-active');
    });

    //lecture0.addEventListener('click', this.visitStand);
    var visitBtnS = document.getElementById('visitBtnS');
    //visitBtnS.addEventListener('click', this.visitStand);
    
    
    var paraAuditorios = document.getElementById('paraAuditoriosS');
    paraAuditorios.addEventListener('click', this.toAuditoriums);
    /*
    var listElements = document.getElementsByClassName('listElement');
    setTimeout(function() {
        this.populateListElements(listElements);
    }, 500);
    */
    
    //var visitar = document.getElementById('visitar');
    //visitar.addEventListener('click', this.visitStand);
};

function populateListElements(list) {
    if(list.length === 0) {
        populateListElements();
    } else {
        var i;
        for(i = 0; i < list.length; i++) {
            list[i].onclick = this.visitStand;
            console.log(list[i].onclick);
            list[i].onmouseover = this.over(list[i]);
        }
    }
};
    
function visitVermelho() {
    window.location.href = './stand-padrao/stand-vermelho.html';
};

function visitVerde() {
    window.location.href = './stand-padrao/stand-verde.html';

    //TODO: Abrir stand Federação
};

function visitRoxo() {
    window.location.href = './stand-padrao/stand-roxo.html';

    //TODO: Abrir stand Patrocinadore
};

function visitAzul() {
    window.location.href = './stand-padrao/stand-azul.html';

    //TODO: Abrir stand Prefeitura
};

function visitStandFromHall() {
    window.location.href = './stand-padrao/stand1.html';
};

function visitFederacoesFromHall() {
    //TODO: Abrir stand Federação
};

function visitPatrocinadoresFromHall() {
    //TODO: Abrir stand Patrocinadore
};

function visitPrefeiturasFromHall() {
    //TODO: Abrir stand Prefeitura
};
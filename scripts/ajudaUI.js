var titles = ["Sobre o evento", "Como posso participar?", "Como faço para entrar?"];
var texts = [
    "Sobre o evento",
    "Como posso participar?",
    "Como faço para entrar?"
];

var app;
var ajudaContainer;
var menuAjuda;
var sobreTitle;
var sobreText;
var closeAjudaButton;

window.addEventListener('load', initAjuda);

// initialize code called once per entity
function initAjuda() {
    console.log('init');
    var ajudaUI = document.getElementById('ajudaUI');
    
    if(!ajudaUI) { 

        bindAjuda();
        //texts[0] = eventData.descricao;
    }
};

function bindAjuda() {
    ajudaContainer = document.getElementById('ajudaContainer');
    menuAjuda = document.getElementById('menuAjuda');
    sobreTitle = document.getElementById('sobreTitle');
    sobreText = document.getElementById('sobreText');
    
    var sobre = document.getElementById('sobre'); 
      
    var comoParticipar = document.getElementById('comoParticipar');    
    var comoEntrar = document.getElementById('comoEntrar'); 
    
    closeAjudaButton = document.getElementById('closeAjudaButton');
    closeAjudaButton.addEventListener('click', closeAjuda);
    
    var sobreBtn = document.getElementById('sobreBtn');
    sobreBtn.addEventListener('click', function (){
        sobre.classList.add('ajudaActive');
        //sobre.classList.add('ajudaContainerActive');
        sobreTitle.innerHTML = titles[0];
        sobreText.innerHTML = texts[0];
    });
    
    var comoParticiparBtn = document.getElementById('comoParticiparBtn');
    comoParticiparBtn.addEventListener('click', function (){
        sobre.classList.add('ajudaActive');
        //sobre.classList.add('ajudaContainerActive');
        sobreTitle.innerHTML = titles[1];
        sobreText.innerHTML = texts[1];
    });
    
    var comoEntrarBtn = document.getElementById('comoEntrarBtn');
    comoEntrarBtn.addEventListener('click', function (){
        sobre.classList.add('ajudaActive');
        sobre.classList.add('ajudaContainerActive');
        sobreTitle.innerHTML = titles[2];
        sobreText.innerHTML = texts[2];
    });
    
    
    var closeSobreButton = document.getElementById('closeSobreButton');
    closeSobreButton.addEventListener('click', function () {
        sobre.classList.remove('ajudaActive');
    });
    
    var sairBtn = document.getElementById('sairBtn');
    sairBtn.addEventListener('click', this.reloadScene);
    sairBtn.addEventListener('click', function() {
        sobre.classList.remove('ajudaActive');
        setTimeout(function () {
            menuajuda.classList.remove('ajudaActive');
            
            setTimeout(function () {
                ajudaContainer.classList.remove('ajudaContainerActive');    
            }, 400); 
        }, 400);          
    });    
};

function closeAjuda() {
    document.getElementById('sobre').classList.remove('ajudaActive');
    setTimeout(function () {
        menuajuda.classList.remove('ajudaActive');
        
        setTimeout(function () {
            ajudaContainer.classList.remove('ajudaContainerActive');    
        }, 400); 
    }, 400);
}
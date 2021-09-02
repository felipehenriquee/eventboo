//teste@teste.com.br
//123456

//var userName, email, password;

var nameInput, emailInput, passwordInput;
var telInput, estadoInput, generoInput, docInput;
var nameInputLogin, emailInputLogin, passwordInputLogin;
var subscribeConfirmationBg;

var utcHour;

var baseApi = 'http://147.182.210.54:5001/v1';

var eventData;

var talkData = {
    Ativo: false,
    Id: "",
    Link: null,
    Nome: "",
    NomeCategoria: null,
    descricao: "",
    dtFim: "",
    dtInicio: "",
    estados: [],
    idAuditorio: "",
    idCategoria: null,
    idsPalestrantes: [""],
    linkPalestra: "",
    nomeAuditorio: ""
}

var isCurrentTalkLate;

var standData = {
    Ativo: false,
    Estados: [],
    Id: "",
    Nome: "",
    NomeCategoria: "",
    NomeModelo: null,
    idCategoria: "",
    idEstande: "",
    idModelo: "",
    imgEstande: {},
    imgLogo: {},
    imgsEstande: null,
    linkCatalogo: "",
    linkFacebook: "",
    linkInstagram: "",
    linkSite: "",
    linkTwitter: "",
    linkWhatsapp: "",
    linkYoutube: ""
}

var talks;
var talksFromServer;
var hallSearch;
var chosenHallFilter = 'all';

var standFromServer;
var standsElements;
var listOfStandFilters;
var standFilter = 'all';
var standStateFilter;
var standSearch;

var videoFrame;

var watchBtn;

const controller = new AbortController();
const signal = controller.signal;

setInterval(refreshToken, 10 * 60 * 1000);

function refreshToken() {
    let user = JSON.parse(localStorage.getItem('user'));
    //console.log(user);

    if (user != null && user != undefined && user != '') {
        let refreshToken = user.stsTokenManager.refreshToken;

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("grant_type", "refresh_token");
        urlencoded.append("refresh_token", refreshToken);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://securetoken.googleapis.com//v1/token?key=AIzaSyAd1q71q1U97YHvVt3iiM4ME1e_4epLlGQ", requestOptions)
            .then(response => response.json())
            .then(res => {
                let newToken = res.id_token;
                //console.log(newToken);
                localStorage.setItem('Token', JSON.stringify(newToken));
            })
            .catch(error => console.log('error', error));
    } else {
        console.log('no user');
    }
}

function openFullScreen() {
    if (!document.fullscreenElement) {
        //console.log('openFullScreen');
        if (document.body.requestFullscreen) {
            document.body.requestFullscreen();
        } else if (document.body.webkitRequestFullscreen) { /* Safari */
            document.body.webkitRequestFullscreen();
        } else if (document.body.msRequestFullscreen) { /* IE11 */
            document.body.msRequestFullscreen();
        } else {
            document.body.requestFullscreen();
        }
    } else {
        //console.log('openFullScreen');
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
    }
}


async function requestEvento(id) {
    //console.log('iniciando requisição');
    let myHeaders = new Headers();

    let myInit = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors'
    };

    let request = new Request(`${baseApi}/evento/GetOne/?id=${id}`, myInit);

    let response = await fetch(request)
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                //console.log('Fail');
                ToEntrance.prototype.next();
            }
        });
    //console.log(response);

    eventData = response;
    //console.log(eventData);

    //ToEntrance.prototype.next();
}

function bindSingInInputs() {
    nameInput = document.getElementById('nameInput');
    emailInput = document.getElementById('emailInput');
    passwordInput = document.getElementById('passwordInput');
    telInput = document.getElementById('telInput');
    estadoInput = document.getElementById('estadoInput');
    generoInput = document.getElementById('generoInput');
    docInput = document.getElementById('docInput');

    //subscribeBtn = document.getElementById('subscribeBtn');
    //subscribeConfirmationBg = document.getElementById('subscribeConfirmationBg');
    //subscribeBtn.addEventListener('click', authBtnClick);
};

function bindLogInInputs() {
    emailInputLogin = document.getElementById('emailInputLogin');
    console.log(emailInputLogin);
    passwordInputLogin = document.getElementById('passwordInputLogin');
    console.log(passwordInputLogin);
    //loginBtn = document.getElementById('loginBtn');
    //loginBtn.addEventListener('click', login);
}

//Start Sign In Methods

async function authBtnClick() {
    let loginError = document.getElementById('loginError');
    loginError.addEventListener('click', function () {
        loginError.classList.remove('bg-active');
    });

    let userName = nameInput.value;
    if (userName == null || userName == undefined || userName == '') {
        loginError.classList.add('bg-active');
        loginError.children[0].children[3].innerHTML = 'Nome inválido';
        //loginError.children[0].children[6].innerHTML = '';
        return;
    }

    let email = emailInput.value;
    if (email == null || email == undefined || email == '') {
        loginError.classList.add('bg-active');
        loginError.children[0].children[3].innerHTML = 'E-mail inválido';
        //loginError.children[0].children[6].innerHTML = '';
        return;
    }

    let password = passwordInput.value;
    if (password == null || password == undefined || password == '') {
        loginError.classList.add('bg-active');
        loginError.children[0].children[3].innerHTML = 'Password Inválido';
        //loginError.children[0].children[6].innerHTML = '';
        return;
    }

    let tel = telInput.value;
    if (tel == null || tel == undefined || tel == '') {
        loginError.classList.add('bg-active');
        loginError.children[0].children[3].innerHTML = 'Telefone inválido';
        //loginError.children[0].children[6].innerHTML = '';
        return;
    }

    let estado = estadoInput.value;
    if (estado == null || estado == undefined || estado == '') {
        loginError.classList.add('bg-active');
        loginError.children[0].children[3].innerHTML = 'Estado inválido';
        loginError.children[0].children[6].innerHTML = '';
        return;
    }

    let genero = generoInput.value;
    if (genero == null || genero == undefined || genero == '') {
        loginError.classList.add('bg-active');
        loginError.children[0].children[3].innerHTML = 'Gênero inválido';
        loginError.children[0].children[6].innerHTML = '';
        return;
    }

    let cpf = docInput.value;
    if (cpf == null || cpf == undefined || cpf == '') {
        loginError.classList.add('bg-active');
        loginError.children[0].children[3].innerHTML = 'CPF inválido';
        //loginError.children[0].children[6].innerHTML = '';
        return;
    }

    let checkboxAgree = document.getElementById('checkboxAgree');
    let check = checkboxAgree.checked;
    //console.log(checkboxAgree.checked);
    //console.log(check);
    if (check != true) {
        loginError.classList.add('bg-active');
        loginError.children[0].children[3].innerHTML = 'Você precisa concordar com os termos para continuar';
        //loginError.children[0].children[6].innerHTML = '';
        return;
    }

    let signinFeedback = document.getElementById('signinFeedback');
    signinFeedback.classList.add('bg-active');
    //console.log('autenticando');
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(cred => {
            if (cred) {
                localStorage.setItem('user', JSON.stringify(cred.user));
                //console.log('autenticado firebase');
                cred.user.getIdToken()
                    .then(token => {
                        //console.log(token);
                        localStorage.setItem('Token', JSON.stringify(token));
                        //console.log('autenticando server');
                        autenticaLogin(cred.user, userName, tel, estado, genero, cpf, check);

                    });
            } else {
                localStorage.removeItem('user');
                localStorage.removeItem('Token');
            }
        })
        .catch(function (error) {
            signinFeedback.classList.remove('bg-active');
            loginError.classList.add('bg-active');
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;

            if (errorCode == 'auth/invalid-email') {
                loginError.children[0].children[3].innerHTML = 'E-mail inválido';
                //loginError.children[0].children[6].innerHTML = '';

            } else if (errorCode == 'auth/email-already-in-use') {
                loginError.children[0].children[3].innerHTML = 'Este e-mail já está em uso';

            } else if (errorCode == 'auth/weak-password') {
                loginError.children[0].children[3].innerHTML = 'A senha deve ter no mínimo 6 caracteres';
            }

            //console.log(errorCode);
            //console.log(errorMessage);
            // ...
        });
}

function forgotPassword() {
    let recoverbg = document.getElementById('recoverbg');
    recoverbg.classList.add('bg-active');
}

function closeRecover() {
    let recoverbg = document.getElementById('recoverbg');
    recoverbg.classList.remove('bg-active');
}

function recoverPassword() {
    let email = document.getElementById('emailInputRecover').value;

    firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            let recoverFeedback = document.getElementById('recoverFeedback');
            recoverFeedback.classList.add('bg-active');
            //console.log('Reset send');
        })
        .catch(error => {
            console.log(error);
        });
}

function finishFeedback() {
    let recoverbg = document.getElementById('recoverbg');
    let recoverFeedback = document.getElementById('recoverFeedback');

    recoverbg.classList.remove('bg-active');
    recoverFeedback.classList.remove('bg-active');
}

async function googleSingIn() {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/user.phonenumbers.read');
    provider.addScope('https://www.googleapis.com/auth/userinfo.email');
    await firebase.auth().signInWithPopup(provider)
        .then(cred => {
            cred.user.getIdToken()
                .then(token => {
                    //console.log(token);
                    localStorage.setItem('user', JSON.stringify(cred.user));
                    localStorage.setItem('Token', JSON.stringify(token));
                    subscribeConfirmationBg.classList.add('bg-active');
                });
        }).catch(error => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
    subscribeConfirmationBg.classList.add('bg-active');
}

async function facebookSingIn() {
    let provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('email');
    await firebase.auth().signInWithPopup(provider)
        .then(cred => {
            cred.user.getIdToken()
                .then(token => {
                    //console.log(token);
                    localStorage.setItem('user', JSON.stringify(cred.user));
                    localStorage.setItem('Token', JSON.stringify(token));
                    subscribeConfirmationBg.classList.add('bg-active');
                });
        }).catch(error => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
}

//End Sign In Methods

//Start Login methods

async function login() {
    let loginError = document.getElementById('loginError');
    loginError.addEventListener('click', function () {
        loginError.classList.remove('bg-active');
    });

    let email = emailInputLogin.value;
    if (email == null || email == undefined || email == '') {
        loginError.classList.add('bg-active');
        loginError.children[0].children[3].innerHTML = 'E-mail inválido';
        //loginError.children[0].children[6].innerHTML = '';
        return;
    }

    let password = passwordInputLogin.value;
    if (password == null || password == undefined || password == '') {
        loginError.classList.add('bg-active');
        loginError.children[0].children[3].innerHTML = 'Senha inválido';
        //loginError.children[0].children[6].innerHTML = '';
        return;
    }


    let loginFeedback = document.getElementById('loginFeedback');
    loginFeedback.classList.add('bg-active');

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(cred => {
            if (cred) {
                localStorage.setItem('user', JSON.stringify(cred.user));
                cred.user.getIdToken()
                    .then(token => {
                        //console.log(token);
                        localStorage.setItem('Token', JSON.stringify(token));
                        autenticaLogin(cred.user);

                    });
            } else {
                localStorage.removeItem('user');
                localStorage.removeItem('Token');
            }
        })
        .catch(function (error) {
            loginFeedback.classList.remove('bg-active');
            let loginError = document.getElementById('loginError');
            loginError.classList.add('bg-active');
            loginError.addEventListener('click', function () {
                loginError.classList.remove('bg-active');
            });
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;

            switch (errorCode) {
                case 'auth/user-not-found':
                    loginError.children[0].children[3].innerHTML = 'Usuário não encontrado';
                    break;
                case 'auth/wrong-password':
                    loginError.children[0].children[3].innerHTML = 'Senha incorreta';
                    break;
                case 'auth/invalid-email':
                    loginError.children[0].children[3].innerHTML = 'E-mail inválido';
                    break;
            }

            console.log(errorCode);
            console.log(errorMessage);
            // ...
        });
}

async function autenticaLogin(user, userName, tel, estado, genero, cpf) {
    let usuario = {
        NomeCompleto: null,
        Email: null,
        Senha: null,
        Telefone: null,
        TipoLogin: 0,
        Estado: null,
        Genero: null,
        CPF: null
    };
    let result;
    if (user.providerData[0].providerId.indexOf('password') >= 0) {
        usuario.TipoLogin = 0;
    } else if (user.providerData[0].providerId.indexOf('google') >= 0) {
        usuario.TipoLogin = 1;
    } else if (user.providerData[0].providerId.indexOf('facebook') >= 0) {
        usuario.TipoLogin = 2;
    }

    localStorage.setItem('idUsuario', usuario.idUsuario);
    usuario.NomeCompleto = user.providerData[0].displayName;
    usuario.Email = user.providerData[0].email;
    usuario.Telefone = user.providerData[0].phoneNumber;
    usuario.fotoURL = user.providerData[0].photoURL;

    //usuario.idUsuario = "string";
    //usuario.Nome = "string";
    //usuario.Sobrenome = "string";
    usuario.NomeCompleto = userName;
    //usuario.Email = "string";
    //usuario.Login = "string";
    //usuario.Senha = "string";
    //usuario.Role = "string";
    //usuario.Oculto = true;
    //usuario.Ativo = true;
    //usuario.Token = "string";
    //usuario.fotoURL = "string";
    usuario.Telefone = tel;
    //usuario.TipoLogin = 0;
    //usuario.Pais = "string";
    usuario.Estado = estado;
    //usuario.Cidade = "string";
    //usuario.dtNascimento = "2020-11-30T01:57:29.919Z";
    usuario.Genero = genero;
    usuario.CPF = cpf;

    let token = JSON.parse(localStorage.getItem('Token'));
    let myHeaders = new Headers();
    //myHeaders.append('Authorization', `Bearer ${token}`);
    //myHeaders.append('Content-Type', 'application/json');
    //console.log(`Bearer ${token}`);

    let myInit = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ usuario, bAdmin: false }),
        mode: 'cors'

    };
    console.log(myInit.body);
    let request = new Request(`${baseApi}/usuario/AutenticaLogin`, myInit)

    let response = await fetch(request)
        .then(res => {
            if (res.ok) {
                //console.log('autenticado server');
                return res.json();
            } else {
                console.log('Fail');
            }
        });
    //console.log(response);

    loginFeedback.classList.remove('bg-active');
    signinFeedback.classList.remove('bg-active');
    subscribeConfirmationBg.classList.add('bg-active');
}

//Start Login Methods

function logout() {    
    firebase.auth().signOut().then(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('Token');
        window.location.reload();
    });    
}

//End Login Methods

function hallFilter(element, filter, search) {
    //console.log(`${element}, ${filter}, ${search}`)
    chosenHallFilter = filter;

    //console.log(talks);
    //console.log(talksFromServer);

    let listBody = document.getElementById('listBodyH');
    //console.log(listbody);
    if (element != null && element != undefined && element != '') {
        let filterButtons = element.parentElement.children;

        for (let a = 0; a < filterButtons.length; a++) {
            filterButtons[a].classList.remove('filterSelected');
        }

        element.classList.add('filterSelected');
    }

    if (search == '' || search == undefined || search == null) hallSearch = null;
    else hallSearch = search;
    //console.log(hallSearch);
    //console.log(talks);
    if (hallSearch != null) {
        for (let i = 0; i < talks.length; i++) {
            //console.log(talks);
            if (talks[i])
                talks[i].remove();
        }

        for (let i = 0; i < standsElements.length; i++) {
            if (standsElements[i])
                standsElements[i].remove();
        }
    }

    switch (chosenHallFilter) {
        case 'all':
            for (let i = 0; i < talks.length; i++) {
                if (hallSearch == null) {
                    //console.log(hallSearch);
                    listBody.append(talks[i]);
                } else {
                    //console.log(talks[i]);
                    let s = talksFromServer[i].Nome.toLowerCase().indexOf(hallSearch);
                    //console.log('s' + s);
                    if (s >= 0) {
                        //console.log(talks[i]);
                        listBody.append(talks[i]);
                    }
                }
            }

            for (let i = 0; i < standsElements.length; i++) {
                if (hallSearch == null) {
                    //console.log(hallSearch);
                    listBody.append(standsElements[i]);
                } else {
                    let s = standFromServer[i].Nome.toLowerCase().indexOf(hallSearch);
                    //console.log('s' + s);
                    if (s >= 0) {
                        listBody.append(standsElements[i]);
                    }
                }
            }
            break;
        case 'stands':
            for (let i = 0; i < talks.length; i++) {
                talks[i].remove();
            }

            for (let i = 0; i < standsElements.length; i++) {
                if (hallSearch == null) {
                    //console.log(hallSearch);
                    listBody.append(standsElements[i]);
                } else {
                    let s = standFromServer[i].Nome.toLowerCase().indexOf(hallSearch);
                    //console.log('s' + s);
                    if (s >= 0) {
                        listBody.append(standsElements[i]);
                    }
                }
            }
            break;
        case 'talks':
            for (let i = 0; i < talks.length; i++) {
                if (hallSearch == null) {
                    //console.log(hallSearch);
                    listBody.append(talks[i]);
                } else {
                    let s = talksFromServer[i].Nome.toLowerCase().indexOf(hallSearch);
                    //console.log('s' + s);
                    if (s >= 0) {
                        listBody.append(talks[i]);
                    }
                }
            }

            for (let i = 0; i < standsElements.length; i++) {
                standsElements[i].remove();
            }
            break;
    }
}

async function requestPalestra(abort = false, scene) {
    let detailCloseBtn = document.getElementById(`videoDetailCloseButton${'H'}`);
    detailCloseBtn.addEventListener('click', function () {
        let thumbContainer = document.getElementById('thumbContainer');
        let count = thumbContainer.children.length;

        for (let i = 0; i < count;) {
            thumbContainer.children[0].remove();
        }

        watchBtn.removeEventListener('click', HallUi.prototype.toWatchTalk);
    });

    if (abort == true)
        abortFetching();

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

    let request = new Request(`${baseApi}/palestra/GetAll/`, myInit);

    let response = await fetch(request)
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                console.log('Fail');
            }
        });
    //console.log(response);

    if (response) {
        //console.log('response not null');
        talks = new Array(response.length);
        for (let i = 0; i < response.length; i++) {
            talks[i] = await createPalestraElement(
                scene,
                i,
                response[i]
            );
        }
    } else {
        console.log('response null');
    }

    talksFromServer = response;
    //unlockFilterButtons('hallFilterBtns');
}

async function createPalestraElement(scene, i, response) {
    watchBtn = document.getElementsByName(`assistirBtn`)[0];
    let listBody = document.getElementById('listBodyH');
    //console.log(`${response.Nome} ${scene}`);
    let listElement = document.createElement("div");
    listElement.id = `${response.Nome} ${scene}`;
    listElement.classList.add('listElement');
    listBody.appendChild(listElement);

    let listElementContent = document.createElement("div");
    listElementContent.classList.add('listElementContent');
    listElement.appendChild(listElementContent);

    //LeftSide
    let leftSide = document.createElement("div");
    leftSide.classList.add('leftSide');
    listElementContent.appendChild(leftSide);

    let eventHour = document.createElement("span");
    eventHour.classList.add('eventHour');
    eventHour.innerHTML = talkTime(response.dtInicio, response.dtFim);
    leftSide.appendChild(eventHour);

    let eventTitle = document.createElement("span");
    eventTitle.classList.add('eventTitle');
    eventTitle.innerHTML = `${response.Nome}`;
    leftSide.appendChild(eventTitle);

    let pLabel;
    if (response.idsPalestrantes[0] != "8c8cfd038d1a2aa803e8cb03") {
        let palestranteList = new Array();
        
        if (response.idsPalestrantes.length > 0) {
            palestranteList = await createPalestrantesList(response.idsPalestrantes);

            pLabel = formatPalestrantesName(palestranteList)
        }

        let eventSpeaker = document.createElement("span");
        eventSpeaker.classList.add('eventSpeaker');
        eventSpeaker.innerHTML = pLabel;
        leftSide.appendChild(eventSpeaker);
    }

    let eventStage = document.createElement("span");
    eventStage.classList.add('eventSpeaker');
    eventStage.innerHTML = `${response.nomeAuditorio}`;
    leftSide.appendChild(eventStage);

    //RightSide
    let rightSide = document.createElement("div");
    rightSide.classList.add('rightSide');
    listElementContent.appendChild(rightSide);

    let toTalk = document.createElement("span");
    toTalk.classList.add('commandtext');
    toTalk.innerHTML = 'Assistir';
    rightSide.appendChild(toTalk);

    let icon = document.createElement("img");
    icon.classList.add('listIcon');
    icon.src = '../extraIcons/entrarRed.svg';
    rightSide.appendChild(icon);

    let separator = document.createElement("div");
    separator.classList.add('separator');
    listElement.appendChild(separator);

    listElement.addEventListener('click', async function () {
        //console.log(watchBtn);
        talkData = response;

        let hourInit = {
            method: 'POST',
            mode: 'cors'
        };

        //console.log('requisoção de hora');
        let hourRequest = new Request('http://147.182.210.54:5001/v1/ferramentas/getdate', hourInit);
        let utcHour = await fetch(hourRequest)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    console.log('Fail');
                }
            });

        //console.log(utcHour);

        let videoDetailBg = document.getElementById(`videoDetailBg${scene}`);
        videoDetailBg.classList.add('bg-active');

        let thumbContainer = document.getElementById('thumbContainer');

        for (let i = 0; i < response.idsPalestrantes.length; i++) {
            let usePhoto = false;
            if (usePhoto) {
                let videoThumb = document.createElement('img');
                videoThumb.classList.add('videoThumbnail');
                videoThumb.src = `${palestrante.foto.Caminho}`;
                thumbContainer.append(videoThumb);
            }
        }

        let videoDetailCloseButtonH = document.getElementById('videoDetailCloseButtonH');
        videoDetailCloseButtonH.addEventListener('click', function () {
            watchBtn.id = 'assitirH';
        });

        document.getElementsByClassName('videoTitle')[0].innerHTML = `${response.Nome}`;
        document.getElementsByClassName('videoHour')[0].innerHTML = talkTime(response.dtInicio, response.dtFim);
        if (response.idsPalestrantes[0] == "8c8cfd038d1a2aa803e8cb03") {
            document.getElementsByClassName('lectureSpeaker')[0].innerHTML = '';
        } else {
            document.getElementsByClassName('lectureSpeaker')[0].innerHTML = `${pLabel}`;
        }
        document.getElementsByClassName('synopsisText')[0].innerHTML = `${response.descricao}`;

        //console.log(utcHour);
        let talkActive = calculateTalkActive(utcHour, response.dtInicio);
        isCurrentTalkLate = calculateTalkLate(utcHour, response.dtFim);
        //console.log('isCurrentTalkLate ' + isCurrentTalkLate);

        if (talkActive) {
            watchBtn.id += `: ${listElement.id}`;
            watchBtn.classList.add('redBtnBack');
            watchBtn.classList.remove('videoButtonDisabled');
            watchBtn.children[0].innerHTML = 'Assista à palestra';
            watchBtn.children[1].classList.add('redBtnIcon');
            watchBtn.children[1].classList.remove('videoButtonIconDisabled');
            watchBtn.addEventListener('click', function() {
                hallSearch = null;
                standSearch = null;
                HallUi.prototype.toWatchTalk
            });
        } else {
            watchBtn.classList.remove('redBtnBack');
            watchBtn.classList.add('videoButtonDisabled');
            watchBtn.children[0].innerHTML = 'Assista em breve';
            watchBtn.children[1].classList.remove('redBtnIcon');
            watchBtn.children[1].classList.add('videoButtonIconDisabled');
            watchBtn.removeEventListener('click', function() {
                hallSearch = null;
                standSearch = null;
                HallUi.prototype.toWatchTalk
            });
        }

    });

    return listElement;
}

async function requestPalestrante(id) {
    let token = JSON.parse(localStorage.getItem('Token'));
    let myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    let myInit = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors'
    };

    let request = new Request(`${baseApi}/palestrante/GetOne/?id=${id}`, myInit)

    let response = await fetch(request)
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                console.log('Fail');
            }

        });
    //console.log(response);
    return response;
}

function watchTalk() {
    let videoFrame = document.getElementById('videoFrame');
    videoFrame.src = talkData.linkPalestra;
    //console.log(talkData.linkPalestra);

    //console.log('isCurrentTalkLate ' + isCurrentTalkLate);
    if (isCurrentTalkLate) {
        let chat = document.getElementById('chat');
        //console.log('chat ' + chat);
        chat.remove();

        let openChat = document.getElementById('openChat');
        //console.log('openChat ' + openChat);
        openChat.remove();
    }

    let openTalkSearchP = document.getElementById('openTalkSearchP');
    openTalkSearchP.children[0].children[1].innerHTML = talkData.Nome;
}

function deleteChatUndesiredElements() {
    let configRemoved = false;

    while (!configRemoved) {
        //console.log('tentando remover config');
        let configBtn = document.getElementById('mob-user-settings');
        //console.log(configBtn)
        if (configBtn) {
            //console.log('removeu config');
            configBtn.remove();
            configRemoved = true;
        }
    }

    let menuRemoved = false;

    while (!menuRemoved) {
        //console.log('tentando remover menu');
        let menuBtn = document.getElementById('moremenu');
        if (menuBtn) {
            //console.log('removeu menu');
            menuBtn.remove();
            menuRemoved = true;
        }
    }
}
/*
function showDropDown() {
    let dropdown = document.getElementById("statesDropdown");
    dropdown.classList.toggle('hideDropdown');

    for (let i = 0; i < dropdown.children.length; i++) {
        dropdown.children[i].classList.toggle("hideDropdown");
    }

    if (dropdown.onblur == null) {        
        dropdown.onblur = function () {
            console.log('blur');
            dropdown.classList.add('hideDropdown');

            for (let i = 0; i < dropdown.children.length; i++) {
                dropdown.children[i].classList.add("hideDropdown");
            }
        }
    }
}
*/
async function requestStandFilters() {
    let token = JSON.parse(localStorage.getItem('Token'));
    let myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + token);
    //myHeaders.append('signal', signal);
    //console.log(`Bearer ${token}`);

    let myInit = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors'
    };

    let request = new Request(`${baseApi}/estandecategoria/GetAll`, myInit);

    listOfStandFilters = await fetch(request)
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                console.log('Fail');
            }
        });
    //console.log(listOfStandFilters);

    let adjust = new Array()
    for (let i = 0; i < listOfStandFilters.length; i++) {
        adjust.push(listOfStandFilters[i]);        
    }

    adjust[0] = listOfStandFilters[6];
    adjust[6] = listOfStandFilters[0];
    listOfStandFilters = adjust;


    if (listOfStandFilters.length > 0) {
        let listFiltersContainer = document.getElementById('listFiltersContainer');

        for (let i = 0; i < listOfStandFilters.length; i++) {
            let filterBtn = document.createElement('button');
            filterBtn.innerHTML = listOfStandFilters[i].Nome;
            filterBtn.classList.add('filterButtonLocked')
            listFiltersContainer.append(filterBtn);
            //console.log(listOfStandFilters[i].idEstandeCategoria);
            filterBtn.addEventListener('click', () => { selectStandFilters(filterBtn, listOfStandFilters[i].idEstandeCategoria, standSearch) });
        }
    }
}

function selectState(state) {
    standStateFilter = state;
    selectStandFilters(null, null, standSearch);
}

async function selectStandFilters(element, filter, search) {
    if (filter != null && filter != undefined) standFilter = filter;
    if (standStateFilter == null || standStateFilter == undefined) standStateFilter = 'all';

    if (search == '' || search == undefined || search == null) standSearch = null;
    else standSearch = search;

    //console.log(`filtro: ${standFilter}, estado ${standStateFilter}, search ${standSearch}`);

    let listBody = document.getElementById('listBodyS');

    let filteredFromServer = new Array();
    let filteredFromState = new Array();

    let filteredStands = new Array();
    let stateFilteredStands = new Array();
    let finalStands = new Array();

    if (standFilter === 'all') {
        filteredStands = standsElements;
        filteredFromServer = standFromServer;
        //console.log(filteredStands);
    } else {
        filteredStands = new Array();

        for (let i = 0; i < standsElements.length; i++) {
            for (let j = 0; j < standFromServer[i].categorias.length; j++) {     
                //console.log(`standFromServer[${i}].categorias[${j}].Id ${standFromServer[i].categorias[j].Nome} e ${standFilter}`);           
                if (standFromServer[i].categorias[j].Id == standFilter) {
                    filteredStands.push(standsElements[i]);
                    filteredFromServer.push(standFromServer[i]);
                    break;
                }                
            }
        }

        //console.log(filteredStands);
        //console.log(filteredFromServer);
    }

    if (standStateFilter === 'all') {
        stateFilteredStands = filteredStands;
        filteredFromState = filteredFromServer;
        //console.log(stateFilteredStands);
    } else {
        for (let i = 0; i < filteredStands.length; i++) {
            for (let j = 0; j < filteredFromServer[i].Estados.length; j++) {
                if (filteredFromServer[i].Estados[j] == standStateFilter) {
                    stateFilteredStands.push(filteredStands[i]);
                    filteredFromState.push(filteredFromServer[i]);
                    break;
                }
            }
        }

        //console.log(stateFilteredStands);        
    }


    if (standSearch == null || standSearch == undefined || standSearch == '') {
        finalStands = stateFilteredStands;
        //console.log(finalStands);
    } else {
        finalStands = new Array();
        //console.log(stateFilteredStands.length);
        //console.log(filteredFromState);

        for (let i = 0; i < stateFilteredStands.length; i++) {
            //console.log(filteredFromState);
            //console.log(filteredFromState[i]);

            let s = filteredFromState[i].Nome.toLowerCase().indexOf(standSearch);
            //console.log(filteredFromState[i].Nome + " " + s);
            if (s >= 0) {
                finalStands.push(stateFilteredStands[i]);
            }
        }

        //console.log(finalStands);
    }

    //finalStands = stateFilteredStands;

    for (let i = 0; i < standsElements.length; i++) {
        standsElements[i].remove();
    }

    for (let i = 0; i < finalStands.length; i++) {
        listBody.append(finalStands[i]);
    }

    if (element != null) {
        let filterButtons = element.parentElement.children;

        for (let a = 0; a < filterButtons.length; a++) {
            filterButtons[a].classList.remove('filterSelected');
        }

        element.classList.add('filterSelected');
    }

    //console.log(standSearch);
}

async function requestStands(abort = false, scene) {
    if (abort == true)
        abortFetching();

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

    let baseseUrl = `${baseApi}/estande/GetAll/`;
    let request = new Request(baseseUrl, myInit)

    standFromServer = await fetch(request)
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                console.log('Fail');
            }
        });
    //console.log(standFromServer[0]);

    if (standFromServer) {
        //console.log('response not null');
        standsElements = new Array(standFromServer.length);
        let i;
        for (i = 0; i < standFromServer.length; i++) {
            standsElements[i] = await createStandElement(
                scene,
                i,
                standFromServer[i]
            );
        }
    } else {
        console.log('response null');
    }

    //unlockFilterButtons('listFiltersContainer');
}

function createStandElement(scene, i, response) {
    //console.log('creating');
    let listBodyS = document.getElementById(`listBody${scene}`);

    let listElement = document.createElement("div");
    listElement.id = `${response.Nome} ${scene}`;
    listElement.classList.add('listElement');
    listBodyS.appendChild(listElement);

    let listElementContent = document.createElement("div");
    listElementContent.classList.add('listElementContent');
    listElement.appendChild(listElementContent);

    //LeftContainer
    let leftContainer = document.createElement("div");
    leftContainer.classList.add('leftContainer');
    listElementContent.appendChild(leftContainer);

    let imgContainer = document.createElement("div");
    imgContainer.classList.add('imgContainer');
    leftContainer.appendChild(imgContainer);

    let logo = document.createElement("img");
    if (response.imgLogo) {
        logo.src = `${response.imgLogo.Caminho}`;
    }
    imgContainer.appendChild(logo);

    let leftSide = document.createElement("div");
    leftSide.classList.add('leftSide');
    leftContainer.appendChild(leftSide);

    let standTitle = document.createElement("span");
    standTitle.classList.add('eventTitle');
    standTitle.innerHTML = `${response.Nome}`;
    leftSide.appendChild(standTitle);

    let standCategory = document.createElement("span");
    standCategory.classList.add('eventSpeaker');
    standCategory.innerHTML = `Categoria: `;

    for (let i = 0; i < response.categorias.length; i++) {
        standCategory.innerHTML += `${response.categorias[i].Nome}`;
        if(i != response.categorias.length - 1) {
            standCategory.innerHTML += ' / ';
        }        
    }

    leftSide.appendChild(standCategory);

    //RightSide
    let rightSide = document.createElement("div");
    rightSide.classList.add('rightSide');
    listElementContent.appendChild(rightSide);

    let toTalk = document.createElement("span");
    toTalk.classList.add('commandtext');
    toTalk.innerHTML = 'Visitar';
    rightSide.appendChild(toTalk);

    let icon = document.createElement("img");
    icon.classList.add('listIcon');
    icon.src = '../extraIcons/entrarRed.svg';
    rightSide.appendChild(icon);

    let separator = document.createElement("div");
    separator.classList.add('separator');
    listElement.appendChild(separator);

    listElement.addEventListener('click', function () {
        standData = response;
        hallSearch = null;
        standSearch = null;
        //console.log(standData);
        //console.log(standData.idModelo);

        if (scene == 'S') {
            switch (standData.idModelo) {
                case 'expositor individual':
                    visitStand();
                    break;
                case 'prefeituras':
                    visitPrefeituras();
                    break;
                case 'pab/FEDERAÇÃO':
                    visitFederacoes();
                    break;
                case 'patrocinadores':
                    visitPatrocinadores();
                    break;
                default:
                    visitStand();
                    break;
            }

        } else if (scene == 'H') {
            switch (standData.idModelo) {
                case 'expositor individual':
                    visitStandFromHall();
                    break;
                case 'prefeituras':
                    visitPrefeiturasFromHall();
                    break;
                case 'pab/FEDERAÇÃO':
                    visitFederacoesFromHall();
                    break;
                case 'patrocinadores':
                    visitPatrocinadoresFromHall();
                    break;
                default:
                    visitStandFromHall();
                    break;
            }
        }
    });

    return listElement;
}

function bindStand() {
    standVisitCount(standData.Id);

    let openTalkSearchS1 = document.getElementById('openTalkSearchS1');
    openTalkSearchS1.children[0].children[1].innerHTML = `Stand - ${standData.Nome}`;

    let instagramBtn = document.getElementById('instagramBtn');
    if (standData.linkInstagram) {
        instagramBtn.addEventListener('click', function () {
            window.open(standData.linkInstagram);
        });
    } else {
        instagramBtn.remove();
    }

    let facebookBtn = document.getElementById('facebookBtn');
    if (standData.linkFacebook) {
        facebookBtn.addEventListener('click', function () {
            window.open(standData.linkFacebook);
        });
    } else {
        facebookBtn.remove();
    }

    let twitterBtn = document.getElementById('twitterBtn');
    if (standData.linkTwitter) {
        twitterBtn.addEventListener('click', function () {
            window.open(standData.linkTwitter);
        });
    } else {
        twitterBtn.remove();
    }

    let whatappButton = document.getElementById('whatappButton');
    if (standData.linkWhatsapp) {
        whatappButton.addEventListener('click', function () {
            window.open(standData.linkWhatsapp);
        });
    } else {
        whatappButton.remove();
    }

    let catalogoBtn = document.getElementById('catalogoBtn');
    if (standData.linkCatalogo) {
        catalogoBtn.addEventListener('click', function () {
            window.open(standData.linkCatalogo);
        });
    } else {
        catalogoBtn.remove();
    }
}

async function standVisitCount(id) {
    let token = JSON.parse(localStorage.getItem('Token'));
    let myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);
    //console.log(`Bearer ${token}`);

    let myInit = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors'
    };

    let request = new Request(`${baseApi}/estande/AtualizaAcesso/?id=${id}`, myInit)

    let response = await fetch(request)
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                console.log('Fail');
            }
        });

    //console.log(response);
}

async function requestStandImage(img) {
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

    img.src = standData.imgEstande;

    img.onload = function () {
        //console.log(img);
        return img;
    }
}

//palestraRequest
//standsRequest

function palestraStageFilter() {
    let dataDropdown = document.getElementById('dataDropdown');
    let date = dataDropdown.value;
    let filteredTalks = new Array();

    if (date == 'all') {
        filteredTalks = talks;
    } else {
        for (let i = 0; i < talks.length; i++) {
            let talkDate = new Date(talksFromServer[i].dtInicio);
            let dropDate = new Date(date);
            let talkDateDM = `${talkDate.getDate()}/${talkDate.getMonth()}`;
            let dropDateDM = `${dropDate.getDate()}/${dropDate.getMonth()}`;
            if (talkDateDM == dropDateDM) {
                filteredTalks.push(talks[i]);
            }
        }

        for (let i = 0; i < talks.length; i++) {
            talks[i].remove();
        }
    }

    let stageListBody = document.getElementsByClassName('stageListBody')[0];

    for (let i = 0; i < filteredTalks.length; i++) {
        stageListBody.append(filteredTalks[i]);
    }
}

async function requestPalestraStage(abort = false) {
    let detailCloseBtn = document.getElementById(`detailCloseButtonA`);
    detailCloseBtn.addEventListener('click', function () {
        let thumbContainer = document.getElementById('thumbContainer');
        let count = thumbContainer.children.length;

        for (let i = 0; i < count;) {
            thumbContainer.children[0].remove();
        }

        watchBtn.removeEventListener('click', HallUi.prototype.toWatchTalk);
    });

    if (abort)
        abortFetching();

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

    let request = new Request(`${baseApi}/palestra/GetAll/`, myInit)

    let response = await fetch(request)
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                console.log('Fail');
            }
        });
    //console.log(response);

    if (response) {
        //console.log('response not null');
        talks = new Array(response.length);
        for (let i = 0; i < response.length; i++) {
            talks[i] = await createPalestraStageElement(
                i,
                response[i]
            );
        }
    } else {
        console.log('response null');
    }

    talksFromServer = response;
    //console.log(talks);
    //unlockFilterButtons('listFiltersContainer');
}

async function createPalestraStageElement(i, response) {
    watchBtn = document.getElementsByName(`assistirBtn`)[0];
    let listBody = document.getElementsByClassName('stageListBody')[0];

    let listElement = document.createElement("div");
    listElement.id = `${response.Nome} A`;
    listElement.classList.add('stageListElement');
    listBody.appendChild(listElement);

    let listElementContent = document.createElement("div");
    listElementContent.classList.add('listElementContent');
    listElementContent.classList.add('stageText');
    listElement.appendChild(listElementContent);

    //LeftSide
    let leftSide = document.createElement("div");
    leftSide.classList.add('leftSide');
    listElementContent.appendChild(leftSide);

    let eventHour = document.createElement("span");
    eventHour.classList.add('eventHour');
    eventHour.innerHTML = talkTime(response.dtInicio, response.dtFim);
    leftSide.appendChild(eventHour);

    let eventTitle = document.createElement("span");
    eventTitle.classList.add('eventTitle');
    eventTitle.innerHTML = `${response.Nome}`;
    leftSide.appendChild(eventTitle);

    let pLabel;
    if (response.idsPalestrantes[0] != "8c8cfd038d1a2aa803e8cb03") {
        let palestranteList = new Array();
        
        if (response.idsPalestrantes.length > 0) {
            palestranteList = await createPalestrantesList(response.idsPalestrantes);

            pLabel = formatPalestrantesName(palestranteList)
        }

        let eventSpeaker = document.createElement("span");
        eventSpeaker.classList.add('eventSpeaker');
        eventSpeaker.innerHTML = pLabel;
        leftSide.appendChild(eventSpeaker);
    }


    let eventStage = document.createElement("span");
    eventStage.classList.add('eventSpeaker');
    eventStage.innerHTML = `${response.nomeAuditorio}`;
    leftSide.appendChild(eventStage);

    //RightSide
    let rightSide = document.createElement("div");
    rightSide.classList.add('rightSide');
    listElementContent.appendChild(rightSide);

    let toTalk = document.createElement("span");
    toTalk.classList.add('stageText');
    toTalk.innerHTML = 'Assistir';
    rightSide.appendChild(toTalk);

    let icon = document.createElement("img");
    icon.classList.add('listIconWhite');
    icon.src = '../extraIcons/entrarWhite.svg';
    rightSide.appendChild(icon);

    let separator = document.createElement("div");
    separator.classList.add('separator');
    listElement.appendChild(separator);

    listElement.addEventListener('click', async function () {
        talkData = response;
        //console.log(talkData);

        let hourInit = {
            method: 'POST',
            mode: 'cors'
        };

        //console.log('requisoção de hora');
        let hourRequest = new Request('http://147.182.210.54:5001/v1/ferramentas/getdate', hourInit);
        let utcHour = await fetch(hourRequest)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    console.log('Fail');
                }
            });

        //console.log(utcHour)

        let videoDetailBg = document.getElementById(`videoDetailBgA`);
        videoDetailBg.classList.add('bg-active');

        let thumbContainer = document.getElementById('thumbContainer');

        for (let i = 0; i < response.idsPalestrantes.length; i++) {
            let usePhoto = false;
            if (usePhoto) {
                let videoThumb = document.createElement('img');
                videoThumb.classList.add('videoThumbnail');
                videoThumb.src = `${palestrante.foto.Caminho}`;
                thumbContainer.append(videoThumb);
            }
        }

        let videoDetailCloseButtonH = document.getElementById('detailCloseButtonA');
        videoDetailCloseButtonH.addEventListener('click', function () {
            watchBtn.id = 'assitirH';
        });

        document.getElementsByClassName('videoTitle')[0].innerHTML = `${response.Nome}`;
        document.getElementsByClassName('videoHour')[0].innerHTML = talkTime(response.dtInicio, response.dtFim);
        if (response.idsPalestrantes[0] == "8c8cfd038d1a2aa803e8cb03") {
            document.getElementsByClassName('lectureSpeaker')[0].innerHTML = '';
        } else {
            document.getElementsByClassName('lectureSpeaker')[0].innerHTML = pLabel;
        }
        document.getElementsByClassName('synopsisText')[0].innerHTML = `${response.descricao}`;

        //console.log(utcHour);
        let talkActive = calculateTalkActive(utcHour, response.dtInicio);
        isCurrentTalkLate = calculateTalkLate(utcHour, response.dtFim);
        //console.log(talkActive);

        if (talkActive) {
            watchBtn.id += `: ${listElement.id}`;
            watchBtn.classList.add('redBtnBack');
            watchBtn.classList.remove('videoButtonDisabled');
            watchBtn.children[0].innerHTML = 'Assista à palestra';
            watchBtn.children[1].classList.add('redBtnIcon');
            watchBtn.children[1].classList.remove('videoButtonIconDisabled');
            watchBtn.addEventListener('click', window.location.href = '../auditorios/palestra/palestra.html');
        } else {
            watchBtn.classList.remove('redBtnBack');
            watchBtn.classList.add('videoButtonDisabled');
            watchBtn.children[0].innerHTML = 'Assista em breve';
            watchBtn.children[1].classList.remove('redBtnIcon');
            watchBtn.children[1].classList.add('videoButtonIconDisabled');
            //watchBtn.removeEventListener('click', HallUi.prototype.toWatchTalk);
        }
    });

    return listElement;
}

function openChat() {
    let chatFrame = document.getElementById('chat');
    chatFrame.classList.add('chatFrameActive');

    let closeChatBtn = document.getElementById('closeChat');
    closeChatBtn.classList.add('closeChatBtnActive');
}

function closeChat(elem) {
    let chatFrame = document.getElementById('chat');
    chatFrame.classList.remove('chatFrameActive');

    elem.classList.remove('closeChatBtnActive');
}


//Utils

function abortFetching() {
    //console.log('Now aborting');
    // Abort.
    controller.abort()
}

function unlockFilterButtons(filterContainerId) {
    let filterButtons = document.getElementById(filterContainerId);

    for (let i = 0; i < filterButtons.children.length; i++) {
        filterButtons.children[i].classList.remove('filterButtonLocked');
    }

    filterButtons.children[0].classList.add('filterSelected');
}

async function createPalestrantesList(idsList) {
    let list = new Array()
    //console.log('response.idsPalestrantes.length > 1');
    for (let j = 0; j < idsList.length; j++) {
        //console.log('req ' + j);
        let p = await requestPalestrante(idsList[j]);
        //console.log(p);
        list.push(p);
        //console.log(list);
    }

    //console.log(list);
    return list;
}

function formatPalestrantesName(palestrantes) {
    let palestrantesLabel = 'com ';

    for (let i = 0; i < palestrantes.length; i++) {
        if (i == 0) {
            //Do nothing
        } else if (i == palestrantes.length - 1) {
            palestrantesLabel += ' e ';
        } else if (i > 0) {
            palestrantesLabel += ', ';
        }

        palestrantesLabel += palestrantes[i].nome;
        //console.log(palestrantesLabel);
    }

    return palestrantesLabel;
}

function formatDate(targetDate) {
    let date = new Date(targetDate);
    let hour = `${date.getHours()}h`;
    let minute = date.getMinutes() == 0 ? '' : date.getMinutes() < 10 ? `0${date.getMinutes()}min` : `${date.getMinutes()}min`;
    let labelHour = `${hour}${minute}`;
    return labelHour;

}

function talkTime(startTime, endTime) {
    let st = new Date(startTime);
    //console.log(st);
    //console.log(st.getDate());
    //console.log(st.getMonth());
    let day = `${st.getDate() < 10 ? '0' + st.getDate() : st.getDate()}/${st.getMonth() + 1}`;
    return `Dia ${day} de ${formatDate(startTime)} às ${formatDate(endTime)}`;
}

function calculateTalkActive(utcHour, talkStartHour) {
    let utc = new Date(utcHour);
    let talk = new Date(talkStartHour);
    //console.log(`${utc} > ${talkHour}: ${utc.getTime() > talk.getTime()}`)
    let active = utc.getTime() - (3 * 60 * 60 * 1000) > talk.getTime() - 15 * 60 * 1000;
    //console.log(`${utc.getTime() - (3 * 60 * 60 * 1000)} ${talk.getTime()} - ${utc.getTime() - (3 * 60 * 60 * 1000) > talk.getTime()}`)
    return active;
}

function calculateTalkLate(utcHour, talkEndHour) {
    let utc = new Date(utcHour);
    let talk = new Date(talkEndHour);
    //console.log(`${utc} > ${talkHour}: ${utc.getTime() > talk.getTime()}`)
    let active = utc.getTime() > (talk.getTime() + (24 * 60 * 60000));
    //console.log('talk is late');
    return active;
}

function change(value) {
    console.log(value);
}

function help() {
    var ajudaContainer = document.getElementById('ajudaContainer');
    ajudaContainer.classList.add('ajudaContainerActive');
    
    var menuajuda = document.getElementById('menuajuda');
    menuajuda.classList.add('ajudaActive');
};
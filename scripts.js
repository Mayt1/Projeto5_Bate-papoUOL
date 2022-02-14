let username;
registerUsername();

function registerUsername() {
    username = { name: prompt('Qual o seu nome?') };
    let promiseUsername = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', username);
    promiseUsername.then(sucess);
    promiseUsername.catch(error);
}

function sucess() {
    console.log('Tudo certo');
}

function error(erro) {
    let statusCode = erro.response.status;
    console.log(statusCode);
    if (statusCode == 400) {
        registerUsername();
    }
}

function maintainConection() {
    let promiseConection = axios.post('https://mock-api.driven.com.br/api/v4/uol/status', username);
    promiseConection.then(sucess);
    promiseConection.catch(error);
    console.log('Tudo certo coneccao');
}

setInterval(maintainConection, 5000);
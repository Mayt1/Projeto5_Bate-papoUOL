let username;
let logMessage = [];
registerUsername();

function registerUsername() {
    username = { name: prompt('Qual o seu nome?') };
    let promisseUsername = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', username);
    promisseUsername.then(sucess);
    promisseUsername.catch(error);
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
    let promisseConection = axios.post('https://mock-api.driven.com.br/api/v4/uol/status', username);
    promisseConection.then(sucess);
    promisseConection.catch(error);
    console.log('Tudo certo coneccao');
}

setInterval(maintainConection, 5000);

function sendMessage() {
    let message = messageArea.value;
    if (message === "") {
        return;
    }
    let newObjetcMessage = { from: username.name, to: "Todos", text: message, type: 'message' };
    let promisseObjetc = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages", newObjetcMessage);
    messageArea.value = "";
    promisseObjetc.then(sucess);
    promisseObjetc.catch(error);

}

function pressSendMessage() {
    let messageArea = document.querySelector("#messageArea"); //pelo id
    messageArea.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    })
}

pressSendMessage()

setInterval(searchMessage, 3000);

function searchMessage() {
    const promisseSearch = axios.get(`https://mock-api.driven.com.br/api/v4/uol/messages`);
    promisseSearch.then(response => {
      renderingMessage(response.data);
      focusLastMessage();
    });
    promisseSearch.catch( erro => {
      alert("Erro na hora de receber menssages!");
    })
  }

//==============================================
function renderingMessage(messages) {
    const ul = document.querySelector("main ul");
    ul.innerHTML = "";
  
    messages.forEach( message => {
      const type = message.type;
      const from = message.from;
      const to = message.to;
      const time = message.time;
      const text = message.text;
  
      let messageHTML = null;
      if(type === "status") {
        messageHTML = `
        <li class="message status data-identifier="message"">
          <span class="time">(${time})</span>
          <span class="person"><b>${from}</b></span>
          <span class="text">${text}</span>
        </li>
        `
      } else {
        if(type === "message") {
          messageHTML = `
          <li class="message public data-identifier="message"">
          <span class="time">(${time})</span>
            <span class="person"><b>${from}</b> para <b>${to}</b>: </span>
            <span class="text">${text}</span>
          </li>
          `;
        } else {
          
          if(from === username || to === username){
            messageHTML = `
            <li class="message private data-identifier="message"">
            <span class="time">(${time})</span>
              <span class="person"><b>${from}</b> reservadamente para <b>${to}</b>: </span>
              <span class="text">${text}</span>
            </li>
            `;
          }
        }
      }
  
      if(messageHTML !== null) {
        ul.innerHTML += messageHTML;
      }
    })
  }
  
  function focusLastMessage() {
    const ul = document.querySelector("main ul");
    const ultimamessage = ul.lastElementChild;
    ultimamessage.scrollIntoView();
  }


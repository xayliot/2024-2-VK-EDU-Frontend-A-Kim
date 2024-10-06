import './index.css';
const form = document.querySelector('form');
const input = document.querySelector('.form-input');
const messageDiv = document.querySelector('.messages');

const name = 'user';

form.addEventListener('submit', this.handleSubmit.bind(this));
form.addEventListener('keypress', this.handleKeyPress.bind(this));

function handleSubmit (event) {
    event.preventDefault();
    const messageText = input.value.trim();
    //localStorage.clear();
    if (messageText){
        const message = {
            text: messageText,
            sender: name,
            time: new Date().toString()
        }
        saveMessagesToLocalstorage(message);
        input.value = '';
        displayMessages();
        scrollToBottom();
    }

}

function handleKeyPress (event) {
    if (event.keyCode === 13) {
        form.dispatchEvent(new Event('submit'));
    }
}


function saveMessagesToLocalstorage (message){
    const messages = getMessagesFromLocalstorage();
    messages.push(message);
    localStorage.setItem('messages', JSON.stringify(messages));
}

function getMessagesFromLocalstorage (){
    const storedMessages = localStorage.getItem('messages');
    return storedMessages ? JSON.parse(storedMessages) : [];
}

function displayMessages() {
    const messages = getMessagesFromLocalstorage();
    

    if (messages.length === 0) {
        return;
    }

    const existingMessages = messageDiv.querySelectorAll('.message-item');


    if (existingMessages.length < messages.length) {
        const newMessages = messages.slice(existingMessages.length); 
        newMessages.forEach((message) => {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message-item');
            messageElement.innerHTML = `
                <strong>${message.sender}</strong> <em>(${new Date(message.time).toLocaleString()})</em><br>
                ${message.text}
            `;
            messageDiv.appendChild(messageElement);
        });
    }
}

function scrollToBottom() {
    messageDiv.scrollTop = messageDiv.scrollHeight;
}
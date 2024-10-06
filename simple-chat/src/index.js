
const form = document.querySelector('form');
const input = document.querySelector('.form-input');
const messageDiv = document.querySelector('.messages');
const swapbtn = document.getElementById('change_user');

let currentUser  = 'user';
document.querySelector('.username').textContent = currentUser;
swapbtn.textContent = currentUser;
form.addEventListener('submit', handleSubmit);
swapbtn.addEventListener('click', swap_users);
displayMessages();
function handleSubmit (event) {
    event.preventDefault();
    const messageText = input.value.trim();
    //localStorage.clear();
    if (messageText){
        const message = {
            text: messageText,
            sender: currentUser ,
            time: new Date().toString()
        }
        saveMessagesToLocalstorage(message);
        input.value = '';
        displayMessages();
        scrollToBottom();
    }

}

function swap_users (){
    currentUser  = currentUser  === 'user' ? 'user2' : 'user'; 
    document.querySelector('.username').textContent = currentUser;
    swapbtn.textContent = currentUser;
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
            if (message.sender === 'user') {
                messageElement.classList.add('user');
            } else {
                messageElement.classList.add('user2');
            }
            messageElement.innerHTML = `
                <strong>${message.sender}</strong> <em>${new Date(message.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})}</em><br>
                ${message.text}
            `;
            messageDiv.appendChild(messageElement);
        });
    }
}

function scrollToBottom() {
    messageDiv.scrollTop = messageDiv.scrollHeight;
}
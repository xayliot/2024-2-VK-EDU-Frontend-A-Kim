const form = document.querySelector('form');
const input = document.querySelector('.form-input');
const messageDiv = document.querySelector('.messages');
const swapbtn = document.getElementById('change_user');

let currentUser = 'user';
document.querySelector('.username').textContent = currentUser;
swapbtn.textContent = currentUser;

const chatId = localStorage.getItem('chatId');
console.log(chatId);
if (chatId) {
    displayMessages(chatId);
} else {
    console.log("chatId не найден");
}

form.addEventListener('submit', handleSubmit);
swapbtn.addEventListener('click', swapUsers);

function handleSubmit(event) {
    event.preventDefault();
    const messageText = input.value.trim();

    if (messageText) {
        const message = {
            text: messageText,
            sender: currentUser,
            time: new Date().toISOString()
        };

        saveMessagesToLocalStorage(chatId, message);
        input.value = '';
        displayMessages(chatId);
        scrollToBottom();
    }
}

function swapUsers() {
    currentUser = currentUser === 'user' ? 'user2' : 'user';
    document.querySelector('.username').textContent = currentUser;
    swapbtn.textContent = currentUser;
}

function saveMessagesToLocalStorage(chatId, message) {
    const chats = getMessagesFromLocalStorage();

   
    if (!chats[chatId]) {
        chats[chatId] = { 
            id: chatId, 
            name: `Чат ${chatId}`, 
            participants: ['user', 'user2'], 
            messages: [] 
        };
    }

    chats[chatId].messages.push(message);
    localStorage.setItem('chats', JSON.stringify(chats)); 
}

function getMessagesFromLocalStorage() {
    const storedChats = localStorage.getItem('chats');
    console.log('Сохраненные чаты:', storedChats); 
    return storedChats ? JSON.parse(storedChats) : {};
}

function displayMessages(chatId) {
    const chats = getMessagesFromLocalStorage();
    const messages = chats[chatId] ? chats[chatId].messages : [];

    messageDiv.innerHTML = '';

    if (messages.length === 0) {
        return; 
    }

    messages.forEach((message) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message-item', message.sender === 'user' ? 'user' : 'user2');

        messageElement.innerHTML = `
            <strong>${message.sender}</strong> <em>${new Date(message.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})}</em><br>
            ${message.text}
        `;
        messageDiv.appendChild(messageElement);
    });

    scrollToBottom();
}

function scrollToBottom() {
    messageDiv.scrollTop = messageDiv.scrollHeight;
}

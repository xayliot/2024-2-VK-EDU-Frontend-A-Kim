document.addEventListener('DOMContentLoaded', () => {
    const createButton = document.querySelector('.div-create-button button');
    const chatModal = document.getElementById('chat-modal');
    const closeModal = document.getElementById('close-modal');
    const createChatButton = document.getElementById('create-chat');
    const chatNameInput = document.getElementById('chat-name');
    const participantNameInput = document.getElementById('participant-name');
    const chatImageInput = document.getElementById('chat-image');
    const chatsContainer = document.querySelector('.chats');


    displayAllChats();
    //localStorage.clear();
    createButton.addEventListener('click', () => {
        chatModal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        chatModal.style.display = 'none';
    });

    createChatButton.addEventListener('click', () => {
        const chatName = chatNameInput.value.trim();
        const participantName = participantNameInput.value.trim();
        const chatImage = chatImageInput.value.trim();

        if (chatName && participantName && chatImage) {
            const chatId = Date.now().toString(); 
            const chatData = {
                id: chatId,
                name: chatName, 
                participants: [participantName],
                image: chatImage, 
                messages: []
            };

            const chats = getChatsFromLocalStorage();
            chats[chatId] = chatData; 
            localStorage.setItem('chats', JSON.stringify(chats));


            addChatToUI(chatData); 
            chatModal.style.display = 'none';
            clearModalInputs();
        }
    });

    function addChatToUI(chatData) {
        const chatElement = document.createElement('div');
        chatElement.classList.add('chat');
    
        const lastMessage = chatData.messages.length > 0 
            ? chatData.messages[chatData.messages.length - 1].text 
            : 'Нет сообщений'; 
    
        chatElement.innerHTML = `
        <div class="div-chat-img">
            <img class="chat-img" src="${chatData.image}" alt="${chatData.name}">
            </div>
            <div class="name-content">
                <div class="name">${chatData.name}</div>
                <div class="lasttext">${lastMessage}</div>
            </div>
        `;
    
        chatElement.addEventListener('click', () => {
            localStorage.setItem('chatId', chatData.id);
            window.location.href = `/simple-chat/src/index.html?id=${chatData.id}`;
        });
    
        chatsContainer.appendChild(chatElement);
    }
    
    
    function clearModalInputs() {
        chatNameInput.value = '';
        participantNameInput.value = '';
        chatImageInput.value = '';
    }

    function displayAllChats() {
        const chats = getChatsFromLocalStorage();

        if (Object.keys(chats).length === 0) {
            console.log("Нет чатов"); 
        } else {
            chatsContainer.innerHTML = '';
            Object.keys(chats).forEach(chatId => {
                const chat = chats[chatId];
                addChatToUI(chat);
            });
        }
    }

    function getChatsFromLocalStorage() {
        const storedChats = localStorage.getItem('chats');
        return storedChats ? JSON.parse(storedChats) : {}; 
    }
});
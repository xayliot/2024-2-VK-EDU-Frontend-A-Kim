import React from 'react';
import './ChatItem.scss';

const ChatItem = ({ chat, onSelectChat }) => {
    const lastMessage = chat.messages.length > 0 
        ? chat.messages[chat.messages.length - 1].text 
        : 'Нет сообщений';

    return (
        <div className="chat-item" onClick={() => onSelectChat(chat.id)}>
            <div className="div-chat-img">
                <img className="chat-img" src={chat.image} alt={chat.name} />
            </div>
            <div className="name-content">
                <div className="name">{chat.name}</div>
                <div className="lasttext">{lastMessage}</div>
            </div>
        </div>
    );
};

export default ChatItem;
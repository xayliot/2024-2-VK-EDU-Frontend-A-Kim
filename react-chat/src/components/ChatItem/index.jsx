import React from 'react';
import './index.scss';

const ChatItem = ({ chat, onSelectChat }) => {
    const lastMessage = chat.messages.length > 0 
        ? chat.messages[chat.messages.length - 1].text 
        : 'Нет сообщений';

    const truncatedMessage = lastMessage.length > 25
        ? lastMessage.substring(0, 25) + '...'
        :lastMessage;

    return (
        <div className="chat-item" onClick={() => onSelectChat(chat.id)}>
            <div className="chat-img-wrap">
                <img className="chat-img" src={chat.image} alt={chat.name} />
            </div>
            <div className="name-content">
                <div className="name">{chat.name}</div>
                <div className="lasttext">{truncatedMessage}</div>
            </div>
        </div>
    );
};

export default ChatItem;
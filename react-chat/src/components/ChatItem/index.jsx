import React from 'react';
import './index.scss';

const ChatItem = ({ chat }) => {
    const lastMessage = chat?.messages && chat.messages.length > 0 
        ? chat.messages[chat.messages.length - 1]?.text || 'Нет сообщений'
        : 'Нет сообщений';

    const truncatedMessage = lastMessage.length > 25
        ? lastMessage.substring(0, 25) + '...'
        : lastMessage;

    return (
        <div className="chat-item">
            <div className="chat-img-wrap">
                {chat?.image ? (
                    <img className="chat-img" src={chat.image} alt={chat.title} />
                ) : (
                    <div className="chat-img-placeholder">Нет изображения</div>
                )}
            </div>
            <div className="name-content">
                <div className="name">{chat?.title || 'Без названия'}</div>
                <div className="lasttext">{truncatedMessage}</div>
            </div>
        </div>
    );
};

export default ChatItem;
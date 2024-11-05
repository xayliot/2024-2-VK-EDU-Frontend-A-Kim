import React from 'react';
import ChatItem from '../ChatItem/index';
import './index.scss';  

const ChatList = ({ chats, onSelectChat }) => {
    return (
        <div className="chat-list">
            {Object.keys(chats).length === 0 ? (
                <div>Нет чатов</div>
            ) : (
                Object.keys(chats).map(chatId => (
                    <ChatItem 
                        key={chatId} 
                        chat={chats[chatId]} 
                        onSelectChat={onSelectChat} 
                    />
                ))
            )}
        </div>
    );
};

export default ChatList;
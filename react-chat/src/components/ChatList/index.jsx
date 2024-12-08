import React from 'react';
import ChatItem from '../ChatItem/index';
import './index.scss';
import { Link } from 'react-router-dom';  

const ChatList = ({ chats }) => {
    const chatKeys = chats ? Object.keys(chats) : [];

    return (
        <div className="chat-list">
            {chatKeys.length === 0 ? (
                <div>Нет чатов</div>
            ) : (
                chatKeys.map(chatId => (
                    <Link to={`/chats/${chatId}`} key={chatId} className='chat-link'>
                        <ChatItem  
                            chat={chats[chatId]} 
                        />
                    </Link>
                ))
            )}
        </div>
    );
};

export default ChatList;
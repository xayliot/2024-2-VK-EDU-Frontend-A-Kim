import React from 'react';
import ChatItem from '../ChatItem/index';
import './index.scss';
import { Link } from 'react-router-dom';  

const ChatList = ({ chats }) => {
    return (
        <div className="chat-list">
            {Object.keys(chats).length === 0 ? (
                <div>Нет чатов</div>
            ) : (
                Object.keys(chats).map(chatId => (
                    <Link to={`/chat/${chatId}`} key={chatId} className='chat-link'>
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
import React from 'react';
import ChatItem from '../ChatItem/index';
import './index.scss';
import { Link } from 'react-router-dom';

const ChatList = ({ chats }) => {
    return (
        <div className="chat-list">
            {chats.length === 0 ? (
                <div>Нет чатов</div>
            ) : (
                chats.map(chat => (
                    <Link to={`/chats/${chat.id}`} key={chat.id} className='chat-link'>
                        <ChatItem chat={chat} />
                    </Link>
                ))
            )}
        </div>
    );
};

export default ChatList;
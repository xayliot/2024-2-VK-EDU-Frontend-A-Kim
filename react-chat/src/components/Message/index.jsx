import React from 'react';
import './index.scss';
import { useAuth } from '../../AuthContext';

const Message = ({ message }) => {

    const { user } = useAuth();
    return (
        <div className={`message ${message.sender.id === user.id ? 'user2' : 'user1'}`} tabIndex="-1">
            <div className="message-text">{message.text}</div>
            <span>
                <span className='invisible'>{new Date(message.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})}</span>
                <div className='timestamp'>{new Date(message.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})}</div>
            </span>
        </div>
    );
};

export default Message;
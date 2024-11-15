import React from 'react';
import './index.scss';

const Message = ({ message }) => {
    return (
        <div className={`message ${message.sender === 'me' ? 'user2' : 'me'}`} tabIndex="-1">
            <div className="message-text">{message.text}</div>
            <span>
                <span className='invisible'>{new Date(message.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})}</span>
                <div className='timestamp'>{new Date(message.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})}</div>
            </span>
        </div>
    );
};

export default Message;
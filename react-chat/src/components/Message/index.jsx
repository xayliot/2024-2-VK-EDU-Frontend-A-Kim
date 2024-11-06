import React from 'react';
import './index.scss';

const Message = ({ message }) => {
    return (
        <div className={`message ${message.sender === 'me' ? 'user2' : 'me'}`} tabIndex="-1">
            <strong className='message-name'>{message.sender}</strong> <em className='timestamp'>{new Date(message.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})}</em>
            <div className="message-text">{message.text}</div>
        </div>
    );
};

export default Message;
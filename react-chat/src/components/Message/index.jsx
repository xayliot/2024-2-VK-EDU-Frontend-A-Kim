import React from 'react';
import './index.scss';

const Message = ({ message }) => {
    return (
        <div className={`message ${message.sender === 'me' ? 'user2' : 'me'}`} tabIndex="-1">
            <strong>{message.sender}</strong> <em className='timestamp'>{new Date(message.time).toLocaleTimeString()}</em>
            <div className="message-text">{message.text}</div>
        </div>
    );
};

export default Message;
import React from 'react';
import './Message.scss';

const Message = ({ message }) => {
    return (
        <div className={`message ${message.sender === 'me' ? 'user2' : 'me'}`}>
            <strong>{message.sender}</strong> <em className='timestamp'>{new Date(message.time).toLocaleTimeString()}</em>
            <div className="message-text">{message.text}</div>
        </div>
    );
};

export default Message;
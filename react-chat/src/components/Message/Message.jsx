import React from 'react';

const Message = ({ message }) => {
    return (
        <div className={`message ${message.sender === 'me' ? 'sent' : 'received'}`}>
            <strong>{message.sender}</strong> <em className='timestamp'>{new Date(message.time).toLocaleTimeString()}</em>
            <div className="message-text">{message.text}</div>
        </div>
    );
};

export default Message;
import React from 'react';
import Message from '../Message';

const MessageList = ({ messages }) => {
    return (
        <div className="message-list">
            {messages.length === 0 ? (
                <div>Нет сообщений</div>
            ) : (
                messages.map((message, index) => (
                    <Message key={index} message={message} />
                ))
            )}
        </div>
    );
};

export default MessageList;
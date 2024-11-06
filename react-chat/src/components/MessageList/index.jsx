import React, { useEffect, useRef } from 'react';
import Message from '../Message/index';
import './index.scss';

const MessageList = ({ messages, newMessage }) => {
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (newMessage && messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [newMessage, messages]); 

    return (
        <div className="message-list">
            {messages.length === 0 ? (
                <div>Нет сообщений</div>
            ) : (
                messages.map((message, index) => (
                    <Message key={index} message={message} />
                ))
            )}
            <div ref={messagesEndRef} />
        </div>
    );
};

export default MessageList;
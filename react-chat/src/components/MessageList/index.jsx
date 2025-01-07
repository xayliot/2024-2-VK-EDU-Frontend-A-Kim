import React, { useEffect, useRef } from 'react';
import Message from '../Message/index';
import LazyImage from '../LazyImage';
import './index.scss';

const MessageList = ({ messages, newMessage }) => {
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (messagesEndRef.current && messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [ newMessage]); 

    return (
        <div className="message-list">
            {messages.length === 0 ? (
                <div>Нет сообщений</div>
            ) : (
                messages.slice().reverse().map((message) => (
                    <div key={message.id} className="message-container">
                        <Message message={message} />
                        {message.image && (
                            <LazyImage 
                                src={message.image} 
                                alt="Прикрепленное изображение" 
                            />
                        )}
                    </div>
                ))
            )}
            <div ref={messagesEndRef} /> 
        </div>
    );
};

export default MessageList;
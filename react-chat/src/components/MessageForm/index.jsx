import React, { useState } from 'react';
import './index.scss';
const MessageForm = ({ onSendMessage }) => {
    const [messageText, setMessageText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (messageText.trim()) {
            onSendMessage(messageText);
            setMessageText('');
        }
    };

    return (
        <form className="message-form" onSubmit={handleSubmit} >
            <input
                type="text"
                className="form-input"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Введите сообщение"
                required
            />
            <button type="submit">Отправить</button>
        </form>
    );
};

export default MessageForm;
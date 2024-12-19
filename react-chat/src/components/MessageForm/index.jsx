import React, { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import './index.scss';

const MessageForm = ({ onSendMessage }) => {
    const [messageText, setMessageText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (messageText.trim()) {
            console.log(messageText);
            onSendMessage({ text: messageText, voice: null, files: [] });
            setMessageText('');
        }
    };

    return (
        <form className="message-form" onSubmit={handleSubmit}>
            <input
                type="text"
                className="form-input"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Введите сообщение"
                required
            />
            <button type="submit" id='send'><SendIcon /></button>
        </form>
    );
};

export default MessageForm;
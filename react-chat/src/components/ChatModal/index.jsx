import React, { useState } from 'react';
import './index.scss'; 

const ChatModal = ({ onClose, onCreateChat }) => {
    const [chatName, setChatName] = useState('');
    const [participants, setParticipants] = useState('');
    const [image, setImage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const newChatData = {
            name: chatName,
            participants: participants.split(',').map(p => p.trim()), 
            image: image,
            messages: [],
        };

        onCreateChat(newChatData);
        resetForm();
    };

    const resetForm = () => {
        setChatName('');
        setParticipants('');
        setImage('');
        onClose();
    };

    return (
        <div className="chat-modal-overlay" >
            <div className="chat-modal">
                <h2>Создать новый чат</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="chat-name">Имя чата</label>
                        <input
                            type="text"
                            id="chat-name"
                            value={chatName}
                            onChange={(e) => setChatName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="participants">Участники (через запятую)</label>
                        <input
                            type="text"
                            id="participants"
                            value={participants}
                            onChange={(e) => setParticipants(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="chat-image">Ссылка на изображение</label>
                        <input
                            type="text"
                            id="chat-image"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />
                    </div>
                    <div className="modal-actions">
                        <button type="button" onClick={resetForm}>Отмена</button>
                        <button type="submit">Создать чат</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChatModal;
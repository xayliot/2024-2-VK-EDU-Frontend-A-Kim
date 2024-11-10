import React, { useState, useRef, useEffect } from 'react';
import './index.scss'; 

const ChatModal = ({ onClose, onCreateChat }) => {
    const [chatName, setChatName] = useState('');
    const [participants, setParticipants] = useState('');
    const [image, setImage] = useState('');
    const chatNameInputRef = useRef(null);


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

    useEffect (() =>{
        if (chatNameInputRef.current) {
            chatNameInputRef.current.focus();
        }
    }, []);

    return (
        <div>
            <h2>Создать новый чат</h2>
            <form className='form-wraper' onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        placeholder='Название'
                        type="text"
                        id="chat-name"
                        ref={chatNameInputRef}
                        value={chatName}
                        onChange={(e) => setChatName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        placeholder='Участник'
                        type="text"
                        id="participants"
                        value={participants}
                        onChange={(e) => setParticipants(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        placeholder='Ссылка на изображение'
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
    );
};

export default ChatModal;
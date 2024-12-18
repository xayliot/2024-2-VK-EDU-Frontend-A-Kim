import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './index.scss';


const ChatModal = ({ onClose, onCreateChat }) => {
    const [chatName, setChatName] = useState('');
    const [selectedParticipants, setSelectedParticipants] = useState([]);
    const [image, setImage] = useState(null);
    const [users, setUsers] = useState([]);
    const [isPrivate, setIsPrivate] = useState(false);
    const chatNameInputRef = useRef(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                const response = await axios.get('https://vkedu-fullstack-div2.ru/api/users/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                    params: {
                        page_size: 1000
                    },
                });
                setUsers(response.data.results);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUsers();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (selectedParticipants.length === 0) {
            alert('Пожалуйста, выберите хотя бы одного участника.');
            return;
        }

        const newChatData = {
            members: selectedParticipants.map(participant => (participant.id)),
            title: chatName,
            avatar: image || null,  
            is_private: isPrivate,

        };

        onCreateChat(newChatData);
        resetForm();
    };

    const resetForm = () => {
        setChatName('');
        setSelectedParticipants([]);
        setImage(null);
        setIsPrivate(false);
        onClose();
    };

    const handleUserSelect = (user) => {
        if (selectedParticipants.some(participant => participant.id === user.id)) {
            setSelectedParticipants(selectedParticipants.filter(participant => participant.id !== user.id));
        } else {
            setSelectedParticipants([...selectedParticipants, user]);
        }
    };

    useEffect(() => {
        if (chatNameInputRef.current) {
            chatNameInputRef.current.focus();
        }
    }, []);

    return (
        <div>
            <h2>Создать новый чат</h2>
            <form className='form-wrapper' onSubmit={handleSubmit}>
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
                    <label>Выберите участников:</label>
                    <ul className="user-list">
                        {users.map(user => (
                            <li 
                                key={user.id} 
                                onClick={() => handleUserSelect(user)} 
                                style={{ cursor: 'pointer', backgroundColor: selectedParticipants.some(participant => participant.id === user.id) ? '#d3d3d3' : 'transparent' }}
                            >
                                {user.username}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="privacy">
                    <label>Чат приватный:</label>
                    <div>
                        <label>
                            <input 
                                type="radio" 
                                value="false" 
                                checked={!isPrivate} 
                                onChange={() => setIsPrivate(false)} 
                            />
                            Public
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                value="true" 
                                checked={isPrivate} 
                                onChange={() => setIsPrivate(true)} 
                            />
                            Private
                        </label>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="chat-image">Выберите изображение:</label>
                    <input
                        type="file"
                        id="chat-image"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
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
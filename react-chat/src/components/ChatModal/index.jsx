import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './index.scss'; 

const ChatModal = ({ onClose, onCreateChat }) => {
    const [chatName, setChatName] = useState('');
    const [participant, setParticipant] = useState(null);
    const [image, setImage] = useState('');
    const [users, setUsers] =useState([]);
    const chatNameInputRef = useRef(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                const response = await axios.get('https://vkedu-fullstack-div2.ru/api/users/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    }
                });
                setUsers(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUsers();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newChatData = {
            id: Date.now(),
            name: chatName,
            participants: [participant], 
            image: image,
            messages: [],
        };

        onCreateChat(newChatData);
        resetForm();
    };

    const resetForm = () => {
        setChatName('');
        setParticipant(null);
        setImage('');
        onClose();
    };

    const handleUserSelect = (user) => {
        setParticipant(user);
    }

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
                    <label>Выберите участника:</label>
                    <ul className="user-list">
                        {users.map(user => (
                            <li key={user.id} onClick={() => handleUserSelect(user)}>
                                {user.username}
                            </li>
                        ))}
                    </ul>
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
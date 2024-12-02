import React, { useState, useEffect, useRef } from 'react';
import {useNavigate} from 'react-router-dom';
import ChatList from '../../components/ChatList/index';
import ChatModal from '../../components/ChatModal/index';
import CreateButton from '../../components/CreateButton/index';
import { ChatListHeader } from '../../components/Header/index';
import axios from 'axios';
import './index.scss';

const PageChatList = () => {
    const [chats, setChats] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalRef = useRef(null);
    const navigate = useNavigate();
    
    const handleSelectedChat = (chatId) => {
        navigate(`/chat/${chatId}`);
    };

    const handlePageEdit = () => {
        navigate(`/Profile`);
    };

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                const response = await axios.get('https://vkedu-fullstack-div2.ru/api/chats', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    }
                });
                setChats(response.data);
            } catch (error) {
                console.error('Ошибка при получении чатов:', error);
            }
        };

        fetchChats();
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        };

        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                closeModal();
            }
        };

        if (isModalOpen) {
            window.addEventListener('keydown', handleKeyDown);
            window.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isModalOpen]);

    const createChat = async (chatData) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axios.post('https://vkedu-fullstack-div2.ru/api/chats',chatData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    }
                });
            setChats((prevChats) => [...prevChats, response.data]);
            closeModal();
        } catch (error) {
            console.error('Ошибка при создании чата:', error);
        }
    };

    return (
        <div className="page-chat-list">
            <ChatListHeader pageEdit={handlePageEdit}/>
            <ChatList 
                chats={chats} 
                onSelectChat={handleSelectedChat} 
            />
            <div className='create-button'>
                <CreateButton onClick={openModal} />
            </div>
            
            {isModalOpen && (
                <div className="chat-modal-overlay" onClick={(e) => {
                    if (modalRef.current && !modalRef.current.contains(e.target)) {
                        closeModal();
                    }
                }}>
                    <div className="chat-modal" ref={modalRef}>
                        <ChatModal onClose={closeModal} onCreateChat={createChat} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default PageChatList;
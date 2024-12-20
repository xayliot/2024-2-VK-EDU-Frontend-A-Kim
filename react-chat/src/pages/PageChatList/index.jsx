import React, { useState, useEffect, useRef } from 'react';
import {useNavigate} from 'react-router-dom';
import ChatList from '../../components/ChatList/index';
import ChatModal from '../../components/ChatModal/index';
import CreateButton from '../../components/CreateButton/index';
import { ChatListHeader } from '../../components/Header/index';
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
        const storedChats = localStorage.getItem('chats');
        if (storedChats) {
            setChats(JSON.parse(storedChats));
        }
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

    const createChat = (chatData) => {
        const chatId = Date.now().toString();
        const newChat = {
            id: chatId,
            ...chatData,
            messages: [],
        };

        const newChats = { ...chats, [chatId]: newChat };

        localStorage.setItem('chats', JSON.stringify(newChats));
        setChats(newChats);
        closeModal();
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
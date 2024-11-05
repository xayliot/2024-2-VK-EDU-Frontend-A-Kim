import React, { useState, useEffect } from 'react';
import ChatList from '../../components/ChatList/index';
import ChatModal from '../../components/ChatModal/index';
import CreateButton from '../../components/CreateButton/index';
import {ChatListHeader} from '../../components/Header/index'; 
//import './chats.scss'; 

const PageChatList = ({ onSelectChat }) => { 
    const [chats, setChats] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

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
            <ChatListHeader />
            <ChatList 
                chats={chats} 
                onSelectChat={onSelectChat} 
            />
            <div className='create-button'>
                <CreateButton onClick={openModal} />
            </div>
            
            {isModalOpen && (
                <ChatModal onClose={closeModal} onCreateChat={createChat} />
            )}
        </div>
    );
};

export default PageChatList;
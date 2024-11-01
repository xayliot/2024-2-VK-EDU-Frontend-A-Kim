import React, { useContext, useState } from 'react';
import { ChatContext } from '../ChatContext';
import ChatList from '../../components/ChatList';
import ChatModal from '../../components/ChatModal';
import CreateButton from '../../components/CreateButton';
import './chats.css'; 

const PageChatList = () => {
    const { chats, saveChatsToLocalStorage } = useContext(ChatContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
        saveChatsToLocalStorage(newChats);
        closeModal();
    };

    return (
        <div className="page-chat-list">
            <ChatList 
                chats={chats} 
                onSelectChat={(id) => console.log(`Selected chat: ${id}`)} 
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
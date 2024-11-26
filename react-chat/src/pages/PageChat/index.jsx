import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MessageList from '../../components/MessageList/index';
import MessageForm from '../../components/MessageForm/index';
import { ChatHeader } from '../../components/Header/index';
import './index.scss';

const PageChat = ( ) => {
    const { chatId } = useParams(); 
    const [chat, setChat] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState('me');
    const [companion, setCompanion] = useState('');
    const [newMessage, setNewMessage] = useState(false); 

    useEffect(() => {
        const chats = getMessagesFromLocalStorage();
        const currentChat = chats[chatId];
        if (currentChat) {
            setChat(currentChat);
            setCompanion(currentChat.participants.find(p => p !== currentUser) || 'Собеседник');
        }
        setLoading(false);
    }, [chatId, currentUser]);

    const getMessagesFromLocalStorage = () => {
        const storedChats = localStorage.getItem('chats');
        return storedChats ? JSON.parse(storedChats) : {};
    };

    const handleNewMessage = (messageText) => {
        if (!chat) return;

        const message = {
            text: messageText,
            sender: currentUser, 
            time: new Date().toISOString(),
        };

        const updatedMessages = [...chat.messages, message];
        const updatedChat = { ...chat, messages: updatedMessages };

        const updatedChats = {
            ...getMessagesFromLocalStorage(),
            [chatId]: updatedChat,
        };

        setChat(updatedChat);
        localStorage.setItem('chats', JSON.stringify(updatedChats));

        setNewMessage(true);
        setTimeout(() => setNewMessage(false), 0);
    };

    const swapUser = () => {
        setCurrentUser(prevUser => (prevUser === 'me' ? companion : 'me'));
    };

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (!chat) {
        return <div>Чат не найден.</div>;
    }

    return (
        <div className="page-chat">
            <ChatHeader 
                currentUser={currentUser} 
                companion={companion} 
                avatar={chat.image} 
                onUserSwap={swapUser} 
            />
            <MessageList messages={chat.messages} newMessage={newMessage} />
            <MessageForm onSendMessage={handleNewMessage} />
        </div>
    );
};

export default PageChat;

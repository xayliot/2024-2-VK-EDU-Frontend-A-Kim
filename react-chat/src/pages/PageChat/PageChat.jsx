import React, { useEffect, useState } from 'react';
import MessageList from '../../components/MessageList';
import MessageForm from '../../components/MessageForm';
import ChatHeader from '../../components/ChatHeader';

const PageChat = ({ chatId }) => {
    const [chat, setChat] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState('me');
    const [companion, setCompanion] = useState('');

    useEffect(() => {
        const chats = getMessagesFromLocalStorage();
        const currentChat = chats[chatId];
        if (currentChat) {
            setChat(currentChat);
            setCompanion(currentChat.participants.find(p => p !== currentUser) || 'Собеседник');
        }
        setLoading(false);
    }, [chatId]);

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
    };

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (!chat) {
        return <div>Чат не найден.</div>;
    }

    return (
        <div className="page-chat">
            <ChatHeader currentUser={currentUser} companion={companion} avatar={chat.image} />
            <MessageList messages={chat.messages} />
            <MessageForm onSendMessage={handleNewMessage} />
        </div>
    );
};

export default PageChat;
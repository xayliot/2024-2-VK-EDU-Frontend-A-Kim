import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MessageList from '../../components/MessageList/index';
import MessageForm from '../../components/MessageForm/index';
import { ChatHeader } from '../../components/Header/index';
import axios from 'axios';
import './index.scss';

const PageChat = () => {
    const { chatId } = useParams(); 
    const [chat, setChat] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null); 
    const [companion, setCompanion] = useState('');
    const [newMessage, setNewMessage] = useState(false); 

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                const response = await axios.get('https://vkedu-fullstack-div2.ru/api/user/current/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    }
                });
                setCurrentUser(response.data);
            } catch (error) {
                console.error('Ошибка получения текущего пользователя:', error);
            }
        };

        fetchCurrentUser();
    }, []);

    useEffect(() => {
        const fetchChat = async () => {
            if (!currentUser) return; 

            try {
                const response = await axios.get(`https://vkedu-fullstack-div2.ru/api/chats/${chatId}`);
                const chatData = response.data; 

                setChat(chatData);
                const foundCompanion = chatData.participants.find(p => p.id !== currentUser.id);
                setCompanion(foundCompanion ? foundCompanion : 'Собеседник');
            } catch (error) {
                console.error('Ошибка получения чата:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchChat();
    }, [chatId, currentUser]);

    const handleNewMessage = async (messageText) => {
        if (!chat || !currentUser) return;

        const message = {
            id: Date.now().toString(), 
            text: messageText,
            chat: chatId,
            sender: {
                id: currentUser.id,
                username: currentUser.username, 
                first_name: currentUser.first_name,
                last_name: currentUser.last_name,
                bio: currentUser.bio || null,
                avatar: currentUser.avatar || null,
                last_online_at: new Date().toISOString(),
                is_online: true,
            },
            files: [], 
            was_read_by: [],
            updated_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
        };

        try {
            const response = await axios.post(`https://vkedu-fullstack-div2.ru/api/chats/${chatId}/messages`, message); 
            const updatedChat = {
                ...chat,
                messages: [...chat.messages, response.data], 
            };

            setChat(updatedChat);
            setNewMessage(true);
            setTimeout(() => setNewMessage(false), 0);
        } catch (error) {
            console.error('Ошибка отправки сообщения:', error);
        }
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
            />
            <MessageList messages={chat.messages} newMessage={newMessage} />
            <MessageForm onSendMessage={handleNewMessage} />
        </div>
    );
};

export default PageChat;
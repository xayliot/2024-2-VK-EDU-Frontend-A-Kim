import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MessageList from '../../components/MessageList/index';
import MessageForm from '../../components/MessageForm/index';
import { ChatHeader } from '../../components/Header/index';
import { useAuth } from '../../AuthContext';
import axios from 'axios';
import './index.scss';

const PageChat = () => {
    const { user } = useAuth();
    const { chatId } = useParams(); 
    const [chat, setChat] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null); 
    const [companion, setCompanion] = useState('');
    const [newMessage, setNewMessage] = useState(false); 
   // const [page, setPage] = useState(1); 
   // const [hasMore, setHasMore] = useState(true);
    const pageSize = 20; 

    useEffect(() => {
        setCurrentUser(user);
    }, [user]);


    useEffect(() => {
        const fetchChat = async () => {
            if (!currentUser) return; 

            try {
                const accessToken = localStorage.getItem('accessToken');
                const response = await axios.get('https://vkedu-fullstack-div2.ru/api/messages', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                    params: {
                        chat: chatId, 
                        page_size: pageSize, 
                        page: page, 
                    },
                });

                const chatData = {
                    messages: response.data.results,
                    participants: response.data.participants, 
                };
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

    const handleNewMessage = async (messageData) => {
        if (!chat || !currentUser) return;

        const { text, voice, files } = messageData;

        const message = {
            chat: chatId,
            text: text || null,
            voice: voice || null,
            files: files || null,
            sender: {
                id: currentUser.id,
                username: currentUser.username, 
                first_name: currentUser.first_name,
                last_name: currentUser.last_name,
            },
            created_at: new Date().toISOString(),
        };

        try {
            const accessToken = localStorage.getItem('accessToken');
            const formData = new FormData();
            formData.append('chat', message.chat);
            if (message.text) formData.append('text', message.text);
            if (message.voice) formData.append('voice', message.voice);
            if (message.files) {
                Array.from(message.files).forEach(file => {
                    formData.append('files', file);
                });
            }

            const response = await axios.post(`https://vkedu-fullstack-div2.ru/api/messages/`, formData, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
            });

            setChat(prevChat => ({
                ...prevChat,
                messages: [...prevChat.messages, response.data], 
            }));
            setNewMessage(true);
            setTimeout(() => setNewMessage(false), 3000); 
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
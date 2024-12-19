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
    const [chatMessages, setChatMessages] = useState(null);
    const [chatInfo, setChatInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newMessage, setNewMessage] = useState(false);

    // const [page, setPage] = useState(1);
    // const [hasMore, setHasMore] = useState(true);
     const pageSize = 100;

    useEffect(() => {
        const fetchChatMessages = async () => {
            if (!user) return;

            try {
                const accessToken = localStorage.getItem('accessToken');
                const response = await axios.get(`https://vkedu-fullstack-div2.ru/api/messages/`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },

                    params: {
                         page_size: pageSize,
                    //     page: page,
                        chat: chatId,
                    },
                });
                const chatData = response.data.results;
                setChatMessages(chatData);
                console.log(response.data);
                console.log(chatData);

                // setHasMore(response.data.results.length === pageSize); 
            } catch (error) {
                console.error('Ошибка получения сообщений:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchChat = async () => {
            if (!user) return;

            try {
                const accessToken = localStorage.getItem('accessToken');
                const response = await axios.get(`https://vkedu-fullstack-div2.ru/api/chat/${chatId}/`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    }
                });

                setChatInfo(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Ошибка получения чата:', error);
            }
        };

        fetchChat();
        fetchChatMessages();

    }, [chatId, user]); 


    // const loadMoreMessages = () => {
    //     if (hasMore) {
    //         setPage(prevPage => prevPage + 1);
    //     }
    // };

    const handleNewMessage = async (messageData) => {
        if (!chatMessages || !user) return;

        const { text, voice, files } = messageData;

        const message = {
            chat: chatId,
            text: text || null,
            voice: voice || null,
            files: files || null,
        };

        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axios.post(`https://vkedu-fullstack-div2.ru/api/messages/`, message, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
            });

            setChatMessages(prevChat => [
                ...prevChat,
                response.data.results,
            ]);
            setNewMessage(true);
            setTimeout(() => setNewMessage(false), 3000);
        } catch (error) {
            console.error('Ошибка отправки сообщения:', error);
        }
    };

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (!chatMessages) {
        return <div>Чат не найден.</div>;
    }

    return (
        <div className="page-chat">
            <ChatHeader 
                currentUser={user}
                chatInfo={chatInfo} 
                avatar={chatInfo?.avatar} 
            />
            <MessageList messages={chatMessages} newMessage={newMessage} />
            <MessageForm onSendMessage={handleNewMessage} />
        </div>
    );
};

export default PageChat;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MessageList from '../../components/MessageList/index';
import MessageForm from '../../components/MessageForm/index';
import { ChatHeader } from '../../components/Header/index';
import { useAuth } from '../../AuthContext';
import axios from 'axios';
import './index.scss';
import { useNavigate } from 'react-router-dom';

const PageChat = () => {
    const { user, logout } = useAuth();
    const { chatId } = useParams();
    const [chatMessages, setChatMessages] = useState(null);
    const [chatInfo, setChatInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newMessage, setNewMessage] = useState(false);
    const navigate = useNavigate();

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
                if (error.response && error.response.status === 401) {
                logout(); 
                navigate('/login');
            } 
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

    }, [chatId, user, logout, navigate]); 


    // const loadMoreMessages = () => {
    //     if (hasMore) {
    //         setPage(prevPage => prevPage + 1);
    //     }
    // };

    const handleNewMessage = async (messageData) => {
        if (!chatMessages || !user) return;

        const { text, voice, files } = messageData;
        
        if (!text && !voice && (!files || files.length === 0)) {
            console.error('Необходимо ввести хотя бы одно сообщение или прикрепить файл.');
            return;
        }
        const message = {
            chat: chatId,
            ...(text && { text }), 
            ...(voice && { voice }),
            ...(files && files.length > 0 && { files }),
        };

        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axios.post(`https://vkedu-fullstack-div2.ru/api/messages/`, message, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
            });
            console.log('Новое сообщение:', response.data);
            setChatMessages(prevChat => [
                ...prevChat,
                response.data,
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
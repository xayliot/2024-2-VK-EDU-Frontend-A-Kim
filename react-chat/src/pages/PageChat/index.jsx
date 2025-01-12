import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MessageList from '../../components/MessageList/index';
import MessageForm from '../../components/MessageForm/index';
import { ChatHeader } from '../../components/Header/index';
import { useAuth } from '../../AuthContext';
import axios from 'axios';
import './index.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages, addMessage, setChatInfo, setLoading } from '../../store/chatSlice';

const PageChat = () => {
    const { user, logout } = useAuth();
    const { chatId } = useParams();
    const dispatch = useDispatch();
    const { messages, chatInfo, loading } = useSelector(state => state.chat);
    const navigate = useNavigate();

    const pageSize = 100;

    useEffect(() => {
        const fetchChatMessages = async () => {
            if (!user) return;

            dispatch(setLoading(true));

            try {
                const accessToken = localStorage.getItem('accessToken');
                const response = await axios.get(`https://vkedu-fullstack-div2.ru/api/messages/`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                    params: {
                        page_size: pageSize,
                        chat: chatId,
                    },
                });
                dispatch(setMessages(response.data.results));
            } catch (error) {
                console.error('Ошибка получения сообщений:', error);
                if (error.response && error.response.status === 401) {
                    logout(); 
                    navigate('/login');
                }
            } finally {
                dispatch(setLoading(false));
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
                dispatch(setChatInfo(response.data));
            } catch (error) {
                console.error('Ошибка получения чата:', error);
            }
        };

        fetchChat();
        fetchChatMessages();
    }, [chatId, user, logout, navigate, dispatch]);

    const handleNewMessage = async (messageData) => {
        if (!user) return;

        const { text, voice, files } = messageData;
        if (!text && !voice && (!files || files.length === 0)) {
            console.error('Необходимо ввести хотя бы одно сообщение или прикрепить файл.');
            return;
        }

        const formData = new FormData();
        formData.append('chat', chatId); 
        if (text) {
            formData.append('text', text);
        }
        if (voice) {
            formData.append('voice', voice);
        }
        if (files && files.length > 0) {
            files.forEach(file => {
                formData.append('files', file);
            });
        }

        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axios.post(`https://vkedu-fullstack-div2.ru/api/messages/`, formData, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
            });
            dispatch(addMessage(response.data));
        } catch (error) {
            console.error('Ошибка отправки сообщения:', error);
        }
    };

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (!messages) {
        return <div>Чат не найден.</div>;
    }

    return (
        <div className="page-chat">
            <ChatHeader 
                currentUser={user}
                chatInfo={chatInfo} 
                avatar={chatInfo?.avatar} 
            />
            <MessageList messages={messages} />
            <MessageForm onSendMessage={handleNewMessage} />
        </div>
    );
};

export default PageChat;
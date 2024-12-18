import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatList from '../../components/ChatList/index';
import ChatModal from '../../components/ChatModal/index';
import CreateButton from '../../components/CreateButton/index';
import { ChatListHeader } from '../../components/Header/index';
import axios from 'axios';
import './index.scss';
import { useAuth } from '../../AuthContext';

const PageChatList = () => {
    const { logout } = useAuth();
    const [chats, setChats] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const modalRef = useRef(null);
    const navigate = useNavigate();

    const handlePageEdit = () => {
        navigate(`/Profile`);
    };

    const refreshAccessToken = async (refreshToken) => {
        try {
            const response = await axios.post('https://vkedu-fullstack-div2.ru/api/auth/refresh/', {
                refresh: refreshToken,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const { access, refresh } = response.data;

            localStorage.setItem('accessToken', access);
            localStorage.setItem('refreshToken', refresh);
            return access;
        } catch (error) {
            console.error('Ошибка обновления токена:', error);
            logout(); 
            navigate('/login'); 
        }
    };

    const fetchChats = useCallback(async () => {
        setLoading(true);
        const accessToken = localStorage.getItem('accessToken');
        try {
            const response = await axios.get('https://vkedu-fullstack-div2.ru/api/chats', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                params: {
                    page_size: 10,
                    page: page,
                },
            });
            setChats(response.data.results);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                const refreshToken = localStorage.getItem('refreshToken');
                const newAccessToken = await refreshAccessToken(refreshToken);
                if (newAccessToken) {
                    fetchChats();
                }
            } else {
                console.error('Ошибка при получении чатов:', error);
            }
        } finally {
            setLoading(false);
        }
    }, [page, refreshAccessToken]);

    useEffect(() => {
        fetchChats();
    }, [fetchChats]);

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

    const createChat = async (chatData) => {
        try {
            if (!chatData) {
                throw new Error('Chat data is required');
            }
            const accessToken = localStorage.getItem('accessToken');
            const response = await axios.post('https://vkedu-fullstack-div2.ru/api/chats/', chatData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                }
            });
            setChats((prevChats) => [...prevChats, response.data.results]);
            closeModal();
        } catch (error) {
            console.error('Ошибка при создании чата:', error);
        }
    };

    const handleScroll = useCallback(() => {
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100 && !loading) {
            setPage((prevPage) => prevPage + 1);
        }
    }, [loading]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    return (
        <div className="page-chat-list">
            <ChatListHeader pageEdit={handlePageEdit} />
            <ChatList chats={chats} />
            {loading && <div>Загрузка...</div>}
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
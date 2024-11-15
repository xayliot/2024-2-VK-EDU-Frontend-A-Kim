import React from 'react';
import './HeaderChat.scss';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';

const ChatHeader = ({ currentUser, companion, avatar, onBack, onUserSwap }) => {
    return (
        <div className="chat-header">
            <div className="header-left">
                <button id="arrow_left_alt" onClick={onBack}>
                    <ArrowBackIcon />
                </button>
            </div>
            <div className="header-center">
                <div className="avatar">
                    <img src={avatar} alt={companion} className="ava-img" />
                </div>
                <div className="user-info">
                    <div className="username">{currentUser === 'me' ? 'Вы' : currentUser}</div>
                    <div className="last-login">Последний заход: 12:00</div>
                </div>
                <button id="change_user" onClick={onUserSwap}>Сменить пользователя</button>
            </div>
            <div className="header-right">
                <button id="loupe">
                    <SearchIcon />
                </button>
                <button id="vert">
                    <MoreVertIcon />
                </button>
            </div>
        </div>
    );
};

export default ChatHeader;
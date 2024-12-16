import React from 'react';
import './HeaderChat.scss';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';

const handleGoBack = () => {
    window.history.back()
}

const ChatHeader = ({ currentUser, chatInfo, avatar }) => {
    return (
        <div className="chat-header">
            <div className="header-left">
                <button id="arrow_left_alt" onClick={handleGoBack}>
                    <ArrowBackIcon />
                </button>
            </div>
            <div className="header-center">
                <div className="avatar">
                    <img src={avatar} alt={'lol'} className="ava-img" />
                </div>
                <div className="user-info">
                    <div className="username">{chatInfo.title}</div>
                    <div className="last-login">{}</div> //додумать способ отрисовки времени захода собеседника
                </div>
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
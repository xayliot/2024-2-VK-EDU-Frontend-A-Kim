import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import './HeaderChatList.scss';

const ChatListHeader = ({pageEdit }) => {
    return (
        <div className="chatlist-header">
            <div className="header-left">
                <button id='vert' onClick={pageEdit} aria-label="More options">
                    <MoreVertIcon /> 
                </button>
            </div>
            <div className="header-center">
                    <div className="title">{'Messenger'}</div> 
            </div>
            <div className="header-right">
                <button id='loupe' aria-label="Search">
                    <SearchIcon /> 
                </button>
            </div>
        </div>
    );
};

export default ChatListHeader;
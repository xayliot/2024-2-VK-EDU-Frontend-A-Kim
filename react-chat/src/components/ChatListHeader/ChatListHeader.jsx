import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import './ChatListHeader.scss';

const ChatListHeader = ({ currentUser, companion, avatar }) => {
    return (
        <div className="chatlist-header">
            <div className="header-left">
                <button>
                    <MoreVertIcon /> 
                </button>
            </div>
            <div className="header-center">
                    <div className="title">{'Messenger'}</div> 
            </div>
            <div className="header-right">
                <button>
                    <SearchIcon /> 
                </button>
            </div>
        </div>
    );
};

export default ChatListHeader;
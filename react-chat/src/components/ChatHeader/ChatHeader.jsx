import React from 'react';

const ChatHeader = ({ currentUser, companion, avatar }) => {
    return (
        <div className="chat-header">
            <img className="ava-img" src={avatar} alt={companion} />
            <h2 className="username">{companion}</h2>
        </div>
    );
};

export default ChatHeader;
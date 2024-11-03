import React, { useState } from 'react';
import PageChatList from './pages/PageChatList'; 
import PageChat from './pages/PageChat'; 

const App = () => {
    const [currentChatId, setCurrentChatId] = useState(null);

    const handleSelectChat = (chatId) => {
        setCurrentChatId(chatId);
    };

    const handleBackToChatList = () => {
        setCurrentChatId(null);
    };

    return (
        <div className="app">
            {currentChatId === null ? (
                <PageChatList onSelectChat={handleSelectChat} />
            ) : (
                <PageChat chatId={currentChatId} onBack={handleBackToChatList} />
            )}
        </div>
    );
};

export default App;
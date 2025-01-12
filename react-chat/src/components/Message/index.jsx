import React from 'react';
import './index.scss';
import { useAuth } from '../../AuthContext';

const Message = ({ message }) => {
    const { user } = useAuth();

    console.log(message);
    
    const renderContent = () => {
        if (message.text) {
            return (
                <div className="message-text" dangerouslySetInnerHTML={{ __html: message.text }} />
            );
        }

        if (message.files && message.files.length > 0) {
            return message.files.map((file, index) => {
                const imageUrl = file.item; 
                return (
                    <img key={index} src={imageUrl} alt={`message-file-${index}`} className="message-image" />
                );
            });
        }


        if (message.voice) {
            return (
                <audio controls>
                    <source src={URL.createObjectURL(message.voice)} type={message.voice.type} />
                    Ваш браузер не поддерживает аудиоплеер.
                </audio>
            );
        }

        return null; 
    };

    return (
        <div className={`message ${message.sender.id === user.id ? 'user2' : 'user1'}`} tabIndex="-1">
            {renderContent()}
            <span>
                <span className='invisible'>
                    {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})}
                </span>
                <div className='timestamp'>
                    {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})}
                </div>
            </span>
        </div>
    );
};

export default Message;
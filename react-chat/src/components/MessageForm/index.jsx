import React, { useState, useRef } from 'react';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import './index.scss';

const MessageForm = ({ onSendMessage }) => {
    const [messageText, setMessageText] = useState('');
    const [showActions, setShowActions] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [files, setFiles] = useState([]);
    const mediaRecorderRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (messageText.trim() || files.length > 0) {
            const messageData = {
                text: messageText.trim() || null,
                voice: null,
                files
            };
            onSendMessage(messageData);
            setMessageText('');
            setFiles([]);
        }
    };

    const handleActionSelect = (action) => {
        setShowActions(false);
        if (action === 'location') {
            handleSendLocation();
        } else if (action === 'image') {
            document.getElementById('imageUpload').click();
        } else if (action === 'voice') {
            startRecording();
        }
    };

    const handleImageUpload = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
        e.target.value = null; 
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFiles = Array.from(event.dataTransfer.files);
        const imageFiles = droppedFiles.filter(file => file.type.startsWith('image/'));
        setFiles(prevFiles => [...prevFiles, ...imageFiles]);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
    };

    const startRecording = async () => {
        setIsRecording(true);
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        
        mediaRecorderRef.current.ondataavailable = (event) => {
            setAudioBlob(event.data);
            console.log('Audio Blob:', event.data);
        };
        
        mediaRecorderRef.current.start();
    };

    const stopRecording = () => {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop()); 
    };

    const handleSendVoiceMessage = async () => {
        if (audioBlob) {
            const file = new File([audioBlob], `voice_message_${Date.now()}.webm`, { type: 'audio/webm' });

            const formData = new FormData();
            formData.append('voice', file); 
            formData.append('text', messageText || '');
            files.forEach(file => formData.append('files', file));
            await onSendMessage(formData);
            setAudioBlob(null);
            setMessageText('');
            setFiles([]);
        }
    };

    const handleSendLocation = async () => {
        if (!navigator.geolocation) {
            console.error('Геолокация не поддерживается вашим браузером.');
            return;
        }
    
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                const locationUrl = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
                const locationData = {
                    text: locationUrl,
                    voice: null,
                    files: []
                };
    
                await onSendMessage(locationData);
            },
            (error) => {
                console.error('Ошибка получения геолокации:', error);
            }
        );
    };

    return (
        <div>
            <form 
                className="message-form" 
                onSubmit={handleSubmit} 
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                <input
                    type="text"
                    className="form-input"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Введите сообщение"
                />
                <button type="button" onClick={() => setShowActions(!showActions)} id='action-button'>
                    <AttachFileIcon />
                </button>
                <button type="submit" id='send'><SendIcon/></button>
                <input
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }} 
                />
                {isRecording ? (
                    <button type="button" onClick={stopRecording}><StopCircleIcon/></button>
                ) : (
                    <button type="button" onClick={handleSendVoiceMessage} disabled={!audioBlob}>
                        Отправить голосовое сообщение
                    </button>
                )}
            </form>
            {showActions && (
                <div className="action-menu">
                    <button onClick={() => handleActionSelect('location')}>Отправить геолокацию</button>
                    <button onClick={() => handleActionSelect('image')}>Отправить картинку</button>
                    <button onClick={() => handleActionSelect('voice')}>Отправить голосовое</button>
                </div>
            )}
            {files.length > 0 && (
                <div className="file-preview">
                    {files.map((file, index) => (
                        <div key={index}>{file.name}</div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MessageForm;
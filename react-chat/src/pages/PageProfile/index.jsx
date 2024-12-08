import React, { useState, useEffect } from 'react';
import ProfilePicture from '../../components/ProfilePicture/index';
import { ProfileInput, ProfileInput1 } from '../../components/ProfileInput';
import BioInput from '../../components/BioInput';
import ProfileHeader from '../../components/Header/HeaderProfile';
import axios from 'axios';
import { useAuth } from '../../AuthContext.js';
import './index.scss';

const PageProfile = () => {
    const { user } = useAuth();
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [isUsernameValid, setIsUsernameValid] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                const response = await axios.get(`https://vkedu-fullstack-div2.ru/api/user/current/`,{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });
                setFirstName(response.data.first_name);
                setLastName(response.data.last_name);
                setUsername(response.data.username);
                setBio(response.data.bio);
                setProfilePicture(response.data.profilePicture);    
            } catch (error) {
                console.error('Ошибка получения информации о пользователе', error);
            }
        };
        console.log('User data:', user);
        if (user) fetchProfile();
    }, [user]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) { 
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicture(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            alert('Пожалуйста, выберите изображение.');
        }
    };

    const handleUsernameChange = (e) => {
        const value = e.target.value;
        setUsername(value);
        setIsUsernameValid(value.length >= 5);
    };

    const handleSave = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            await axios.post(`https://vkedu-fullstack-div2.ru/api/user/${user.id}`, {
                first_name,
                last_name,
                username,
                bio,
                profilePicture,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
            });
    
            const response = await axios.get(`https://vkedu-fullstack-div2.ru/api/user/current/`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
    
            setFirstName(response.data.first_name);
            setLastName(response.data.last_name);
            setUsername(response.data.username);
            setBio(response.data.bio);
            setProfilePicture(response.data.profilePicture);
    
            alert('Данные профиля успешно сохранены');
        } catch (error) {
            console.log('Ошибка сохранения данных:', error);
            alert('Ошибка сохранения данных');
        }
    };

    return (
        <div className="page-profile">
            <ProfileHeader onSave={handleSave} />
            <div className='page-content'>
                <ProfilePicture profilePicture={profilePicture} onFileChange={handleFileChange} />
                <div className="profile-info">
                    <ProfileInput1 
                        label={'Name'}
                        label1={'Last name'}
                        value={first_name}
                        value1={last_name} 
                        onChangeName={(e) => setFirstName(e.target.value)} 
                        onChangeSurname={(e) => setLastName(e.target.value)} 
                    />
                    <ProfileInput
                        label={'Username'} 
                        value={username} 
                        onChange={handleUsernameChange} 
                        minLength={5} 
                    />
                    {!isUsernameValid && (
                        <div className="error-message">Minimum length is 5 characters</div>
                    )}
                    <BioInput 
                        value={bio} 
                        onChange={(e) => setBio(e.target.value)} 
                    />
                    <div className='hint'>Any details about you</div>
                </div>
            </div>
        </div>
    );
};

export default PageProfile;
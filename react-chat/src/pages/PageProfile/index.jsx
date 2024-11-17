import React, { useState, useEffect } from 'react';
import ProfilePicture from '../../components/ProfilePicture/index';
import ProfileInput from '../../components/ProfileInput';
import BioInput from '../../components/BioInput';
import ProfileHeader from '../../components/Header/HeaderProfile';
import './index.scss';

const PageProfile = ({ onBack }) => {
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [isUsernameValid, setIsUsernameValid] = useState(true);

    useEffect(() => {
        const storedProfile = JSON.parse(localStorage.getItem('profile'));
        if (storedProfile) {
            setFullName(storedProfile.fullName || '');
            setUsername(storedProfile.username || '');
            setBio(storedProfile.bio || '');
            setProfilePicture(storedProfile.profilePicture || null);
        }
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicture(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUsernameChange = (e) => {
        const value = e.target.value;
        setUsername(value);
        setIsUsernameValid(value.length >= 5);
    };

    const handleSave = () => {
        const profileData = {
            fullName,
            username,
            bio,
            profilePicture,
        };
        localStorage.setItem('profile', JSON.stringify(profileData));
    };

    return (
        <div className="page-profile">
            <ProfileHeader onBack={onBack} onSave={handleSave} />
            <div className='page-content'>
            <ProfilePicture profilePicture={profilePicture} onFileChange={handleFileChange} />
                <div className="profile-info">
                    <ProfileInput 
                        label={'Full name'}
                        value={fullName} 
                        onChange={(e) => setFullName(e.target.value)} 
                    />
                    <ProfileInput
                        label={'Username'} 
                        value={username} 
                        onChange={handleUsernameChange} 
                        minLength={5} 
                    />
                    {!isUsernameValid && <div className="error-message">Minimum length is 5 characters</div>}
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
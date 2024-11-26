import React from 'react';
import './index.scss';

const ProfilePicture = ({ profilePicture, onFileChange }) => {
    return (
        <div className="profile-picture-container">
            <input
                type="file"
                accept="image/*"
                onChange={onFileChange}
                id="file-upload"
                style={{ display: 'none' }}
            />
            <label htmlFor="file-upload" className="profile-picture-label">
                {profilePicture ? (
                    <img src={profilePicture} alt="Profile" className="profile-picture" />
                ) : (
                    <div className="default-picture">+</div>
                )}
            </label>
        </div>
    );
};

export default ProfilePicture;
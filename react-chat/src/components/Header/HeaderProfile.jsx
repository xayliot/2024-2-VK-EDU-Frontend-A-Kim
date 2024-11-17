import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './HeaderProfile.scss';
import CheckIcon from '@mui/icons-material/Check';

const ProfileHeader = ({ onBack, onSave }) => {
    return (
        <div className="Profile-header">
            <div className="header-left">
                <button id="arrow_left_alt" onClick={onBack}>
                    <ArrowBackIcon />
                </button>
            </div>
            <div className="header-center">
                <div className="title">{'Edit Profile'}</div>
            </div>
            <div className="header-right">
                <button id='CheckIcon' onClick={onSave}>
                    <CheckIcon />
                </button>
            </div>
        </div>
    );
};

export default ProfileHeader;
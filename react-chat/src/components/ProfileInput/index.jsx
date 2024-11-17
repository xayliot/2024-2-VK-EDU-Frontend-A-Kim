import React from 'react';
import './index.scss';

const ProfileInput = ({ label, value, onChange, minLength }) => {
    return (
        <div className='profile-input-contener'>
            <div className='label'>{label}</div>
            <input
                type="text"
                value={value}
                onChange={onChange}
                className="profile-input"
                minLength={minLength}
            />
        </div>
    );
};

export default ProfileInput;
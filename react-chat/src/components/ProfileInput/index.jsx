import React, { useRef } from 'react';
import './index.scss';

const ProfileInput = ({ label, value, onChange, minLength }) => {
    const inputRef = useRef(null);

    const handleClick = () => {
        if (inputRef.current) {
            inputRef.current.focus(); 
        }
    };

    return (
        <div className='profile-input-container' onClick={handleClick}>
            <div className='label'>{label}</div>
            <input
                type="text"
                value={value}
                onChange={onChange}
                className="profile-input"
                minLength={minLength}
                ref={inputRef}
            />
        </div>
    );
};

const ProfileInput1 = ({ label, label1, value, value1, onChangeName, onChangeSurname }) => {
    const inputRef1 = useRef(null);

    const handleClick = () => {
        if (inputRef1.current) {
            inputRef1.current.focus(); 
        }
    };

    return (
        <div className='profile-input-container'>
            <div className='label' onClick={handleClick}>{label}</div>
            <input
                type="text"
                value={value}
                onChange={onChangeName}
                className="profile-input"
                ref={inputRef1}
            />
            <div className='label'>{label1}</div>
            <input
                type="text"
                value={value1}
                onChange={onChangeSurname}
                className="profile-input"
            />
        </div>
    );
};

export { ProfileInput, ProfileInput1 };
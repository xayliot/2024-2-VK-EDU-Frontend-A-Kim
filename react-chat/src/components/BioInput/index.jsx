import React, { useRef } from 'react';
import './index.scss';

const BioInput = ({ value, onChange }) => {
    const inputRef = useRef(null);

    const handleClick = () => {
        if (inputRef.current) {
            inputRef.current.focus(); 
        }
    };

    return (
        <div className='bio-input-container' onClick={handleClick}>
            <div className='Bio-title'>Bio</div>
            <textarea
                value={value}
                onChange={onChange}
                className="bio-input"
                ref={inputRef}
            />
        </div>
    );
};

export default BioInput;
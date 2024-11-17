import React from 'react';
import './index.scss';

const BioInput = ({ value, onChange }) => {
    return (
        <div className='bio-input-contener'>
            <div className='Bio-title'>Bio</div>
            <textarea
                value={value}
                onChange={onChange}
                className="bio-input"
            />
        </div>

    );
};

export default BioInput;
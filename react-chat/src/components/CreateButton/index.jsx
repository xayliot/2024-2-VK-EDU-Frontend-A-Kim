import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import './index.scss'; 

const CreateButton = ({ onClick }) => {
    return (
        <button className="add-button" onClick={onClick} aria-label="create button">
           <AddIcon />
        </button>
    );
};

export default CreateButton;
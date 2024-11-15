import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import './index.scss'; 

const CreateButton = ({ onClick }) => {
    return (
        <button className="add-button" onClick={onClick}>
           <AddIcon />
        </button>
    );
};

export default CreateButton;
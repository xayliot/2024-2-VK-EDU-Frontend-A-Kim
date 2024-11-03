import React from 'react';
import AddIcon from '@mui/icons-material/Add';

const CreateButton = ({ onClick }) => {
    return (
        <button className="create-button" onClick={onClick}>
           <AddIcon />
        </button>
    );
};

export default CreateButton;
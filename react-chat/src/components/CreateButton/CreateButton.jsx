import React from 'react';

const CreateButton = ({ onClick }) => {
    return (
        <button className="create-button" onClick={onClick}>
            Создать новый чат
        </button>
    );
};

export default CreateButton;
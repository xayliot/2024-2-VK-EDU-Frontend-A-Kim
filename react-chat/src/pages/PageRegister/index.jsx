import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [bio, setBio] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [errors, setErrors] = useState({}); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        formData.append('bio', bio);
        if (avatar) {
            formData.append('avatar', avatar);
        }

        try {
            const response = await axios.post('https://vkedu-fullstack-div2.ru/api/register/', formData);
            const body = response.data;

            if (body.success) {
                navigate('/login');
            } else {
                setErrors(body); 
            }
        } catch (err) {
            console.error('Ошибка при регистрации:', err);
            if (err.response && err.response.data) {
                setErrors(err.response.data);
            }
        }
    };

    return (
        <div className="register-container">
            <h2>Регистрация</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Имя пользователя</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    {errors.username && <div className="error">{errors.username.join(', ')}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Пароль</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {errors.password && <div className="error">{errors.password.join(', ')}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="first_name">Имя</label>
                    <input
                        type="text"
                        id="first_name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                    {errors.first_name && <div className="error">{errors.first_name.join(', ')}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="last_name">Фамилия</label>
                    <input
                        type="text"
                        id="last_name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                    {errors.last_name && <div className="error">{errors.last_name.join(', ')}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="bio">Биография</label>
                    <textarea
                        id="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="avatar">Аватар</label>
                    <input
                        type="file"
                        id="avatar"
                        accept="image/*"
                        onChange={(e) => setAvatar(e.target.files[0])}
                    />
                </div>
                <button type="submit">Зарегистрироваться</button>
            </form>
        </div>
    );
};

export default Register;
import React, { useState } from 'react';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://vkedu-fullstack-div2.ru/api/auth/', { 
                username,
                password,
            });

            if (response.data.access && response.data.refresh) {
                localStorage.setItem('accessToken', response.data.access);
                localStorage.setItem('refreshToken', response.data.refresh);
                const userResponse = await axios.get('https://vkedu-fullstack-div2.ru/api/user/current/', {
                    headers: {
                        'Authorization': `Bearer ${response.data.access}`,
                    },
                });
                
                login(userResponse.data); 
                navigate('/'); 
            } else {
                setError('Ошибка авторизации. Проверьте имя пользователя и пароль.');
            }
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.detail || 'Ошибка авторизации. Попробуйте еще раз.');
            } else {
                setError('Ошибка авторизации. Попробуйте еще раз.');
            }
        }
    };

    return (
        <div className="login-container">
            <h2>Авторизация</h2>
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
                </div>
                {error && <div className="error">{error}</div>}
                <button type="submit">Войти</button>
            </form>
        </div>
    );
};

export default Login;
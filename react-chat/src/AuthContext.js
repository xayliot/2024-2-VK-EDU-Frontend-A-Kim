import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const login = (userData) => {
        setIsAuthenticated(true);
        setUser(userData);
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('accessToken'); 
    };


    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                setIsAuthenticated(true);
                try {
                    const response = await axios.get('https://vkedu-fullstack-div2.ru/api/user/current/', {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    setUser(response.data); 
                } catch (error) {
                    console.error('Ошибка получения данных о пользователе:', error);
                    logout(); 
                }
            }
        };

        fetchUserData();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
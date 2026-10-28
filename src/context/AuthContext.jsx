    import React, { createContext, useContext, useState, useEffect } from 'react';
    import api from '../services/api';

    const AuthContext = createContext();

    export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (savedUser && token) {
        setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
        const response = await api.post('/auth/login', {
            email,
            password,
        });

        const { token, user: userData } = response.data;

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));

        setUser(userData);

        return { success: true };
        } catch (error) {
        const message =
            error.response?.data?.message || 'Invalid email or password. Please try again.';
        return { success: false, message };
        }
    };
    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
        {!loading && children}
        </AuthContext.Provider>
    );
    };

    export const useAuth = () => useContext(AuthContext);
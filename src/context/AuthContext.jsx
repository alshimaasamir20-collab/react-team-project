    import React, { createContext, useContext, useState, useEffect } from 'react';
    import api from '../services/api';

    const AuthContext = createContext();

    export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
        const savedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (savedUser && token && savedUser !== 'undefined') {
            setUser(JSON.parse(savedUser));
        }
        } catch (err) {
        console.error('Failed to parse user from localStorage', err);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        } finally {
        setLoading(false);
        }
    }, []);

    const login = async (email, password) => {
        try {
        // إرسال email و password فقط لمنع خطأ Validation Error
        const response = await api.post('/auth/login', {
            email,
            password,
        });

        const token = response.data.token || response.data.accessToken;
        const userData = response.data.user || response.data;

        if (token) {
            localStorage.setItem('token', token);
        }

        if (userData) {
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
        }

        return { success: true };
        } catch (error) {
        // استخراج نص رسالة الخطأ سواء كانت في errors أو message
        const message =
            error.response?.data?.errors?.[0] ||
            error.response?.data?.message ||
            'Invalid email or password. Please try again.';
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
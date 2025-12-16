// context/AuthContext.tsx
'use client'; // <--- ADD THIS LINE HERE

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

// Get the backend URL from the frontend environment
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// --- 1. Define Types ---
interface User {
    id: string;
    email: string;
    isSubscribed: boolean;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (token: string, user: User) => void;
    logout: () => void;
    registerUser: (email: string, password: string) => Promise<void>;
    loginUser: (email: string, password: string) => Promise<void>;
}

// --- 2. Create Context ---
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook to use the context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// --- 3. Provider Component ---
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    // Load state from localStorage on initial load
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (newToken: string, newUser: User) => {
        setToken(newToken);
        setUser(newUser);
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(newUser));
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    // --- API Interactions ---

    const registerUser = async (email: string, password: string) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/register`, { email, password });

            // NOTE: The registration response currently doesn't return a token, 
            // so the user must be redirected to log in after success.
            if (response.status === 201) {
                // Successful registration
                console.log('Registration successful, please log in.');
            }

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw new Error(error.response.data.msg || 'Registration failed.');
            }
            throw new Error('An unknown error occurred during registration.');
        }
    };

    const loginUser = async (email: string, password: string) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });

            const { token: newToken, user: newUser } = response.data;

            // Set global state and localStorage
            login(newToken, newUser);

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw new Error(error.response.data.msg || 'Login failed.');
            }
            throw new Error('An unknown error occurred during login.');
        }
    };


    const value: AuthContextType = {
        user,
        token,
        isAuthenticated: !!user && !!token,
        login,
        logout,
        registerUser,
        loginUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
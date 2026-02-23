import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const saved = localStorage.getItem('credzy_session');
        if (saved) {
            setSession(JSON.parse(saved));
        }
        setLoading(false);
    }, []);

    const login = (email) => {
        let role = 'student';
        if (email.toLowerCase().includes('recruiter')) {
            role = 'recruiter';
        }

        const newSession = {
            id: Math.random().toString(36).substring(2, 15),
            email,
            role
        };

        localStorage.setItem('credzy_session', JSON.stringify(newSession));
        setSession(newSession);
        return newSession;
    };

    const signup = (userData) => {
        const newSession = {
            id: Math.random().toString(36).substring(2, 15),
            ...userData
        };

        localStorage.setItem('credzy_session', JSON.stringify(newSession));
        setSession(newSession);
        return newSession;
    };

    const logout = () => {
        localStorage.removeItem('credzy_session');
        setSession(null);
    };

    const updateProfile = (updates) => {
        if (!session) return;

        const updatedSession = { ...session, ...updates };
        localStorage.setItem('credzy_session', JSON.stringify(updatedSession));
        setSession(updatedSession);
        return updatedSession;
    };

    if (loading) return null;

    return (
        <AuthContext.Provider value={{ session, login, signup, logout, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    return useContext(AuthContext);
}

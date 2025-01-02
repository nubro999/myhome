import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
    user: any;
    login: (token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            validateToken(token).then((userInfo) => {
                if (userInfo) {
                    setUser(userInfo);
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            });
        }
    }, []);

    const validateToken = async (token: string) => {
        try {
            const response = await fetch('/api/auth/validate-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Invalid token');
            }
            return await response.json();
        } catch (error) {
            console.error('Token validation failed:', error);
            return null;
        }
    };

    const fetchUserInfo = async (token: string) => {
        try {
            const response = await fetch('/api/auth/user-info', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch user info');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching user info:', error);
            return null;
        }
    };

    const login = (token: string) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);

        fetchUserInfo(token).then((userInfo) => {
            if (userInfo) {
                setUser(userInfo);
            }
        });
    };

    const logout = () => {
        fetch('/api/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }).finally(() => {
            localStorage.removeItem('token');
            setUser(null);
            setIsAuthenticated(false);
        });
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

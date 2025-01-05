import React, { createContext, useEffect, useState, useContext } from 'react';

// User 인터페이스: username과 password만 포함
interface User {
    username: string;
    password: string;
}

interface AuthContextType {
    user: User | null; // 로그인된 사용자 정보
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

// `AuthContext` 생성
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;

// `useAuth` 커스텀 훅 생성
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth는 AuthProvider 내부에서만 사용할 수 있습니다.');
    }
    return context;
};

// `AuthProvider` 컴포넌트
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    // 토큰 유효성 검사
    const validateToken = async (token: string): Promise<User | null> => {
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
            return await response.json(); // username, password 반환
        } catch (error) {
            console.error('Token validation failed:', error);
            return null;
        }
    };

    // 로그인
    const login = async (username: string, password: string): Promise<void> => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('로그인에 실패했습니다. 아이디와 비밀번호를 확인하세요.');
            }

            const data = await response.json();
            const token = data.token;

            // 토큰 저장
            localStorage.setItem('token', token);
            setIsAuthenticated(true);

            // 사용자 정보 저장
            setUser({ username, password });
        } catch (error) {
            console.error('로그인 오류:', error);
            throw error; // 에러를 호출한 컴포넌트로 전달
        }
    };

    // 로그아웃
    const logout = async (): Promise<void> => {
        try {
            await fetch('/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
        } catch (error) {
            console.error('로그아웃 오류:', error);
        } finally {
            localStorage.removeItem('token');
            setUser(null);
            setIsAuthenticated(false);
        }
    };

    // 컴포넌트가 마운트될 때 토큰 유효성 검사
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

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};


import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // AuthContext에서 인증 상태 가져오기

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth(); // 인증 상태 확인

    // 인증되지 않은 경우 로그인 페이지로 리다이렉트
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // 인증된 경우 자식 컴포넌트를 렌더링
    return <>{children}</>;
};

export default PrivateRoute;

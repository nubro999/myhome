import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock } from 'lucide-react';

// 로그인 API 응답 데이터 타입 정의
interface LoginResponse {
    token: string; // JWT 토큰
    user: {
        id: number;
        username: string;
    };
}

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState(''); // username 입력 필드
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        try {
            // 서버에 로그인 요청
            const response = await axios.post<LoginResponse>('/api/auth/login', { username, password });

            // JWT 토큰 저장 (로컬 스토리지에 저장)
            const token = response.data.token; // 백엔드가 반환하는 JWT 토큰
            localStorage.setItem('token', token);

            // 로그인 성공 메시지 출력
            console.log('로그인 성공:', response.data);

            // 페이지 이동 (로그인 성공 시 홈으로 이동)
            navigate('/');
        } catch (err: any) {
            // 에러 처리 (백엔드에서 반환된 에러 메시지 또는 기본 메시지 사용)
            const errorMessage = err.response?.data?.message || '로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.';
            setError(errorMessage);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[calc(100vh-200px)]">
            <div className="card w-full max-w-md">
                <div className="card-body">
                    <h1 className="text-2xl font-bold text-center mb-6">로그인</h1>

                    {/* 에러 메시지 표시 */}
                    {error && (
                        <div className="alert alert-error mb-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* 아이디 입력 필드 */}
                        <div>
                            <label htmlFor="username" className="form-label">아이디</label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <User className="w-5 h-5" />
                                </span>
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="form-input"
                                    required
                                />
                            </div>
                        </div>

                        {/* 비밀번호 입력 필드 */}
                        <div>
                            <label htmlFor="password" className="form-label">비밀번호</label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <Lock className="w-5 h-5" />
                                </span>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="form-input"
                                    required
                                />
                            </div>
                        </div>

                        {/* 로그인 버튼 */}
                        <button type="submit" className="btn btn-primary w-full">
                            로그인
                        </button>
                    </form>

                    {/* 회원가입 링크 */}
                    <div className="mt-4 text-center">
                        <span className="text-gray-600">계정이 없으신가요? </span>
                        <Link to="/register" className="text-blue-500 hover:underline">
                            회원가입
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;


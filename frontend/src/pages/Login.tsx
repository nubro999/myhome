import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // TODO: Implement login logic
            navigate('/');
        } catch (err) {
            setError('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[calc(100vh-200px)]">
            <div className="card w-full max-w-md">
                <div className="card-body">
                    <h1 className="text-2xl font-bold text-center mb-6">로그인</h1>

                    {error && (
                        <div className="alert alert-error mb-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="form-label">이메일</label>
                            <div className="input-group">
                <span className="input-group-text">
                  <Mail className="w-5 h-5" />
                </span>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="form-input"
                                    required
                                />
                            </div>
                        </div>

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

                        <button type="submit" className="btn btn-primary w-full">
                            로그인
                        </button>
                    </form>

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
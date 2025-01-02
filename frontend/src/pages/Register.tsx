import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, User } from 'lucide-react';
import axios from 'axios';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState<string>(''); // 에러 메시지는 항상 문자열
    const [success, setSuccess] = useState<string>(''); // 성공 메시지도 항상 문자열

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError('비밀번호가 일치하지 않습니다.');
            setSuccess('');
            return;
        }

        try {
            setError('');
            const response = await axios.post('/api/auth/register', {
                username: formData.username,
                password: formData.password
            });

            const successMessage = typeof response.data === 'string'
                ? response.data
                : '회원가입이 완료되었습니다.';

            setSuccess(successMessage);
            setFormData({
                username: '',
                password: '',
                confirmPassword: ''
            });

            setTimeout(() => navigate('/login'), 2000);
        } catch (err: any) {
            const errorMessage = typeof err.response?.data === 'string'
                ? err.response.data
                : err.response?.data?.error || '회원가입에 실패했습니다. 다시 시도해주세요.';
            setError(errorMessage);
            setSuccess('');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[calc(100vh-200px)]">
            <div className="card w-full max-w-md">
                <div className="card-body">
                    <h1 className="text-2xl font-bold text-center mb-6">회원가입</h1>

                    {error && (
                        <div className="alert alert-error mb-4">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="alert alert-success mb-4">
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="username" className="form-label">아이디</label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <User className="w-5 h-5" />
                                </span>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
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
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="form-input"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="form-label">비밀번호 확인</label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <Lock className="w-5 h-5" />
                                </span>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="form-input"
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary w-full">회원가입</button>
                    </form>

                    <p className="text-center mt-4">
                        이미 계정이 있으신가요?{' '}
                        <Link to="/login" className="text-primary">
                            로그인
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;



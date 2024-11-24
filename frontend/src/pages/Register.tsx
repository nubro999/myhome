import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: ''
    });
    const [error, setError] = useState('');

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
            return;
        }

        try {
            // TODO: Implement registration logic
            navigate('/login');
        } catch (err) {
            setError('회원가입에 실패했습니다. 다시 시도해주세요.');
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
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="form-input"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="name" className="form-label">이름</label>
                            <div className="input-group">
                <span className="input-group-text">
                  <User className="w-5 h-5" />
                </span>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
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

                        <button type="submit" className="btn btn-primary w-full">
                            회원가입
                        </button>
                    </form>

                    <div className="mt-4 text-center">
                        <span className="text-gray-600">이미 계정이 있으신가요? </span>
                        <Link to="/login" className="text-blue-500 hover:underline">
                            로그인
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
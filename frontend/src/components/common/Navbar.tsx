import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <nav className="bg-gray-800 text-white">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="text-xl font-bold">
                        My Blog
                    </Link>
                    <div className="flex space-x-4">
                        <Link to="/board" className="hover:text-gray-300">
                            게시판
                        </Link>
                        <Link to="/gallery" className="hover:text-gray-300">
                            사진첩
                        </Link>
                        <Link to="/portfolio" className="hover:text-gray-300">
                            포트폴리오
                        </Link>
                        {isAuthenticated ? (
                            <button
                                onClick={logout}
                                className="hover:text-gray-300"
                            >
                                로그아웃
                            </button>
                        ) : (
                            <>
                                <Link to="/login" className="hover:text-gray-300">
                                    로그인
                                </Link>
                                <Link to="/register" className="hover:text-gray-300">
                                    회원가입
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
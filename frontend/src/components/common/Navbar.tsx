import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext, {useAuth} from "../../contexts/AuthContext";

const Navbar = () => {
    const { isAuthenticated, logout, user } = useAuth(); // 인증 정보 가져오기
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // 모바일 메뉴 상태
    const navigate = useNavigate(); // 로그아웃 후 리다이렉트

    // 로그아웃 핸들러
    const handleLogout = () => {
        logout();
        navigate('/'); // 로그아웃 후 홈으로 리다이렉트
    };

    return (
        <nav className="bg-gray-900 text-white shadow-md">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* 로고 */}
                    <Link to="/" className="text-2xl font-bold text-blue-400 hover:text-blue-300">
                        NuBroooo
                    </Link>

                    {/* 데스크톱 메뉴 */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/board" className="text-lg hover:text-blue-300">
                            게시판
                        </Link>
                        <Link to="/gallery" className="text-lg hover:text-blue-300">
                            사진첩
                        </Link>
                        <Link to="/portfolio" className="text-lg hover:text-blue-300">
                            포트폴리오
                        </Link>

                        {/* 로그인 상태에 따른 메뉴 */}
                        {isAuthenticated ? (
                            <div className="flex items-center space-x-4">
                                {/* 로그인한 사용자 정보 표시 */}
                                <span className="text-gray-300 text-sm">
                                    {user?.username || '사용자'}님 환영합니다!
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500 hover:bg-red-400 text-white py-1 px-3 rounded-lg text-sm shadow-sm"
                                >
                                    로그아웃
                                </button>
                            </div>
                        ) : (
                            <div className="flex space-x-4">
                                <Link
                                    to="/login"
                                    className="bg-blue-500 hover:bg-blue-400 text-white py-1 px-3 rounded-lg text-sm shadow-sm"
                                >
                                    로그인
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-green-500 hover:bg-green-400 text-white py-1 px-3 rounded-lg text-sm shadow-sm"
                                >
                                    회원가입
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* 모바일 메뉴 버튼 */}
                    <button
                        className="md:hidden text-white focus:outline-none"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>

            {/* 모바일 메뉴 */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-gray-800 text-white">
                    <div className="flex flex-col space-y-4 p-4">
                        <Link to="/board" className="text-lg hover:text-blue-300">
                            게시판
                        </Link>
                        <Link to="/gallery" className="text-lg hover:text-blue-300">
                            사진첩
                        </Link>
                        <Link to="/portfolio" className="text-lg hover:text-blue-300">
                            포트폴리오
                        </Link>

                        {isAuthenticated ? (
                            <div className="flex flex-col space-y-4">
                                <span className="text-gray-300 text-sm">
                                    {user?.username || '사용자'}님 환영합니다!
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500 hover:bg-red-400 text-white py-2 px-4 rounded-lg text-sm shadow-sm"
                                >
                                    로그아웃
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col space-y-4">
                                <Link
                                    to="/login"
                                    className="bg-blue-500 hover:bg-blue-400 text-white py-2 px-4 rounded-lg text-sm shadow-sm"
                                >
                                    로그인
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-green-500 hover:bg-green-400 text-white py-2 px-4 rounded-lg text-sm shadow-sm"
                                >
                                    회원가입
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;




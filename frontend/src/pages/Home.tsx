import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Image, Briefcase, ArrowRight } from 'lucide-react';

const Home = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Hero Section */}
            <section className="relative overflow-hidden page-header text-center py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white rounded-2xl shadow-2xl">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTYiIGhlaWdodD0iMTAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNTYiIGhlaWdodD0iMTAwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNMjggNjZMMCA1MEwyOCAzNGwyOCAxNi0yOCAxNnpNMjggMEwwIDE2bDI4IDE2TDU2IDE2IDI4IDB6IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS1vcGFjaXR5PSIwLjA3Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-10"></div>
                <div className="relative z-10">
                    <h1 className="text-5xl font-bold mb-6 animate-fade-in">
                        Welcome to My Creative Space
                    </h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        웹 개발, 문학, 그리고 음악에 관한 이야기를 공유합니다
                    </p>
                </div>
            </section>

            {/* Featured Sections */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                <Link
                    to="/board"
                    className="transform transition-all duration-300 hover:-translate-y-2"
                >
                    <div className="card-body h-full bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl">
                        <div className="flex items-center justify-between mb-6">
                            <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                                <BookOpen size={28} />
                            </div>
                            <ArrowRight className="text-white/70" size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">게시판</h3>
                        <p className="text-blue-50/90">개발 경험과 학습 내용을 공유합니다</p>
                    </div>
                </Link>

                <Link
                    to="/gallery"
                    className="transform transition-all duration-300 hover:-translate-y-2"
                >
                    <div className="card-body h-full bg-gradient-to-br from-indigo-500 to-indigo-600 p-6 rounded-xl">
                        <div className="flex items-center justify-between mb-6">
                            <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                                <Image size={28} />
                            </div>
                            <ArrowRight className="text-white/70" size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">갤러리</h3>
                        <p className="text-blue-50/90">프로젝트 및 일상 사진을 공유합니다</p>
                    </div>
                </Link>

                <Link
                    to="/portfolio"
                    className="transform transition-all duration-300 hover:-translate-y-2"
                >
                    <div className="card-body h-full bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl">
                        <div className="flex items-center justify-between mb-6">
                            <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                                <Briefcase size={28} />
                            </div>
                            <ArrowRight className="text-white/70" size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">포트폴리오</h3>
                        <p className="text-blue-50/90">주요 프로젝트들을 소개합니다</p>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Home;

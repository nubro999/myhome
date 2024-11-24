import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Image, Briefcase, ArrowRight, Clock, Tag } from 'lucide-react';

const Home = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Hero Section - 더 현대적인 그라데이션과 애니메이션 추가 */}
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

            {/* Featured Sections - 카드 디자인 개선 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                {[
                    {
                        to: "/board",
                        icon: <BookOpen size={28} />,
                        title: "게시판",
                        description: "개발 경험과 학습 내용을 공유합니다",
                        color: "from-blue-500 to-blue-600"
                    },
                    {
                        to: "/gallery",
                        icon: <Image size={28} />,
                        title: "갤러리",
                        description: "프로젝트 및 일상 사진을 공유합니다",
                        color: "from-indigo-500 to-indigo-600"
                    },
                    {
                        to: "/portfolio",
                        icon: <Briefcase size={28} />,
                        title: "포트폴리오",
                        description: "주요 프로젝트들을 소개합니다",
                        color: "from-purple-500 to-purple-600"
                    }
                ].map((item, index) => (
                    <Link
                        to={item.to}
                        key={index}
                        className="transform transition-all duration-300 hover:-translate-y-2"
                    >
                        <div className="card-body h-full bg-gradient-to-br ${item.color} p-6 rounded-xl">
                            <div className="flex items-center justify-between mb-6">
                                <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                                    {item.icon}
                                </div>
                                <ArrowRight className="text-white/70" size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                            <p className="text-blue-50/90">{item.description}</p>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Latest Posts Section - 개선된 카드 디자인 */}
            <section className="mt-20">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-white">최근 게시물</h2>
                    <Link to="/board" className="text-blue-400 hover:text-blue-300 flex items-center gap-2">
                        모든 게시물 보기
                        <ArrowRight size={18} />
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            category: "개발",
                            title: "웹 개발의 최신 트렌드",
                            description: "2024년 주목해야 할 웹 개발 트렌드를 소개합니다.",
                            time: "2시간 전"
                        },
                        {
                            category: "프로젝트",
                            title: "React와 Spring Boot 연동하기",
                            description: "풀스택 개발 프로젝트 경험을 공유합니다.",
                            time: "1일 전"
                        },
                        {
                            category: "학습",
                            title: "알고리즘 스터디 후기",
                            description: "알고리즘 문제 해결 전략과 팁을 공유합니다.",
                            time: "2일 전"
                        }
                    ].map((post, index) => (
                        <div key={index} className="card-body group cursor-pointer">
                            <div className="flex items-center gap-2 mb-3">
                                <Tag size={16} className="text-blue-400" />
                                <span className="text-sm text-blue-400">{post.category}</span>
                                <div className="flex items-center gap-1 ml-auto text-gray-400">
                                    <Clock size={14} />
                                    <span className="text-sm">{post.time}</span>
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                                {post.title}
                            </h3>
                            <p className="text-gray-400 mb-4">{post.description}</p>
                            <div className="flex items-center text-blue-400 group-hover:translate-x-2 transition-transform">
                                <span className="text-sm font-medium">자세히 보기</span>
                                <ArrowRight size={16} className="ml-1" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;

// src/pages/Board.tsx
import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Post {
    id: number;
    title: string;
    author: string;
    date: string;
    views: number;
    likes: number;
}

const Board = () => {
    const { isAuthenticated } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');

    // 더미 데이터
    const dummyPosts: Post[] = [
        {
            id: 1,
            title: "React와 Spring Boot로 블로그 만들기",
            author: "신형섭",
            date: "2024-11-24",
            views: 150,
            likes: 23
        },
        // Add more dummy posts...
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">게시판</h1>
                {isAuthenticated && (
                    <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                        <Plus size={20} />
                        글쓰기
                    </button>
                )}
            </div>

            {/* Search Bar */}
            <div className="relative">
                <input
                    type="text"
                    placeholder="검색어를 입력하세요"
                    className="w-full pl-10 pr-4 py-2 border rounded-lg"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>

            {/* Posts List */}
            <div className="bg-white rounded-lg shadow">
                <div className="grid grid-cols-12 gap-4 p-4 border-b font-semibold text-gray-600">
                    <div className="col-span-6">제목</div>
                    <div className="col-span-2">작성자</div>
                    <div className="col-span-2">작성일</div>
                    <div className="col-span-1">조회</div>
                    <div className="col-span-1">좋아요</div>
                </div>

                {dummyPosts.map((post) => (
                    <div
                        key={post.id}
                        className="grid grid-cols-12 gap-4 p-4 border-b hover:bg-gray-50 transition-colors"
                    >
                        <div className="col-span-6 font-medium hover:text-blue-500 cursor-pointer">
                            {post.title}
                        </div>
                        <div className="col-span-2 text-gray-600">{post.author}</div>
                        <div className="col-span-2 text-gray-600">{post.date}</div>
                        <div className="col-span-1 text-gray-600">{post.views}</div>
                        <div className="col-span-1 text-gray-600">{post.likes}</div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((page) => (
                    <button
                        key={page}
                        className={`px-4 py-2 rounded ${
                            page === 1
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                    >
                        {page}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Board;
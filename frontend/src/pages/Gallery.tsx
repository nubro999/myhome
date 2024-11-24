// src/pages/Gallery.tsx
import React, { useState } from 'react';
import { Plus, Filter } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Image {
    id: number;
    url: string;
    title: string;
    description: string;
    category: string;
    date: string;
}

const Gallery = () => {
    const { isAuthenticated } = useAuth();
    const [activeCategory, setActiveCategory] = useState('all');

    // 더미 데이터
    const categories = ['all', 'project', 'daily', 'event'];
    const dummyImages: Image[] = [
        {
            id: 1,
            url: "https://via.placeholder.com/300",
            title: "프로젝트 스크린샷",
            description: "React와 Spring Boot를 활용한 프로젝트",
            category: "project",
            date: "2024-11-24"
        },
        // Add more dummy images...
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">사진첩</h1>
                {isAuthenticated && (
                    <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                        <Plus size={20} />
                        사진 업로드
                    </button>
                )}
            </div>

            {/* Categories */}
            <div className="flex gap-4">
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`px-4 py-2 rounded-lg ${
                            activeCategory === category
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                        onClick={() => setActiveCategory(category)}
                    >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                ))}
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dummyImages.map((image) => (
                    <div
                        key={image.id}
                        className="bg-white rounded-lg shadow-lg overflow-hidden group"
                    >
                        <div className="relative aspect-w-16 aspect-h-9">
                            <img
                                src={image.url}
                                alt={image.title}
                                className="object-cover w-full h-full"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center">
                                <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-center p-4">
                                    <h3 className="text-lg font-semibold">{image.title}</h3>
                                    <p className="text-sm">{image.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold">{image.title}</h3>
                            <p className="text-gray-600 text-sm">{image.date}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Load More Button */}
            <div className="text-center">
                <button className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
                    더 보기
                </button>
            </div>
        </div>
    );
};

export default Gallery;
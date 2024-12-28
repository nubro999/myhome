import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
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
    const [images, setImages] = useState<Image[]>([]); // 실제 데이터를 저장할 상태
    const [loading, setLoading] = useState(false); // 로딩 상태
    const [error, setError] = useState<string | null>(null); // 에러 상태

    const categories = ['all', 'project', 'daily', 'event'];

    // API 호출 함수
    const fetchImages = async (category: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `/api/gallery?category=${category}` // 백엔드 API 엔드포인트
            );

            if (!response.ok) {
                throw new Error('이미지를 가져오는 데 실패했습니다.');
            }

            const data: Image[] = await response.json();
            setImages(data);
        } catch (err: any) {
            setError(err.message || '알 수 없는 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    // 컴포넌트가 마운트되었을 때 및 카테고리가 변경될 때 호출
    useEffect(() => {
        fetchImages(activeCategory);
    }, [activeCategory]);

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

            {/* Error Message */}
            {error && (
                <div className="text-red-500 text-center">
                    {error}
                </div>
            )}

            {/* Loading Spinner */}
            {loading && (
                <div className="text-center">
                    <p>로딩 중...</p>
                </div>
            )}

            {/* Gallery Grid */}
            {!loading && images.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((image) => (
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
            )}

            {/* No Images Message */}
            {!loading && images.length === 0 && !error && (
                <div className="text-center text-gray-500">
                    이미지가 없습니다.
                </div>
            )}

            {/* Load More Button */}
            <div className="text-center">
                <button
                    className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                    onClick={() => fetchImages(activeCategory)}
                >
                    더 보기
                </button>
            </div>
        </div>
    );
};

export default Gallery;

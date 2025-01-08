import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import UploadModal from '../components/gallery/UploadModal';

interface Image {
    id: number;
    imagePath: string;
    title: string;
    description: string;
    category: string;
}

const Gallery = () => {
    const { isAuthenticated } = useAuth();
    const [activeCategory, setActiveCategory] = useState('all');
    const [images, setImages] = useState<Image[]>([]); // 초기값을 빈 배열로 설정
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(0);
    const [isLastPage, setIsLastPage] = useState(false);
    const [isUploadModalOpen, setUploadModalOpen] = useState(false);

    const categories = ['all', 'project', 'daily', 'event'];

    // 이미지 목록 가져오기
    const fetchImages = async (category: string, nextPage: number = 0) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/gallery?category=${category}&page=${nextPage}`);
            if (!response.ok) {
                console.error('API 호출 실패:', response.status, response.statusText);
                throw new Error('이미지를 가져오는 데 실패했습니다.');
            }

            const data: { images: Image[]; lastPage: boolean } = await response.json();

            // API 응답 데이터 검증
            if (!data || !Array.isArray(data.images)) {
                throw new Error('API 응답이 잘못되었습니다. images가 배열이 아닙니다.');
            }

            setImages((prevImages) =>
                nextPage === 0 ? data.images : [...prevImages, ...data.images]
            );
            setIsLastPage(data.lastPage);
            setPage(nextPage);
        } catch (err: any) {
            console.error(err.message || '알 수 없는 오류가 발생했습니다.');
            setError(err.message || '알 수 없는 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setImages([]); // 상태 초기화
        fetchImages(activeCategory);
    }, [activeCategory]);

    const handleUpload = async (formData: FormData): Promise<void> => {
        try {
            const response = await fetch('/api/gallery', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                console.error('업로드 실패:', response.status, response.statusText);
                throw new Error('이미지 업로드에 실패했습니다.');
            }

            setPage(0);
            fetchImages(activeCategory, 0);
            setUploadModalOpen(false);
        } catch (err: any) {
            console.error(err.message || '업로드 중 오류가 발생했습니다.');
            setError('이미지 업로드 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">사진첩</h1>
                {isAuthenticated && (
                    <button
                        onClick={() => setUploadModalOpen(true)}
                        className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        <Plus size={20} />
                        사진 업로드
                    </button>
                )}
            </div>

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

            {error && <div className="text-red-500 text-center">{error}</div>}
            {loading && <div className="text-center">로딩 중...</div>}

            {!loading && !error && Array.isArray(images) && images.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((image) => (
                        <div key={image.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <img src={image.imagePath} alt={image.title} className="w-full" />
                            <div className="p-4">
                                <h3 className="font-semibold">{image.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                !loading &&
                !error && <div className="text-center text-gray-500">이미지가 없습니다.</div>
            )}

            {!isLastPage && !loading && (
                <div className="text-center">
                    <button
                        className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                        onClick={() => fetchImages(activeCategory, page + 1)}
                    >
                        더 보기
                    </button>
                </div>
            )}

            {isUploadModalOpen && (
                <UploadModal
                    isOpen={isUploadModalOpen}
                    onClose={() => setUploadModalOpen(false)}
                    onUpload={handleUpload}
                />
            )}
        </div>
    );
};

export default Gallery;



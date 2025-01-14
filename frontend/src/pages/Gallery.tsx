import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import UploadModal from '../components/gallery/UploadModal';

interface Gallery {
    id: number;
    fileUrl: string; // Spring Boot에서 제공하는 이미지 URL
    title: string;
    description: string;
}

const Gallery = () => {
    const { isAuthenticated } = useAuth();
    const [images, setImages] = useState<Gallery[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isUploadModalOpen, setUploadModalOpen] = useState(false);

    // 이미지 목록 가져오기
    const fetchImages = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/gallery`);
            if (!response.ok) {
                console.error('API 호출 실패:', response.status, response.statusText);
                throw new Error('이미지를 가져오는 데 실패했습니다.');
            }

            const data: Gallery[] = await response.json();
            setImages(data);
        } catch (err: any) {
            console.error(err.message || '알 수 없는 오류가 발생했습니다.');
            setError(err.message || '알 수 없는 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

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

            // 업로드 후 이미지 목록 갱신
            fetchImages();
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

            {error && <div className="text-red-500 text-center">{error}</div>}
            {loading && <div className="text-center">로딩 중...</div>}

            {!loading && !error && images.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((image) => (
                        <div key={image.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <img src={image.fileUrl} alt={image.title} className="w-full " />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-4 text-gray-500">{image.title}</h3>
                                <p className="text-gray-500">{image.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                !loading &&
                !error && <div className="text-center text-gray-500">이미지가 없습니다.</div>
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





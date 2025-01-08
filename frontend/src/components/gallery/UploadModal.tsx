import React, { useState } from "react";

interface UploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpload: (formData: FormData) => Promise<void>;
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, onUpload }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("project");
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;

        // 파일 형식 및 크기 검증
        if (selectedFile && !selectedFile.type.startsWith("image/")) {
            setError("이미지 파일만 업로드할 수 있습니다.");
            return;
        }

        const maxSize = 5 * 1024 * 1024; // 5MB
        if (selectedFile && selectedFile.size > maxSize) {
            setError("파일 크기는 5MB를 초과할 수 없습니다.");
            return;
        }

        setError(null);
        setFile(selectedFile);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setUploading(true);
        setError(null);

        if (!file) {
            setError("이미지를 선택해주세요.");
            setUploading(false);
            return;
        }

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("title", title);
            formData.append("description", description);
            formData.append("category", category);

            await onUpload(formData);

            // 초기화 및 닫기
            handleClose();
        } catch (err) {
            if (err instanceof Error) {
                setError(`업로드 실패: ${err.message}`);
            } else {
                setError("업로드 실패: 알 수 없는 에러");
            }
        } finally {
            setUploading(false);
        }
    };

    const handleClose = () => {
        setTitle("");
        setDescription("");
        setFile(null);
        setCategory("project");
        setError(null);
        onClose();
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-full max-w-lg p-8 rounded-lg shadow-lg space-y-6">
                <h2 className="text-xl font-bold text-center">사진 업로드</h2>

                {error && <div className="text-red-500 text-center">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">이미지 파일</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="block w-full border rounded-lg p-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">제목</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="block w-full border rounded-lg p-2"
                            placeholder="제목을 입력하세요"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">설명</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="block w-full border rounded-lg p-2"
                            placeholder="설명을 입력하세요"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">카테고리</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="block w-full border rounded-lg p-2"
                        >
                            <option value="project">Project</option>
                            <option value="daily">Daily</option>
                            <option value="event">Event</option>
                        </select>
                    </div>

                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                            disabled={uploading}
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            disabled={uploading}
                        >
                            {uploading ? "업로드 중..." : "업로드"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UploadModal;

import React, { useState, useEffect } from 'react';
import { Plus, Search, Trash } from 'lucide-react'; // Trash 아이콘 추가
import api from '../api/axios';

interface Post {
    id: number;
    title: string;
    author: string;
    createAt: string;
    updateAt: string;
}

const Board = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newPost, setNewPost] = useState({ title: '', author: '', content: '' });

    // 게시글 가져오기
    useEffect(() => {
        api.get<Post[]>('/api/posts')
            .then((res) => {
                setPosts(res.data);
                setFilteredPosts(res.data);
            })
            .catch((error) => {
                console.error('Error fetching posts:', error);
            });
    }, []);

    // 검색어 필터링
    useEffect(() => {
        setFilteredPosts(posts.filter((post) =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase())
        ));
    }, [searchTerm, posts]);

    // 새 글 작성
    const handleCreatePost = async () => {
        try {
            const res = await api.post<Post>('/api/posts', newPost);
            const updatedPosts = [...posts, res.data];
            setPosts(updatedPosts);
            setFilteredPosts(updatedPosts); // posts와 filteredPosts를 동일하게 유지
            setNewPost({ title: '', author: '', content: '' });
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };


    // 글 삭제
    const handleDeletePost = async (postId: number) => {
        try {
            await api.delete(`/api/posts/${postId}`);
            const updatedPosts = posts.filter((post) => post.id !== postId);
            setPosts(updatedPosts);
            setFilteredPosts(updatedPosts); // posts와 filteredPosts를 동기화
            console.log('Post deleted successfully');
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };


    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">게시판</h1>
                <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                    <Plus size={20} /> 글쓰기
                </button>
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
                {filteredPosts.map((post) => (
                    <div key={post.id} className="p-4 border-b flex justify-between items-center">
                        <div>
                            <div>{post.title}</div>
                            <div className="text-gray-500">{post.author}</div>
                        </div>
                        {/* 삭제 버튼 */}
                        <button
                            onClick={() => handleDeletePost(post.id)}
                            className="text-red-500 hover:text-red-700"
                        >
                            <Trash size={20} />
                        </button>
                    </div>
                ))}
            </div>

            {/* Create Post Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">새 글 작성</h2>
                        <input
                            type="text"
                            placeholder="제목"
                            className="w-full border px-4 py-2 rounded-lg mb-2"
                            value={newPost.title}
                            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="작성자"
                            className="w-full border px-4 py-2 rounded-lg mb-2"
                            value={newPost.author}
                            onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
                        />
                        <textarea
                            placeholder="내용"
                            className="w-full border px-4 py-2 rounded-lg mb-2"
                            rows={4}
                            value={newPost.content}
                            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                        />
                        <div className="flex justify-end space-x-2">
                            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-300 rounded-lg">
                                취소
                            </button>
                            <button onClick={handleCreatePost} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                                작성
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Board;

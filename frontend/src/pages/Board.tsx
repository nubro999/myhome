import React, { useState, useEffect } from 'react';
import { Plus, Search, Trash } from 'lucide-react';
import { format } from 'date-fns'; // 날짜 포맷팅 라이브러리
import axios from 'axios';
import instance from "../api/axios";

const API_URL = process.env.REACT_APP_API_URL;

interface Post {
    id: number;
    title: string;
    author: string;
    createdAt: string;
    updatedAt: string;
    content: string;
}

const Board = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [newPost, setNewPost] = useState({ title: '', author: '', content: '', createAt: '', updateAt: '' });

    useEffect(() => {
        instance.get<Post[]>(`${API_URL}/api/posts`) // API_URL을 사용
            .then((res) => {
                setPosts(res.data);
                setFilteredPosts(res.data);
            })
            .catch((error) => {
                console.error('Error fetching posts:', error);
            });
    }, []);

    useEffect(() => {
        setFilteredPosts(
            posts.filter((post) =>
                post.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, posts]);

    const handleCreatePost = async () => {
        try {
            const res = await instance.post<Post>(`${API_URL}/api/posts`, newPost);
            const updatedPosts = [...posts, res.data];
            setPosts(updatedPosts);
            setFilteredPosts(updatedPosts);
            setNewPost({ title: '', author: '', content: '', createAt: '', updateAt: '' });
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    const handleDeletePost = async (postId: number) => {
        try {
            await instance.delete(`${API_URL}/api/posts/${postId}`);
            const updatedPosts = posts.filter((post) => post.id !== postId);
            setPosts(updatedPosts);
            setFilteredPosts(updatedPosts);
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const handlePostClick = (post: Post) => {
        setSelectedPost(post);
    };

    const formatDate = (dateString: string) => {
        try {
            return format(new Date(dateString), 'yyyy-MM-dd HH:mm:ss');
        } catch {
            return '날짜 정보 없음';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">게시판</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                    <Plus size={20} /> 글쓰기
                </button>
            </div>

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

            <div className="bg-white rounded-lg shadow">
                {filteredPosts.map((post) => (
                    <div
                        key={post.id}
                        className="p-4 border-b flex justify-between items-center text-gray-500 cursor-pointer"
                        onClick={() => handlePostClick(post)}
                    >
                        <div>
                            <div className="font-bold">{post.title}</div>
                            <div className="text-gray-600">작성자: {post.author}</div>

                        </div>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDeletePost(post.id);
                            }}
                            className="text-red-500 hover:text-red-700"
                        >
                            <Trash size={20} />
                        </button>
                    </div>
                ))}
            </div>

            {selectedPost && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[80vh] overflow-y-auto">
                        <h2 className="text-xl font-bold mb-4 text-gray-900">{selectedPost.title}</h2>
                        <p className="text-gray-600 mb-2">작성자: {selectedPost.author}</p>
                        <p className="text-gray-500">create: {formatDate(selectedPost.createdAt)}</p>
                        <p className="text-gray-500">update: {formatDate(selectedPost.updatedAt)}</p>
                        <div className="mt-4">
                            <p className="text-gray-700 whitespace-pre-wrap">{selectedPost.content}</p>
                        </div>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setSelectedPost(null)}
                                className="px-4 py-2 bg-gray-300 rounded-lg text-white"
                            >
                                닫기
                            </button>
                        </div>
                    </div>
                </div>
            )}


            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">새 글 작성</h2>
                        <input
                            type="text"
                            placeholder="제목"
                            className="w-full border px-4 py-2 rounded-lg mb-2 text-gray-600"
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
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 bg-gray-300 rounded-lg"
                            >
                                취소
                            </button>
                            <button
                                onClick={handleCreatePost}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                            >
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

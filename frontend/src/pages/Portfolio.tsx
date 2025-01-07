import React, { useState, useEffect } from 'react';
import { Plus, Search, Trash } from 'lucide-react'; // 아이콘 추가
import api from '../api/axios';

interface Portfolio {
    id: number;
    title: string;
    description: string;
    tags: string[];
    github: string;
    demo: string;
}

const Portfolio = () => {
    const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
    const [filteredPortfolios, setFilteredPortfolios] = useState<Portfolio[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newPortfolio, setNewPortfolio] = useState({
        title: '',
        description: '',
        tags: '',
        github: '',
        demo: '',
    });

    // 포트폴리오 가져오기
    useEffect(() => {
        api.get<Portfolio[]>('/api/portfolio')
            .then((res) => {
                setPortfolios(res.data);
                setFilteredPortfolios(res.data);
            })
            .catch((error) => {
                console.error('Error fetching portfolios:', error);
            });
    }, []);

    // 검색어 필터링
    useEffect(() => {
        setFilteredPortfolios(
            portfolios.filter((portfolio) =>
                portfolio.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, portfolios]);

    // 새 포트폴리오 생성
    const handleCreatePortfolio = async () => {
        try {
            const res = await api.post<Portfolio>('/api/portfolio', {
                ...newPortfolio,
                tags: newPortfolio.tags.split(',').map((tag) => tag.trim()),
            });
            const updatedPortfolios = [...portfolios, res.data];
            setPortfolios(updatedPortfolios);
            setFilteredPortfolios(updatedPortfolios); // portfolios와 filteredPortfolios 동기화
            setNewPortfolio({ title: '', description: '', tags: '', github: '', demo: '' });
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error creating portfolio:', error);
        }
    };

    // 포트폴리오 삭제
    const handleDeletePortfolio = async (portfolioId: number) => {
        try {
            await api.delete(`/api/portfolio/${portfolioId}`);
            const updatedPortfolios = portfolios.filter((portfolio) => portfolio.id !== portfolioId);
            setPortfolios(updatedPortfolios);
            setFilteredPortfolios(updatedPortfolios); // portfolios와 filteredPortfolios 동기화
            console.log('Portfolio deleted successfully');
        } catch (error) {
            console.error('Error deleting portfolio:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="page-header mb-8">
                <h1 className="text-3xl font-bold">포트폴리오</h1>
                <p className="text-gray-600">제가 진행한 주요 프로젝트들입니다</p>
            </div>

            {/* 검색 및 추가 버튼 */}
            <div className="flex justify-between items-center mb-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="검색..."
                        className="input input-bordered pr-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute top-2 right-2 w-5 h-5 text-gray-500" />
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn btn-primary flex items-center"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    새 포트폴리오 추가
                </button>
            </div>

            {/* 포트폴리오 리스트 */}
            <div className="space-y-6">
                {filteredPortfolios.map((portfolio) => (
                    <div key={portfolio.id} className="card card-hover card-bordered">
                        <div className="card-body">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-xl font-semibold mb-2">{portfolio.title}</h2>
                                    <p className="text-gray-600 mb-4">{portfolio.description}</p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {portfolio.tags.map((tag, index) => (
                                            <span key={index} className="badge badge-primary">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <a
                                        href={portfolio.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-secondary"
                                    >
                                        GitHub
                                    </a>
                                    <a
                                        href={portfolio.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-primary"
                                    >
                                        Demo
                                    </a>
                                    <button
                                        onClick={() => handleDeletePortfolio(portfolio.id)}
                                        className="btn btn-danger flex items-center"
                                    >
                                        <Trash className="w-5 h-5 mr-1" />
                                        삭제
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 새 포트폴리오 추가 모달 */}
            {isModalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h2 className="text-xl font-semibold mb-4">새 포트폴리오 추가</h2>
                        <div className="grid grid-cols-1 gap-4">
                            <input
                                type="text"
                                placeholder="프로젝트 제목"
                                className="input input-bordered"
                                value={newPortfolio.title}
                                onChange={(e) =>
                                    setNewPortfolio({ ...newPortfolio, title: e.target.value })
                                }
                            />
                            <input
                                type="text"
                                placeholder="설명"
                                className="input input-bordered"
                                value={newPortfolio.description}
                                onChange={(e) =>
                                    setNewPortfolio({ ...newPortfolio, description: e.target.value })
                                }
                            />
                            <input
                                type="text"
                                placeholder="태그 (쉼표로 구분)"
                                className="input input-bordered"
                                value={newPortfolio.tags}
                                onChange={(e) =>
                                    setNewPortfolio({ ...newPortfolio, tags: e.target.value })
                                }
                            />
                            <input
                                type="text"
                                placeholder="GitHub 링크"
                                className="input input-bordered"
                                value={newPortfolio.github}
                                onChange={(e) =>
                                    setNewPortfolio({ ...newPortfolio, github: e.target.value })
                                }
                            />
                            <input
                                type="text"
                                placeholder="데모 링크"
                                className="input input-bordered"
                                value={newPortfolio.demo}
                                onChange={(e) =>
                                    setNewPortfolio({ ...newPortfolio, demo: e.target.value })
                                }
                            />
                        </div>
                        <div className="modal-action">
                            <button onClick={handleCreatePortfolio} className="btn btn-primary">
                                저장
                            </button>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="btn btn-secondary"
                            >
                                취소
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Portfolio;


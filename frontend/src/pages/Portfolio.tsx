import React from 'react';
import { ExternalLink, Github, Globe } from 'lucide-react';

const Portfolio = () => {
    const portfolioItems = [
        {
            id: 1,
            title: "개인 블로그 프로젝트",
            description: "React와 Spring Boot를 활용한 개인 블로그",
            tags: ["React", "Spring Boot", "MySQL"],
            github: "https://github.com/yourusername/blog-project",
            demo: "https://your-blog-demo.com"
        },
        {
            id: 2,
            title: "웹 경매 시스템",
            description: "실시간 경매 기능이 있는 웹 애플리케이션",
            tags: ["Node.js", "React", "WebSocket"],
            github: "https://github.com/yourusername/auction-system",
            demo: "https://your-auction-demo.com"
        },
        {
            id: 3,
            title: "음악 공유 플랫폼",
            description: "음악 취향을 공유하는 소셜 플랫폼",
            tags: ["React", "Firebase", "Redux"],
            github: "https://github.com/yourusername/music-share",
            demo: "https://your-music-demo.com"
        }
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="page-header">
                <h1 className="text-3xl font-bold">포트폴리오</h1>
                <p className="text-gray-600">제가 진행한 주요 프로젝트들입니다</p>
            </div>

            <div className="space-y-6">
                {portfolioItems.map((item) => (
                    <div key={item.id} className="card card-hover card-bordered">
                        <div className="card-body">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                                    <p className="text-gray-600 mb-4">{item.description}</p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {item.tags.map((tag, index) => (
                                            <span key={index} className="badge badge-primary">
                        {tag}
                      </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <a
                                        href={item.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-secondary"
                                    >
                                        <Github className="w-5 h-5 mr-2" />
                                        GitHub
                                    </a>
                                    <a
                                        href={item.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-primary"
                                    >
                                        <Globe className="w-5 h-5 mr-2" />
                                        Demo
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Portfolio;
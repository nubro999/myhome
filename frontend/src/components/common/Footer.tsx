import React from 'react';
import { Link } from 'react-router-dom';
import {
    Github,
    Mail,
    Linkedin,
    Copyright,
    Heart
} from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* About Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">About</h3>
                        <p className="text-sm">
                            신형섭의 개인 블로그입니다. 웹 개발, 문학, 그리고 음악에 관한 이야기를 공유합니다.
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="https://github.com/nubro999"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition-colors"
                            >
                                <Github size={20} />
                            </a>
                            <a
                                href="https://linkedin.com/in/yourlinkedin"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition-colors"
                            >
                                <Linkedin size={20} />
                            </a>
                            <a
                                href="mailto:zcb167@gmail.com"
                                className="hover:text-white transition-colors"
                            >
                                <Mail size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/board" className="hover:text-white transition-colors">
                                    게시판
                                </Link>
                            </li>
                            <li>
                                <Link to="/gallery" className="hover:text-white transition-colors">
                                    사진첩
                                </Link>
                            </li>
                            <li>
                                <Link to="/portfolio" className="hover:text-white transition-colors">
                                    포트폴리오
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Contact</h3>
                        <ul className="space-y-2 text-sm">
                            <li>홍익대학교</li>
                            <li>English Literature & Computer Science</li>
                            <li>Email: zcb167@gmail.com</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <Copyright size={16} />
                            <span>{currentYear} Hyeongseob Shin. All rights reserved.</span>
                        </div>
                        <div className="mt-4 md:mt-0 flex items-center space-x-2">
                            <span>Made with</span>
                            <Heart size={16} className="text-red-500" />
                            <span>using React & Spring Boot</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
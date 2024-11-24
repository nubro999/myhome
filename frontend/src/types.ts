// src/types.ts

// User type
export interface User {
    id: string;
    email: string;
    name: string;
    createdAt: string;
}

// Auth Context type
export interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    register: (email: string, password: string, name: string) => Promise<void>;
}

// Navigation Item type
export interface NavItem {
    label: string;
    path: string;
    requireAuth?: boolean;
}

// Post type (for Board)
export interface Post {
    id: string;
    title: string;
    content: string;
    author: User;
    createdAt: string;
    updatedAt: string;
}

// Gallery Item type
export interface GalleryItem {
    id: string;
    title: string;
    imageUrl: string;
    description: string;
    createdAt: string;
    author: User;
}

// Portfolio Item type
export interface PortfolioItem {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    imageUrl?: string;
    githubUrl?: string;
    demoUrl?: string;
    createdAt: string;
}
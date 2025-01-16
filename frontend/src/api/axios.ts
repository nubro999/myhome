import axios from 'axios';

// Axios 인스턴스 생성
const instance = axios.create({
    baseURL: 'http://spring-boot-app:8080', // 백엔드 API 기본 URL
});

// 요청 인터셉터: Authorization 헤더 추가
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // 로컬 스토리지에서 토큰 가져오기

    if (token) {
        // headers가 undefined일 경우 객체로 초기화
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

// 응답 인터셉터: 에러 처리
instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Unauthorized 처리
            localStorage.removeItem('token'); // 토큰 삭제
            window.location.href = '/login'; // 로그인 페이지로 리다이렉트
        }
        return Promise.reject(error);
    }
);

export default instance;


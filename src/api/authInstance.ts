import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';
import * as Sentry from '@sentry/react';

export const authInstance = axios.create({
  baseURL: import.meta.env.VITE_AUTH_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 요청 인터셉터
authInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Sentry.captureException(error, {
      tags: { style: 'request_error' },
      extra: { config: error.config }
    });
    return Promise.reject(error);
  }
);

// 응답 인터셉터
authInstance.interceptors.response.use(
  (response) => response,
  // 공통 에러 처리
  async (error) => {
    const status = error.response ? error.response.status : null;
    if (status === 401) {
      const { isLogout } = useAuthStore();
      localStorage.removeItem('accessToken');
      alert('인증이 만료되었습니다. 다시 로그인해주세요.');
      isLogout();
    } else if (status === 500) {
      console.error('서버 에러가 발생했습니다.');
      alert('서버 에러가 발생했습니다. 나중에 다시 시도해주세요.');
    } else {
      // 그 외의 에러
      console.error('응답 에러:', error.message);
    }

    Sentry.captureException(error, {
      tags: { style: 'response_error', status },
      extra: {
        url: error.config.url,
        method: error.config.method,
        response: error.response ? error.response.data : null
      }
    });

    return Promise.reject(error);
  }
);

import '@testing-library/jest-dom';

Object.defineProperty(global, 'import', {
  value: {
    meta: {
      env: {
        VITE_AUTH_API_URL: 'http://example.com/api'
        // 다른 필요한 환경 변수들...
      }
    }
  },
  writable: true
});

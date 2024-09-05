import axios from 'axios';
import * as Sentry from '@sentry/react';

export const todosInstance = axios.create({
  baseURL: import.meta.env.VITE_JSON_API_URL
});

todosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    Sentry.captureException(error, {
      tags: { api: 'todos' },
      extra: {
        url: error.config.url,
        method: error.config.method
      }
    });
    return Promise.reject(error);
  }
);

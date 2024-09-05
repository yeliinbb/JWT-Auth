import axios from 'axios';

const accessToken = localStorage.getItem('accessToken');

const todosApi = axios.create({
  baseURL: import.meta.env.VITE_JSON_API_URL
});

export const getTodoList = async () => {
  if (!accessToken) return;
  try {
    const response = await todosApi.get('/todos?userId=1');
    console.log('todo data', response.data);
    return response.data;
  } catch (error) {
    console.error('할일 데이터를 가져오지 못했습니다.', error);
    throw error;
  }
};

import { todosInstance } from './todoInstance';

export const getTodoList = async () => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) return;

  try {
    const response = await todosInstance.get('/todos?userId=1');
    console.log('todo data', response.data);
    return response.data;
  } catch (error) {
    console.error('할일 데이터를 가져오지 못했습니다.', error);
    throw error;
  }
};

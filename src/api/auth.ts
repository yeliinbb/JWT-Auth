import { AxiosError } from 'axios';
import { RegisterInfo } from '../types/auth.types';
import { authInstance } from './authInstance';

export const register = async ({ id, password, nickname }: RegisterInfo) => {
  try {
    const response = await authInstance.post('/register', {
      id: id,
      password: password,
      nickname: nickname
    });
    console.log('회원가입 데이터 확인', response.data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      // 개별적인 에러 처리
      console.error('회원가입 중 에러 발생:', error?.response?.data);
      alert(error?.response?.data.message);
    }
  }
};

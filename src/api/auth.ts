import { AxiosError } from 'axios';
import { AuthFormData, ProfileInfo } from '../types/auth.types';
import { authInstance } from './authInstance';

export const register = async ({ id, password, nickname }: AuthFormData) => {
  try {
    const response = await authInstance.post('/register', {
      id: id,
      password: password,
      nickname: nickname
    });
    console.log('회원가입 데이터 확인', response.data);
    return response.data;
  } catch (error) {
    // 비즈니스 로직 개별적인 에러 처리
    if (error instanceof AxiosError && error?.response) {
      if (error.response.status === 409) {
        throw new Error('이미 존재하는 ID입니다.');
      } else {
        throw new Error('회원가입 중 오류가 발생했습니다.');
      }
    }
    throw error;
  }
};

export const login = async ({ id, password }: AuthFormData) => {
  try {
    const response = await authInstance.post('/login?expiresIn=60m', {
      id: id,
      password: password
    });
    console.log('로그인 데이터 확인', response.data);
    if (response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
      return response.data;
    }
  } catch (error) {
    if (error instanceof AxiosError && error?.response) {
      if (error.response.status === 401) {
        throw new Error('아이디 또는 비밀번호가 올바르지 않습니다.');
      } else {
        throw new Error('로그인 중 오류가 발생했습니다.');
      }
    }
    throw error;
  }
};

export const getUserInfo = async () => {
  try {
    const response = await authInstance.get('/user');
    console.log('유저 데이터 확인', response.data);
    return response.data;
  } catch (error) {
    localStorage.clear();
    alert('accessToken이 만료되었습니다.');
  }
};

export const updateProfile = async (formData: ProfileInfo) => {
  try {
    const response = await authInstance.patch('/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log('유저 업데이트 데이터 확인', response.data);
    return response.data;
  } catch (error) {
    console.error('프로필 업데이트 중 에러 발생', error);
    alert('프로필 업데이트에 실패했습니다.');
    throw error;
  }
};

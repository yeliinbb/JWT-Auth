import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthUserStore } from '../store/useAuthUserStore';
import { login, register } from '../api/auth';
import { AuthValidation } from '../types/auth.types';

interface AuthFormProps {
  isSignUp: boolean;
}

const useAuthForm = ({ isSignUp }: AuthFormProps) => {
  const idRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);
  const nicknameRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<Partial<AuthValidation>>({});
  const navigate = useNavigate();
  const { isLogin } = useAuthUserStore();

  const validate = () => {
    // 유효성 검사 로직
    const newErrors: Partial<AuthValidation> = {};
    const id = idRef.current?.value || '';
    const password = pwdRef.current?.value || '';
    const nickname = nicknameRef.current?.value || '';

    if (isSignUp && (!id || !password || !nickname)) {
      newErrors.all = '모든 항목을 입력해주세요.';
    } else if (!isSignUp && (!id || !password)) {
      newErrors.all = '아이디와 비밀번호를 입력해주세요.';
    } else {
      if (id.length < 4 || id.length > 10) {
        newErrors.id = '아이디는 4글자에서 10글자 사이여야 합니다.';
      }
      if (password.length < 4 || password.length > 15) {
        newErrors.password = '비밀번호는 4글자에서 15글자 사이여야 합니다.';
      }
      if (isSignUp && (nickname.length < 2 || nickname.length > 10)) {
        newErrors.nickname = '닉네임은 2글자에서 10글자 사이여야 합니다.';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    console.log('handleSubmit');
    e.preventDefault();
    if (!validate()) return;

    const formData = {
      id: idRef.current?.value || '',
      password: pwdRef.current?.value || '',
      ...(isSignUp && { nickname: nicknameRef.current?.value || '' })
    };
    try {
      if (isSignUp) {
        await register(formData);
        alert('회원가입이 완료되었습니다.');
        navigate('/sign-in');
      } else {
        const response = await login(formData);
        isLogin({ id: response.id });
        alert('로그인이 완료되었습니다.');
        navigate('/');
      }
    } catch (error) {
      alert(isSignUp ? '회원가입 실패' : '로그인 실패');
      console.error(isSignUp ? '회원가입 오류' : '로그인 오류', error);
    } finally {
      [idRef, pwdRef, nicknameRef].forEach((ref) => {
        if (ref.current) ref.current.value = '';
      });
    }
  };

  return { idRef, pwdRef, nicknameRef, errors, handleSubmit };
};

export default useAuthForm;

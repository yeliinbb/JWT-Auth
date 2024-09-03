import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login, register } from '../api/auth';
import Input from '../components/Input';
import { useAuthUserStore } from '../store/useAuthUserStore';

const SignInPage = () => {
  const idRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);
  const nicknameRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { isLogin } = useAuthUserStore();

  const handleSubmitRegister = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (idRef.current && pwdRef.current && nicknameRef.current) {
      const id = idRef.current.value;
      const password = pwdRef.current.value;
      const nickname = nicknameRef.current.value;

      if (!id || !password || !nickname) {
        // 아이디, 패스워드, 닉네임 없을경우
        alert('모든 항목을 입력해주세요.');
        return;
      } else if (id.length > 4 || id.length < 10) {
        // 아이디 길이
        alert('아이디 길이는 4글자에서 10글자 사이 이내로만 가능합니다.');
        return;
      } else if (password.length > 4 || password.length < 15) {
        // 비밀번호 길이
        alert('비밀번호는 4글자에서 15글자 이내로만 가능합니다.');
        return;
      } else if (nickname.length > 4 || nickname.length < 10) {
        // 닉네임 길이
        alert('닉네임은 글자에서 10글자 이내로만 가능합니다.');
        return;
      }

      const response = await register({
        id: id,
        password: password,
        nickname: nickname
      });

      if (response) {
        idRef.current.value = '';
        pwdRef.current.value = '';
        nicknameRef.current.value = '';
        alert('회원가입이 완료되었습니다.');
      }
    }
  };

  const handleSubmitLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (idRef.current && pwdRef.current) {
      const id = idRef.current.value;
      const password = pwdRef.current.value;

      try {
        const response = await login({
          id: id,
          password: password
        });
        isLogin({ id: response.data.id });
        alert('로그인 성공');
        navigate('/');
      } catch (error) {
        alert('로그인 실패');
        console.error('로그인 오류', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmitLogin}>
      <Input refKey="id" ref={idRef} />
      <Input refKey="password" ref={pwdRef} />
      <button type="submit">로그인</button>
      <Link to="/sign-up">
        <p>회원가입하기</p>
      </Link>
    </form>
  );
};

export default SignInPage;

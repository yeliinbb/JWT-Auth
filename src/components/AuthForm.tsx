import { Link } from 'react-router-dom';
import AuthInput from './AuthInput';
import { AuthValidation } from '../types/auth.types';

interface FormProps {
  handleSubmit: (e: React.SyntheticEvent<Element, Event>) => Promise<void>;
  nicknameRef?: React.RefObject<HTMLInputElement>;
  idRef: React.RefObject<HTMLInputElement>;
  pwdRef: React.RefObject<HTMLInputElement>;
  errors: Partial<AuthValidation>;
  isSignUp: boolean;
}

const AuthForm = ({
  handleSubmit,
  nicknameRef,
  idRef,
  pwdRef,
  errors,
  isSignUp
}: FormProps) => {
  return (
    <form onSubmit={handleSubmit}>
      {isSignUp && nicknameRef && (
        <AuthInput refKey="nickname" ref={nicknameRef} errors={errors} />
      )}
      <AuthInput refKey="id" ref={idRef} errors={errors} />
      <AuthInput refKey="password" ref={pwdRef} errors={errors} />
      <button type="submit" className="bg-black text-white w-9 rounded-full">
        {isSignUp ? '회원가입' : '로그인'}
      </button>
      <Link to={isSignUp ? '/' : '/sign-up'}>
        <p>{isSignUp ? '로그인 하러가기' : '회원가입 하러가기'}</p>
      </Link>
    </form>
  );
};

export default AuthForm;

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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center mx-auto gap-2 w-30 bg-white shadow-lg rounded-2xl p-10"
    >
      {isSignUp && nicknameRef && (
        <AuthInput refKey="nickname" ref={nicknameRef} errors={errors} />
      )}
      <AuthInput refKey="id" ref={idRef} errors={errors} />
      <AuthInput refKey="password" ref={pwdRef} errors={errors} />
      {errors.all && <p className="text-sm text-red-500">{errors.all}</p>}
      <button
        type="submit"
        className="bg-black text-white rounded-lg px-2 py-1 text-center w-full text-lg font-medium"
      >
        {isSignUp ? '회원가입' : '로그인'}
      </button>
      <Link to={isSignUp ? '/' : '/auth/sign-up'}>
        <p className="underline text-sm">
          {isSignUp ? '로그인 하러가기' : '회원가입 하러가기'}
        </p>
      </Link>
    </form>
  );
};

export default AuthForm;

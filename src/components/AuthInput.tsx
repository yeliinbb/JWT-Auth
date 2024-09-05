import { forwardRef } from 'react';
import { AuthValidation } from '../types/auth.types';

interface InputProps {
  refKey: keyof typeof inputConfig;
  errors: Partial<AuthValidation>;
}

const inputConfig = {
  id: {
    name: '아이디',
    type: 'text',
    placeholder: '아이디를 입력해주세요.'
  },
  password: {
    name: '비밀번호',
    type: 'password',
    placeholder: '비밀번호를 입력해주세요.'
  },
  nickname: {
    name: '닉네임',
    type: 'text',
    placeholder: '닉네임을 입력해주세요.'
  }
};

const AuthInput = forwardRef<HTMLInputElement, InputProps>(
  ({ refKey, errors }, ref) => {
    const config = inputConfig[refKey];
    return (
      <div className="flex flex-col items-start justify-center w-full gap-1">
        <label htmlFor={refKey} className="text-lg font-medium w-16">
          {config.name}
        </label>
        <div className="flex flex-col">
          <input
            type={config.type}
            id={refKey}
            ref={ref}
            placeholder={config.placeholder}
            className="border border-gray-300 px-2 py-1 rounded-lg text-sm font-medium w-64"
          />
          {errors && <p className="text-sm text-red-500">{errors[refKey]}</p>}
        </div>
      </div>
    );
  }
);

export default AuthInput;

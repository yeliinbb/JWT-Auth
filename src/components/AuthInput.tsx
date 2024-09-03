import { forwardRef } from 'react';
import { AuthValidation } from '../types/auth.types';

interface InputProps {
  refKey: keyof typeof inputConfig;
  errors: Partial<AuthValidation>;
}

const inputConfig = {
  id: {
    name: 'id',
    type: 'text',
    placeholder: '아이디를 입력해주세요.'
  },
  password: {
    name: 'password',
    type: 'password',
    placeholder: '비밀번호를 입력해주세요.'
  },
  nickname: {
    name: 'nickname',
    type: 'text',
    placeholder: '닉네임를 입력해주세요.'
  }
};

const AuthInput = forwardRef<HTMLInputElement, InputProps>(
  ({ refKey, errors }, ref) => {
    const config = inputConfig[refKey];
    return (
      <div>
        <label htmlFor={refKey}>{refKey}</label>
        <input
          type={config.type}
          id={refKey}
          ref={ref}
          placeholder={config.placeholder}
        />
        {errors && <p>{errors[refKey]}</p>}
      </div>
    );
  }
);

export default AuthInput;

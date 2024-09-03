import { forwardRef } from 'react';

interface InputProps {
  refKey: keyof typeof inputConfig;
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

const Input = forwardRef<HTMLInputElement, InputProps>(({ refKey }, ref) => {
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
    </div>
  );
});

export default Input;

import useAuthForm from '../hooks/useAuthForm';
import AuthForm from '../components/AuthForm';

const SignUpPage = () => {
  const { idRef, pwdRef, nicknameRef, errors, handleSubmit } = useAuthForm({
    isSignUp: true
  });

  return (
    <AuthForm
      handleSubmit={handleSubmit}
      idRef={idRef}
      pwdRef={pwdRef}
      nicknameRef={nicknameRef}
      errors={errors}
      isSignUp={true}
    />
  );
};

export default SignUpPage;

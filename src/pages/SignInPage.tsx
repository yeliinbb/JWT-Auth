import useAuthForm from '../hooks/useAuthForm';
import AuthForm from '../components/AuthForm';

const SignInPage = () => {
  const { idRef, pwdRef, errors, handleSubmit } = useAuthForm({
    isSignUp: false
  });

  return (
    <AuthForm
      handleSubmit={handleSubmit}
      idRef={idRef}
      pwdRef={pwdRef}
      errors={errors}
      isSignUp={false}
    />
  );
};

export default SignInPage;

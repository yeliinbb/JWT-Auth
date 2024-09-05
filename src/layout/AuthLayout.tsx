import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="w-full h-full flex p-4 items-center justify-center">
      <Outlet />
    </div>
  );
};

export default AuthLayout;

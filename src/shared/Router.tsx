import {
  Navigate,
  RouterProvider,
  createBrowserRouter
} from 'react-router-dom';
import SignInPage from '../pages/SignInPage';
import MyPage from '../pages/MyPage';
import { ReactElement } from 'react';
import MainPage from '../pages/MainPage';
import MainLayout from '../layout/MainLayout';
import SignUpPage from '../pages/SignUpPage';
import { useAuthStore } from '../store/useAuthStore';
import AuthLayout from '../layout/AuthLayout';

interface RouterProps {
  element: ReactElement;
}

const PublicRoute = ({ element }: RouterProps) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <Navigate to="/" /> : element;
};

const PrivateRoute = ({ element }: RouterProps) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? element : <Navigate to="/auth/sign-in" />;
};

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: '/auth',
      element: <PublicRoute element={<AuthLayout />} />,
      children: [
        { path: 'sign-in', element: <SignInPage /> },
        { path: 'sign-up', element: <SignUpPage /> }
      ]
    },
    {
      path: '/',
      element: <PrivateRoute element={<MainLayout />} />,
      children: [
        { index: true, element: <MainPage /> },
        { path: 'my-page', element: <MyPage /> }
      ]
    },
    {
      path: '*',
      element: <Navigate to="/" replace />
    }
  ]);
  return <RouterProvider router={router} />;
};

export default AppRouter;

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
import { useAuthUserStore } from '../store/useAuthUserStore';

interface RouterProps {
  element: ReactElement;
}

const PublicRoute = ({ element }: RouterProps) => {
  const { isAuthenticated } = useAuthUserStore();
  return isAuthenticated ? <Navigate to="/" /> : element;
};

const PrivateRoute = ({ element }: RouterProps) => {
  const { isAuthenticated } = useAuthUserStore();
  return isAuthenticated ? element : <Navigate to="/sign-in" />;
};

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: '/sign-in',
      element: <PublicRoute element={<SignInPage />} />
    },
    {
      path: '/sign-up',
      element: <PublicRoute element={<SignUpPage />} />
    },
    {
      path: '/',
      element: <PrivateRoute element={<MainLayout />} />,
      children: [
        { path: '/', element: <MainPage /> },
        { path: '/my-page', element: <MyPage /> }
      ]
    }
  ]);
  return <RouterProvider router={router} />;
};

export default AppRouter;

import {
  Navigate,
  RouterProvider,
  createBrowserRouter
} from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import SignInPage from '../pages/SignInPage';
import MyPage from '../pages/MyPage';
import { ReactElement } from 'react';
import MainPage from '../pages/MainPage';
import MainLayout from '../layout/MainLayout';

interface RouterProps {
  element: ReactElement;
}

const PublicRoute = ({ element }: RouterProps) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <Navigate to="/" /> : element;
};

const PrivateRoute = ({ element }: RouterProps) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? element : <Navigate to="/sign-in" />;
};

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: '/sign-in',
      element: <PublicRoute element={<SignInPage />} />
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

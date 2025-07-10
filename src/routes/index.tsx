import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ROUTE_PATH } from '@/enum/RoutePath';
import NotFoundPage from '@/pages/NotFound/NotFoundPage';
import Loading from '@/components/BaseComponents/Loading';
import HomePage from '@/pages/Home/index';
import MainLayout from '@/layout/MainLayout';
import SignUpPage from '@/pages/Auth/Signup';
import SignInPage from '@/pages/Auth/Signin';
import ResetPasswordPage from '@/pages/Auth/ResetPassword';
import VerifyCodePage from '@/pages/Auth/VerifyCode';
import ChangePasswordPage from '@/pages/Auth/ChangePassword';
import DefaultLayout from '@/layout/DefaultLayout';

const router = createBrowserRouter([
  {
    path: ROUTE_PATH.HOME,
    element: <MainLayout />,
    children: [
      {
        element: <HomePage />,
        path: ROUTE_PATH.HOME,
      },
    ],
  },

  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: ROUTE_PATH.SIGNIN,
        element: <SignInPage />,
      },
      {
        path: ROUTE_PATH.REGISTER,
        element: <SignUpPage />,
      },
      {
        path: ROUTE_PATH.RESET_PASSWORD,
        element: <ResetPasswordPage />,
      },
      {
        path: ROUTE_PATH.VERIFY_CODE,
        element: <VerifyCodePage />,
      },
      {
        path: ROUTE_PATH.CHANGE_PASSWORD,
        element: <ChangePasswordPage />,
      },
    ],
  },

  {
    path: ROUTE_PATH.NOT_FOUND,
    element: <NotFoundPage />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} fallbackElement={<Loading />} />;
}

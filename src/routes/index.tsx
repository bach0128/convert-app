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
import RevenuePage from '@/pages/RevenueM';
import CostPage from '@/pages/CostM';
import TaxDeclarationPage from '@/pages/TaxDeclaration';
import ReportPage from '@/pages/Report';

const router = createBrowserRouter([
  {
    path: ROUTE_PATH.HOME,
    element: <MainLayout />,
    children: [
      {
        element: <HomePage />,
        path: ROUTE_PATH.HOME,
      },
      {
        element: <RevenuePage />,
        path: ROUTE_PATH.REVENUE,
      },
      {
        element: <CostPage />,
        path: ROUTE_PATH.COST,
      },
      {
        element: <TaxDeclarationPage />,
        path: ROUTE_PATH.TAXDECLARATION,
      },
      {
        element: <ReportPage />,
        path: ROUTE_PATH.REPORT,
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

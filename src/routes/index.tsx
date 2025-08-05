import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ROUTE_PATH } from '@/interfaces/RoutePath';
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
import BusinessHousehold from '@/pages/BusinessHousehold';
import SingleBusinessHousehold from '@/pages/BusinessHousehold/SingleBusinessHousehold';
import UnitMaterial from '@/pages/Material/UnitMaterial';
import GroupMaterial from '@/pages/Material/GroupMaterial';
import Material from '@/pages/Material/Material';
import MaterialList from '@/pages/Material';
import { ProtectedRoute } from './PrivateRoute';

const router = createBrowserRouter([
  {
    path: ROUTE_PATH.HOME,
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
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
        path: ROUTE_PATH.TAX_DECLARATION,
      },
      {
        element: <ReportPage />,
        path: ROUTE_PATH.REPORT,
      },
      {
        path: ROUTE_PATH.BUSINESS_HOUSEHOLD,
        children: [
          {
            index: true,
            element: <BusinessHousehold />,
          },
          {
            path: ':id',
            element: <SingleBusinessHousehold />,
          },
        ],
      },
      {
        element: <GroupMaterial />,
        path: ROUTE_PATH.GROUP_MATERIAL,
      },
      {
        element: <Material />,
        path: ROUTE_PATH.MATERIAL,
      },
      {
        element: <UnitMaterial />,
        path: ROUTE_PATH.UNIT,
      },
      {
        element: <MaterialList />,
        path: ROUTE_PATH.MATERIAL_LIST,
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

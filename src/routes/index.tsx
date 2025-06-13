import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTE_PATH } from "@/enum/RoutePath";
import NotFoundPage from "@/pages/NotFound/NotFoundPage";
import Loading from "@/components/Loading";
import HomePage from "@/pages/Home/index";
import MainLayout from "@/layout/MainLayout";

let router = createBrowserRouter([
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
    path: ROUTE_PATH.NOT_FOUND,
    element: <NotFoundPage />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} fallbackElement={<Loading />} />;
}

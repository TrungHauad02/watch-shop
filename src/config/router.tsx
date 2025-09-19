import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import * as Pages from '@/config/page';
import { WSLayout } from '@/components';
import { Suspense } from 'react';

const RootLayout = () => <Outlet />;

const DefaultLayout = () => (
  <WSLayout
    variant="default"
    scrollRestoration={true}
    showHeader={true}
    showFooter={true}
  />
);

// ==============================================
// ROUTER CONFIGURATION
// ==============================================
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <Pages.NotFoundPage />,
    children: [
      // Public routes with default layout
      {
        path: '',
        element: <DefaultLayout />,
        children: [
          {
            index: true,
            element: (
              <Suspense
                fallback={<Pages.LoadingPage message="Đang tải trang chủ..." />}
              >
                <Pages.HomePage />
              </Suspense>
            ),
          },
        ],
      },
      // Auth Pages
      {
        path: '',
        element: <DefaultLayout />,
        children: [
          {
            path: 'login',
            element: (
              <Suspense
                fallback={
                  <Pages.LoadingPage message="Đang tải trang đăng nhập..." />
                }
              >
                <Pages.LoginPage />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);

// ==============================================
// ROUTER PROVIDER COMPONENT
// ==============================================

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;

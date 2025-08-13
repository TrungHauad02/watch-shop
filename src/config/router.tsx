import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import * as Pages from '@/config/page';
import { LayoutProvider } from '@/components/WSLayout/WSLayout.utils';
import { WSLayout } from '@/components';
import { Suspense } from 'react';
import { COLOR_PALETTES } from '@/styles/colors';

const RootLayout = () => (
  <LayoutProvider>
    <Outlet />
  </LayoutProvider>
);

const AuthLayout = () => (
  <WSLayout variant="auth" backgroundColor={COLOR_PALETTES.richBlack[200]} />
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
        element: <WSLayout />,
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
        element: <AuthLayout />,
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
      {
        path: 'test',
        element: <WSLayout />,
        children: [
          {
            index: true,
            element: (
              <Suspense
                fallback={
                  <Pages.LoadingPage message="Đang tải trang test..." />
                }
              >
                <Pages.WSDemoPage />
              </Suspense>
            ),
          },
          {
            path: 'ws-button-demo',
            element: (
              <Suspense
                fallback={
                  <Pages.LoadingPage message="Đang tải trang test..." />
                }
              >
                <Pages.WSButtonDemoPage />
              </Suspense>
            ),
          },
          {
            path: 'ws-input-demo',
            element: (
              <Suspense
                fallback={
                  <Pages.LoadingPage message="Đang tải trang test..." />
                }
              >
                <Pages.WSInputDemoPage />
              </Suspense>
            ),
          },
          {
            path: 'ws-card-demo',
            element: (
              <Suspense
                fallback={
                  <Pages.LoadingPage message="Đang tải trang test..." />
                }
              >
                <Pages.WSCardDemoPage />
              </Suspense>
            ),
          },
          {
            path: 'ws-loading-demo',
            element: (
              <Suspense
                fallback={
                  <Pages.LoadingPage message="Đang tải trang test..." />
                }
              >
                <Pages.WSLoadingDemoPage />
              </Suspense>
            ),
          },
          {
            path: 'ws-modal-demo',
            element: (
              <Suspense
                fallback={
                  <Pages.LoadingPage message="Đang tải trang test..." />
                }
              >
                <Pages.WSModalDemoPage />
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

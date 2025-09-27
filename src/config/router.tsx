import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import * as Pages from '@/config/page';
import { WSLayout } from '@/components';
import { Suspense } from 'react';

const RootLayout = () => <Outlet />;

const DefaultLayout = () => (
  <WSLayout
    useContainer={false}
    contentPadding={{ top: 0, bottom: 0, left: 0, right: 0 }}
    variant="default"
    scrollRestoration={true}
    showHeader={true}
    showFooter={true}
    sx={{
      overflow: 'auto',
      overflowX: 'hidden',
    }}
  />
);

const AuthLayout = () => (
  <WSLayout
    variant="auth"
    sx={{
      overflow: 'auto',
      overflowX: 'hidden',
    }}
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
          {
            path: 'profile',
            element: (
              <Suspense
                fallback={
                  <Pages.LoadingPage message="Đang tải trang cá nhân..." />
                }
              >
                <Pages.ProfilePage />
              </Suspense>
            ),
          },
          {
            path: 'wishlist',
            element: (
              <Suspense
                fallback={
                  <Pages.LoadingPage message="Đang tải trang cá nhân..." />
                }
              >
                <Pages.WishlistPage />
              </Suspense>
            ),
          },
          {
            path: 'products',
            element: (
              <Suspense
                fallback={
                  <Pages.LoadingPage message="Đang tải trang sản phẩm..." />
                }
              >
                <Pages.ProductsPage />
              </Suspense>
            ),
          },
          {
            path: 'products/:productId',
            element: (
              <Suspense
                fallback={
                  <Pages.LoadingPage message="Đang tải trang cá nhân..." />
                }
              >
                <Pages.ProductDetailPage />
              </Suspense>
            ),
          },
        ],
      },

      // Auth Pages
      {
        path: '/auth',
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
          {
            path: 'register',
            element: (
              <Suspense
                fallback={
                  <Pages.LoadingPage message="Đang tải trang đăng ký..." />
                }
              >
                <Pages.RegisterPage />
              </Suspense>
            ),
          },
          {
            path: 'forget-password',
            element: (
              <Suspense
                fallback={
                  <Pages.LoadingPage message="Đang tải trang quên mật khẩu..." />
                }
              >
                <Pages.ForgetPasswordPage />
              </Suspense>
            ),
          },
          {
            path: 'reset-password/:token',
            element: (
              <Suspense
                fallback={
                  <Pages.LoadingPage message="Đang tải trang đặt lại mật khẩu..." />
                }
              >
                <Pages.ResetPasswordPage />
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

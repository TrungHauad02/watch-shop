import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Suspense } from 'react';

// Layout components
import WSLayout from '@components/WSLayout';
import WSLoading from '@components/WSLoading';

// Temporary placeholder components (will be replaced with actual pages)
const HomePage = () => (
  <WSLayout>
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>WatchStore - Trang chủ</h1>
      <p>Chào mừng đến với cửa hàng đồng hồ cao cấp</p>
    </div>
  </WSLayout>
);

const ProductsPage = () => (
  <WSLayout>
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Sản phẩm</h1>
      <p>Danh sách sản phẩm đồng hồ</p>
    </div>
  </WSLayout>
);

const LoginPage = () => (
  <WSLayout>
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Đăng nhập</h1>
      <p>Trang đăng nhập</p>
    </div>
  </WSLayout>
);

const NotFoundPage = () => (
  <WSLayout>
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>404 - Không tìm thấy trang</h1>
      <p>Trang bạn tìm kiếm không tồn tại</p>
    </div>
  </WSLayout>
);

// Loading fallback component
const LoadingFallback = () => (
  <WSLayout>
    <WSLoading variant="page" message="Đang tải trang..." minHeight="60vh" />
  </WSLayout>
);

// ==============================================
// ROUTER CONFIGURATION
// ==============================================
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <HomePage />
      </Suspense>
    ),
    errorElement: <NotFoundPage />,
  },
  {
    path: '/products',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ProductsPage />
      </Suspense>
    ),
  },
  {
    path: '/products/:id',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <div>
          Product Detail Page - ID: {window.location.pathname.split('/')[2]}
        </div>
      </Suspense>
    ),
  },
  {
    path: '/categories/:categoryId/products',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ProductsPage />
      </Suspense>
    ),
  },
  {
    path: '/brands/:brandId/products',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ProductsPage />
      </Suspense>
    ),
  },
  {
    path: '/login',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: '/register',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <div>Register Page</div>
      </Suspense>
    ),
  },
  {
    path: '/profile',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <div>Profile Page</div>
      </Suspense>
    ),
  },
  {
    path: '/wishlist',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <div>Wishlist Page</div>
      </Suspense>
    ),
  },
  {
    path: '/admin',
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <div>Admin Dashboard</div>
          </Suspense>
        ),
      },
      {
        path: 'products',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <div>Admin Products</div>
          </Suspense>
        ),
      },
      {
        path: 'categories',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <div>Admin Categories</div>
          </Suspense>
        ),
      },
      {
        path: 'brands',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <div>Admin Brands</div>
          </Suspense>
        ),
      },
      {
        path: 'users',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <div>Admin Users</div>
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

// ==============================================
// ROUTER PROVIDER COMPONENT
// ==============================================

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;

import { Routes, Route } from "react-router-dom";
import * as Layouts from "layouts";
import * as Pages from "pages";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<Layouts.AuthLayout />}>
        <Route path="/login" element={<Pages.LoginPage />} />
        <Route path="/register" element={<Pages.RegisterPage />} />
      </Route>

      {/* Protected routes */}
      <Route element={<Layouts.MainLayout />}>
        <Route path="/" element={<Pages.HomePage />} />
        <Route path="/products" element={<Pages.ProductPage />} />
        <Route path="/products/:id" element={<Pages.ProductDetailPage />} />
      </Route>
      <Route path="*" element={<Pages.ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;

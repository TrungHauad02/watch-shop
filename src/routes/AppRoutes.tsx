import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
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
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Pages.HomePage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

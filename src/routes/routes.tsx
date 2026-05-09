import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/LoginPage/Login";
import { MainLayout } from "../components/Layout/MainLayout";
import { ProtectedRoute } from "../components/ProtectedRoute";
import StaticsPage from "../pages/home/statics";
import SplashScreen from "../pages/splash/SplashScreen"

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/splash" replace />} />
      <Route path="/splash" element={<SplashScreen />} />
      <Route path="/login" element={<Login />} />

      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<StaticsPage />} />
       
      </Route>
    </Routes>
  );
}

export default AppRoutes;
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/LoginPage/Login";
import { MainLayout } from "../components/Layout/MainLayout";
import { ProtectedRoute } from "../components/ProtectedRoute";
import StaticsPage from "../pages/home/statics";
import SplashScreen from "../pages/splash/SplashScreen"
import { LanguagesPage } from "../pages/languages/LanguagesPage";
import UsersPage from "../pages/Users/Users"
import { AddUserPage } from "../pages/Users/AddUser"
import { DisplayUserInfo } from "../pages/Users/UserById";
import { TrainerPage } from "../pages/Users/AddTrainer";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/splash" replace />} />
      <Route path="/splash" element={<SplashScreen />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Navigate to="/dashboard" replace />} />

      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<StaticsPage />} />
        <Route path="/users/languages" element={<LanguagesPage />} />
        <Route path="users/display" element={<UsersPage/>}/>
        <Route path="users/display/:id" element={<DisplayUserInfo/>}/>
        <Route path="users/add" element={<AddUserPage/>}/>
        <Route path="users/trainer" element={<TrainerPage/>} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { getAccessToken, getRefreshToken } from "../features/admin/auth/authStorage";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = getAccessToken() || getRefreshToken();

  if (!token) {
    return <Navigate to="/splash" replace />;
  }

  return children;
};
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../pages/app/authenticate/AuthContext";

export function UserRoutes() {
  const auth = useAuth();

  return auth.user ? <Outlet /> : <Navigate to="/sign-in" />;
}

export function UnAuthRoutes() {
  const auth = useAuth();

  return auth.user ? <Outlet /> : <Navigate to="/" />;
}

export function SuperAdminRoutes() {
  const auth = useAuth();

  const allowed = auth.user?.role === "super_admin";

  return allowed ? <Outlet /> : <Navigate to="/sign-in" />;
}

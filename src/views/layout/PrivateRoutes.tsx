import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../pages/app/authenticate/AuthContext";

export function PrivateRoutes() {
  const auth = useAuth();

  return auth.user ? <Outlet /> : <Navigate to="/sign-in" />;
}

export function UnAuthRoutes() {
  const auth = useAuth();

  return auth.user ? <Navigate to="/" /> : <Outlet />;
}

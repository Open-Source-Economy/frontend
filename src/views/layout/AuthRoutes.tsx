import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../pages/app/authenticate/AuthContext";
import { UserRole } from "src/model";

export function AuthRoutes() {
  const auth = useAuth();

  if (process.env.REACT_APP_USE_MOCK_API === "true") {
    return <Outlet />;
  } else {
    return auth.loading ? <div>Loading...</div> : auth.authInfo?.user ? <Outlet /> : <Navigate to="/sign-up" />;
  }
}

export function UnAuthRoutes() {
  const auth = useAuth();

  if (process.env.REACT_APP_USE_MOCK_API === "true") {
    return <Outlet />;
  } else {
    return auth.loading ? <div>Loading...</div> : auth.authInfo?.user ? <Navigate to="/" /> : <Outlet />;
  }
}

export function SuperAdminRoutes() {
  const auth = useAuth();

  const allowed = auth.authInfo?.user?.role === UserRole.SUPER_ADMIN;

  if (process.env.REACT_APP_USE_MOCK_API === "true") {
    return <Outlet />;
  } else {
    return auth.loading ? <div>Loading...</div> : allowed ? <Outlet /> : <Navigate to="/sign-up" />;
  }
}

export function Logout() {
  const auth = useAuth();

  auth.logout();

  return auth.loading ? <div>Loading...</div> : <Navigate to="/" />;
}

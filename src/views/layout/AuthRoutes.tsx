import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../pages/app/authenticate/AuthContext";
import { UserRole } from "src/model";
import { config, Env } from "src/ultils";

import PageLoader from "src/components/common/PageLoader";

export function AuthRoutes() {
  const auth = useAuth();

  if (config.api.useMock) {
    return <Outlet />;
  } else {
    return auth.loading ? <PageLoader message="Authenticating user..." /> : auth.authInfo?.user ? <Outlet /> : <Navigate to="/sign-up" />;
  }
}

export function UnAuthRoutes() {
  const auth = useAuth();

  if (config.api.useMock) {
    return <Outlet />;
  } else {
    return auth.loading ? <PageLoader message="Loading user data..." /> : auth.authInfo?.user ? <Navigate to="/" /> : <Outlet />;
  }
}

export function NonProdRoutes() {
  if (config.env !== Env.Production) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />; // TODO: add 404 page
  }
}

export function SuperAdminRoutes() {
  const auth = useAuth();

  const allowed = auth.authInfo?.user?.role === UserRole.SUPER_ADMIN;

  if (config.api.useMock) {
    return <Outlet />;
  } else {
    return auth.loading ? <PageLoader message="Checking permissions..." /> : allowed ? <Outlet /> : <Navigate to="/sign-up" />;
  }
}

export function Logout() {
  const auth = useAuth();

  auth.logout();

  return auth.loading ? <PageLoader message="Logging out..." /> : <Navigate to="/" />;
}

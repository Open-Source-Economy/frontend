import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../pages/app/authenticate/AuthContext";
import { UserRole } from "src/model";
import { config, Env } from "src/ultils";
import Loader from "src/components/common/Loader";

export function AuthRoutes() {
  const auth = useAuth();

  if (config.api.useMock) {
    return <Outlet />;
  } else {
    return auth.loading ? <Loader isFullScreen={true} message="Authenticating..." /> : auth.authInfo?.user ? <Outlet /> : <Navigate to="/sign-up" />;
  }
}

export function UnAuthRoutes() {
  const auth = useAuth();

  if (config.api.useMock) {
    return <Outlet />;
  } else {
    return auth.loading ? <Loader isFullScreen={true} message="Checking authentication..." /> : auth.authInfo?.user ? <Navigate to="/" /> : <Outlet />;
  }
}

export function NonProdRoutes() {
  if (config.env !== Env.Production) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />; // TODO: Add 404 page
  }
}

export function SuperAdminRoutes() {
  const auth = useAuth();

  const allowed = auth.authInfo?.user?.role === UserRole.SUPER_ADMIN;

  if (config.api.useMock) {
    return <Outlet />;
  } else {
    return auth.loading ? <Loader isFullScreen={true} message="Loading Super Admin..." /> : allowed ? <Outlet /> : <Navigate to="/sign-up" />;
  }
}

export function Logout() {
  const auth = useAuth();

  auth.logout();

  return auth.loading ? <Loader isFullScreen={true} message="Logging out..." /> : <Navigate to="/" />;
}

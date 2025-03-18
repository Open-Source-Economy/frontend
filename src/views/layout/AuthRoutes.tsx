import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../pages";
import { UserRole } from "src/api/model";
import { config, Env } from "src/ultils";
import { PageNotFound } from "../pages/PageNotFound";
import { PageLoader } from "src/views/components/common/PageLoader";

export function AuthRoutes(props: { authPage: string }) {
  const auth = useAuth();
  const location = useLocation();

  if (config.api.useMock) {
    return <Outlet />;
  }

  if (auth.loading) {
    return <PageLoader message="Authenticating user..." />;
  }

  if (auth.authInfo?.user) {
    // If user is authenticated, allow access to the protected route
    return <Outlet />;
  }

  // Ensure we're passing the full location object
  return <Navigate to={props.authPage} state={{ from: { pathname: location.pathname } }} replace />;
}

export function NonProdRoutes() {
  if (config.env !== Env.Production) {
    return <Outlet />;
  } else {
    return <PageNotFound />;
  }
}

export function SuperAdminRoutes() {
  const auth = useAuth();

  const allowed = auth.authInfo?.user?.role === UserRole.SUPER_ADMIN;

  if (config.api.useMock) {
    return <Outlet />;
  } else {
    // TODO: add redirect "redirect" if it could be admin
    return auth.loading ? <PageLoader message="Checking permissions..." /> : allowed ? <Outlet /> : <Navigate to="/sign-up" />; // TODO: add  404 page
  }
}

export function Logout(props: { redirect: string }) {
  const auth = useAuth();

  useEffect(() => {
    auth.logout();
  }, []);

  return auth.loading ? <PageLoader message="Logging out..." /> : <Navigate to={props.redirect} />;
}

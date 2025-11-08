import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../pages";
import { UserRole } from "@open-source-economy/api-types";
import { config, Env } from "src/ultils";
import { PageNotFound } from "../pages/PageNotFound";
import { PageTransition } from "src/views/components/ui/page-transition";
import { paths } from "../../../paths";

export function AuthRoutes(props: { authPage: string }) {
  const auth = useAuth();
  const location = useLocation();

  if (config.api.useMock) {
    return <Outlet />;
  }

  if (auth.loading) {
    return <PageTransition isLoading={true} message="Authenticating user..." />;
  }

  if (auth.authInfo?.authenticatedUser) {
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

  const allowed = auth.authInfo?.authenticatedUser?.user.role === UserRole.SUPER_ADMIN;

  if (config.api.useMock || config.env !== Env.Production) {
    return <Outlet />;
  } else {
    // TODO: add redirect "redirect" if it could be admin
    return auth.loading ? <PageTransition isLoading={true} message="Checking permissions..." /> : allowed ? <Outlet /> : <Navigate to={paths.SIGN_IN} />; // TODO: add  404 page
  }
}

export function Logout(props: { redirect: string }) {
  const auth = useAuth();

  useEffect(() => {
    auth.logout();
  }, []);

  return auth.loading ? <PageTransition isLoading={true} message="Logging out..." /> : <Navigate to={props.redirect} />;
}

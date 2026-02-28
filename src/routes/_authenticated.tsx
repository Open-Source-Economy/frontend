import { createFileRoute, Outlet, Navigate } from "@tanstack/react-router";
import { useAuth } from "src/views/auth";
import { config } from "src/utils";
import { PageTransition } from "src/views/components/ui/page-transition";

export const Route = createFileRoute("/_authenticated")({
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const auth = useAuth();

  if (config.api.useMock) {
    return <Outlet />;
  }

  if (auth.loading) {
    return <PageTransition isLoading={true} message="Authenticating user..." />;
  }

  if (auth.authInfo) {
    return <Outlet />;
  }

  return <Navigate to="/developer" />;
}

import { createFileRoute, Outlet, Navigate } from "@tanstack/react-router";
import { useAuth } from "src/views/auth";
import { UserRole } from "@open-source-economy/api-types";
import { config, Env } from "src/utils";
import { PageTransition } from "src/views/components/ui/page-transition";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const auth = useAuth();
  const allowed = auth.authInfo?.user.role === UserRole.SUPER_ADMIN;

  if (config.api.useMock || config.env !== Env.Production) {
    return <Outlet />;
  }

  if (auth.loading) {
    return <PageTransition isLoading={true} message="Checking permissions..." />;
  }

  if (allowed) {
    return <Outlet />;
  }

  return (
    <Navigate
      to="/auth/identify"
      search={{ repository_token: undefined, company_token: undefined, email: undefined }}
    />
  );
}

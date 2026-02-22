import { createRootRoute, Outlet, ScrollRestoration } from "@tanstack/react-router";
import { TanStackRouterDevtools as _TanStackRouterDevtools } from "@tanstack/router-devtools";
import { AuthProvider } from "src/views/auth";
import { CurrencyProvider } from "src/context/CurrencyContext";
import { BackToTop } from "src/views/v1/components/common/BackToTop";
import { NotFoundPage } from "src/views/pages/natigation/NotFoundPage";
import { Analytics } from "@vercel/analytics/react";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundPage,
});

function RootComponent() {
  return (
    <AuthProvider>
      <CurrencyProvider>
        <ScrollRestoration />
        <Outlet />
        <Analytics />
        <BackToTop />
      </CurrencyProvider>
    </AuthProvider>
  );
}

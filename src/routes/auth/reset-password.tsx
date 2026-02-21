import { createFileRoute } from "@tanstack/react-router";
import { ResetPasswordStep } from "src/views/pages/authenticate/steps/ResetPasswordStep";

export const Route = createFileRoute("/auth/reset-password")({
  component: ResetPasswordStep,
  validateSearch: (search: Record<string, unknown>) => ({
    token: (search.token as string) || "",
  }),
});

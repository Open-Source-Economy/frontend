import { createFileRoute } from "@tanstack/react-router";
import { IdentificationStep } from "src/views/pages/authenticate/steps/IdentificationStep";

export const Route = createFileRoute("/auth/identify")({
  component: IdentificationStep,
  validateSearch: (search: Record<string, unknown>) => ({
    repository_token: (search.repository_token as string) || undefined,
    company_token: (search.company_token as string) || undefined,
    email: (search.email as string) || undefined,
  }),
});

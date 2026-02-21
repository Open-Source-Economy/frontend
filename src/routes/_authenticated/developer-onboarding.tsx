import { createFileRoute } from "@tanstack/react-router";
import OnboardingFlow from "src/views/pages/onboarding/OnboardingFlow";

export const Route = createFileRoute("/_authenticated/developer-onboarding")({
  component: OnboardingFlow,
  validateSearch: (search: Record<string, unknown>) => ({
    step: Number(search.step) || undefined,
  }),
});

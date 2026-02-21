import { createFileRoute } from "@tanstack/react-router";
import DevelopedOnboardingComplete from "src/views/pages/onboarding/completed/DevelopedOnboardingComplete";

export const Route = createFileRoute("/_authenticated/developer-onboarding-completed")({
  component: DevelopedOnboardingComplete,
});

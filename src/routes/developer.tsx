import { createFileRoute } from "@tanstack/react-router";
import OnboardingLandingPage from "src/views/pages/onboarding/landing/OnboardingLandingPage";

export const Route = createFileRoute("/developer")({
  component: OnboardingLandingPage,
});

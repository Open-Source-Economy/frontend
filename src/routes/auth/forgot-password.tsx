import { createFileRoute } from "@tanstack/react-router";
import { ForgotPasswordStep } from "src/views/pages/authenticate/steps/ForgotPasswordStep";

export const Route = createFileRoute("/auth/forgot-password")({
  component: ForgotPasswordStep,
});

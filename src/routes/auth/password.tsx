import { createFileRoute } from "@tanstack/react-router";
import { PasswordStep } from "src/views/pages/authenticate/steps/PasswordStep";

export const Route = createFileRoute("/auth/password")({
  component: PasswordStep,
});

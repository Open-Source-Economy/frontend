import { createFileRoute } from "@tanstack/react-router";
import { PrivacyPolicyPage } from "src/views/pages/PrivacyPolicyPage";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPolicyPage,
});

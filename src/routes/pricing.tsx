import { createFileRoute } from "@tanstack/react-router";
import { PricingPage } from "src/views/pages/pricing/PricingPage";

export const Route = createFileRoute("/pricing")({
  component: PricingPage,
});

import { createFileRoute } from "@tanstack/react-router";
import { CheckoutSuccessPage } from "src/views/pages/checkout/CheckoutSuccessPage";

export const Route = createFileRoute("/checkout/success")({
  component: CheckoutSuccessPage,
});

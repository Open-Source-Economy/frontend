import { createFileRoute } from "@tanstack/react-router";
import { FAQPage } from "src/views/pages/faq/FAQPage";

export const Route = createFileRoute("/faq")({
  component: FAQPage,
});

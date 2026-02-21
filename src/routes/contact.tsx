import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "src/views/pages/contact/ContactPage";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  validateSearch: (search: Record<string, unknown>) => ({
    reason: (search.reason as string) || undefined,
  }),
});

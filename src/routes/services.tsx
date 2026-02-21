import { createFileRoute } from "@tanstack/react-router";
import { ServicesPage } from "src/views/pages/services/ServicesPage";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
});

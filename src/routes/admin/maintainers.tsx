import { createFileRoute } from "@tanstack/react-router";
import { Maintainers } from "src/views/pages/admin/Maintainers";

export const Route = createFileRoute("/admin/maintainers")({
  component: Maintainers,
});

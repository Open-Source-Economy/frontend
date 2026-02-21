import { createFileRoute } from "@tanstack/react-router";
import { RepositorySyncPage } from "src/views/pages/admin/repositories/RepositorySyncPage";

export const Route = createFileRoute("/admin/repositories/sync")({
  component: RepositorySyncPage,
});

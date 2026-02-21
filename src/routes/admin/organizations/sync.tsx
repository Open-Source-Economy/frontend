import { createFileRoute } from "@tanstack/react-router";
import { OrganizationSyncPage } from "src/views/pages/admin/organizations/OrganizationSyncPage";

export const Route = createFileRoute("/admin/organizations/sync")({
  component: OrganizationSyncPage,
});

import { createFileRoute } from "@tanstack/react-router";
import { InviteCompanyUser } from "src/views";

export const Route = createFileRoute("/admin/invite-company-user")({
  component: InviteCompanyUser,
});

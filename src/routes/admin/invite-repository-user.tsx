import { createFileRoute } from "@tanstack/react-router";
import { InviteRepositoryUser } from "src/views/v1/pages/admin/inviteRepositoryUser";

export const Route = createFileRoute("/admin/invite-repository-user")({
  component: InviteRepositoryUser,
});

import { createFileRoute } from "@tanstack/react-router";
import { AdminHome } from "src/views/v1/pages/admin/adminHome/AdminHome";

export const Route = createFileRoute("/admin/")({
  component: AdminHome,
});

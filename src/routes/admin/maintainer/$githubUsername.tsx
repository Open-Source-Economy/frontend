import { createFileRoute } from "@tanstack/react-router";
import { Maintainer } from "src/views/pages/admin/Maintainer";

export const Route = createFileRoute("/admin/maintainer/$githubUsername")({
  component: Maintainer,
});

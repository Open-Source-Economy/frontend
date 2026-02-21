import { createFileRoute } from "@tanstack/react-router";
import { CreateProject } from "src/views";

export const Route = createFileRoute("/admin/project")({
  component: CreateProject,
});

import { createFileRoute } from "@tanstack/react-router";
import { ProjectsPage } from "src/views/pages/projects/ProjectsPage";

export const Route = createFileRoute("/projects")({
  component: ProjectsPage,
});

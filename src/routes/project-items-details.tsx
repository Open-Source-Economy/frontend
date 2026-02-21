import { createFileRoute } from "@tanstack/react-router";
import { ProjectItemsWithDetails } from "src/views/pages/projectItemsWithDetails/ProjectItemsWithDetails";

export const Route = createFileRoute("/project-items-details")({
  component: ProjectItemsWithDetails,
});

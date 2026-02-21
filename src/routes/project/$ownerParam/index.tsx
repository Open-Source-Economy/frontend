import { createFileRoute } from "@tanstack/react-router";
import { ProjectDetailPage } from "src/views/pages/project/ProjectDetailPage";

export const Route = createFileRoute("/project/$ownerParam/")({
  component: ProjectDetailPage,
});

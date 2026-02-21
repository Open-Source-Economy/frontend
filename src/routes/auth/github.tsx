import { createFileRoute } from "@tanstack/react-router";
import { GithubNoticeStep } from "src/views/pages/authenticate/steps/GithubNoticeStep";

export const Route = createFileRoute("/auth/github")({
  component: GithubNoticeStep,
});

import { createFileRoute } from "@tanstack/react-router";
import { SponsorshipPage } from "src/views/pages/supporter/SponsorshipPage";

export const Route = createFileRoute("/sponsorship")({
  component: SponsorshipPage,
});

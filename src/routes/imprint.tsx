import { createFileRoute } from "@tanstack/react-router";
import { ImprintPage } from "src/views/pages/ImprintPage";

export const Route = createFileRoute("/imprint")({
  component: ImprintPage,
});

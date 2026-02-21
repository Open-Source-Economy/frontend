import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "src/views/pages/home/HomePage";

export const Route = createFileRoute("/")({
  component: HomePage,
});

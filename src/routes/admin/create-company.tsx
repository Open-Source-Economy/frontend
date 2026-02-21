import { createFileRoute } from "@tanstack/react-router";
import { CreateCompany } from "src/views";

export const Route = createFileRoute("/admin/create-company")({
  component: CreateCompany,
});

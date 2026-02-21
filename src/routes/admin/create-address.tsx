import { createFileRoute } from "@tanstack/react-router";
import { CreateAddress } from "src/views";

export const Route = createFileRoute("/admin/create-address")({
  component: CreateAddress,
});

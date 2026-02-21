import { createFileRoute } from "@tanstack/react-router";
import { CreateManualInvoice } from "src/views";

export const Route = createFileRoute("/admin/create-manual-invoice")({
  component: CreateManualInvoice,
});

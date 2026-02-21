import { createFileRoute } from "@tanstack/react-router";
import { Pdf } from "src/views/pages/Pdf";

export const Route = createFileRoute("/terms-and-conditions")({
  component: () => <Pdf location="/terms-and-conditions.pdf" />,
});

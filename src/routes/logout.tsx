import { createFileRoute } from "@tanstack/react-router";
import { Logout } from "src/views/auth";

export const Route = createFileRoute("/logout")({
  component: () => <Logout redirect="/" />,
});

import { createFileRoute } from "@tanstack/react-router";
import { CreatePlanProductAndPrice } from "src/views/v1/pages/admin/createPlanProductAndPrice";

export const Route = createFileRoute("/admin/plan/create-product-and-price")({
  component: CreatePlanProductAndPrice,
});

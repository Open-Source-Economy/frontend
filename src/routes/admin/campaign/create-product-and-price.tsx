import { createFileRoute } from "@tanstack/react-router";
import { CreateCampaignProductAndPrice } from "src/views/v1/pages/admin/createCampaignProductAndPrice";

export const Route = createFileRoute("/admin/campaign/create-product-and-price")({
  component: CreateCampaignProductAndPrice,
});

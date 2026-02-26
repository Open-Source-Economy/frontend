import { PlanProductType, ProductType } from "@open-source-economy/api-types";
import { PlanFeature } from "./data";
import { credit } from "../../../../../../../model";
import { productTypeCredits } from "src/ultils/local-types";

const basic: Omit<PlanFeature, "name"> = {
  title: "Open Source Impact",
  detailsDescription: "gifted to maintainers",
  info: "We allocate your gift to high-impact projects you rely on",
  subtext: "Support proactive development of OSS you rely on",
  included: true,
};

export const openSourceImpacts: Record<PlanProductType, PlanFeature> = {
  [PlanProductType.INDIVIDUAL_PLAN]: {
    ...basic,
    name: `${credit.displayAmount(productTypeCredits(ProductType.INDIVIDUAL_PLAN) / 2, false)} monthly`,
    included: true,
  },
  [PlanProductType.START_UP_PLAN]: {
    ...basic,
    name: `${credit.displayAmount(productTypeCredits(ProductType.START_UP_PLAN) / 2, false)} monthly`,
    included: true,
  },
  [PlanProductType.SCALE_UP_PLAN]: {
    ...basic,
    name: `${credit.displayAmount(productTypeCredits(ProductType.SCALE_UP_PLAN) / 2, false)} monthly`,
    included: true,
  },
  [PlanProductType.ENTERPRISE_PLAN]: {
    ...basic,
    name: `${credit.displayAmount(productTypeCredits(ProductType.ENTERPRISE_PLAN) / 2, false)} monthly`,
    included: true,
  },
};

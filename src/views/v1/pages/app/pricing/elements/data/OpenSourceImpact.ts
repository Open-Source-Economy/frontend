import * as dto from "@open-source-economy/api-types";
import { PlanFeature } from "./data";
import { credit } from "../../../../../../../model";
import { productTypeCredits } from "src/utils/local-types";

const basic: Omit<PlanFeature, "name"> = {
  title: "Open Source Impact",
  detailsDescription: "gifted to maintainers",
  info: "We allocate your gift to high-impact projects you rely on",
  subtext: "Support proactive development of OSS you rely on",
  included: true,
};

export const openSourceImpacts: Record<dto.PlanProductType, PlanFeature> = {
  [dto.PlanProductType.INDIVIDUAL_PLAN]: {
    ...basic,
    name: `${credit.displayAmount(productTypeCredits(dto.ProductType.INDIVIDUAL_PLAN) / 2, false)} monthly`,
    included: true,
  },
  [dto.PlanProductType.START_UP_PLAN]: {
    ...basic,
    name: `${credit.displayAmount(productTypeCredits(dto.ProductType.START_UP_PLAN) / 2, false)} monthly`,
    included: true,
  },
  [dto.PlanProductType.SCALE_UP_PLAN]: {
    ...basic,
    name: `${credit.displayAmount(productTypeCredits(dto.ProductType.SCALE_UP_PLAN) / 2, false)} monthly`,
    included: true,
  },
  [dto.PlanProductType.ENTERPRISE_PLAN]: {
    ...basic,
    name: `${credit.displayAmount(productTypeCredits(dto.ProductType.ENTERPRISE_PLAN) / 2, false)} monthly`,
    included: true,
  },
};

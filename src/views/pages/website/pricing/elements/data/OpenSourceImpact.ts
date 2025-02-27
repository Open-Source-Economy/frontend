import { PlanProductType } from "../../../../../../model";
import { PlanFeature } from "./data";

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
    name: "$25 monthly",
    included: true,
  },
  [PlanProductType.START_UP_PLAN]: {
    ...basic,
    name: "$100 monthly",
    included: true,
  },
  [PlanProductType.SCALE_UP_PLAN]: {
    ...basic,
    name: "$500 monthly",
    included: true,
  },
  [PlanProductType.ENTERPRISE_PLAN]: {
    ...basic,
    name: "$2000 monthly",
    included: true,
  },
};

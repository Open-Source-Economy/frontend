import { PlanProductType } from "@open-source-economy/api-types";
import { PlanFeature } from "./data";

const basic: PlanFeature = {
  name: "Community Recognition",
  detailsDescription: "Build your reputation",
  info: "Featured in supporter page + profile badge",
  included: true,
};

export const communityRecognitions: Record<PlanProductType, PlanFeature> = {
  [PlanProductType.INDIVIDUAL_PLAN]: {
    ...basic,
    included: false,
  },
  [PlanProductType.START_UP_PLAN]: {
    ...basic,
    included: true,
  },
  [PlanProductType.SCALE_UP_PLAN]: {
    name: "Community Recognition",
    detailsDescription: "Customizable Supporter Profile",
    info: "Showcase your brand and OSS contributions",
    included: true,
  },
  [PlanProductType.ENTERPRISE_PLAN]: {
    name: "Premier Recognition",
    detailsDescription: "Premier Supporter Spotlight",
    info: "Exclusive recognition across our platforms",
    included: true,
  },
};

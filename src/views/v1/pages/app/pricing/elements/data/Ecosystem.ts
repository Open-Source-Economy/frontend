import * as dto from "@open-source-economy/api-types";
import { PlanFeature } from "./data";

const basic: PlanFeature = {
  name: "Support ecosystem sustainability",
  detailsDescription: "Invest in the future of open source",
  info: "Contribute to the long-term health of open source projects",
  included: true,
};

export const ecosystems: Record<dto.PlanProductType, PlanFeature> = {
  [dto.PlanProductType.INDIVIDUAL_PLAN]: {
    ...basic,
    included: true,
  },
  [dto.PlanProductType.START_UP_PLAN]: {
    ...basic,
    included: true,
  },
  [dto.PlanProductType.SCALE_UP_PLAN]: {
    ...basic,
    included: true,
  },
  [dto.PlanProductType.ENTERPRISE_PLAN]: {
    ...basic,
    included: true,
  },
};

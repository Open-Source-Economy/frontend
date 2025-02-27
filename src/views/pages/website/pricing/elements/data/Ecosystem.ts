import { PlanProductType } from "../../../../../../model";
import { PlanFeature } from "./data";

const basic: PlanFeature = {
  name: "Support ecosystem sustainability",
  detailsDescription: "Invest in the future of open source",
  info: "Contribute to the long-term health of open source projects",
  included: true,
};

export const ecosystems: Record<PlanProductType, PlanFeature> = {
  [PlanProductType.INDIVIDUAL_PLAN]: {
    ...basic,
    included: true,
  },
  [PlanProductType.START_UP_PLAN]: {
    ...basic,
    included: true,
  },
  [PlanProductType.SCALE_UP_PLAN]: {
    ...basic,
    included: true,
  },
  [PlanProductType.ENTERPRISE_PLAN]: {
    ...basic,
    included: true,
  },
};

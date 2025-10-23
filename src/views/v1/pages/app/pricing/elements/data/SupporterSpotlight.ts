import { PlanProductType } from "@open-source-economy/api-types";
import { PlanFeature } from "./data";

const basic: PlanFeature = {
  name: "Supporter Spotlight",
  detailsDescription: "Showcase your open source contributions",
  included: false,
};

export const supporterSpotlights: Record<PlanProductType, PlanFeature> = {
  [PlanProductType.INDIVIDUAL_PLAN]: {
    ...basic,
    included: false,
  },
  [PlanProductType.START_UP_PLAN]: {
    ...basic,
    included: false,
  },
  [PlanProductType.SCALE_UP_PLAN]: {
    ...basic,
    info: "Monthly feature highlighting your OSS investments",
    included: true,
  },
  [PlanProductType.ENTERPRISE_PLAN]: {
    name: "Marketing Spotlight",
    detailsDescription: "Regular features across media channels",
    info: "Amplify your OSS commitment through our networks",
    included: true,
    details: [
      {
        name: "Social Media Posts",
        included: true,
        info: "Featured posts to our followers on our social media channels",
      },
      {
        name: "Newsletter Feature",
        included: true,
        info: "Spotlight in our subscriber newsletter",
      },
      {
        name: "Dedicated Blog Post",
        included: true,
        info: "Case study highlighting your OSS impact",
      },
    ],
  },
};

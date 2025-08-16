import { PlanProductType } from "@open-source-economy/api-types";
import { communityRecognitions } from "./communityRecognition";
import { supporterSpotlights } from "./SupporterSpotlight";
import { openSourceImpacts } from "./OpenSourceImpact";
import { ecosystems } from "./Ecosystem";
import { serviceCredits } from "./ServiceCredit";

export type PlanFeatureDetails = {
  name: string;
  included: boolean;
  info: string;
  soon?: boolean;
};

export type PlanFeature = {
  title?: string;
  name: string;
  detailsDescription: string;
  extrasDescription?: string;
  info?: string;
  subtext?: string;
  included: boolean;
  details?: PlanFeatureDetails[];
  extras?: PlanFeatureDetails[];
};

export type PlanDescription = {
  name: string;
  description: string;
  current?: boolean;
  featured?: boolean;
  features: PlanFeature[];
};

// Factorized plans definition
export const planDescriptions: Record<PlanProductType, PlanDescription> = {
  [PlanProductType.INDIVIDUAL_PLAN]: {
    name: "Individual",
    description: "Start building with expert backing",
    current: true,
    features: [
      serviceCredits[PlanProductType.INDIVIDUAL_PLAN],
      communityRecognitions[PlanProductType.INDIVIDUAL_PLAN],
      supporterSpotlights[PlanProductType.INDIVIDUAL_PLAN],
      openSourceImpacts[PlanProductType.INDIVIDUAL_PLAN],
      ecosystems[PlanProductType.INDIVIDUAL_PLAN],
    ],
  },

  [PlanProductType.START_UP_PLAN]: {
    name: "Start-up",
    description: "Scale confidently with expert support",
    features: [
      serviceCredits[PlanProductType.START_UP_PLAN],
      communityRecognitions[PlanProductType.START_UP_PLAN],
      supporterSpotlights[PlanProductType.START_UP_PLAN],
      openSourceImpacts[PlanProductType.START_UP_PLAN],
      ecosystems[PlanProductType.START_UP_PLAN],
    ],
  },

  [PlanProductType.SCALE_UP_PLAN]: {
    name: "Scale-up",
    description: "Grow faster with enterprise support",
    featured: true,
    features: [
      serviceCredits[PlanProductType.SCALE_UP_PLAN],
      communityRecognitions[PlanProductType.SCALE_UP_PLAN],
      supporterSpotlights[PlanProductType.SCALE_UP_PLAN],
      openSourceImpacts[PlanProductType.SCALE_UP_PLAN],
      ecosystems[PlanProductType.SCALE_UP_PLAN],
    ],
  },

  [PlanProductType.ENTERPRISE_PLAN]: {
    name: "Enterprise",
    description: "Power mission-critical success",
    features: [
      serviceCredits[PlanProductType.ENTERPRISE_PLAN],
      communityRecognitions[PlanProductType.ENTERPRISE_PLAN],
      supporterSpotlights[PlanProductType.ENTERPRISE_PLAN],
      openSourceImpacts[PlanProductType.ENTERPRISE_PLAN],
      ecosystems[PlanProductType.ENTERPRISE_PLAN],
    ],
  },
};

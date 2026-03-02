import * as dto from "@open-source-economy/api-types";
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
export const planDescriptions: Record<dto.PlanProductType, PlanDescription> = {
  [dto.PlanProductType.INDIVIDUAL_PLAN]: {
    name: "Individual",
    description: "Start building with expert backing",
    current: true,
    features: [
      serviceCredits[dto.PlanProductType.INDIVIDUAL_PLAN],
      communityRecognitions[dto.PlanProductType.INDIVIDUAL_PLAN],
      supporterSpotlights[dto.PlanProductType.INDIVIDUAL_PLAN],
      openSourceImpacts[dto.PlanProductType.INDIVIDUAL_PLAN],
      ecosystems[dto.PlanProductType.INDIVIDUAL_PLAN],
    ],
  },

  [dto.PlanProductType.START_UP_PLAN]: {
    name: "Start-up",
    description: "Scale confidently with expert support",
    features: [
      serviceCredits[dto.PlanProductType.START_UP_PLAN],
      communityRecognitions[dto.PlanProductType.START_UP_PLAN],
      supporterSpotlights[dto.PlanProductType.START_UP_PLAN],
      openSourceImpacts[dto.PlanProductType.START_UP_PLAN],
      ecosystems[dto.PlanProductType.START_UP_PLAN],
    ],
  },

  [dto.PlanProductType.SCALE_UP_PLAN]: {
    name: "Scale-up",
    description: "Grow faster with enterprise support",
    featured: true,
    features: [
      serviceCredits[dto.PlanProductType.SCALE_UP_PLAN],
      communityRecognitions[dto.PlanProductType.SCALE_UP_PLAN],
      supporterSpotlights[dto.PlanProductType.SCALE_UP_PLAN],
      openSourceImpacts[dto.PlanProductType.SCALE_UP_PLAN],
      ecosystems[dto.PlanProductType.SCALE_UP_PLAN],
    ],
  },

  [dto.PlanProductType.ENTERPRISE_PLAN]: {
    name: "Enterprise",
    description: "Power mission-critical success",
    features: [
      serviceCredits[dto.PlanProductType.ENTERPRISE_PLAN],
      communityRecognitions[dto.PlanProductType.ENTERPRISE_PLAN],
      supporterSpotlights[dto.PlanProductType.ENTERPRISE_PLAN],
      openSourceImpacts[dto.PlanProductType.ENTERPRISE_PLAN],
      ecosystems[dto.PlanProductType.ENTERPRISE_PLAN],
    ],
  },
};

import * as dto from "@open-source-economy/api-types";
import { PlanFeature, PlanFeatureDetails } from "./data";
import { credit } from "../../../../../../../model";
import { productTypeCredits } from "src/utils/local-types";

function serviceCreditDetails(planProductType: dto.PlanProductType): PlanFeatureDetails[] {
  return [
    {
      name: {
        [dto.PlanProductType.INDIVIDUAL_PLAN]: "Co-fund Issues",
        [dto.PlanProductType.START_UP_PLAN]: "Co-fund Issues",
        [dto.PlanProductType.SCALE_UP_PLAN]: "Fund Issues",
        [dto.PlanProductType.ENTERPRISE_PLAN]: "Fund Issues",
      }[planProductType],
      info: {
        [dto.PlanProductType.INDIVIDUAL_PLAN]: "Pool resources with others to fix critical bugs",
        [dto.PlanProductType.START_UP_PLAN]: "Pool resources with others to fix critical bugs",
        [dto.PlanProductType.SCALE_UP_PLAN]: "Pool resources with others to fix critical bugs",
        [dto.PlanProductType.ENTERPRISE_PLAN]: "Direct funding for fix critical bugs",
      }[planProductType],
      included: true,
    },
    {
      name: {
        [dto.PlanProductType.INDIVIDUAL_PLAN]: "Co-fund Features",
        [dto.PlanProductType.START_UP_PLAN]: "Co-fund Features",
        [dto.PlanProductType.SCALE_UP_PLAN]: "Co-fund Features",
        [dto.PlanProductType.ENTERPRISE_PLAN]: "Fund Features",
      }[planProductType],
      info: {
        [dto.PlanProductType.INDIVIDUAL_PLAN]: "Collaboratively fund new feature development",
        [dto.PlanProductType.START_UP_PLAN]: "Collaboratively fund new feature development",
        [dto.PlanProductType.SCALE_UP_PLAN]: "Collaboratively fund new feature development",
        [dto.PlanProductType.ENTERPRISE_PLAN]: "Direct funding for feature development",
      }[planProductType],
      included: {
        [dto.PlanProductType.INDIVIDUAL_PLAN]: false,
        [dto.PlanProductType.START_UP_PLAN]: true,
        [dto.PlanProductType.SCALE_UP_PLAN]: true,
        [dto.PlanProductType.ENTERPRISE_PLAN]: true,
      }[planProductType],
    },
    {
      name: {
        [dto.PlanProductType.INDIVIDUAL_PLAN]: "Basic Support",
        [dto.PlanProductType.START_UP_PLAN]: "Standard Support",
        [dto.PlanProductType.SCALE_UP_PLAN]: "Enhanced Support",
        [dto.PlanProductType.ENTERPRISE_PLAN]: "Priority Support",
      }[planProductType],
      info: {
        [dto.PlanProductType.INDIVIDUAL_PLAN]: "Email support with 7 business days response time",
        [dto.PlanProductType.START_UP_PLAN]: "Email support with 5 business days response time",
        [dto.PlanProductType.SCALE_UP_PLAN]: "Priority support with 2 business days response time",
        [dto.PlanProductType.ENTERPRISE_PLAN]: "Priority+ support with 1 business days response time",
      }[planProductType],
      included: true,
    },
    {
      name: "Deployment Guidance",
      info: "Ensure smooth, secure, and efficient application deployments with setup, testing, and rollback strategies",
      included: {
        [dto.PlanProductType.INDIVIDUAL_PLAN]: false,
        [dto.PlanProductType.START_UP_PLAN]: false,
        [dto.PlanProductType.SCALE_UP_PLAN]: true,
        [dto.PlanProductType.ENTERPRISE_PLAN]: true,
      }[planProductType],
    },
    {
      name: "Expert Consultancy",
      info: "Custom expert analysis and recommendations tailored to your enterprise architecture & needs",
      included: {
        [dto.PlanProductType.INDIVIDUAL_PLAN]: false,
        [dto.PlanProductType.START_UP_PLAN]: false,
        [dto.PlanProductType.SCALE_UP_PLAN]: false,
        [dto.PlanProductType.ENTERPRISE_PLAN]: true,
      }[planProductType],
    },
    {
      name: "24/7 Supervision",
      info: "24/7 system supervision + rapid expert response for any critical incidents",
      included: {
        [dto.PlanProductType.INDIVIDUAL_PLAN]: false,
        [dto.PlanProductType.START_UP_PLAN]: false,
        [dto.PlanProductType.SCALE_UP_PLAN]: false,
        [dto.PlanProductType.ENTERPRISE_PLAN]: true,
      }[planProductType],
      soon: true,
    },
  ];
}

function serviceCreditExtras(planProductType: dto.PlanProductType): PlanFeatureDetails[] {
  return [
    {
      name: {
        [dto.PlanProductType.INDIVIDUAL_PLAN]: "Response in 7 BD",
        [dto.PlanProductType.START_UP_PLAN]: "Response in 5 BD",
        [dto.PlanProductType.SCALE_UP_PLAN]: "Response in 2 BD",
        [dto.PlanProductType.ENTERPRISE_PLAN]: "Response in 1 BD",
      }[planProductType],
      info: {
        [dto.PlanProductType.INDIVIDUAL_PLAN]: "Get a response within 7 business days",
        [dto.PlanProductType.START_UP_PLAN]: "Get a response within 5 business days",
        [dto.PlanProductType.SCALE_UP_PLAN]: "Get a response within 2 business days",
        [dto.PlanProductType.ENTERPRISE_PLAN]: "Get a response within 1 business day",
      }[planProductType],
      included: true,
    },
    {
      name: {
        [dto.PlanProductType.INDIVIDUAL_PLAN]: "Existing OSS Library",
        [dto.PlanProductType.START_UP_PLAN]: "Project Suggestion",
        [dto.PlanProductType.SCALE_UP_PLAN]: "Priority Project Matching",
        [dto.PlanProductType.ENTERPRISE_PLAN]: "Dedicated Project Onboarding",
      }[planProductType],
      info: {
        [dto.PlanProductType.INDIVIDUAL_PLAN]: "Access the current open-source projects registered on the platform",
        [dto.PlanProductType.START_UP_PLAN]: "Suggest projects and we'll start reaching out to maintainers",
        [dto.PlanProductType.SCALE_UP_PLAN]: "Faster matching with relevant projects and assisted maintainer outreach",
        [dto.PlanProductType.ENTERPRISE_PLAN]:
          "We handle the entire process of finding, onboarding, and supporting your desired OSS projects.",
      }[planProductType],
      included: true,
    },
    {
      name: "Live Consultancy",
      info: "Direct online meetings with experts to discuss your architecture, implementation & strategic needs",
      included: {
        [dto.PlanProductType.INDIVIDUAL_PLAN]: false,
        [dto.PlanProductType.START_UP_PLAN]: false,
        [dto.PlanProductType.SCALE_UP_PLAN]: false,
        [dto.PlanProductType.ENTERPRISE_PLAN]: true,
      }[planProductType],
    },
  ];
}

const basic: Omit<PlanFeature, "name" | "details" | "extras"> = {
  detailsDescription: "service credit (rolls over):",
  extrasDescription: "access to:",
  info: "Unused credits accumulate monthly - perfect for occasional needs",
  included: true,
};

export const serviceCredits: Record<dto.PlanProductType, PlanFeature> = {
  [dto.PlanProductType.INDIVIDUAL_PLAN]: {
    ...basic,
    name: `in ${credit.displayAmount(productTypeCredits(dto.ProductType.INDIVIDUAL_PLAN))} monthly`,
    details: serviceCreditDetails(dto.PlanProductType.INDIVIDUAL_PLAN),
    extras: serviceCreditExtras(dto.PlanProductType.INDIVIDUAL_PLAN),
  },
  [dto.PlanProductType.START_UP_PLAN]: {
    ...basic,
    name: `Gain ${credit.displayAmount(productTypeCredits(dto.ProductType.START_UP_PLAN))} monthly`,
    details: serviceCreditDetails(dto.PlanProductType.START_UP_PLAN),
    extras: serviceCreditExtras(dto.PlanProductType.START_UP_PLAN),
  },
  [dto.PlanProductType.SCALE_UP_PLAN]: {
    ...basic,
    name: `Gain ${credit.displayAmount(productTypeCredits(dto.ProductType.SCALE_UP_PLAN))} monthly`,
    details: serviceCreditDetails(dto.PlanProductType.SCALE_UP_PLAN),
    extras: serviceCreditExtras(dto.PlanProductType.SCALE_UP_PLAN),
  },
  [dto.PlanProductType.ENTERPRISE_PLAN]: {
    ...basic,
    name: `Gain ${credit.displayAmount(productTypeCredits(dto.ProductType.ENTERPRISE_PLAN))} monthly`,
    details: serviceCreditDetails(dto.PlanProductType.ENTERPRISE_PLAN),
    extras: serviceCreditExtras(dto.PlanProductType.ENTERPRISE_PLAN),
  },
};

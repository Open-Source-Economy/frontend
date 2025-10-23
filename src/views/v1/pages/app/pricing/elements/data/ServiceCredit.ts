import { PlanProductType, ProductType, productTypeUtils } from "@open-source-economy/api-types";
import { PlanFeature, PlanFeatureDetails } from "./data";
import { credit } from "../../../../../../../model";

function serviceCreditDetails(planProductType: PlanProductType): PlanFeatureDetails[] {
  return [
    {
      name: {
        [PlanProductType.INDIVIDUAL_PLAN]: "Co-fund Issues",
        [PlanProductType.START_UP_PLAN]: "Co-fund Issues",
        [PlanProductType.SCALE_UP_PLAN]: "Fund Issues",
        [PlanProductType.ENTERPRISE_PLAN]: "Fund Issues",
      }[planProductType],
      info: {
        [PlanProductType.INDIVIDUAL_PLAN]: "Pool resources with others to fix critical bugs",
        [PlanProductType.START_UP_PLAN]: "Pool resources with others to fix critical bugs",
        [PlanProductType.SCALE_UP_PLAN]: "Pool resources with others to fix critical bugs",
        [PlanProductType.ENTERPRISE_PLAN]: "Direct funding for fix critical bugs",
      }[planProductType],
      included: true,
    },
    {
      name: {
        [PlanProductType.INDIVIDUAL_PLAN]: "Co-fund Features",
        [PlanProductType.START_UP_PLAN]: "Co-fund Features",
        [PlanProductType.SCALE_UP_PLAN]: "Co-fund Features",
        [PlanProductType.ENTERPRISE_PLAN]: "Fund Features",
      }[planProductType],
      info: {
        [PlanProductType.INDIVIDUAL_PLAN]: "Collaboratively fund new feature development",
        [PlanProductType.START_UP_PLAN]: "Collaboratively fund new feature development",
        [PlanProductType.SCALE_UP_PLAN]: "Collaboratively fund new feature development",
        [PlanProductType.ENTERPRISE_PLAN]: "Direct funding for feature development",
      }[planProductType],
      included: {
        [PlanProductType.INDIVIDUAL_PLAN]: false,
        [PlanProductType.START_UP_PLAN]: true,
        [PlanProductType.SCALE_UP_PLAN]: true,
        [PlanProductType.ENTERPRISE_PLAN]: true,
      }[planProductType],
    },
    {
      name: {
        [PlanProductType.INDIVIDUAL_PLAN]: "Basic Support",
        [PlanProductType.START_UP_PLAN]: "Standard Support",
        [PlanProductType.SCALE_UP_PLAN]: "Enhanced Support",
        [PlanProductType.ENTERPRISE_PLAN]: "Priority Support",
      }[planProductType],
      info: {
        [PlanProductType.INDIVIDUAL_PLAN]: "Email support with 7 business days response time",
        [PlanProductType.START_UP_PLAN]: "Email support with 5 business days response time",
        [PlanProductType.SCALE_UP_PLAN]: "Priority support with 2 business days response time",
        [PlanProductType.ENTERPRISE_PLAN]: "Priority+ support with 1 business days response time",
      }[planProductType],
      included: true,
    },
    {
      name: "Deployment Guidance",
      info: "Ensure smooth, secure, and efficient application deployments with setup, testing, and rollback strategies",
      included: {
        [PlanProductType.INDIVIDUAL_PLAN]: false,
        [PlanProductType.START_UP_PLAN]: false,
        [PlanProductType.SCALE_UP_PLAN]: true,
        [PlanProductType.ENTERPRISE_PLAN]: true,
      }[planProductType],
    },
    {
      name: "Expert Consultancy",
      info: "Custom expert analysis and recommendations tailored to your enterprise architecture & needs",
      included: {
        [PlanProductType.INDIVIDUAL_PLAN]: false,
        [PlanProductType.START_UP_PLAN]: false,
        [PlanProductType.SCALE_UP_PLAN]: false,
        [PlanProductType.ENTERPRISE_PLAN]: true,
      }[planProductType],
    },
    {
      name: "24/7 Supervision",
      info: "24/7 system supervision + rapid expert response for any critical incidents",
      included: {
        [PlanProductType.INDIVIDUAL_PLAN]: false,
        [PlanProductType.START_UP_PLAN]: false,
        [PlanProductType.SCALE_UP_PLAN]: false,
        [PlanProductType.ENTERPRISE_PLAN]: true,
      }[planProductType],
      soon: true,
    },
  ];
}

function serviceCreditExtras(planProductType: PlanProductType): PlanFeatureDetails[] {
  return [
    {
      name: {
        [PlanProductType.INDIVIDUAL_PLAN]: "Response in 7 BD",
        [PlanProductType.START_UP_PLAN]: "Response in 5 BD",
        [PlanProductType.SCALE_UP_PLAN]: "Response in 2 BD",
        [PlanProductType.ENTERPRISE_PLAN]: "Response in 1 BD",
      }[planProductType],
      info: {
        [PlanProductType.INDIVIDUAL_PLAN]: "Get a response within 7 business days",
        [PlanProductType.START_UP_PLAN]: "Get a response within 5 business days",
        [PlanProductType.SCALE_UP_PLAN]: "Get a response within 2 business days",
        [PlanProductType.ENTERPRISE_PLAN]: "Get a response within 1 business day",
      }[planProductType],
      included: true,
    },
    {
      name: {
        [PlanProductType.INDIVIDUAL_PLAN]: "Existing OSS Library",
        [PlanProductType.START_UP_PLAN]: "Project Suggestion",
        [PlanProductType.SCALE_UP_PLAN]: "Priority Project Matching",
        [PlanProductType.ENTERPRISE_PLAN]: "Dedicated Project Onboarding",
      }[planProductType],
      info: {
        [PlanProductType.INDIVIDUAL_PLAN]: "Access the current open-source projects registered on the platform",
        [PlanProductType.START_UP_PLAN]: "Suggest projects and we'll start reaching out to maintainers",
        [PlanProductType.SCALE_UP_PLAN]: "Faster matching with relevant projects and assisted maintainer outreach",
        [PlanProductType.ENTERPRISE_PLAN]: "We handle the entire process of finding, onboarding, and supporting your desired OSS projects.",
      }[planProductType],
      included: true,
    },
    {
      name: "Live Consultancy",
      info: "Direct online meetings with experts to discuss your architecture, implementation & strategic needs",
      included: {
        [PlanProductType.INDIVIDUAL_PLAN]: false,
        [PlanProductType.START_UP_PLAN]: false,
        [PlanProductType.SCALE_UP_PLAN]: false,
        [PlanProductType.ENTERPRISE_PLAN]: true,
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

export const serviceCredits: Record<PlanProductType, PlanFeature> = {
  [PlanProductType.INDIVIDUAL_PLAN]: {
    ...basic,
    name: `in ${credit.displayAmount(productTypeUtils.credits(ProductType.INDIVIDUAL_PLAN))} monthly`,
    details: serviceCreditDetails(PlanProductType.INDIVIDUAL_PLAN),
    extras: serviceCreditExtras(PlanProductType.INDIVIDUAL_PLAN),
  },
  [PlanProductType.START_UP_PLAN]: {
    ...basic,
    name: `Gain ${credit.displayAmount(productTypeUtils.credits(ProductType.START_UP_PLAN))} monthly`,
    details: serviceCreditDetails(PlanProductType.START_UP_PLAN),
    extras: serviceCreditExtras(PlanProductType.START_UP_PLAN),
  },
  [PlanProductType.SCALE_UP_PLAN]: {
    ...basic,
    name: `Gain ${credit.displayAmount(productTypeUtils.credits(ProductType.SCALE_UP_PLAN))} monthly`,
    details: serviceCreditDetails(PlanProductType.SCALE_UP_PLAN),
    extras: serviceCreditExtras(PlanProductType.SCALE_UP_PLAN),
  },
  [PlanProductType.ENTERPRISE_PLAN]: {
    ...basic,
    name: `Gain ${credit.displayAmount(productTypeUtils.credits(ProductType.ENTERPRISE_PLAN))} monthly`,
    details: serviceCreditDetails(PlanProductType.ENTERPRISE_PLAN),
    extras: serviceCreditExtras(PlanProductType.ENTERPRISE_PLAN),
  },
};

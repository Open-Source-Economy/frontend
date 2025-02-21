import { CampaignPriceType, Currency, PlanPriceType, PlanProductType } from "../../../../model";

export type Plan = {
  name: string;
  description: string;
  current?: boolean;
  featured?: boolean;
  features: Array<{
    title?: string;
    name: string;
    description: string;
    info: string;
    subtext?: string;
    included: boolean;
    extras?: Array<{
      name: string;
      included: boolean;
      info: string;
      soon?: boolean;
    }>;
  }>;
};

// Common text constants
const TEXTS = {
  SERVICE_CREDIT: {
    DESCRIPTION: "service credit (rolls over)",
    INFO: "Unused credits accumulate monthly - perfect for occasional needs"
  },
  OPEN_SOURCE: {
    TITLE: "Open Source Impact",
    DESCRIPTION: "gifted to maintainers",
    INFO: "We allocate your gift to high-impact projects you use",
    SUBTEXT: "Support proactive development of OSS"
  },
  ECOSYSTEM: {
    NAME: "Support ecosystem sustainability",
    DESCRIPTION: "Invest in the future of open source",
    INFO: "Contribute to the long-term health of open source projects"
  }
};

const createServiceCreditFeature = (amount: string, priceType: PlanProductType) => ({
  name: `Gain ${amount} monthly`,
  description: TEXTS.SERVICE_CREDIT.DESCRIPTION,
  info: TEXTS.SERVICE_CREDIT.INFO,
  included: true,
  extras: [
    { name: "Co-fund Issues", info: "Pool resources with others to fix critical bugs", included: true },
    { name: "Co-fund New features", info: "Collaboratively fund feature development", included: priceType !== PlanProductType.INDIVIDUAL_PLAN },
    { name: "Standard Support", info: "Email support with average 2-5 business days response time", included: true },
  // Missing one
    { name: "Priority Support", info: "Priority support with average 48h response time", included: priceType === PlanProductType.SCALE_UP_PLAN || priceType === PlanProductType.ENTERPRISE_PLAN },
    { name: "Written Consultancy", info: "Detailed technical guidance documents", included: priceType !== PlanProductType.INDIVIDUAL_PLAN },
    { name: "Live Expert Consultancy", info: "Real-time video consultations", included: priceType === PlanProductType.ENTERPRISE_PLAN, soon: priceType !== PlanProductType.ENTERPRISE_PLAN },
    { name: "24/7 Support", info: "Emergency support hotline", included: priceType === PlanProductType.ENTERPRISE_PLAN, soon: priceType === PlanProductType.ENTERPRISE_PLAN },
  ]
});

const createOpenSourceImpactFeature = (time: string) => ({
  title: TEXTS.OPEN_SOURCE.TITLE,
  name: `${time} monthly`,
  description: TEXTS.OPEN_SOURCE.DESCRIPTION,
  info: TEXTS.OPEN_SOURCE.INFO,
  subtext: TEXTS.OPEN_SOURCE.SUBTEXT,
  included: true
});

const createEcosystemFeature = () => ({
  name: TEXTS.ECOSYSTEM.NAME,
  description: TEXTS.ECOSYSTEM.DESCRIPTION,
  info: TEXTS.ECOSYSTEM.INFO,
  included: true
});

// Common features used across plans

const COMMON_FEATURES = {
  communityRecognition: {
    basic: {
      name: "Community Recognition",
      description: "Build your reputation as OSS supporter",
      info: "Featured in supporter directory + profile badge",
      included: false
    },
    custom: {
      name: "Community Recognition",
      description: "Customizable Supporter Profile",
      info: "Showcase your brand and OSS contributions",
      included: true
    },
    premier: {
      name: "Premier Public Recognition",
      description: "Premier Supporter Spotlight",
      info: "Exclusive recognition across our platforms",
      included: true
    }
  },
  supporterSpotlight: {
    basic: {
      name: "Supporter Spotlight",
      description: "Showcase your open source contributions and impact",
      info: "Monthly blog feature highlighting your OSS investments",
      included: false
    },
    premium: {
      name: "Supporter Spotlight",
      description: "Showcase your open source contributions and impact",
      info: "Monthly blog feature highlighting your OSS investments",
      included: true
    },
    marketing: {
      name: "Marketing Spotlight",
      description: "Regular features across media channels",
      info: "Amplify your OSS commitment through our networks",
      included: true,
      extras: [
        {
          name: "Social media mentions (4x/month)",
          included: true,
          info: "Featured posts to our followers",
        },
        {
          name: "Newsletter feature",
          included: true,
          info: "Spotlight in our subscriber newsletter",
        },
        {
          name: "Dedicated Blog post",
          included: true,
          info: "Case study highlighting your OSS impact",
        },
      ]
    }
  }
};

const prices:Record<PlanProductType, Record<Currency, Record<PlanPriceType, number>>> = {
  [PlanProductType.INDIVIDUAL_PLAN]: {
  [Currency.USD]: {
    [PlanPriceType.MONTHLY]: 69,
    [PlanPriceType.ANNUALLY]: 56,
  },  [Currency.EUR]: {
      [PlanPriceType.MONTHLY]: 69,
      [PlanPriceType.ANNUALLY]: 56,
    },

    [Currency.CHF]: {
      [PlanPriceType.MONTHLY]: 69,
      [PlanPriceType.ANNUALLY]: 56,
    },
    [Currency.GBP]: {
      [PlanPriceType.MONTHLY]: 69,
      [PlanPriceType.ANNUALLY]: 56,
    },
  },
  [PlanProductType.START_UP_PLAN]: {
    [Currency.USD]: {
      [PlanPriceType.MONTHLY]: 69,
      [PlanPriceType.ANNUALLY]: 56,
    },  [Currency.EUR]: {
      [PlanPriceType.MONTHLY]: 69,
      [PlanPriceType.ANNUALLY]: 56,
    },

    [Currency.CHF]: {
      [PlanPriceType.MONTHLY]: 69,
      [PlanPriceType.ANNUALLY]: 56,
    },
    [Currency.GBP]: {
      [PlanPriceType.MONTHLY]: 69,
      [PlanPriceType.ANNUALLY]: 56,
    },
  },
  [PlanProductType.SCALE_UP_PLAN]: {
    [Currency.USD]: {
      [PlanPriceType.MONTHLY]: 69,
      [PlanPriceType.ANNUALLY]: 56,
    },  [Currency.EUR]: {
      [PlanPriceType.MONTHLY]: 69,
      [PlanPriceType.ANNUALLY]: 56,
    },

    [Currency.CHF]: {
      [PlanPriceType.MONTHLY]: 69,
      [PlanPriceType.ANNUALLY]: 56,
    },
    [Currency.GBP]: {
      [PlanPriceType.MONTHLY]: 69,
      [PlanPriceType.ANNUALLY]: 56,
    },
  },
  [PlanProductType.ENTERPRISE_PLAN]: {
    [Currency.USD]: {
      [PlanPriceType.MONTHLY]: 69,
      [PlanPriceType.ANNUALLY]: 56,
    },  [Currency.EUR]: {
      [PlanPriceType.MONTHLY]: 69,
      [PlanPriceType.ANNUALLY]: 56,
    },

    [Currency.CHF]: {
      [PlanPriceType.MONTHLY]: 69,
      [PlanPriceType.ANNUALLY]: 56,
    },
    [Currency.GBP]: {
      [PlanPriceType.MONTHLY]: 69,
      [PlanPriceType.ANNUALLY]: 56,
    },
  },
}


// Factorized plans definition
export const plans: Record<PlanProductType, Plan> = {
  [PlanProductType.INDIVIDUAL_PLAN]: {
    name: "Individual",
    description: "Start building with expert backing",
    current: true,
    features: [
      createServiceCreditFeature("30 min", PlanProductType.INDIVIDUAL_PLAN),
      COMMON_FEATURES.communityRecognition.basic,
      COMMON_FEATURES.supporterSpotlight.basic,
      createOpenSourceImpactFeature("15 min"),
      createEcosystemFeature()
    ],
  },

  [PlanProductType.START_UP_PLAN]: {
    name: "Start-up",
    description: "Scale confidently with expert support",
    features: [
      createServiceCreditFeature("2h", PlanProductType.START_UP_PLAN),
      COMMON_FEATURES.communityRecognition.basic,
      COMMON_FEATURES.supporterSpotlight.basic,
      createOpenSourceImpactFeature("1h"),
      createEcosystemFeature()
    ],
  },

  [PlanProductType.SCALE_UP_PLAN]: {
    name: "Scale-up",
    description: "Accelerate growth with enterprise-grade support",
    featured: true,
    features: [
      createServiceCreditFeature("5h", PlanProductType.SCALE_UP_PLAN),
      COMMON_FEATURES.communityRecognition.custom,
      COMMON_FEATURES.supporterSpotlight.premium,
      createOpenSourceImpactFeature("2.5h"),
      createEcosystemFeature()
    ],
  },

  [PlanProductType.ENTERPRISE_PLAN]: {
    name: "Enterprise",
    description: "Power mission-critical success",
    features: [
      createServiceCreditFeature("10h", PlanProductType.ENTERPRISE_PLAN),
      COMMON_FEATURES.communityRecognition.premier,
      COMMON_FEATURES.supporterSpotlight.marketing,
      createOpenSourceImpactFeature("10h"),
      createEcosystemFeature()
    ],
  },
};
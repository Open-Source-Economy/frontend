import { PlanProductType } from "../../../../model";

export type Plan = {
  name: string;
  description: string;
  price: {
    monthly: number;
    annual: number;
  };
  originalPrice: {
    monthly: number;
    annual: number;
  };
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



export const plans: Record<PlanProductType, Plan> = {
  [PlanProductType.INDIVIDUAL_PLAN]: {
    name: "Individual",
    description: "Start building with expert backing",
    price: {
      monthly: 69,
      annual: 56,
    },
    originalPrice: {
      monthly: 0,
      annual: 69,
    },
    current: true,
    features: [
      {
        name: "Gain 30 min monthly",
        description: "service credit (rolls over)",
        info: "Unused credits accumulate monthly - perfect for occasional needs",
        included: true,
        extras: [
          { name: "Co-fund Issues", included: true, info: "Pool resources with others to fix critical bugs" },
          { name: "Co-fund New features", included: false, info: "Collaboratively fund feature development" },
          { name: "Standard Support", included: true, info: "Email support with 48h response time" },
          { name: "Written Consultancy", included: false, info: "Detailed technical guidance documents" },
          { name: "Live Expert Consultancy", included: false, soon: true, info: "Real-time video consultations" },
          { name: "24/7 Support", included: false, soon: true, info: "Emergency support hotline" },
        ],
      },
      {
        name: "Community Recognition",
        description: "Build your reputation as OSS supporter",
        info: "Featured in supporter directory + profile badge",
        included: false,
      },
      {
        name: "Supporter Spotlight",
        description: "Showcase your open source contributions",
        info: "Monthly blog feature highlighting your OSS investments",
        included: false,
      },
      {
        title: "Open Source Impact",
        name: "15 min monthly",
        description: "gifted to maintainers",
        info: "We allocate your gift to high-impact projects you use",
        subtext: "Support proactive development of OSS",
        included: true,
      },
      {
        name: "Support ecosystem sustainability",
        description: "Invest in the future of open source",
        info: "Contribute to the long-term health of open source projects",
        included: true,
      },
    ],
  },
  [PlanProductType.START_UP_PLAN]: {
    name: "Start-up",
    description: "Scale confidently with expert support",
    price: {
      monthly: 349,
      annual: 279,
    },
    originalPrice: {
      monthly: 0,
      annual: 349,
    },
    features: [
      {
        name: "Gain 2h monthly",
        description: "service credit (rolls over)",
        info: "Unused credits accumulate monthly - perfect for occasional needs",
        included: true,
        extras: [
          { name: "Co-fund Issues", included: true, info: "Pool resources with others to fix critical bugs" },
          { name: "Co-fund New features", included: true, info: "Collaboratively fund feature development" },
          { name: "Standard Support", included: true, info: "Email support with 48h response time" },
          { name: "Written Consultancy", included: true, info: "Detailed technical guidance documents" },
          { name: "Live Expert Consultancy", included: false, soon: true, info: "Real-time video consultations" },
          { name: "24/7 Support", included: false, soon: true, info: "Emergency support hotline" },
        ],
      },
      {
        name: "Community Recognition",
        description: "Build your reputation as OSS supporter",
        info: "Featured in supporter directory + profile badge",
        included: false,
      },
      {
        name: "Supporter Spotlight",
        description: "Showcase your open source contributions",
        info: "Monthly blog feature highlighting your OSS investments",
        included: false,
      },
      {
        title: "Open Source Impact",
        name: "1h monthly",
        description: "gifted to maintainers",
        info: "We allocate your gift to high-impact projects you use",
        subtext: "Support proactive development of OSS",
        included: true,
      },
      {
        name: "Support ecosystem sustainability",
        description: "Invest in the future of open source",
        info: "Contribute to the long-term health of open source projects",
        included: true,
      },
    ],
  },
  [PlanProductType.SCALE_UP_PLAN]: {
    name: "Scale-up",
    description: "Accelerate growth with enterprise-grade support",
    price: {
      monthly: 999,
      annual: 799,
    },
    originalPrice: {
      monthly: 0,
      annual: 999,
    },
    featured: true,
    features: [
      {
        name: "Gain 5h monthly",
        description: "service credit (rolls over)",
        info: "Unused credits accumulate monthly - perfect for occasional needs",
        included: true,
        extras: [
          { name: "Co-fund Issues", included: true, info: "Pool resources with others to fix critical bugs" },
          { name: "Co-fund New features", included: true, info: "Collaboratively fund feature development" },
          { name: "Standard Support", included: true, info: "Email support with 48h response time" },
          { name: "Written Consultancy", included: true, info: "Detailed technical guidance documents" },
          { name: "Live Expert Consultancy", included: false, soon: true, info: "Real-time video consultations" },
          { name: "24/7 Support", included: false, soon: true, info: "Emergency support hotline" },
        ],
      },
      {
        name: "Community Recognition",
        description: "Customizable Supporter Profile",
        info: "Showcase your brand and OSS contributions",
        included: true,
      },
      {
        name: "Supporter Spotlight",
        description: "Showcase your open source contributions",
        info: "Monthly blog feature highlighting your OSS investments",
        included: true,
      },
      {
        title: "Open Source Impact",
        name: "2.5h monthly",
        description: "gifted to maintainers",
        info: "We allocate your gift to high-impact projects you use",
        subtext: "Support proactive development of OSS",
        included: true,
      },
      {
        name: "Support ecosystem sustainability",
        description: "Invest in the future of open source",
        info: "Contribute to the long-term health of open source projects",
        included: true,
      },
    ],
  },
  [PlanProductType.ENTERPRISE_PLAN]: {
    name: "Enterprise",
    description: "Power mission-critical success",
    price: {
      monthly: 2499,
      annual: 1999,
    },
    originalPrice: {
      monthly: 0,
      annual: 2499,
    },
    features: [
      {
        name: "Gain 10h monthly",
        description: "service credit (rolls over)",
        info: "Unused credits accumulate monthly - perfect for occasional needs",
        included: true,
        extras: [
          { name: "Co-fund Issues", included: true, info: "Pool resources with others to fix critical bugs" },
          { name: "Co-fund New features", included: true, info: "Collaboratively fund feature development" },
          { name: "Standard Support", included: true, info: "Email support with 48h response time" },
          { name: "Written Consultancy", included: true, info: "Detailed technical guidance documents" },
          { name: "Live Expert Consultancy", included: true, info: "Real-time video consultations", soon: true },
          { name: "24/7 Support", included: true, info: "Emergency support hotline", soon: true },
        ],
      },
      {
        name: "Premier Public Recognition",
        description: "Premier Supporter Spotlight",
        info: "Exclusive recognition across our platforms",
        included: true,
      },
      {
        name: "Marketing Spotlight",
        description: "Regular features across media channels",
        info: "Amplify your OSS commitment through our networks",
        included: true,
        extras: [
          {
            name: "Social media mentions (4x/month)",
            included: true,
            info: "Featured posts to 250k+ followers",
          },
          {
            name: "Newsletter feature",
            included: true,
            info: "Spotlight in 50k subscriber newsletter",
          },
          {
            name: "Dedicated Blog post",
            included: true,
            info: "Case study highlighting your OSS impact",
          },
        ],
      },
      {
        title: "Open Source Impact",
        name: "10h monthly",
        description: "gifted to maintainers",
        info: "We allocate your gift to high-impact projects you use",
        subtext: "Support proactive development of OSS",
        included: true,
      },
      {
        name: "Support ecosystem sustainability",
        description: "Invest in the future of open source",
        info: "Contribute to the long-term health of open source projects",
        included: true,
      },
    ],
  },
};
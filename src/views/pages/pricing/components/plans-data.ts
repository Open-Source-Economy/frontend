import { Zap, TrendingUp, Building2, Users } from "lucide-react";
import { PlanOption } from "./types";
import { PlanProductType } from "@open-source-economy/api-types";

export const SAVINGS_PERCENTAGE = 17;

export const plans: PlanOption[] = [
  {
    id: PlanProductType.INDIVIDUAL_PLAN,
    name: "Basic Membership",
    description: "Start building with expert backing",
    icon: Users,
    monthlyPrice: 69,
    annualPrice: 56,
    sections: [
      {
        title: "Gain 500 Service Credits monthly",
        subtitle: "Service Credit (rolls over)",
        features: [
          { text: "Co-fund Issues", included: true },
          { text: "Co-fund New Features", included: true, isNew: true },
          { text: "Standard Support", included: true },
          { text: "Written Consultancy", included: false },
          { text: "Live Expert Consultancy", included: false },
          { text: "24/7 Support", included: false },
        ],
      },
      {
        title: "Community Recognition",
        subtitle: "Build your profile as a supporter",
        features: [{ text: "Recognized as an individual supporter", included: true }],
      },
      {
        title: "Open Source Impact",
        features: [
          {
            text: "250 credits monthly gifted to maintainers",
            included: true,
            hasInfo: true,
            infoText: "Directly Support Maintainers",
            infoDescription: "50% of your membership fee goes directly to the maintainers of the projects you use.",
            infoLink: { text: "Learn more", href: "#maintainer-impact" },
          },
          {
            text: "Ecosystem sustainability",
            included: true,
            hasInfo: true,
            infoText: "Invest in the Future",
            infoDescription: "Your contribution helps sustain the entire open source ecosystem, ensuring long-term viability.",
            infoLink: { text: "See our impact", href: "#ecosystem" },
          },
        ],
      },
    ],
  },
  {
    id: PlanProductType.START_UP_PLAN,
    name: "Bronze Membership",
    description: "Scale confidently with expert support",
    icon: Zap,
    monthlyPrice: 349,
    annualPrice: 279,
    previousPlanName: "Basic Membership",
    sections: [
      {
        title: "Gain 2,000 Service Credits monthly",
        subtitle: "Service Credit (rolls over)",
        features: [{ text: "Written Consultancy", included: true }],
      },
      {
        title: "Bronze Community Recognition",
        subtitle: "Bronze Recognition Package",
        features: [
          { text: "Homepage feature", included: true },
          { text: "Social media mention (1/month)", included: true },
        ],
      },
      {
        title: "Open Source Impact",
        features: [
          {
            text: "1,000 credits monthly gifted to maintainers",
            included: true,
            hasInfo: true,
            infoText: "Directly Support Maintainers",
            infoDescription: "50% of your membership fee goes directly to the maintainers of the projects you use.",
            infoLink: { text: "Learn more", href: "#maintainer-impact" },
          },
          {
            text: "Ecosystem sustainability",
            included: true,
            hasInfo: true,
            infoText: "Invest in the Future",
            infoDescription: "Your contribution helps sustain the entire open source ecosystem, ensuring long-term viability.",
            infoLink: { text: "See our impact", href: "#ecosystem" },
          },
        ],
      },
    ],
    highlighted: true,
  },
  {
    id: PlanProductType.SCALE_UP_PLAN,
    name: "Silver Membership",
    description: "Accelerate growth with enterprise-grade support",
    icon: TrendingUp,
    monthlyPrice: 999,
    annualPrice: 799,
    previousPlanName: "Bronze Membership",
    sections: [
      {
        title: "Gain 5,000 Service Credits monthly",
        subtitle: "Service Credit (rolls over)",
        features: [{ text: "Live Expert Consultancy", included: true, isNew: true }],
      },
      {
        title: "Silver Community Recognition",
        subtitle: "Enhanced Recognition Package",
        features: [
          { text: "Homepage display", included: true },
          { text: "Newsletter feature", included: true },
          { text: "Social media mentions (2/month)", included: true },
        ],
      },
      {
        title: "Open Source Impact",
        features: [
          {
            text: "2,500 credits monthly gifted to maintainers",
            included: true,
            hasInfo: true,
            infoText: "Directly Support Maintainers",
            infoDescription: "50% of your membership fee goes directly to the maintainers of the projects you use.",
            infoLink: { text: "Learn more", href: "#maintainer-impact" },
          },
          {
            text: "Ecosystem sustainability",
            included: true,
            hasInfo: true,
            infoText: "Invest in the Future",
            infoDescription: "Your contribution helps sustain the entire open source ecosystem, ensuring long-term viability.",
            infoLink: { text: "See our impact", href: "#ecosystem" },
          },
        ],
      },
    ],
  },
  {
    id: PlanProductType.ENTERPRISE_PLAN,
    name: "Gold Membership",
    description: "Power mission critical success",
    icon: Building2,
    monthlyPrice: 2499,
    annualPrice: 1999,
    previousPlanName: "Silver Membership",
    sections: [
      {
        title: "Gain 10,000 Service Credits monthly",
        subtitle: "Service Credit (rolls over)",
        features: [{ text: "24/7 Support", included: true, isNew: true }],
      },
      {
        title: "Premier Gold Recognition",
        subtitle: "Premium Recognition Package",
        features: [
          { text: "Premium homepage display", included: true },
          { text: "Quarterly blog post", included: true },
          { text: "Monthly newsletter feature", included: true },
          { text: "Social media mentions (4/month)", included: true },
          { text: "Event speaking opportunities", included: true },
          {
            text: "Co-marketing opportunities",
            included: true,
            hasInfo: true,
            infoText: "Maximize Visibility",
            infoDescription: "Partner with us on case studies, webinars, and joint content to reach a wider audience.",
            infoLink: { text: "View examples", href: "#marketing" },
          },
        ],
      },
      {
        title: "Open Source Impact",
        features: [
          {
            text: "5,000 credits monthly gifted to maintainers",
            included: true,
            hasInfo: true,
            infoText: "Directly Support Maintainers",
            infoDescription: "50% of your membership fee goes directly to the maintainers of the projects you use.",
            infoLink: { text: "Learn more", href: "#maintainer-impact" },
          },
          {
            text: "Ecosystem sustainability",
            included: true,
            hasInfo: true,
            infoText: "Invest in the Future",
            infoDescription: "Your contribution helps sustain the entire open source ecosystem, ensuring long-term viability.",
            infoLink: { text: "See our impact", href: "#ecosystem" },
          },
        ],
      },
    ],
  },
];

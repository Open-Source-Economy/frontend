import { Coins, Heart, Users, Zap, DollarSign, GitBranch, Sparkles } from "lucide-react";
import { ParticipationCardConfig } from "./ParticipationCard";
import { LucideIcon } from "lucide-react";

/**
 * Enum for participation model options
 */
export enum ParticipationModelOption {
  SERVICE_PROVIDER = "service_provider",
  COMMON_POT = "common_pot",
  COMMUNITY_SUPPORTER = "community_supporter",
}

/**
 * Extended configuration for participation cards with additional metadata
 */
export interface ExtendedParticipationCardConfig extends ParticipationCardConfig {
  badge?: {
    text: string;
    icon: LucideIcon;
  };
  detailedFeatures?: Array<{
    icon: LucideIcon;
    title: string;
    description: string;
  }>;
  errorMessage: string;
}

/**
 * Configuration for all participation card options
 */
export const participationCardConfigs: Record<ParticipationModelOption, ExtendedParticipationCardConfig> = {
  [ParticipationModelOption.SERVICE_PROVIDER]: {
    title: "Service Provider",
    description: "Provide services to enterprises and your earnings automatically fund both visible and invisible open source work across the ecosystem",
    icon: Zap,
    badge: {
      text: "Powers the Entire Ecosystem",
      icon: Sparkles,
    },
    features: ["Earn from enterprise contracts", "Fund your project's common pot", "Support dependencies automatically", "Governance rights included"],
    detailedFeatures: [
      { icon: DollarSign, title: "Earn from Enterprise Contracts", description: "Direct revenue stream" },
      { icon: Heart, title: "Fund Your Project's Common Pot", description: "Build project sustainability" },
      { icon: GitBranch, title: "Support Dependencies", description: "Automatic distribution" },
      { icon: Users, title: "Governance Rights", description: "Influence fund allocation" },
    ],
    colorScheme: {
      primary: "brand-accent",
      primaryDark: "brand-accent-dark",
    },
    errorMessage: "Please select one of the options below",
  },
  [ParticipationModelOption.COMMON_POT]: {
    title: "Common Pot Participant",
    description:
      "The common pot gathers funding from service providers on your project, upstream contributions from projects that depend on your work, and direct donations. All maintainers share and use it to support essential project work.",
    icon: Coins,
    features: [
      "Funded by same-project service providers",
      "Funded by projects depending on yours",
      "Funded by community donation",
      "To fund core maintenance and security",
    ],
    colorScheme: {
      primary: "brand-accent",
      primaryDark: "brand-accent-dark",
    },
    errorMessage: "Please select one of the options below",
  },
  [ParticipationModelOption.COMMUNITY_SUPPORTER]: {
    title: "Community Supporter",
    description:
      "Boost your co-maintainers' fundraising success with your endorsement. Help show enterprises the project has solid backing and credible team support.",
    icon: Users,
    features: ["Strengthen fundraising credibility", "Support co-maintainers in their OSS work"],
    colorScheme: {
      primary: "brand-success",
      primaryDark: "brand-success-dark",
    },
    errorMessage: "Please select one of the options below",
  },
};

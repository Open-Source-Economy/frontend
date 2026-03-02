import * as dto from "@open-source-economy/api-types";
import { Rate } from "./steps/step5/types";

export enum OnboardingDataSteps {
  Step1 = 1,
  Step2 = 2,
  Step3 = 3,
  Step4 = 4,
  Step5 = 5,
}

export interface Step1State {
  developerProfileId?: dto.DeveloperProfileId;
  name?: string;
  contactEmail?: string;
  agreedToTerms?: boolean;
}

export interface Step2State {
  projects: dto.DeveloperProjectItemEntry[];
}

export interface Step3State {
  // coming from DeveloperSettings
  royaltiesPreference?: dto.PreferenceType | null;
  servicesPreference?: dto.PreferenceType | null;
  communitySupporterPreference?: dto.PreferenceType | null;
}

export interface Step4State {
  // coming from DeveloperSettings
  hourlyWeeklyCommitment?: number;
  openToOtherOpportunity?: dto.OpenToOtherOpportunityType;
  hourlyRate?: number;
  currency: dto.Currency | null;
  hourlyWeeklyCommitmentComment?: string;
  openToOtherOpportunityComment?: string;
  hourlyRateComment?: string;
}

// Step 5 now uses the new entry types
export interface Step5State {
  defaultRate: Rate;
  developerServices: dto.DeveloperServiceEntry[];
  developerProjectItems: dto.DeveloperProjectItemEntry[];
}

export interface OnboardingState {
  currentStep: OnboardingDataSteps;
  step1: Step1State;
  step2: Step2State;
  step3: Step3State;
  step4: Step4State;
  step5: Step5State;
}

export function transformFullDeveloperProfileToOnboardingState(
  currentStep: OnboardingDataSteps,
  profile: dto.FullDeveloperProfile,
  fallBackCurrency: dto.Currency
): OnboardingState {
  const step1: Step1State = {
    developerProfileId: profile.profileEntry?.profile?.id || undefined,
    name: profile.profileEntry?.user?.name || undefined,
    contactEmail: profile.profileEntry?.profile?.contactEmail || undefined,
    agreedToTerms: Boolean(profile.profileEntry?.user?.termsAcceptedVersion),
  };

  const step2: Step2State = {
    projects: profile.projects || [],
  };

  const step3: Step3State = {
    royaltiesPreference: profile.settings?.royaltiesPreference,
    servicesPreference: profile.settings?.servicesPreference,
    communitySupporterPreference: profile.settings?.communitySupporterPreference,
  };

  const step4: Step4State = {
    hourlyWeeklyCommitment: profile.settings?.hourlyWeeklyCommitment,
    openToOtherOpportunity: profile.settings?.openToOtherOpportunity,
    hourlyRate: profile.settings?.hourlyRate,
    currency: profile.settings?.currency || fallBackCurrency,
    hourlyWeeklyCommitmentComment: profile.settings?.hourlyWeeklyCommitmentComment ?? undefined,
    openToOtherOpportunityComment: profile.settings?.openToOtherOpportunityComment ?? undefined,
    hourlyRateComment: profile.settings?.hourlyRateComment ?? undefined,
  };

  const step5: Step5State = {
    defaultRate: {
      amount: profile.settings?.hourlyRate || 0,
      currency: profile.settings?.currency || fallBackCurrency,
    },
    developerServices: profile.services,
    developerProjectItems: profile.projects,
  };

  return {
    currentStep,
    step1,
    step2,
    step3,
    step4,
    step5,
  };
}

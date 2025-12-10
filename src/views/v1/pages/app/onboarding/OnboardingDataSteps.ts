import {
  Currency,
  DeveloperProfileId,
  DeveloperProjectItemEntry,
  DeveloperServiceEntry,
  FullDeveloperProfile,
  OpenToOtherOpportunityType,
  PreferenceType,
} from "@open-source-economy/api-types";
import { Rate } from "./steps/step5/modals/edit/EditServiceModal";

export enum OnboardingDataSteps {
  Step1 = 1,
  Step2 = 2,
  Step3 = 3,
  Step4 = 4,
  Step5 = 5,
}

export interface Step1State {
  developerProfileId?: DeveloperProfileId;
  name?: string;
  contactEmail?: string;
  agreedToTerms?: boolean;
}

export interface Step2State {
  projects: DeveloperProjectItemEntry[];
}

export interface Step3State {
  // coming from DeveloperSettings
  royaltiesPreference?: PreferenceType | null;
  servicesPreference?: PreferenceType | null;
  communitySupporterPreference?: PreferenceType | null;
}

export interface Step4State {
  // coming from DeveloperSettings
  hourlyWeeklyCommitment?: number;
  openToOtherOpportunity?: OpenToOtherOpportunityType;
  hourlyRate?: number;
  currency: Currency | null;
  hourlyWeeklyCommitmentComment?: string;
  openToOtherOpportunityComment?: string;
  hourlyRateComment?: string;
}

// Step 5 now uses the new entry types
export interface Step5State {
  defaultRate: Rate;
  developerServices: DeveloperServiceEntry[];
  developerProjectItems: DeveloperProjectItemEntry[];
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
  profile: FullDeveloperProfile,
  fallBackCurrency: Currency,
): OnboardingState {
  const profileAny = profile as any;
  const step1: Step1State = {
    developerProfileId: profileAny.profile?.id || undefined,
    name: profileAny.name || undefined,
    contactEmail: profileAny.contactEmail || undefined,
    agreedToTerms: profileAny.agreedToTerms || undefined,
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

  // TODO: lolo
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

import {
  Currency,
  DeveloperProfileId,
  DeveloperProjectItem,
  DeveloperServiceTODOChangeName,
  FullDeveloperProfile,
  IncomeStreamType,
  OpenToOtherOpportunityType,
  ProjectItem,
  Service,
} from "@open-source-economy/api-types";

export enum OnboardingDataSteps {
  Step1 = 1,
  Step2 = 2,
  Step3 = 3,
  Step4 = 4,
  Step5 = 5,
  Step6 = 6,
}

export interface Step1State {
  developerProfileId?: DeveloperProfileId;
  name?: string;
  email?: string;
  agreedToTerms?: boolean;
}

export interface Step2State {
  projects: [ProjectItem, DeveloperProjectItem][];
}

export interface Step3State {
  // coming from DeveloperSettings
  incomeStreams: IncomeStreamType[];
}

export interface Step4State {
  // coming from DeveloperSettings
  hourlyWeeklyCommitment?: number;
  openToOtherOpportunity?: OpenToOtherOpportunityType;
  hourlyRate?: number;
  currency: Currency;
  comments?: string;
}

// Corrected type for Step5State with the new projects property
export interface Step5State {
  currency: Currency;
  developerServices: [Service, DeveloperServiceTODOChangeName | null][];
  developerProjectItems: [ProjectItem, DeveloperProjectItem][];
}

export interface Step6State {}

export interface OnboardingState {
  currentStep: OnboardingDataSteps;
  step1: Step1State;
  step2: Step2State;
  step3: Step3State;
  step4: Step4State;
  step5: Step5State;
  step6: Step6State;
}

export function transformFullDeveloperProfileToOnboardingState(
  currentStep: OnboardingDataSteps,
  profile: FullDeveloperProfile,
  fallBackCurrency: Currency,
): OnboardingState {
  const step1: Step1State = {
    developerProfileId: profile.profile?.id || undefined,
    name: profile.name || undefined,
    email: profile.email || undefined,
    agreedToTerms: profile.agreedToTerms || undefined,
  };

  const step2: Step2State = {
    projects: profile.projects || [],
  };

  const step3: Step3State = {
    incomeStreams: profile.settings?.incomeStreams || [],
  };

  const step4: Step4State = {
    hourlyWeeklyCommitment: profile.settings?.hourlyWeeklyCommitment || 0,
    openToOtherOpportunity: profile.settings?.openToOtherOpportunity || OpenToOtherOpportunityType.NO,
    hourlyRate: profile.settings?.hourlyRate || 0,
    currency: profile.settings?.currency || fallBackCurrency,
    comments: "",
  };

  const step5: Step5State = {
    currency: profile.settings?.currency || fallBackCurrency,
    developerServices: profile.services || [],
    developerProjectItems: profile.projects || [],
  };

  const step6: Step6State = {};

  return {
    currentStep,
    step1,
    step2,
    step3,
    step4,
    step5,
    step6,
  };
}

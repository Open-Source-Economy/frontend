import {
  Currency,
  DeveloperProfileId,
  DeveloperProjectItem,
  DeveloperService,
  FullDeveloperProfile,
  IncomeStreamType,
  OpenToOtherOpportunityType,
  ProjectItem,
  Service,
  ServiceId,
  DeveloperServiceTODOChangeName,
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
  hourlyWeeklyCommitment: number;
  openToOtherOpportunity: OpenToOtherOpportunityType;
  hourlyRate: number;
  currency: Currency;
  comments: string;
}

// Corrected type for Step5State
export interface Step5State {
  projects: [ProjectItem, DeveloperProjectItem][];
  services: [Service, DeveloperServiceTODOChangeName | null][];
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

/**
 * Transforms a FullDeveloperProfile object into an OnboardingState object.
 * This function maps relevant fields from the detailed developer profile
 * to the structured steps of the onboarding process.
 * It sets the current step to Step1 by default, without making assumptions
 * about the completeness of any step based on the profile data.
 *
 * @param currentStep The current step in the onboarding process, defaulting to Step1.
 * @param profile The FullDeveloperProfile object to transform.
 * @returns An OnboardingState object representing the initial state
 * of the developer's onboarding, with currentStep defaulted to Step1.
 */
export function transformFullDeveloperProfileToOnboardingState(currentStep: OnboardingDataSteps, profile: FullDeveloperProfile): OnboardingState {
  // Initialize each step's state from the FullDeveloperProfile
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
    hourlyWeeklyCommitment: profile.settings?.hourlyWeeklyCommitment || 0, // Default to 0 or appropriate default
    openToOtherOpportunity: profile.settings?.openToOtherOpportunity || OpenToOtherOpportunityType.NO, // Default
    hourlyRate: profile.settings?.hourlyRate || 0, // Default to 0 or appropriate default
    currency: profile.settings?.currency || Currency.USD, // Default
    comments: "", // This field is not in FullDeveloperProfile, initialize as empty string
  };

  const step5: Step5State = {
    services: profile.services || [],
  };

  const step6: Step6State = {}; // This step is empty, no data to map

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

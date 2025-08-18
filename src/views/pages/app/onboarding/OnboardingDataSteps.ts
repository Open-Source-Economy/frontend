import { Currency, IncomeStreamType, OpenToOtherOpportunityType } from "@open-source-economy/api-types";

export enum OnboardingDataSteps {
  Step1 = 1,
  Step2 = 2,
  Step3 = 3,
  Step4 = 4,
  Step5 = 5,
  Step6 = 6,
}

export interface Step1State {
  name?: string;
  email?: string;
  agreedToTerms?: boolean;
}

export interface Project {
  id: string;
  organization: string;
  repository: string;
  role: string;
  mergeRights: string;
}

export interface Step2State {
  projects: Array<Project>;
}

export interface Step3State {
  incomeStreams: IncomeStreamType[];
}

export interface Step4State {
  hourlyWeeklyCommitment: number;
  openToOtherOpportunity: OpenToOtherOpportunityType;
  hourlyRate: number;
  currency: Currency;
  comments: string;
}

export interface Task {
  id: string;
  serviceId: string;
  name: string;
  category: string;
  projects?: string[];
  hourlyRate?: number;
  currency?: string;
  responseTime?: string;
  customService?: string;
  hasResponseTime?: boolean;
}

export interface Step5State {
  selectedTasks: Array<Task>;
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

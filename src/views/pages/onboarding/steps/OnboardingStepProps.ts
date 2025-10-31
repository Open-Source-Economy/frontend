import { OnboardingDataSteps } from "../OnboardingDataSteps";

export interface OnboardingStepProps<T> {
  currentStep: OnboardingDataSteps;
  state: T;
  updateState: (updates: Partial<T>) => void;
  onNext: () => void;
  onBack: () => void;
  setOnNext?: (fn: null | (() => boolean | Promise<boolean>)) => void;
}

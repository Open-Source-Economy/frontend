import { OnboardingDataSteps } from "src/views/pages/onboarding/OnboardingDataSteps";

export interface OnboardingStepProps<T> {
  currentStep: OnboardingDataSteps;
  state: T;
  updateState: (updates: Partial<T>) => void;
  onNext: () => void;
  onBack: () => void;
  setOnNext?: (fn: null | (() => boolean | Promise<boolean>)) => void;
}

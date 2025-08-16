export interface CompleteOnboardingResponse {
  success: boolean;
  message: string;
}

export interface OnboardingResponse {
  success: boolean;
  data?: any;
  message?: string;
  error?: string;
}

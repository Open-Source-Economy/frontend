import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useAuth } from "src/views/auth/AuthContext";
import { getOnboardingBackendAPI } from "src/services";

import Step1 from "./steps/step1/Step1";
import Step2 from "./steps/step2/Step2";

import { paths } from "../../../paths";
import { ApiError } from "src/ultils/error/ApiError";
import { LoadingState } from "src/views/components/ui/state/loading-state";
import { OnboardingDataSteps, OnboardingState, transformFullDeveloperProfileToOnboardingState } from "./OnboardingDataSteps";
import * as dto from "@open-source-economy/api-types";
import { Currency } from "@open-source-economy/api-types";
import { Step3 } from "./steps/step3";
import { Step4 } from "./steps/step4";
import { Step5 } from "./steps/step5";
import { PreferredCurrency } from "../../../ultils/PreferredCurrency";
import { WizardStepIndicator } from "./components/WizardStepIndicator";
import { WizardNavigation } from "./components/WizardNavigation";
import { StepSidebar } from "./components/StepSidebar";
import { handleApiCall } from "../../../ultils";
import { ServerErrorAlert } from "src/views/components/ui/state/ServerErrorAlert";
import { PageWrapper } from "../PageWrapper";

const createInitialState = (preferredCurrency: Currency): OnboardingState => ({
  currentStep: OnboardingDataSteps.Step1,
  step1: {
    name: "",
    contactEmail: "",
    agreedToTerms: false,
  },
  step2: {
    projects: [],
  },
  step3: {
    royaltiesPreference: undefined,
    servicesPreference: undefined,
    communitySupporterPreference: undefined,
  },
  step4: {
    currency: preferredCurrency,
  },
  step5: {
    defaultRate: {
      currency: preferredCurrency,
      amount: 100,
    },
    developerServices: [],
    developerProjectItems: [],
  },
});

export default function OnboardingFlow() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const auth = useAuth();
  const onboardingAPI = getOnboardingBackendAPI();

  const preferredCurrency: Currency = PreferredCurrency.get(auth);

  // Use a single state object to hold all onboarding data
  const [state, setState] = useState<OnboardingState>(createInitialState(preferredCurrency));
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState<ApiError | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const currentUrlStep = parseInt(searchParams.get("step") || OnboardingDataSteps.Step1.toString());

  useEffect(() => {
    let currentStep = OnboardingDataSteps.Step1;

    // If the URL step is invalid, redirect to Step1
    if (isNaN(currentUrlStep) || currentUrlStep < OnboardingDataSteps.Step1 || currentUrlStep > OnboardingDataSteps.Step5) {
      setSearchParams({ step: currentStep.toString() });
    } else {
      currentStep = currentUrlStep as OnboardingDataSteps;
    }

    const apiCall = async () => {
      const params: dto.GetDeveloperProfileParams = {};
      const query: dto.GetDeveloperProfileQuery = {};
      return await onboardingAPI.getDeveloperProfile(params, query);
    };

    const onSuccess = (response: dto.GetDeveloperProfileResponse) => {
      if (response.profile) {
        const state = transformFullDeveloperProfileToOnboardingState(currentStep, response.profile, preferredCurrency);
        setState(state);
      }
    };

    handleApiCall(apiCall, setIsLoading, setApiError, onSuccess);
  }, [currentUrlStep, setSearchParams]);

  const goToStep = (step: OnboardingDataSteps) => {
    setSearchParams({ step: step.toString() });
    setState(prevState => ({ ...prevState, currentStep: step }));
  };

  const goToNextStep = () => {
    // For now, just move to the next step
    // Individual steps handle their own validation and API calls
    if (state.currentStep < OnboardingDataSteps.Step5) {
      goToStep(state.currentStep + 1);
    } else {
      navigate(paths.DEVELOPER_ONBOARDING_COMPLETED);
    }
  };

  const goToPrevStep = () => {
    if (state.currentStep > OnboardingDataSteps.Step1) {
      goToStep(state.currentStep - 1);
    } else {
      // If on the first step, navigate back to the main onboarding landing page
      navigate(paths.DEVELOPER_LANDING);
    }
  };

  // Step-level onNext handler registration
  const stepOnNextRef = React.useRef<null | (() => boolean | Promise<boolean>)>(null);
  const setOnNext = React.useCallback((fn: null | (() => boolean | Promise<boolean>)) => {
    stepOnNextRef.current = fn;
  }, []);

  const handleContinue = React.useCallback(async () => {
    if (!stepOnNextRef.current) {
      goToNextStep();
      return;
    }
    setIsSaving(true);
    try {
      const result = await stepOnNextRef.current();
      if (result) {
        goToNextStep();
      }
    } catch (_) {
      // stay on the current step on error
    } finally {
      setIsSaving(false);
    }
  }, [goToNextStep]);

  // Function to update the data specific to the current active step
  const updateStateData = (updates: any) => {
    switch (state.currentStep) {
      case OnboardingDataSteps.Step1:
        setState(prevState => ({ ...prevState, step1: { ...prevState.step1, ...updates } }));
        break;
      case OnboardingDataSteps.Step2:
        setState(prevState => ({ ...prevState, step2: { ...prevState.step2, ...updates } }));
        break;
      case OnboardingDataSteps.Step3:
        setState(prevState => ({ ...prevState, step3: { ...prevState.step3, ...updates } }));
        break;
      case OnboardingDataSteps.Step4:
        setState(prevState => ({ ...prevState, step4: { ...prevState.step4, ...updates } }));
        break;
      case OnboardingDataSteps.Step5:
        setState(prevState => ({ ...prevState, step5: { ...prevState.step5, ...updates } }));
        break;
      default:
        break;
    }
  };

  // Common props for all step components (DRY)
  const commonStepProps = {
    currentStep: state.currentStep,
    updateState: updateStateData,
    onNext: goToNextStep,
    onBack: goToPrevStep,
    setOnNext,
  } as const;

  type OnboardingStepConfig = {
    title: string;
    subtitle: string;
    render: React.ReactNode;
  };
  const onboardingStepsConfigs: Record<OnboardingDataSteps, OnboardingStepConfig> = {
    [OnboardingDataSteps.Step1]: {
      title: "Confirm Your Details",
      subtitle: "This is so that we can get in contact with you in case any opportunity comes up.",
      render: <Step1 {...commonStepProps} state={state.step1} />,
    },
    [OnboardingDataSteps.Step2]: {
      title: "Open Source Involvement",
      subtitle: "Select the projects you're involved with",
      render: <Step2 {...commonStepProps} state={state.step2} />,
    },
    [OnboardingDataSteps.Step3]: {
      title: "Choose Your Participation Model",
      subtitle: "Select your level of interest for each option - you can participate in multiple ways",
      render: <Step3 {...commonStepProps} state={state.step3} />,
    },
    [OnboardingDataSteps.Step4]: {
      title: "Availability & Rate",
      subtitle: "Share your availability and indicative rate",
      render: <Step4 {...commonStepProps} state={state.step4} />,
    },
    [OnboardingDataSteps.Step5]: {
      title: "Services & Preferences",
      subtitle: "Detail the services and offerings you provide",
      render: <Step5 {...commonStepProps} state={state.step5} />,
    },
  };

  // Wizard steps configuration
  const wizardSteps = [
    { number: 1, title: "Your Details", description: "Confirm Your Details" },
    { number: 2, title: "Your Involvement", description: "Open Source Involvement" },
    { number: 3, title: "Active Income", description: "Income Streams" },
    { number: 4, title: "Availability & Rate", description: "Share your availability" },
    { number: 5, title: "Services & Preferences", description: "Detail your services" },
  ];

  // Step width configuration - adapts to content type
  const STEP_MAX_WIDTHS: Record<number, string> = {
    1: "max-w-2xl", // Identity - narrow form
    2: "max-w-4xl", // Projects - project cards
    3: "max-w-3xl", // Participation - selection cards
    4: "max-w-2xl", // Availability - form fields
    5: "max-w-5xl", // Services - service grid/pricing
  };

  return (
    <PageWrapper>
      <div className="min-h-screen bg-gradient-to-b from-brand-secondary via-brand-neutral-100 to-brand-secondary-dark">
        {apiError && (
          <div className="container mx-auto px-4 pt-4">
            <ServerErrorAlert error={apiError} variant="compact" />
          </div>
        )}
        {isLoading ? (
          <div className="container mx-auto px-4 py-16">
            <LoadingState message="Loading onboarding steps..." variant="spinner" size="lg" />
          </div>
        ) : (
          <div className="container mx-auto px-4 lg:px-8 py-8">
            {/* Progress Indicator */}
            <WizardStepIndicator
              steps={wizardSteps}
              currentStep={state.currentStep}
              completedSteps={[]}
              highestStepReached={state.currentStep}
              onStepClick={goToStep}
            />

            {/* Main Content */}
            <div className="py-8 lg:py-12">
              {/* Desktop: Sidebar + Content Layout */}
              <div className="flex gap-8 lg:gap-12">
                {/* Step Sidebar - Desktop Only */}
                <StepSidebar
                  stepNumber={state.currentStep}
                  title={wizardSteps[state.currentStep - 1]?.title || ""}
                  description={onboardingStepsConfigs[state.currentStep].title}
                />

                {/* Step Content */}
                <div className={`flex-1 min-h-96 flex flex-col w-full ${STEP_MAX_WIDTHS[state.currentStep]}`}>
                  {/* Step Header */}
                  <div className="mb-8">
                    <div className="mb-2">
                      <span className="text-xs uppercase tracking-wider text-brand-neutral-600">Step {state.currentStep.toString().padStart(2, "0")}</span>
                    </div>
                    <h2 className="text-brand-neutral-800 mb-3">{onboardingStepsConfigs[state.currentStep].title}</h2>
                    <p className="text-brand-neutral-800">{onboardingStepsConfigs[state.currentStep].subtitle}</p>
                    <div className="mt-6">
                      <div className="h-1 w-16 bg-gradient-to-r from-brand-accent to-brand-highlight rounded-full" />
                    </div>
                  </div>

                  {/* Step Content Area */}
                  <div className="flex-1">{onboardingStepsConfigs[state.currentStep].render}</div>

                  {/* Navigation */}
                  <WizardNavigation
                    currentStep={state.currentStep}
                    totalSteps={5}
                    isSaving={isSaving}
                    onBack={goToPrevStep}
                    onCancel={() => navigate(paths.DEVELOPER_LANDING)}
                    onNext={handleContinue}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}

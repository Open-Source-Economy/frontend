import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useAuth } from "src/views/pages/authenticate/AuthContext";
import { getOnboardingBackendAPI } from "src/services";

import Step1 from "./steps/step1/Step1";
import Step2 from "./steps/step2/Step2";
import Step6 from "./steps/step6/Step6";

import { paths } from "../../../../paths";
import { PageWrapper } from "../../PageWrapper";
import { ApiError } from "src/ultils/error/ApiError";
import { PageLoader } from "../../../components/common";
import { OnboardingDataSteps, OnboardingState, transformFullDeveloperProfileToOnboardingState } from "./OnboardingDataSteps";
import * as dto from "@open-source-economy/api-types";
import { Currency, OpenToOtherOpportunityType } from "@open-source-economy/api-types";
import { Step3 } from "./steps/step3";
import { Step4 } from "./steps/step4";
import { Step5 } from "./steps/step5";
import { PreferredCurrency } from "../../../../ultils/PreferredCurrency";
import ProgressBar from "./components/ProgressBar";
import { handleApiCall } from "../../../../ultils";
import ErrorDisplay from "./components/ErrorDisplay";
import { StepHeader } from "./landing/components";

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
    incomeStreams: [],
  },
  step4: {
    hourlyWeeklyCommitment: 0,
    openToOtherOpportunity: OpenToOtherOpportunityType.NO,
    hourlyRate: 0,
    currency: preferredCurrency,
    hourlyWeeklyCommitmentComments: "",
    openToOtherOpportunityComments: "",
    hourlyRateComments: "",
  },
  step5: {
    currency: preferredCurrency,
    developerServices: [],
    developerProjectItems: [],
  },
  step6: {},
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

  const currentUrlStep = parseInt(searchParams.get("step") || OnboardingDataSteps.Step1.toString());

  // TODO: lolo
  useEffect(() => {
    let currentStep = OnboardingDataSteps.Step1;

    // If the URL step is invalid, redirect to Step1
    if (isNaN(currentUrlStep) || currentUrlStep < OnboardingDataSteps.Step1 || currentUrlStep > OnboardingDataSteps.Step6) {
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
  }, [currentUrlStep, setSearchParams]); // TODO: lolo not sure about it Depend on currentUrlStep and setSearchParams

  const goToStep = (step: OnboardingDataSteps) => {
    setSearchParams({ step: step.toString() });
    setState(prevState => ({ ...prevState, currentStep: step }));
  };

  const goToNextStep = () => {
    if (state.currentStep < OnboardingDataSteps.Step6) {
      goToStep(state.currentStep + 1);
    } else {
      // If already on the last step, navigate to the home/dashboard
      navigate(paths.HOME);
    }
  };

  const goToPrevStep = () => {
    if (state.currentStep > OnboardingDataSteps.Step1) {
      goToStep(state.currentStep - 1);
    } else {
      // If on the first step, navigate back to the main onboarding landing page
      navigate(paths.DEV_ONBOARDING);
    }
  };

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
      case OnboardingDataSteps.Step6:
        setState(prevState => ({ ...prevState, step6: { ...prevState.step6, ...updates } }));
        break;
      default:
        break;
    }
  };

  type OnboardingStepConfig = {
    title: string;
    subtitle: string;
    render: React.ReactNode;
  };
  const onboardingStepsConfigs: Record<OnboardingDataSteps, OnboardingStepConfig> = {
    [OnboardingDataSteps.Step1]: {
      title: "Confirm Your Details",
      subtitle: "This is so that we can get in contact with you.",
      render: <Step1 currentStep={state.currentStep} state={state.step1} updateState={updateStateData} onNext={goToNextStep} onBack={goToPrevStep} />,
    },
    [OnboardingDataSteps.Step2]: {
      title: "Open Source Involvement",
      subtitle: "Select the projects you're involved with",
      render: <Step2 currentStep={state.currentStep} state={state.step2} updateState={updateStateData} onNext={goToNextStep} onBack={goToPrevStep} />,
    },
    [OnboardingDataSteps.Step3]: {
      title: "Income Streams",
      subtitle: "Let us know how you earn your income",
      render: <Step3 currentStep={state.currentStep} state={state.step3} updateState={updateStateData} onNext={goToNextStep} onBack={goToPrevStep} />,
    },
    [OnboardingDataSteps.Step4]: {
      title: "Availability & Rate",
      subtitle: "Share your availability and indicative rate",
      render: <Step4 currentStep={state.currentStep} state={state.step4} updateState={updateStateData} onNext={goToNextStep} onBack={goToPrevStep} />,
    },
    [OnboardingDataSteps.Step5]: {
      title: "Services & Offerings",
      subtitle: "Detail the services and offerings you provide",
      render: <Step5 currentStep={state.currentStep} state={state.step5} updateState={updateStateData} onNext={goToNextStep} onBack={goToPrevStep} />,
    },
    [OnboardingDataSteps.Step6]: {
      title: "Merge Rights",
      subtitle: "Set your preferences for merge rights",
      render: <Step6 currentStep={state.currentStep} state={state.step6} updateState={updateStateData} onNext={goToNextStep} onBack={goToPrevStep} />,
    },
  };

  return (
    <PageWrapper>
      {/* Corrected: The outer curly brace for the conditional rendering was missing. */}
      <div className="bg-[#0e1f35] min-h-screen">
        <ErrorDisplay message={apiError?.message} />
        {isLoading ? (
          <PageLoader message="Loading onboarding steps..." />
        ) : (
          <>
            <div className="box-border content-stretch flex flex-col gap-[50px] items-center justify-start pb-[100px] pt-[80px] px-0 relative size-full">
              <ProgressBar currentStep={state.currentStep} />
              <div className="flex px-[120px] flex-col items-center gap-[100px] self-stretch">
                <StepHeader
                  currentStep={state.currentStep}
                  title={onboardingStepsConfigs[state.currentStep].title}
                  subtitle={onboardingStepsConfigs[state.currentStep].subtitle}
                >
                  {onboardingStepsConfigs[state.currentStep].render}
                </StepHeader>
              </div>
            </div>
          </>
        )}
      </div>
    </PageWrapper>
  );
}

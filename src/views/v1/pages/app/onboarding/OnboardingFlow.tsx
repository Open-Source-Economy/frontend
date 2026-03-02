import React, { useEffect, useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";

import { useAuth } from "src/views/v1/pages/authenticate/AuthContext";

import Step1 from "./steps/step1/Step1";
import Step2 from "./steps/step2/Step2";

import { PageWrapper } from "../../PageWrapper";
import { PageLoader } from "../../../components/common/PageLoader";
import {
  OnboardingDataSteps,
  OnboardingState,
  transformFullDeveloperProfileToOnboardingState,
} from "./OnboardingDataSteps";
import * as dto from "@open-source-economy/api-types";
import { Step3 } from "./steps/step3";
import { Step4 } from "./steps/step4";
import { Step5 } from "./steps/step5";
import { PreferredCurrency } from "../../../../../utils/PreferredCurrency";
import ProgressBar from "./components/ProgressBar";
import ErrorDisplay from "./components/ErrorDisplay";
import { StepHeader } from "./landing/components";
import { onboardingHooks } from "src/api";

const createInitialState = (preferredCurrency: dto.Currency): OnboardingState => ({
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
  const searchParams = useSearch({ strict: false }) as Record<string, string | undefined>;
  const navigate = useNavigate();
  const auth = useAuth();

  const preferredCurrency: dto.Currency = PreferredCurrency.get(auth);

  // Use a single state object to hold all onboarding data
  const [state, setState] = useState<OnboardingState>(createInitialState(preferredCurrency));

  const currentUrlStep = parseInt(searchParams.step || OnboardingDataSteps.Step1.toString());

  const params: dto.GetDeveloperProfileParams = {};
  const query: dto.GetDeveloperProfileQuery = {};
  const profileQuery = onboardingHooks.useDeveloperProfileQuery(params, query);

  // TODO: lolo
  useEffect(() => {
    let currentStep = OnboardingDataSteps.Step1;

    // If the URL step is invalid, redirect to Step1
    if (
      isNaN(currentUrlStep) ||
      currentUrlStep < OnboardingDataSteps.Step1 ||
      currentUrlStep > OnboardingDataSteps.Step5
    ) {
      navigate({ search: { step: currentStep.toString() } as any, replace: true });
    } else {
      currentStep = currentUrlStep as OnboardingDataSteps;
    }

    if (profileQuery.data?.profile) {
      const newState = transformFullDeveloperProfileToOnboardingState(
        currentStep,
        profileQuery.data.profile,
        preferredCurrency
      );
      setState(newState);
    }
  }, [currentUrlStep, navigate, profileQuery.data]); // TODO: lolo not sure about it Depend on currentUrlStep and navigate

  const goToStep = (step: OnboardingDataSteps) => {
    navigate({ search: { step: step.toString() } as any, replace: true });
    setState((prevState) => ({ ...prevState, currentStep: step }));
  };

  const goToNextStep = () => {
    if (state.currentStep < OnboardingDataSteps.Step5) {
      goToStep(state.currentStep + 1);
    } else {
      navigate({ to: "/developer-onboarding-completed" as string });
    }
  };

  const goToPrevStep = () => {
    if (state.currentStep > OnboardingDataSteps.Step1) {
      goToStep(state.currentStep - 1);
    } else {
      // If on the first step, navigate back to the main onboarding landing page
      navigate({ to: "/developer" as string });
    }
  };

  // Function to update the data specific to the current active step
  const updateStateData = (updates: any) => {
    switch (state.currentStep) {
      case OnboardingDataSteps.Step1:
        setState((prevState) => ({ ...prevState, step1: { ...prevState.step1, ...updates } }));
        break;
      case OnboardingDataSteps.Step2:
        setState((prevState) => ({ ...prevState, step2: { ...prevState.step2, ...updates } }));
        break;
      case OnboardingDataSteps.Step3:
        setState((prevState) => ({ ...prevState, step3: { ...prevState.step3, ...updates } }));
        break;
      case OnboardingDataSteps.Step4:
        setState((prevState) => ({ ...prevState, step4: { ...prevState.step4, ...updates } }));
        break;
      case OnboardingDataSteps.Step5:
        setState((prevState) => ({ ...prevState, step5: { ...prevState.step5, ...updates } }));
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
      subtitle: "This is so that we can get in contact with you in case any opportunity comes up.",
      render: (
        <Step1
          currentStep={state.currentStep}
          state={state.step1}
          updateState={updateStateData}
          onNext={goToNextStep}
          onBack={goToPrevStep}
        />
      ),
    },
    [OnboardingDataSteps.Step2]: {
      title: "Open Source Involvement",
      subtitle: "Select the projects you're involved with",
      render: (
        <Step2
          currentStep={state.currentStep}
          state={state.step2}
          updateState={updateStateData}
          onNext={goToNextStep}
          onBack={goToPrevStep}
        />
      ),
    },
    [OnboardingDataSteps.Step3]: {
      title: "Income Streams",
      subtitle: "Let us know how you would like to fund your open source work",
      render: (
        <Step3
          currentStep={state.currentStep}
          state={state.step3}
          updateState={updateStateData}
          onNext={goToNextStep}
          onBack={goToPrevStep}
        />
      ),
    },
    [OnboardingDataSteps.Step4]: {
      title: "Availability & Rate",
      subtitle: "Share your availability and indicative rate",
      render: (
        <Step4
          currentStep={state.currentStep}
          state={state.step4}
          updateState={updateStateData}
          onNext={goToNextStep}
          onBack={goToPrevStep}
        />
      ),
    },
    [OnboardingDataSteps.Step5]: {
      title: "Services & Preferences",
      subtitle: "Detail the services and offerings you provide",
      render: (
        <Step5
          currentStep={state.currentStep}
          state={state.step5}
          updateState={updateStateData}
          onNext={goToNextStep}
          onBack={goToPrevStep}
        />
      ),
    },
  };

  return (
    <PageWrapper>
      {/* Corrected: The outer curly brace for the conditional rendering was missing. */}
      <div className="bg-[#0e1f35] min-h-screen">
        <ErrorDisplay message={profileQuery.error?.message} />
        {profileQuery.isLoading ? (
          <PageLoader message="Loading onboarding steps..." />
        ) : (
          <>
            <div className="box-border content-stretch flex flex-col gap-[24px] items-center justify-start pb-[50px] pt-[24px] px-0 relative size-full">
              <ProgressBar currentStep={state.currentStep} />
              <div className="flex px-[80px] flex-col items-center gap-[48px] self-stretch">
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

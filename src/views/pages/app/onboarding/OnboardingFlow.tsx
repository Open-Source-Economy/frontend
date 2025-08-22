import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useAuth } from "src/views/pages/authenticate/AuthContext";
import { getOnboardingBackendAPI } from "src/services";

import Step1 from "./steps/step1/Step1";
import Step2 from "./steps/step2/Step2";
import Step6 from "./steps/steps6/Step6";

import { paths } from "../../../../paths";
import { PageWrapper } from "../../PageWrapper";
import { ApiError } from "src/ultils/error/ApiError";
import { PageLoader } from "../../../components/common";
import { OnboardingDataSteps, OnboardingState, transformFullDeveloperProfileToOnboardingState } from "./OnboardingDataSteps";
import * as dto from "@open-source-economy/api-types";
import { Currency, OpenToOtherOpportunityType } from "@open-source-economy/api-types";
import { Step3 } from "./steps/step3/Step3";
import { Step4 } from "./steps/steps4/Step4";
import Step5 from "./steps/step5/Step5";
import { PreferredCurrency } from "../../../../ultils/PreferredCurrency";

const createInitialState = (preferredCurrency: Currency): OnboardingState => ({
  currentStep: OnboardingDataSteps.Step1,
  step1: {
    name: "",
    email: "",
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
    comments: "",
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
  const [loading, setLoading] = useState(true);
  // TODO: Handle errors properly
  const [error, setError] = useState<ApiError | null>(null);

  const currentUrlStep = parseInt(searchParams.get("step") || OnboardingDataSteps.Step1.toString());

  useEffect(() => {
    // TODO: sam can you use the handleApiCall utility function here? I made an example in Step1.tsx
    async function initialStateSync(currentStep: OnboardingDataSteps) {
      setLoading(true);
      try {
        const params: dto.GetDeveloperProfileParams = {};
        const query: dto.GetDeveloperProfileQuery = {};
        const response = await onboardingAPI.getDeveloperProfile(params, query);
        if (response instanceof ApiError) {
          setError(response);
          return;
        } else if (response.profile) {
          const state = transformFullDeveloperProfileToOnboardingState(currentStep, response.profile, preferredCurrency);
          setState(state);
        }
      } catch (error) {
        setError(ApiError.from(error));
        return;
      } finally {
        setLoading(false);
      }
    }

    setLoading(true);
    let currentStep = OnboardingDataSteps.Step1;

    // If the URL step is invalid, redirect to Step1
    if (isNaN(currentUrlStep) || currentUrlStep < OnboardingDataSteps.Step1 || currentUrlStep > OnboardingDataSteps.Step6) {
      setSearchParams({ step: currentStep.toString() });
    } else {
      currentStep = currentUrlStep as OnboardingDataSteps;
    }
    initialStateSync(currentStep);

    setLoading(false);
  }, [currentUrlStep, setSearchParams]); // Depend on currentUrlStep and setSearchParams

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

  // Renders the appropriate step component based on the current `state.currentStep`
  const renderCurrentStep = () => {
    switch (state.currentStep) {
      case OnboardingDataSteps.Step1:
        return <Step1 currentStep={state.currentStep} state={state.step1} updateState={updateStateData} onNext={goToNextStep} onBack={goToPrevStep} />;
      case OnboardingDataSteps.Step2:
        return <Step2 currentStep={state.currentStep} state={state.step2} updateState={updateStateData} onNext={goToNextStep} onBack={goToPrevStep} />;
      case OnboardingDataSteps.Step3:
        return <Step3 currentStep={state.currentStep} state={state.step3} updateState={updateStateData} onNext={goToNextStep} onBack={goToPrevStep} />;
      case OnboardingDataSteps.Step4:
        return <Step4 currentStep={state.currentStep} state={state.step4} updateState={updateStateData} onNext={goToNextStep} onBack={goToPrevStep} />;
      case OnboardingDataSteps.Step5:
        return <Step5 currentStep={state.currentStep} state={state.step5} updateState={updateStateData} onNext={goToNextStep} onBack={goToPrevStep} />;
      case OnboardingDataSteps.Step6:
        return (
          <Step6
            currentStep={state.currentStep}
            state={{}} // Step 6 has no data, so an empty object is passed
            updateState={updateStateData}
            onNext={goToNextStep}
            onBack={goToPrevStep}
          />
        );
      default:
        console.error("Unknown onboarding step:", state.currentStep);
        return <PageLoader message="Error: Unknown step." />;
    }
  };

  return (
    <PageWrapper>
      <div className="bg-[#0e1f35] min-h-screen">{loading ? <PageLoader message="Loading onboarding steps..." /> : renderCurrentStep()}</div>
    </PageWrapper>
  );
}

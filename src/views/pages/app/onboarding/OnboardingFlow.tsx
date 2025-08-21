import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useAuth } from "src/views/pages/authenticate/AuthContext";
import { getOnboardingBackendAPI } from "src/services";
import { paths } from "src/paths";
import {
  GetDeveloperProfileResponse,
  FullDeveloperProfile,
  Currency,
  IncomeStreamType,
  OpenToOtherOpportunityType,
  DeveloperRoleType,
  MergeRightsType,
  ProjectItemType,
  ProjectItemId,
  DeveloperProjectItemId
} from "@open-source-economy/api-types";
import { ApiError } from "src/ultils/error/ApiError";

import Step1Profile from "./steps/Step1Profile";
import Step2Involvement from "./steps/Step2Involvement";

// Unified project item type for onboarding (extends the backend DeveloperProjectItem with frontend-specific fields)
export interface OnboardingProjectItem {
  id: DeveloperProjectItemId;
  projectItemId: ProjectItemId;
  projectItemType: ProjectItemType;
  sourceIdentifier: string; // URL for the repository
  roles: DeveloperRoleType[];
  mergeRights: MergeRightsType[];
}
// TODO: Re-enable when steps 3+ are updated to use api-types
// import Step3ActiveIncome from "./steps/Step3ActiveIncome";
// import Step4AvailabilityRate from "./steps/Step4AvailabilityRate";
// import Step5TasksPreferences from "./steps/Step5TasksPreferences";
// import Step6Completion from "./steps/Step6Completion";

<<<<<<< HEAD
export interface OnboardingState {
  // Step 1 - Profile
  name: string;
  email: string;
  agreedToTerms: boolean;

  // Step 2 - Involvement  
  involvement?: {
    projects: OnboardingProjectItem[];
  };

  // TODO: Re-enable when steps 3+ are updated to use api-types
  // Step 3 - Active Income
  // activeIncome?: {
  //   incomeStreams: IncomeStreamType[];
  // };

  // Step 4 - Availability & Rate
  // availability?: {
  //   weeklyHours: string;
  //   largerOpportunities: OpenToOtherOpportunityType | "";
  //   hourlyRate: string;
  //   currency: Currency;
  //   comments: string;
  // };

  // TODO: Re-enable when steps 5+ are updated to use api-types
  // Step 5 - Tasks & Preferences
  // tasks?: {
  //   selectedTasks: Array<{
  //     id: string;
  //     serviceId: string;
  //     name: string;
  //     category: string;
  //     projects?: string[];
  //     hourlyRate?: number;
  //     currency?: string;
  //     responseTime?: string;
  //     customService?: string;
  //     hasResponseTime?: boolean;
  //   }>;
  // };
}
=======
import { paths } from "../../../../paths";
import { PageWrapper } from "../../PageWrapper";
import { ApiError } from "src/ultils/error/ApiError";
import { PageLoader } from "../../../components/common";
import { OnboardingDataSteps, OnboardingState, transformFullDeveloperProfileToOnboardingState } from "./OnboardingDataSteps";
import { Currency, OpenToOtherOpportunityType } from "@open-source-economy/api-types";
>>>>>>> stage

const initialState: OnboardingState = {
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
    currency: Currency.USD,
    comments: "",
  },
  step5: {
    services: [],
  },
  step6: {},
};

export default function OnboardingFlow() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const auth = useAuth();
  const onboardingAPI = getOnboardingBackendAPI();

  // Use a single state object to hold all onboarding data
  const [state, setState] = useState<OnboardingState>(initialState);
  const [loading, setLoading] = useState(true);
  // TODO: Handle errors properly
  const [error, setError] = useState<ApiError | null>(null);

  const currentUrlStep = parseInt(searchParams.get("step") || OnboardingDataSteps.Step1.toString());

  useEffect(() => {
    // TODO: sam can you use the handleApiCall utility function here? I made an example in Step1Profile.tsx
    async function initialStateSync(currentStep: OnboardingDataSteps) {
      setLoading(true);
      try {
        const response = await onboardingAPI.getDeveloperProfile();
        if (response instanceof ApiError) {
          setError(response);
          return;
        } else if (response.profile) {
          const state = transformFullDeveloperProfileToOnboardingState(currentStep, response.profile);
          setState(state);
        } else {
          setState(initialState);
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

<<<<<<< HEAD
  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);

      try {
        // Check if user is authenticated
        if (!auth.authInfo) {
          // Redirect to authentication if not logged in
          navigate("/sign-in", { state: { from: paths.DEV_ONBOARDING_PROFILE } });
          return;
        }

        // Try to fetch user data and developer profile
        const profileResponse: GetDeveloperProfileResponse | ApiError = await onboardingAPI.getDeveloperProfile({}, {});

        if (profileResponse && !(profileResponse instanceof ApiError) && profileResponse.profile) {
          // Successfully got user data from backend
          const profile: FullDeveloperProfile = profileResponse.profile;
          updateState({
            name: profile.name || "",
            email: profile.email || "",
            agreedToTerms: profile.agreedToTerms || false,
            // Map other profile fields as needed if profile exists
          });
        } else {
          // Fallback to auth context if API call fails
          const userName = auth.authInfo.user?.name || "";
          let userEmail = "";
          if (auth.authInfo.user?.data && "email" in auth.authInfo.user.data) {
            userEmail = auth.authInfo.user.data.email ?? "";
          }

          updateState({
            name: userName,
            email: userEmail,
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Fall back to auth info if available
        if (auth.authInfo?.user) {
          const userName = auth.authInfo.user.name || "";
          let userEmail = "";
          if (auth.authInfo.user.data && "email" in auth.authInfo.user.data) {
            userEmail = auth.authInfo.user.data.email ?? "";
          }

          updateState({
            name: userName,
            email: userEmail,
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [auth.authInfo]);

  const renderCurrentStep = () => {
    const stepProps = {
      state,
      updateState,
      onNext: goToNextStep,
      onBack: goToPrevStep,
      currentStep,
    };

    switch (currentStep) {
      case 1:
        return <Step1Profile {...stepProps} />;
      case 2:
        return <Step2Involvement {...stepProps} />;
      // TODO: Re-enable when steps 3+ are updated to use api-types
      // case 3:
      //   return <Step3ActiveIncome {...stepProps} />;
      // case 4:
      //   return <Step4AvailabilityRate {...stepProps} />;
      // case 5:
      //   return <Step5TasksPreferences {...stepProps} />;
      // case 6:
      //   return <Step6Completion {...stepProps} />;
=======
  // Renders the appropriate step component based on the current `state.currentStep`
  const renderCurrentStep = () => {
    switch (state.currentStep) {
      case OnboardingDataSteps.Step1:
        return <Step1Profile currentStep={state.currentStep} state={state.step1} updateState={updateStateData} onNext={goToNextStep} onBack={goToPrevStep} />;
      case OnboardingDataSteps.Step2:
        return (
          <Step2Involvement currentStep={state.currentStep} state={state.step2} updateState={updateStateData} onNext={goToNextStep} onBack={goToPrevStep} />
        );
      case OnboardingDataSteps.Step3:
        return (
          <Step3ActiveIncome currentStep={state.currentStep} state={state.step3} updateState={updateStateData} onNext={goToNextStep} onBack={goToPrevStep} />
        );
      case OnboardingDataSteps.Step4:
        return (
          <Step4AvailabilityRate
            currentStep={state.currentStep}
            state={state.step4}
            updateState={updateStateData}
            onNext={goToNextStep}
            onBack={goToPrevStep}
          />
        );
      case OnboardingDataSteps.Step5:
        return (
          <Step5TasksPreferences
            currentStep={state.currentStep}
            state={state.step5}
            updateState={updateStateData}
            onNext={goToNextStep}
            onBack={goToPrevStep}
          />
        );
      case OnboardingDataSteps.Step6:
        return (
          <Step6Completion
            currentStep={state.currentStep}
            state={{}} // Step 6 has no data, so an empty object is passed
            updateState={updateStateData}
            onNext={goToNextStep}
            onBack={goToPrevStep}
          />
        );
>>>>>>> stage
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

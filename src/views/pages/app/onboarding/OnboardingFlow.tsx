import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Header } from "src/views/layout/header/Header";
import { Footer } from "src/views/layout/footer/Footer";
import { useAuth } from "src/views/pages/authenticate/AuthContext";
import { getOnboardingBackendAPI } from "src/services";
import { paths } from "src/paths";
import {
  GetDeveloperProfileResponse,
  FullDeveloperProfile,
  Currency,
  OpenToOtherOpportunityType
} from "@open-source-economy/api-types";
import { ApiError } from "src/ultils/error/ApiError";
import {
  OnboardingDataSteps,
  OnboardingState as DataOnboardingState,
  Step1State,
  Step2State,
  transformFullDeveloperProfileToOnboardingState
} from "./OnboardingDataSteps";

// Step components (we'll create these)
import Step1Profile from "./steps/Step1Profile";
import Step2Involvement from "./steps/Step2Involvement";

// TODO: Re-enable when steps 3+ are updated to use api-types
// import Step3ActiveIncome from "./steps/Step3ActiveIncome";
// import Step4AvailabilityRate from "./steps/Step4AvailabilityRate";
// import Step5TasksPreferences from "./steps/Step5TasksPreferences";
// import Step6Completion from "./steps/Step6Completion";

export default function OnboardingFlow() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const auth = useAuth();
  const onboardingAPI = getOnboardingBackendAPI();
  const [state, setState] = useState<DataOnboardingState>({
    currentStep: OnboardingDataSteps.Step1,
    step1: { name: "", email: "", agreedToTerms: false },
    step2: { projects: [] },
    step3: { incomeStreams: [] },
    step4: { 
      hourlyWeeklyCommitment: 0,
      openToOtherOpportunity: OpenToOtherOpportunityType.NO,
      hourlyRate: 0,
      currency: Currency.USD,
      comments: ""
    },
    step5: { services: [] },
    step6: {}
  });
  const [loading, setLoading] = useState(true);

  // Get current step from URL params, default to Step1
  const currentStep = (parseInt(searchParams.get("step") || "1") as OnboardingDataSteps) || OnboardingDataSteps.Step1;

  // Update URL when step changes
  const goToStep = (step: OnboardingDataSteps) => {
    setSearchParams({ step: step.toString() });
    setState(prev => ({ ...prev, currentStep: step }));
  };

  // Navigation handlers
  const goToNextStep = () => {
    if (currentStep < OnboardingDataSteps.Step6) {
      goToStep((currentStep + 1) as OnboardingDataSteps);
    } else {
      // Already on completion page, navigate to dashboard
      navigate("/dashboard"); // TODO: lolo
    }
  };

  const goToPrevStep = () => {
    if (currentStep > OnboardingDataSteps.Step1) {
      goToStep((currentStep - 1) as OnboardingDataSteps);
    } else {
      // Go back to main onboarding landing page
      navigate("/onboarding"); // TODO: lolo
    }
  };

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
          const transformedState = transformFullDeveloperProfileToOnboardingState(currentStep, profile);
          setState(transformedState);
        } else {
          // Fallback to auth context if API call fails
          const userName = auth.authInfo.user?.name || "";
          let userEmail = "";
          if (auth.authInfo.user?.data && "email" in auth.authInfo.user.data) {
            userEmail = auth.authInfo.user.data.email ?? "";
          }

          setState(prev => ({
            ...prev,
            step1: {
              ...prev.step1,
              name: userName,
              email: userEmail,
            }
          }));
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

          setState(prev => ({
            ...prev,
            step1: {
              ...prev.step1,
              name: userName,
              email: userEmail,
            }
          }));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [auth.authInfo]);

  const renderCurrentStep = () => {
    switch (currentStep) {
      case OnboardingDataSteps.Step1:
        return (
          <Step1Profile
            currentStep={currentStep}
            state={state.step1}
            updateState={(updates: Partial<Step1State>) => {
              setState(prev => ({ ...prev, step1: { ...prev.step1, ...updates } }));
            }}
            onNext={goToNextStep}
            onBack={goToPrevStep}
          />
        );
      case OnboardingDataSteps.Step2:
        return (
          <Step2Involvement
            currentStep={currentStep}
            state={state.step2}
            updateState={(updates: Partial<Step2State>) => {
              setState(prev => ({ ...prev, step2: { ...prev.step2, ...updates } }));
            }}
            onNext={goToNextStep}
            onBack={goToPrevStep}
          />
        );
      // TODO: Re-enable when steps 3+ are updated to use api-types
      // case OnboardingDataSteps.Step3:
      //   return <Step3ActiveIncome ... />;
      // case OnboardingDataSteps.Step4:
      //   return <Step4AvailabilityRate ... />;
      // case OnboardingDataSteps.Step5:
      //   return <Step5TasksPreferences ... />;
      // case OnboardingDataSteps.Step6:
      //   return <Step6Completion ... />;
      default:
        return (
          <Step1Profile
            currentStep={currentStep}
            state={state.step1}
            updateState={(updates: Partial<Step1State>) => {
              setState(prev => ({ ...prev, step1: { ...prev.step1, ...updates } }));
            }}
            onNext={goToNextStep}
            onBack={goToPrevStep}
          />
        );
    }
  };

  return (
    <>
      <Header />
      <div className="bg-[#0e1f35] min-h-screen">
        {loading ? (
          <div className="flex items-center justify-center h-screen">
            <div className="text-white text-2xl">Loading your profile...</div>
          </div>
        ) : (
          renderCurrentStep()
        )}
      </div>
      <Footer />
    </>
  );
}

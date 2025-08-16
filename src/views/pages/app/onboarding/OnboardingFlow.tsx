import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import { useAuth } from "src/views/pages/authenticate/AuthContext";
import { getOnboardingBackendAPI } from "src/services";

// Step components (we'll create these)
import Step1Profile from "./steps/Step1Profile";
import Step2Involvement from "./steps/Step2Involvement";
import Step3ActiveIncome from "./steps/Step3ActiveIncome";
import Step4AvailabilityRate from "./steps/Step4AvailabilityRate";
import Step5TasksPreferences from "./steps/Step5TasksPreferences";
import Step6Completion from "./steps/Step6Completion";
import { paths } from "../../../../paths";
import { PageWrapper } from "../../PageWrapper";
import { ApiError } from "src/ultils/error/ApiError";

export interface OnboardingState {
  // Step 1 - Profile
  name: string;
  email: string;
  agreedToTerms: boolean;

  // Step 2 - Involvement
  involvement?: {
    projects: Array<{
      id: string;
      organization: string;
      repository: string;
      role: string;
      mergeRights: string;
    }>;
  };

  // Step 3 - Active Income
  activeIncome?: {
    royalties: boolean;
    offerServices: boolean;
    donations: boolean;
  };

  // Step 4 - Availability & Rate
  availability?: {
    weeklyHours: string;
    largerOpportunities: "yes" | "maybe" | "no" | ""; // TODO: lolo
    hourlyRate: string;
    currency: string;
    comments: string;
  };

  // Step 5 - Tasks & Preferences
  tasks?: {
    selectedTasks: Array<{
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
    }>;
  };
}

const initialState: OnboardingState = {
  name: "",
  email: "",
  agreedToTerms: false
};

export default function OnboardingFlow() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const auth = useAuth();
  const onboardingAPI = getOnboardingBackendAPI();
  const [state, setState] = useState<OnboardingState>(initialState);
  const [loading, setLoading] = useState(true);

  // TODO: handle errors properly
  const [error, setError] = useState<ApiError | null>(null);

  // Get current step from URL params, default to 1
  const currentStep = parseInt(searchParams.get("step") || "1"); // TODO: lolo enum the steps

  if (isNaN(currentStep) || currentStep < 1 || currentStep > 6) { // TODO: lolo enum the steps
    // If step is invalid, redirect to step 1
    setSearchParams({ step: "1" });
  }

  // Update URL when step changes
  const goToStep = (step: number) => {
    setSearchParams({ step: step.toString() });
  };

  // Navigation handlers
  const goToNextStep = () => {
    if (currentStep < 6) {
      goToStep(currentStep + 1);
    } else {
      // Already on completion page, navigate to dashboard
      navigate(paths.HOME); // TODO: improve this
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 1) {
      goToStep(currentStep - 1);
    } else {
      // Go back to main onboarding landing page
      navigate(paths.DEV_ONBOARDING); // TODO: improve this
    }
  };

  // Update state
  const updateState = (updates: Partial<OnboardingState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => { // TODO: lolo this is completely wrong: getDeveloperProfile should setup OnboardingState
      setLoading(true);

      try {
      //   if (!auth.authInfo?.user) {
      //     // TODO: lolo - should we need this?
      //     console.warn("User not authenticated, redirecting to sign-in page.");
      //     // // Redirect to authentication if not logged in
      //     // navigate(paths.SIGN_IN, { state: { from: "/onboarding/start?step=1" } });
      //     // // paths.SIGN_IN is false
      //     return;
      //   }
      //
      //   // Try to fetch user data and developer profile
      //   const profileResponse = await onboardingAPI.getDeveloperProfile();
      //
      //   if (profileResponse instanceof ApiError) {
      //     console.error("Failed to fetch developer profile:", profileResponse.message);
      //     setError(profileResponse)
      //   } else {
      //
      //     updateState({
      //       name: profileResponse.user.name || "",
      //       email: profileResponse.user.email || "",
      //       // Map other profile fields as needed if profile exists
      //     });
      //
      //     // Fallback to auth context if API call fails
      //     const userName = auth.authInfo.user?.name || "";
      //     let userEmail = "";
      //     if (auth.authInfo.user?.data && "email" in auth.authInfo.user.data) {
      //       userEmail = auth.authInfo.user.data.email ?? "";
      //     }
      //
      //     updateState({
      //       name: userName,
      //       email: userEmail
      //     });
      //   }
      // } catch (error) {
      //   console.error("Error fetching user data:", error);
      //   // Fall back to auth info if available
      //   if (auth.authInfo?.user) {
      //     const userName = auth.authInfo.user.name || "";
      //     let userEmail = "";
      //     if (auth.authInfo.user.data && "email" in auth.authInfo.user.data) {
      //       userEmail = auth.authInfo.user.data.email ?? "";
      //     }
      //
      //     updateState({
      //       name: userName,
      //       email: userEmail
      //     });
      //   }
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
      currentStep
    };

    switch (currentStep) {
      case 1:
        return <Step1Profile {...stepProps} />;
      case 2:
        return <Step2Involvement {...stepProps} />;
      case 3:
        return <Step3ActiveIncome {...stepProps} />;
      case 4:
        return <Step4AvailabilityRate {...stepProps} />;
      case 5:
        return <Step5TasksPreferences {...stepProps} />;
      case 6:
        return <Step6Completion {...stepProps} />;
      default:
        return <Step1Profile {...stepProps} />;
    }
  };

  return (
    <PageWrapper>
      <div className="bg-[#0e1f35] min-h-screen">
        {loading ? (
          <div className="flex items-center justify-center h-screen">
            <div className="text-white text-2xl">Loading your profile...</div>
          </div>
        ) : (
          renderCurrentStep()
        )}
      </div>
    </PageWrapper>
  );
}

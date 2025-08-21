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
  IncomeStreamType,
  OpenToOtherOpportunityType,
  DeveloperRoleType,
  MergeRightsType,
  ProjectItemType,
  ProjectItemId,
  DeveloperProjectItemId
} from "@open-source-economy/api-types";
import { ApiError } from "src/ultils/error/ApiError";

// Step components (we'll create these)
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

const initialState: OnboardingState = {
  name: "",
  email: "",
  agreedToTerms: false,
};

export default function OnboardingFlow() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const auth = useAuth();
  const onboardingAPI = getOnboardingBackendAPI();
  const [state, setState] = useState<OnboardingState>(initialState);
  const [loading, setLoading] = useState(true);

  // Get current step from URL params, default to 1
  const currentStep = parseInt(searchParams.get("step") || "1"); // TODO: lolo enum the steps

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
      navigate("/dashboard"); // TODO: lolo
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 1) {
      goToStep(currentStep - 1);
    } else {
      // Go back to main onboarding landing page
      navigate("/onboarding"); // TODO: lolo
    }
  };

  // Update state
  const updateState = (updates: Partial<OnboardingState>) => {
    setState(prev => ({ ...prev, ...updates }));
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
      default:
        return <Step1Profile {...stepProps} />;
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

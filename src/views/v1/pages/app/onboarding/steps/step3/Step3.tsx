import React, { useEffect, useState } from "react";
import { OnboardingStepProps } from "../OnboardingStepProps";
import { Step3State } from "../../OnboardingDataSteps";
import { getOnboardingBackendAPI } from "src/services";
import * as dto from "@open-source-economy/api-types";
import { PreferenceType } from "@open-source-economy/api-types";
import { ApiError } from "src/ultils/error/ApiError";
import { handleApiCall } from "../../../../../../../ultils";
import LoadingIndicator from "../../components/LoadingIndicator";
import ErrorDisplay from "../../components/ErrorDisplay";
import { ButtonGroup } from "../../landing/components";
import { FundingCardGrid } from "./FundingCardGrid";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../../../../../paths";

export interface Step3Props extends OnboardingStepProps<Step3State> {}

// Helper type for the card grid component - maps income streams to preferences
type IncomeStreamPreferences = "royalties" | "services";

export function Step3(props: Step3Props) {
  const validatedState = props.state || {};
  const navigate = useNavigate();

  const [preferences, setPreferences] = useState<Step3State>(validatedState);
  const [showServiceModel, setShowServiceModel] = useState(false);

  const [apiError, setApiError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Only save if at least one preference is set
    if (preferences.servicesPreference || preferences.royaltiesPreference || preferences.communitySupporterPreference) {
      savePreferences();
    }
  }, [preferences]);

  const savePreferences = async () => {
    const apiCall = async () => {
      const params: dto.SetDeveloperPreferencesParams = {};
      const body: dto.SetDeveloperPreferencesBody = {
        royaltiesPreference: preferences.royaltiesPreference,
        servicesPreference: preferences.servicesPreference,
        communitySupporterPreference: preferences.communitySupporterPreference,
      };
      const query: dto.SetDeveloperPreferencesQuery = {};

      return await getOnboardingBackendAPI().setDeveloperPreferences(params, body, query);
    };

    const onSuccess = (response: dto.SetDeveloperPreferencesResponse) => {
      console.log("Preferences saved successfully:", response);
    };

    await handleApiCall(apiCall, setIsLoading, setApiError, onSuccess);
  };

  const handleToggleChange = async (option: IncomeStreamPreferences, enabled: boolean) => {
    const newPreferences = { ...preferences };
    const preferenceValue = enabled ? PreferenceType.YES : null;

    switch (option) {
      case "royalties":
        newPreferences.royaltiesPreference = preferenceValue;
        break;
      case "services":
        newPreferences.servicesPreference = preferenceValue;
        break;
    }

    setPreferences(newPreferences);
    props.updateState(newPreferences);
  };

  const handleServiceLearnMore = () => {
    setShowServiceModel(true);
  };

  const handleCloseServiceModel = () => {
    setShowServiceModel(false);
  };

  const onNext = () => {
    if (preferences.servicesPreference !== PreferenceType.YES) {
      navigate(paths.DEVELOPER_ONBOARDING_COMPLETED);
    } else {
      props.onNext();
    }
  };

  // Convert preferences to array format for FundingCardGrid compatibility
  const incomeStreamsForGrid: IncomeStreamPreferences[] = [];
  if (preferences.royaltiesPreference === PreferenceType.YES) incomeStreamsForGrid.push("royalties");
  if (preferences.servicesPreference === PreferenceType.YES) incomeStreamsForGrid.push("services");

  return (
    <>
      <div className="flex flex-col items-start gap-9 self-stretch">
        {/* Main Funding Cards Grid with inline Service Model */}
        <FundingCardGrid
          incomeStreams={incomeStreamsForGrid as any}
          onToggleChange={handleToggleChange as any}
          showServiceModel={showServiceModel}
          onServiceLearnMore={handleServiceLearnMore}
          onCloseServiceModel={handleCloseServiceModel}
        />
      </div>

      <ButtonGroup onBack={props.onBack} onNext={onNext} isLoading={isLoading} showErrorMessage={false} errorMessage={apiError?.message} />

      {/* Loading Indicator */}
      {isLoading && <LoadingIndicator />}

      {/* Error Display */}
      <ErrorDisplay message={apiError?.message} />
    </>
  );
}

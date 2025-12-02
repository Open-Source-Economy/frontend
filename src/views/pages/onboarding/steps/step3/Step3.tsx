import React, { useEffect, useState } from "react";
import { OnboardingStepProps } from "../OnboardingStepProps";
import { Step3State } from "../../OnboardingDataSteps";
import { getOnboardingBackendAPI } from "src/services";
import * as dto from "@open-source-economy/api-types";
import { PreferenceType } from "@open-source-economy/api-types";
import { ApiError } from "src/ultils/error/ApiError";
import { handleApiCall } from "../../../../../ultils";
import { FieldError } from "src/views/components/ui/forms/field-error";
import { ServerErrorAlert } from "src/views/components/ui/state/ServerErrorAlert";
import { LoadingState } from "src/views/components/ui/state/loading-state";
import { ParticipationCard } from "./design-system/ParticipationCard";
import { participationCardConfigs, ParticipationModelOption } from "./design-system/participationCardConfigs";
import { ServiceProviderCard } from "./design-system/ServiceProviderCard";

export interface Step3Props extends OnboardingStepProps<Step3State> {}

export function Step3(props: Step3Props) {
  const validatedState = props.state || {};

  const [preferences, setPreferences] = useState<Step3State>(validatedState);
  const [apiError, setApiError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Check if there are any errors
  const hasErrors = Object.keys(errors).length > 0;

  // Helper to check if a specific card should show error state
  const hasCardError = (option: ParticipationModelOption): boolean => {
    if (!hasErrors) return false;
    const state = getSelectionState(option);
    return state === undefined || state === null;
  };

  // Additional participation options (excluding service_provider which has its own card)
  const additionalOptions: ParticipationModelOption[] = [ParticipationModelOption.COMMON_POT, ParticipationModelOption.COMMUNITY_SUPPORTER];

  // Map between ParticipationModelOption and Step3State fields
  const getPreferenceField = (option: ParticipationModelOption): keyof Step3State => {
    const mapping: Record<ParticipationModelOption, keyof Step3State> = {
      [ParticipationModelOption.SERVICE_PROVIDER]: "servicesPreference",
      [ParticipationModelOption.COMMON_POT]: "royaltiesPreference",
      [ParticipationModelOption.COMMUNITY_SUPPORTER]: "communitySupporterPreference",
    };
    return mapping[option];
  };

  // Handle selection for three-state model
  const handleSelect = (option: ParticipationModelOption, state: PreferenceType) => {
    const field = getPreferenceField(option);
    const newPreferences = {
      ...preferences,
      [field]: state,
    };
    setPreferences(newPreferences);
    props.updateState(newPreferences);

    // Clear errors when user makes a selection
    setErrors({});
  };

  const getSelectionState = (option: ParticipationModelOption): PreferenceType | null | undefined => {
    const field = getPreferenceField(option);
    return preferences[field];
  };

  // Auto-save preferences when they change
  useEffect(() => {
    // Only save if at least one preference is set (excluding donations which is removed)
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

  // Validation: All options must have a preference selected (excluding donations which is removed)
  const validateStep = (): boolean => {
    const allPreferencesSet =
      preferences.servicesPreference !== undefined &&
      preferences.servicesPreference !== null &&
      preferences.royaltiesPreference !== undefined &&
      preferences.royaltiesPreference !== null &&
      preferences.communitySupporterPreference !== undefined &&
      preferences.communitySupporterPreference !== null;

    if (!allPreferencesSet) {
      setErrors({ participationModel: "Please select a preference (Yes, Maybe later, or Not interested) for each option" });
      return false;
    }

    setErrors({});
    return true;
  };

  // Register onNext validation
  useEffect(() => {
    props.setOnNext?.(() => validateStep());
    return () => props.setOnNext?.(null);
  }, [props.setOnNext, preferences]);

  return (
    <div className="space-y-8">
      {/* Error Display */}
      {apiError && <ServerErrorAlert error={apiError} variant="compact" />}

      {/* Loading Indicator */}
      {isLoading && <LoadingState variant="spinner" size="md" />}

      {/* Participation Model Options */}
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Service Provider - Featured Hero Card */}
        <ServiceProviderCard
          selectedState={getSelectionState(ParticipationModelOption.SERVICE_PROVIDER)}
          onSelect={state => handleSelect(ParticipationModelOption.SERVICE_PROVIDER, state)}
          hasError={hasCardError(ParticipationModelOption.SERVICE_PROVIDER)}
        />

        {/* Section Divider */}
        <div className="flex items-center gap-4 py-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-brand-neutral-300 to-transparent" />
          <span className="text-sm text-brand-neutral-500 px-4">Additional Options</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-brand-neutral-300 to-transparent" />
        </div>

        {/* Other Options Grid */}
        <div className="grid grid-cols-1 gap-6">
          {additionalOptions.map(option => (
            <ParticipationCard
              key={option}
              config={participationCardConfigs[option]}
              selectedState={getSelectionState(option)}
              onSelect={state => handleSelect(option, state)}
              hasError={hasCardError(option)}
            />
          ))}
        </div>
      </div>

      {/* Error Display */}
      <FieldError error={errors.participationModel} className="justify-center" />
    </div>
  );
}

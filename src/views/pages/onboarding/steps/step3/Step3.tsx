import React, { useEffect } from "react";
import { OnboardingStepProps } from "../OnboardingStepProps";
import { Step3State } from "../../OnboardingDataSteps";
import { onboardingHooks } from "src/api";
import { ApiError } from "src/ultils/error/ApiError";
import * as dto from "@open-source-economy/api-types";
import { PreferenceType } from "@open-source-economy/api-types";
import { FieldError } from "src/views/components/ui/forms/field-error";
import { ServerErrorAlert } from "src/views/components/ui/state/ServerErrorAlert";
import { ParticipationCard } from "./design-system/ParticipationCard";
import { participationCardConfigs, ParticipationModelOption } from "./design-system/participationCardConfigs";
import { ServiceProviderCard } from "./design-system/ServiceProviderCard";
import { useZodForm } from "src/views/components/ui/forms/rhf";
import { onboardingStep3Schema } from "src/views/components/ui/forms/schemas";

export interface Step3Props extends OnboardingStepProps<Step3State> {}

export function Step3(props: Step3Props) {
  const validatedState = props.state || {};

  const setDeveloperPreferences = onboardingHooks.useSetDeveloperPreferencesMutation();

  const apiError = setDeveloperPreferences.error
    ? setDeveloperPreferences.error instanceof ApiError
      ? setDeveloperPreferences.error
      : ApiError.from(setDeveloperPreferences.error)
    : null;

  const form = useZodForm(onboardingStep3Schema, {
    defaultValues: {
      servicesPreference: validatedState.servicesPreference || "",
      royaltiesPreference: validatedState.royaltiesPreference || "",
      communitySupporterPreference: validatedState.communitySupporterPreference || "",
    },
  });

  // Additional participation options (excluding service_provider which has its own card)
  const additionalOptions: ParticipationModelOption[] = [ParticipationModelOption.COMMON_POT, ParticipationModelOption.COMMUNITY_SUPPORTER];

  // Map between ParticipationModelOption and form field names
  const getPreferenceField = (option: ParticipationModelOption): "servicesPreference" | "royaltiesPreference" | "communitySupporterPreference" => {
    const mapping = {
      [ParticipationModelOption.SERVICE_PROVIDER]: "servicesPreference" as const,
      [ParticipationModelOption.COMMON_POT]: "royaltiesPreference" as const,
      [ParticipationModelOption.COMMUNITY_SUPPORTER]: "communitySupporterPreference" as const,
    };
    return mapping[option];
  };

  // Handle selection for three-state model
  const handleSelect = (option: ParticipationModelOption, state: PreferenceType) => {
    const field = getPreferenceField(option);
    form.setValue(field, state, { shouldValidate: form.formState.isSubmitted });
  };

  const getSelectionState = (option: ParticipationModelOption): PreferenceType | null | undefined => {
    const field = getPreferenceField(option);
    const value = form.watch(field);
    return (value as PreferenceType) || undefined;
  };

  // Sync RHF -> parent state
  useEffect(() => {
    const sub = form.watch(values => {
      const newState: Partial<Step3State> = {};
      if (values.servicesPreference) newState.servicesPreference = values.servicesPreference as PreferenceType;
      if (values.royaltiesPreference) newState.royaltiesPreference = values.royaltiesPreference as PreferenceType;
      if (values.communitySupporterPreference) newState.communitySupporterPreference = values.communitySupporterPreference as PreferenceType;
      if (Object.keys(newState).length > 0) {
        props.updateState(newState);
      }
    });
    return () => sub.unsubscribe();
  }, [form, props.updateState]);

  // Auto-save preferences when they change
  useEffect(() => {
    const values = form.getValues();
    if (values.servicesPreference || values.royaltiesPreference || values.communitySupporterPreference) {
      savePreferences();
    }
  }, [form.watch("servicesPreference"), form.watch("royaltiesPreference"), form.watch("communitySupporterPreference")]);

  const savePreferences = async () => {
    const values = form.getValues();
    try {
      const params: dto.SetDeveloperPreferencesParams = {};
      const body: dto.SetDeveloperPreferencesBody = {
        royaltiesPreference: (values.royaltiesPreference as PreferenceType) || undefined,
        servicesPreference: (values.servicesPreference as PreferenceType) || undefined,
        communitySupporterPreference: (values.communitySupporterPreference as PreferenceType) || undefined,
      };
      const query: dto.SetDeveloperPreferencesQuery = {};
      await setDeveloperPreferences.mutateAsync({ params, body, query });
    } catch {
      // error tracked by setDeveloperPreferences.error
    }
  };

  // Register onNext validation
  useEffect(() => {
    props.setOnNext?.(async () => {
      const isValid = await form.trigger();
      return isValid;
    });
    return () => props.setOnNext?.(null);
  }, [props.setOnNext, form]);

  // Check if there are any errors
  const hasErrors = form.formState.isSubmitted && Object.keys(form.formState.errors).length > 0;

  // Helper to check if a specific card should show error state
  const hasCardError = (option: ParticipationModelOption): boolean => {
    if (!hasErrors) return false;
    const state = getSelectionState(option);
    return state === undefined || state === null;
  };

  // Overall error message
  const overallError = hasErrors ? "Please select a preference (Yes, Maybe later, or Not interested) for each option" : undefined;

  return (
    <div className="space-y-8">
      {/* Error Display */}
      {apiError && <ServerErrorAlert error={apiError} variant="compact" />}

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
      <FieldError error={overallError} className="justify-center" />
    </div>
  );
}

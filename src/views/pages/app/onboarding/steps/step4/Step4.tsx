import React, { useState } from "react";
import { OnboardingStepProps } from "../OnboardingStepProps";
import { getOnboardingBackendAPI } from "src/services";
import * as dto from "@open-source-economy/api-types";
import { ApiError } from "src/ultils/error/ApiError";
import { handleApiCall } from "../../../../../../ultils";
import { Step4State } from "../../OnboardingDataSteps";
import LoadingIndicator from "../../components/LoadingIndicator";
import ErrorDisplay from "../../components/ErrorDisplay";
import { ButtonGroup } from "../../landing/components";
import { WeeklyCommitmentSection } from "./WeeklyCommitmentSection";
import { LargerOpportunitiesSection } from "./LargerOpportunitiesSection";
import { IndicativeRateSection } from "./IndicativeRateSection";

export interface Step4AvailabilityRateProps extends OnboardingStepProps<Step4State> {}

export function Step4(props: Step4AvailabilityRateProps) {
  const [errors, setErrors] = useState<{ weeklyHours?: string; opportunity?: string; rate?: string }>({});
  const [apiError, setApiError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: { weeklyHours?: string; opportunity?: string; rate?: string } = {};
    let isFormValid = true;

    // Validate weekly commitment
    if (
      props.state.hourlyWeeklyCommitment === undefined ||
      props.state.hourlyWeeklyCommitment === null ||
      props.state.hourlyWeeklyCommitment < 0 ||
      props.state.hourlyWeeklyCommitment > 168
    ) {
      newErrors.weeklyHours = "Please enter a valid number of hours (0-168)";
      isFormValid = false;
    }

    // Validate opportunity selection
    if (!props.state.openToOtherOpportunity) {
      newErrors.opportunity = "Please select an option";
      isFormValid = false;
    }

    // Validate hourly rate
    if (!props.state.hourlyRate || props.state.hourlyRate <= 0) {
      newErrors.rate = "Please enter a valid hourly rate";
      isFormValid = false;
    }

    setErrors(newErrors);
    return isFormValid;
  };

  const saveSettingsToDatabase = async (): Promise<boolean> => {
    const onboardingAPI = getOnboardingBackendAPI();
    const apiCall = async () => {
      const params: dto.SetDeveloperServiceSettingsParams = {};
      const body: dto.SetDeveloperServiceSettingsBody = {
        hourlyWeeklyCommitment: props.state.hourlyWeeklyCommitment!,
        hourlyWeeklyCommitmentComments: props.state.hourlyWeeklyCommitmentComments ?? "",
        openToOtherOpportunity: props.state.openToOtherOpportunity!,
        openToOtherOpportunityComments: props.state.openToOtherOpportunityComments ?? "",
        hourlyRate: props.state.hourlyRate!,
        currency: props.state.currency!,
        hourlyRateComments: props.state.hourlyRateComments ?? "",
      };
      const query: dto.SetDeveloperServiceSettingsQuery = {};
      return await onboardingAPI.setDeveloperServiceSettings(params, body, query);
    };

    let isSuccess = false;
    const onSuccess = () => {
      isSuccess = true;
    };

    await handleApiCall(apiCall, setIsLoading, setApiError, onSuccess);
    return isSuccess;
  };

  const handleNext = async () => {
    if (validateForm()) {
      const success = await saveSettingsToDatabase();
      if (success) {
        props.onNext();
      }
    }
  };

  return (
    <>
      <div className="flex flex-col items-start gap-12 self-stretch">
        <WeeklyCommitmentSection
          value={props.state.hourlyWeeklyCommitment}
          onChange={value => props.updateState({ hourlyWeeklyCommitment: value })}
          commentValue={props.state.hourlyWeeklyCommitmentComments || ""}
          onCommentChange={value => props.updateState({ hourlyWeeklyCommitmentComments: value })}
          error={errors.weeklyHours}
        />

        <LargerOpportunitiesSection
          value={props.state.openToOtherOpportunity || null}
          onChange={value => props.updateState({ openToOtherOpportunity: value })}
          commentValue={props.state.openToOtherOpportunityComments || ""}
          onCommentChange={value => props.updateState({ openToOtherOpportunityComments: value })}
          error={errors.opportunity}
        />

        <IndicativeRateSection
          hourlyRate={props.state.hourlyRate || null}
          currency={props.state.currency!}
          onHourlyRateChange={value => props.updateState({ hourlyRate: value })}
          onCurrencyChange={currency => currency && props.updateState({ currency })}
          commentValue={props.state.hourlyRateComments || ""}
          onCommentChange={value => props.updateState({ hourlyRateComments: value })}
          error={errors.rate}
        />
      </div>

      <ButtonGroup 
        onBack={props.onBack} 
        onNext={handleNext} 
        isLoading={isLoading} 
        showErrorMessage={false} 
        errorMessage={apiError?.message} 
      />

      {/* Loading Indicator */}
      {isLoading && <LoadingIndicator />}

      {/* Error Display */}
      <ErrorDisplay message={apiError?.message} />
    </>
  );
}

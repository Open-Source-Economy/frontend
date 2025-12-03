import React, { useRef, useState } from "react";
import { OnboardingStepProps } from "../OnboardingStepProps";
import { getOnboardingBackendAPI } from "src/services";
import * as dto from "@open-source-economy/api-types";
import { ApiError } from "src/ultils/error/ApiError";
import { handleApiCall } from "../../../../../../../ultils";
import { Step4State } from "../../OnboardingDataSteps";
import LoadingIndicator from "../../components/LoadingIndicator";
import ErrorDisplay from "../../components/ErrorDisplay";
import { ButtonGroup } from "../../landing/components";
import { OnboardingSectionWrapper } from "./OnboardingSectionWrapper";
import { WeeklyCommitmentInput, WeeklyCommitmentInputRef } from "../../../../../components/form/input/number";
import { OpportunitySelector, OpportunitySelectorRef } from "./OpportunitySelector";
import { HourlyRateInput, HourlyRateInputRef } from "../../../../../components/form";

export interface Step4AvailabilityRateProps extends OnboardingStepProps<Step4State> {}

export function Step4(props: Step4AvailabilityRateProps) {
  const weeklyCommitmentRef = useRef<WeeklyCommitmentInputRef>(null);
  const largerOpportunitiesRef = useRef<OpportunitySelectorRef>(null);
  const indicativeRateRef = useRef<HourlyRateInputRef>(null);

  const [apiError, setApiError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (showInputError: boolean): boolean => {
    // Call the validate method on each section's ref
    const isWeeklyCommitmentValid = weeklyCommitmentRef.current?.validate(showInputError) ?? false;
    const isLargerOpportunitiesValid = largerOpportunitiesRef.current?.validate(showInputError) ?? false;
    const isIndicativeRateValid = indicativeRateRef.current?.validate(showInputError) ?? false;

    // The form is valid only if all sections pass their validation
    return isWeeklyCommitmentValid && isLargerOpportunitiesValid && isIndicativeRateValid;
  };

  const saveSettingsToDatabase = async (): Promise<boolean> => {
    const onboardingAPI = getOnboardingBackendAPI();
    const apiCall = async () => {
      const params: dto.SetDeveloperServiceSettingsParams = {};
      const body: dto.SetDeveloperServiceSettingsBody = {
        hourlyWeeklyCommitment: props.state.hourlyWeeklyCommitment!,
        hourlyWeeklyCommitmentComment: props.state.hourlyWeeklyCommitmentComment || undefined,
        openToOtherOpportunity: props.state.openToOtherOpportunity!,
        openToOtherOpportunityComment: props.state.openToOtherOpportunityComment || undefined,
        hourlyRate: props.state.hourlyRate!,
        currency: props.state.currency!,
        hourlyRateComment: props.state.hourlyRateComment || undefined,
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
    if (validateForm(true)) {
      const success = await saveSettingsToDatabase();
      if (success) {
        props.onNext();
      }
    }
  };

  return (
    <>
      <div className="flex flex-col items-start gap-12 self-stretch">
        <OnboardingSectionWrapper
          title="Your Weekly Commitment"
          subtitle="How many hours per week, on average, can you dedicate to client services?"
          commentValue={props.state.hourlyWeeklyCommitmentComment || ""}
          onCommentChange={value => props.updateState({ hourlyWeeklyCommitmentComment: value })}
        >
          {(showComment, commentButtonComponent) => (
            <div className="flex items-center gap-2.5 self-stretch">
              <WeeklyCommitmentInput
                ref={weeklyCommitmentRef}
                value={props.state.hourlyWeeklyCommitment ?? null}
                onChange={value => props.updateState({ hourlyWeeklyCommitment: value ?? undefined })}
              />
              {commentButtonComponent}
            </div>
          )}
        </OnboardingSectionWrapper>

        <OnboardingSectionWrapper
          title="Larger Opportunities"
          subtitle="Should Open Source Economy team privately contact you when a major opportunity arises?"
          commentValue={props.state.openToOtherOpportunityComment || ""}
          onCommentChange={value => props.updateState({ openToOtherOpportunityComment: value })}
        >
          {(showComment, commentButtonComponent) => (
            <>
              <OpportunitySelector
                ref={largerOpportunitiesRef}
                id="larger-opportunities"
                value={props.state.openToOtherOpportunity || null}
                onChange={value => props.updateState({ openToOtherOpportunity: value })}
                required={true}
              />

              {commentButtonComponent}
            </>
          )}
        </OnboardingSectionWrapper>

        <OnboardingSectionWrapper
          title="Your Indicative Rate"
          subtitle="What is your typical hourly rate?"
          commentValue={props.state.hourlyRateComment || ""}
          onCommentChange={value => props.updateState({ hourlyRateComment: value })}
        >
          {(showComment, commentButtonComponent) => (
            <>
              <HourlyRateInput
                ref={indicativeRateRef}
                hourlyRate={props.state.hourlyRate || null}
                currency={props.state.currency!}
                onHourlyRateChange={value => props.updateState({ hourlyRate: value })}
                onCurrencyChange={currency => currency && props.updateState({ currency })}
              />
              {commentButtonComponent}
            </>
          )}
        </OnboardingSectionWrapper>
      </div>

      <ButtonGroup onBack={props.onBack} onNext={handleNext} isLoading={isLoading} showErrorMessage={false} errorMessage={apiError?.message} />

      {/* Loading Indicator */}
      {isLoading && <LoadingIndicator />}

      {/* Error Display */}
      <ErrorDisplay message={apiError?.message} />
    </>
  );
}

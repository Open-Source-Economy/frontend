import React, { useState } from "react";
import { OnboardingStepProps } from "../OnboardingStepProps";
import { getOnboardingBackendAPI } from "src/services";
import * as dto from "@open-source-economy/api-types";
import { ApiError } from "src/ultils/error/ApiError";
import { handleApiCall } from "../../../../../../ultils";
import { Step4State } from "../../OnboardingDataSteps";
import { OpportunitySelector } from "./OpportunitySelector";
import { WeeklyCommitmentInput } from "./WeeklyCommitmentInput";
import { CommentInput } from "./CommentInput";
import LoadingIndicator from "../../components/LoadingIndicator";
import ErrorDisplay from "../../components/ErrorDisplay";
import { HourlyRateInput } from "../../../../../components/form/select/HourlyRateInput";
import { ButtonGroup } from "../../landing/components";

export interface Step4AvailabilityRateProps extends OnboardingStepProps<Step4State> {}

export function Step4(props: Step4AvailabilityRateProps) {
  const [showWeeklyComment, setShowWeeklyComment] = useState(false);
  const [showOpportunityComment, setShowOpportunityComment] = useState(false);
  const [showRateComment, setShowRateComment] = useState(false);

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
      <div className="flex flex-col items-start gap-12 w-full">
        {/* Weekly Commitment Section */}
        <div className="flex flex-col justify-end items-end gap-2.5 w-full p-8 rounded-[30px] bg-[#14233A]">
          <div className="flex flex-col items-center gap-1 w-full">
            <div className="flex flex-col items-start gap-4 w-full">
              <h2 className="w-full text-white font-montserrat text-2xl leading-[1.3]">Your Weekly Commitment</h2>
            </div>
          </div>

          <div className="flex flex-col items-start gap-3 w-full">
            <div className="text-white font-montserrat text-base leading-[1.5] opacity-60">
              How many hours per week, on average, can you dedicate to client services?
            </div>
            <div className="flex items-center gap-2.5 w-full">
              <WeeklyCommitmentInput
                value={props.state.hourlyWeeklyCommitment}
                onChange={value => props.updateState({ hourlyWeeklyCommitment: value })}
                error={errors.weeklyHours}
              />
              <CommentInput
                isExpanded={showWeeklyComment}
                onToggle={() => setShowWeeklyComment(!showWeeklyComment)}
                value={props.state.hourlyWeeklyCommitmentComments || ""}
                onChange={value => props.updateState({ hourlyWeeklyCommitmentComments: value })}
              />
            </div>
            {errors.weeklyHours && <div className="text-red-400 text-sm">{errors.weeklyHours}</div>}
          </div>
        </div>

        {/* Larger Opportunities Section */}
        <div className="flex flex-col justify-end items-end gap-2.5 w-full p-8 rounded-[30px] bg-[#14233A]">
          <div className="flex flex-col items-center gap-1 w-full">
            <div className="flex flex-col items-start gap-4 w-full">
              <h2 className="w-full text-white font-montserrat text-2xl leading-[1.3]">Larger Opportunities</h2>
            </div>
          </div>

          <div className="flex flex-col justify-end items-start gap-4 w-full">
            <div className="flex flex-col justify-end items-start gap-4 w-full">
              <OpportunitySelector
                id="larger-opportunities"
                label="Larger Opportunities"
                value={props.state.openToOtherOpportunity || null}
                onChange={value => props.updateState({ openToOtherOpportunity: value })}
                required={true}
              />
              <div className="flex items-center gap-8 w-full">
                <div className="flex-1" />
                <CommentInput
                  isExpanded={showOpportunityComment}
                  onToggle={() => setShowOpportunityComment(!showOpportunityComment)}
                  value={props.state.openToOtherOpportunityComments || ""}
                  onChange={value => props.updateState({ openToOtherOpportunityComments: value })}
                />
              </div>
            </div>
            {errors.opportunity && <div className="text-red-400 text-sm">{errors.opportunity}</div>}
          </div>
        </div>

        {/* Indicative Rate Section */}
        <div className="flex flex-col justify-end items-end gap-2.5 w-full p-8 rounded-[30px] bg-[#14233A]">
          <div className="flex flex-col items-center gap-1 w-full">
            <div className="flex flex-col items-start gap-4 w-full">
              <h2 className="w-full text-white font-montserrat text-2xl leading-[1.3]">Your Indicative Rate</h2>
            </div>
          </div>

          <div className="flex flex-col items-start gap-3 w-full">
            <div className="text-white font-montserrat text-base leading-[1.5] opacity-60">What is your typical hourly rate?</div>
            <div className="flex h-12 items-center gap-2 w-full">
              <HourlyRateInput
                hourlyRate={props.state.hourlyRate || null}
                currency={props.state.currency!}
                onHourlyRateChange={value => props.updateState({ hourlyRate: value || undefined })}
                onCurrencyChange={currency => props.updateState({ currency })}
              />
              <CommentInput
                isExpanded={showRateComment}
                onToggle={() => setShowRateComment(!showRateComment)}
                value={props.state.hourlyRateComments || ""}
                onChange={value => props.updateState({ hourlyRateComments: value })}
              />
            </div>
            {errors.rate && <div className="text-red-400 text-sm">{errors.rate}</div>}
          </div>
        </div>
      </div>
      <ButtonGroup onBack={props.onBack} onNext={props.onNext} isLoading={isLoading} showErrorMessage={false} errorMessage={apiError?.message} />
      {/* Loading Indicator */}
      {isLoading && <LoadingIndicator />}

      {/* Error Display */}
      <ErrorDisplay message={apiError?.message} />
    </>
  );
}

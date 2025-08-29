import React, { useRef, useState } from "react";
import { OnboardingStepProps } from "../OnboardingStepProps";
import { getOnboardingBackendAPI } from "src/services";
import * as dto from "@open-source-economy/api-types";
import { ApiError } from "src/ultils/error/ApiError";
import { handleApiCall } from "../../../../../../ultils";
import { Step4State } from "../../OnboardingDataSteps";
import { HourlyRateInput, HourlyRateInputRef } from "../../../../../components/form/select/HourlyRateInput";
import { OpportunitySelector, OpportunitySelectorRef } from "./OpportunitySelector";
import { Button } from "../../../../../components";
import LoadingIndicator from "../../components/LoadingIndicator";
import ErrorDisplay from "../../components/ErrorDisplay";
import { CommentSection } from "../../components";

export interface Step4AvailabilityRateProps extends OnboardingStepProps<Step4State> {}

export function Step4(props: Step4AvailabilityRateProps) {
  const [showWeeklyCommentInput, setShowWeeklyCommentInput] = useState(false);
  const [showOpportunityCommentInput, setShowOpportunityCommentInput] = useState(false);
  const [showRateCommentInput, setShowRateCommentInput] = useState(false);
  const [errors, setErrors] = useState<{ weeklyHours?: string }>({});
  const [apiError, setApiError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const hourlyRateInputRef = useRef<HourlyRateInputRef>(null);
  const opportunitySelectorRef = useRef<OpportunitySelectorRef>(null);

  const handleWeeklyHoursChange = (value: string) => {
    const hours = value === "" ? undefined : Number(value);
    if (!isNaN(hours as number)) {
      props.updateState({ hourlyWeeklyCommitment: hours });
    }
    setErrors(prev => ({ ...prev, weeklyHours: undefined }));
  };

  const validateForm = (showInputError: boolean): boolean => {
    const newErrors: { weeklyHours?: string } = {};
    let isFormValid = true;

    if (
      props.state.hourlyWeeklyCommitment === undefined ||
      props.state.hourlyWeeklyCommitment === null ||
      props.state.hourlyWeeklyCommitment < 0 ||
      props.state.hourlyWeeklyCommitment > 168
    ) {
      newErrors.weeklyHours = "Please enter a valid number of hours (0-168)";
      isFormValid = false;
    }

    const isOpportunitySelectorValid = opportunitySelectorRef.current?.validate() || false;
    if (!isOpportunitySelectorValid) {
      isFormValid = false;
    }

    const isHourlyRateSectionValid = hourlyRateInputRef.current?.validate(showInputError) || false;
    if (!isHourlyRateSectionValid) {
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
    if (validateForm(true)) {
      const success = await saveSettingsToDatabase();
      if (success) {
        props.onNext();
      }
    }
  };

  return (
    <div>
      {/* Form Content */}
      <div className="box-border content-stretch flex flex-col gap-12 items-center justify-start p-0 relative shrink-0 w-full">
        <div className="box-border content-stretch flex flex-col gap-8 items-center justify-center p-0 relative shrink-0 w-[900px]">
          {/* Section Title */}
          <div className="box-border content-stretch flex flex-col gap-4 items-center justify-start leading-[0] p-0 relative shrink-0 text-[#ffffff] text-center w-[700px]">
            <div className="font-michroma not-italic relative shrink-0 text-[32px] w-full">
              <p className="block leading-[1.3]">Availability & Rate</p>
            </div>
            <div className="font-montserrat font-normal leading-[1.5] relative shrink-0 text-[16px] w-full">
              <p className="block">Let us know your availability and pricing preferences</p>
            </div>
          </div>

          {/* Form Fields Container */}
          <div className="box-border content-stretch flex flex-col gap-8 items-start justify-start p-0 relative shrink-0 w-full">
            {/* Weekly Commitment Section */}
            <div className="bg-[#14233a] box-border flex flex-col gap-6 items-start justify-start px-8 py-6 relative rounded-md shrink-0 w-full border border-[rgba(255,255,255,0.2)]">
              <div className="box-border flex flex-col gap-4 items-start justify-between p-0 relative shrink-0 w-full">
                <div className="flex-1">
                  <div className="font-michroma not-italic relative shrink-0 text-[#ffffff] text-[20px] text-left mb-2">
                    <p className="block leading-[1.3]">Your Weekly Commitment</p>
                  </div>
                  <div className="font-montserrat font-normal relative shrink-0 text-[#ffffff] text-[14px] text-left opacity-70">
                    <p className="block leading-[1.5]">How many hours per week can you dedicate to open source work?</p>
                  </div>
                </div>
                <div className="flex flex-row gap-2 items-stretch">
                  <div className="bg-[#202f45] box-border flex flex-row gap-2 items-center justify-between px-4 py-3 relative rounded-md w-[120px]">
                    <input
                      type="number"
                      value={props.state.hourlyWeeklyCommitment === null ? "" : props.state.hourlyWeeklyCommitment}
                      onChange={e => handleWeeklyHoursChange(e.target.value)}
                      placeholder="0"
                      className="w-full bg-transparent font-montserrat font-normal text-[#ffffff] text-[16px] text-center outline-none placeholder:opacity-60"
                    />
                    <span className="font-montserrat font-normal text-[#ffffff] text-[14px] opacity-60">hrs</span>
                  </div>
                  <CommentSection
                    show={showWeeklyCommentInput}
                    onToggle={() => setShowWeeklyCommentInput(!showWeeklyCommentInput)}
                    onClose={() => setShowWeeklyCommentInput(false)}
                    value={props.state.hourlyWeeklyCommitmentComments || ""}
                    onChange={value => props.updateState({ hourlyWeeklyCommitmentComments: value })}
                    label="Additional comments about your availability:"
                    placeholder="e.g., I'm available on weekends, prefer morning hours, etc."
                  />
                </div>
              </div>
              {errors.weeklyHours && <div className="text-red-400 text-sm">{errors.weeklyHours}</div>}
            </div>

            {/* Larger Opportunities Section */}
            <div className="bg-[#14233a] box-border flex flex-col gap-6 items-start justify-start py-6 px-8 relative rounded-md shrink-0 w-full border border-[rgba(255,255,255,0.2)]">
              <div className="flex flex-row items-center justify-between w-full">
                <div className="flex-1">
                  <OpportunitySelector
                    id="larger-opportunities-selector"
                    label="Larger Opportunities"
                    value={props.state.openToOtherOpportunity || null}
                    onChange={value => props.updateState({ openToOtherOpportunity: value })}
                    required={true}
                    ref={opportunitySelectorRef}
                  />
                </div>
                <CommentSection
                  show={showOpportunityCommentInput}
                  onToggle={() => setShowOpportunityCommentInput(!showOpportunityCommentInput)}
                  onClose={() => setShowOpportunityCommentInput(false)}
                  value={props.state.openToOtherOpportunityComments || ""}
                  onChange={value => props.updateState({ openToOtherOpportunityComments: value })}
                  label="Additional comments about other opportunities:"
                  placeholder="e.g., I'm open to contract work, specific domains, etc."
                />
              </div>
            </div>

            {/* Indicative Rate Section */}
            <div className="bg-[#14233a] box-border flex flex-col gap-6 items-start justify-start px-8 py-6 relative rounded-md shrink-0 w-full border border-[rgba(255,255,255,0.2)]">
              <div className="flex flex-row items-center justify-between w-full">
                <div className="flex-1">
                  <div className="font-michroma not-italic relative shrink-0 text-[#ffffff] text-[20px] text-left">
                    <p className="block leading-[1.3]">Your Indicative Rate</p>
                  </div>
                  <div className="font-montserrat font-normal relative shrink-0 text-[#ffffff] text-[14px] text-left opacity-70 mt-2">
                    <p className="block leading-[1.5]">What's your preferred hourly rate for open source work?</p>
                  </div>
                </div>
                <CommentSection
                  show={showRateCommentInput}
                  onToggle={() => setShowRateCommentInput(!showRateCommentInput)}
                  onClose={() => setShowRateCommentInput(false)}
                  value={props.state.hourlyRateComments || ""}
                  onChange={value => props.updateState({ hourlyRateComments: value })}
                  label="Additional comments about your indicative rate:"
                  placeholder="e.g., I'm open to negotiation, my rate is for senior roles, etc."
                />
              </div>

              <HourlyRateInput
                label={"Your Indicative Rate"}
                state={{ currency: props.state.currency!, hourlyRate: props.state.hourlyRate || null }}
                handleCurrencyChange={value => props.updateState({ currency: value })}
                handleHourlyRateChange={value => props.updateState({ hourlyRate: value })}
                ref={hourlyRateInputRef}
              />
            </div>
          </div>

          {/* Button Group */}
          <div className="box-border flex flex-row gap-4 h-12 items-end justify-end p-0 relative shrink-0 w-[900px]">
            <Button onClick={props.onBack} disabled={isLoading} level="SECONDARY" audience="DEVELOPER" size="MEDIUM">
              Back
            </Button>
            <Button onClick={handleNext} disabled={isLoading} level="PRIMARY" audience="DEVELOPER" size="MEDIUM">
              Next
            </Button>
          </div>
        </div>
      </div>
      {/* Loading Indicator */}
      {isLoading && <LoadingIndicator />}
      {/* Error Display */}
      <ErrorDisplay message={apiError?.message} />
    </div>
  );
}

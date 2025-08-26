import React, { useRef, useState } from "react";
import { OnboardingStepProps } from "../OnboardingStepProps";
import { getOnboardingBackendAPI } from "src/services";
import * as dto from "@open-source-economy/api-types";
import { Currency, OpenToOtherOpportunityType } from "@open-source-economy/api-types";
import { ApiError } from "src/ultils/error/ApiError";
import { handleApiCall } from "../../../../../../ultils";
import { Step4State } from "../../OnboardingDataSteps";
import { HourlyRateInput, HourlyRateInputRef } from "../../../../../components/form/select/HourlyRateInput";
import { OpportunitySelector, OpportunitySelectorRef } from "./OpportunitySelector";
import { Button } from "../../../../../components/elements/Button";
import LoadingIndicator from "../../components/LoadingIndicator";
import { TextArea } from "../../../../../components/form/TextArea";
import ErrorDisplay from "../../components/ErrorDisplay";

export interface Step4AvailabilityRateProps extends OnboardingStepProps<Step4State> { }

// Inline SVG component for CloseIcon
const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CommentIcon = () => (
  <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 15.0017V25.0017M15 20.0017H25M20 35C22.9667 35 25.8668 34.1203 28.3336 32.4721C30.8003 30.8238 32.7229 28.4811 33.8582 25.7403C34.9935 22.9994 35.2906 19.9834 34.7118 17.0737C34.133 14.1639 32.7044 11.4912 30.6066 9.3934C28.5088 7.29562 25.8361 5.86701 22.9264 5.28823C20.0166 4.70945 17.0006 5.0065 14.2597 6.14181C11.5189 7.27713 9.17618 9.19972 7.52796 11.6665C5.87973 14.1332 5 17.0333 5 20C5 22.48 5.6 24.8167 6.66667 26.8783L5 35L13.1217 33.3333C15.1817 34.3983 17.5217 35 20 35Z" stroke="white" stroke-width="1.66667" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Interface for local state management within the component
interface FormErrors {
  weeklyHours?: string;
}

// --- Step4 Component ---
export function Step4(props: Step4AvailabilityRateProps) {
  const [showWeeklyCommentInput, setShowWeeklyCommentInput] = useState(false);
  const [showOpportunityCommentInput, setShowOpportunityCommentInput] = useState(false);
  const [showRateCommentInput, setShowRateCommentInput] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [apiError, setApiError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [forceFormValidation, setForceFormValidation] = useState(false); // State to trigger validation in children

  const hourlyRateInputRef = useRef<HourlyRateInputRef>(null);
  const opportunitySelectorRef = useRef<OpportunitySelectorRef>(null);

  // Handlers now directly update the parent state
  const handleWeeklyHoursChange = (value: string) => {
    const hours = value === "" ? undefined : Number(value);
    if (!isNaN(hours as number)) {
      props.updateState({ hourlyWeeklyCommitment: hours });
    }
    setErrors(prev => ({ ...prev, weeklyHours: undefined }));
  };

  const handleLargerOpportunitiesChange = (value: OpenToOtherOpportunityType) => {
    props.updateState({ openToOtherOpportunity: value });
    // OpportunitySelector manages its own internal errors, so no need to clear here
  };

  // HourlyRateInput now calls handleHourlyRateChange with the sanitized value directly
  const handleHourlyRateChange = (value: string) => {
    const rate = value === "" ? undefined : parseFloat(value);
    if (!isNaN(rate as number)) {
      props.updateState({ hourlyRate: rate });
    }
    // HourlyRateInput manages its own internal errors, so no need to clear here
  };

  // CurrencySelectInput (inside HourlyRateInput) calls handleCurrencyChange directly
  const handleCurrencyChange = (value: Currency) => {
    props.updateState({ currency: value });
    // CurrencySelectInput manages its own internal errors, so no need to clear here
  };

  const handleWeeklyCommitmentCommentsChange = (value: string) => {
    props.updateState({ hourlyWeeklyCommitmentComments: value });
  };

  const handleOpenToOtherOpportunityCommentsChange = (value: string) => {
    props.updateState({ openToOtherOpportunityComments: value });
  };

  const handleHourlyRateCommentsChange = (value: string) => {
    props.updateState({ hourlyRateComments: value });
  };

  const validateForm = (showInputError: boolean): boolean => {
    const newErrors: FormErrors = {};
    let isFormValid = true;

    // Validate Weekly Commitment
    if (
      props.state.hourlyWeeklyCommitment === undefined ||
      props.state.hourlyWeeklyCommitment === null ||
      props.state.hourlyWeeklyCommitment < 0 ||
      props.state.hourlyWeeklyCommitment > 168
    ) {
      newErrors.weeklyHours = "Please enter a valid number of hours (0-168)";
      isFormValid = false;
    }

    // Validate Larger Opportunities using OpportunitySelector's ref
    const isOpportunitySelectorValid = opportunitySelectorRef.current?.validate() || false;
    if (!isOpportunitySelectorValid) {
      isFormValid = false;
    }

    // Validate Hourly Rate and Currency using HourlyRateInput's ref
    const isHourlyRateSectionValid = hourlyRateInputRef.current?.validate(showInputError) || false;
    if (!isHourlyRateSectionValid) {
      isFormValid = false;
    }

    setErrors(newErrors); // Update errors only for fields managed by Step4
    return isFormValid && isOpportunitySelectorValid && isHourlyRateSectionValid;
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
    setForceFormValidation(true);
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
            <div className="bg-[#14233a] box-border content-stretch flex flex-col gap-6 items-start justify-start px-8 py-6 relative rounded-md shrink-0 w-full border border-[rgba(255,255,255,0.2)]">
              <div className="box-border content-stretch flex flex-col gap-4 items-start justify-between p-0 relative shrink-0 w-full">
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
                  <button
                    onClick={() => setShowWeeklyCommentInput(!showWeeklyCommentInput)}
                    className="bg-[#202f45] p-3 rounded-md hover:bg-[#2a3f56] h-full transition-colors"
                    title="Add comment"
                  >
                    <CommentIcon />
                  </button>
                </div>
              </div>
              {errors.weeklyHours && <div className="text-red-400 text-sm">{errors.weeklyHours}</div>}

              {/* Expandable Comment Section */}
              {showWeeklyCommentInput && (
                <div className="bg-[#202f45] box-border content-stretch flex flex-col gap-3 items-start justify-start p-4 relative rounded-md shrink-0 w-full">
                  <div className="flex flex-row items-center justify-between w-full">
                    <div className="font-montserrat font-normal text-[#ffffff] text-[14px]">
                      <p>Additional comments about your availability:</p>
                    </div>
                    <button onClick={() => setShowWeeklyCommentInput(false)} className="text-[#ffffff] hover:text-[#ff7e4b] transition-colors">
                      <CloseIcon />
                    </button>
                  </div>
                  <TextArea
                    value={props.state.hourlyWeeklyCommitmentComments || ""} // Ensure controlled component
                    onChange={e => handleWeeklyCommitmentCommentsChange(e.target.value)}
                    placeholder="e.g., I'm available on weekends, prefer morning hours, etc."
                    rows={4}
                    className="w-full bg-[#14233a] px-3 py-2 font-montserrat font-normal text-[#ffffff] text-[14px] rounded-md outline-none placeholder:opacity-60 resize-none"
                  />
                </div>
              )}
            </div>

            {/* Larger Opportunities Section - Now using OpportunitySelector */}
            <div className="bg-[#14233a] box-border content-stretch flex flex-col gap-6 items-start justify-start  py-6 relative rounded-md shrink-0 w-full border border-[rgba(255,255,255,0.2)] relative">
              <div className="flex flex-row items-center justify-between w-full">
                <div className="flex-1">
                  <OpportunitySelector
                    id="larger-opportunities-selector"
                    label="Larger Opportunities"
                    value={props.state.openToOtherOpportunity || null}
                    onChange={handleLargerOpportunitiesChange}
                    required={true}
                    forceValidate={forceFormValidation}
                    ref={opportunitySelectorRef}
                  />
                </div>
                <button
                  onClick={() => setShowOpportunityCommentInput(!showOpportunityCommentInput)}
                  className="bg-[#202f45] p-3 rounded-md hover:bg-[#2a3f56] transition-colors absolute right-8 top-8"
                  title="Add comment"
                >
                  <CommentIcon />
                </button>
              </div>

              {showOpportunityCommentInput && (
                <div className="bg-[#202f45] box-border content-stretch flex flex-col gap-3 items-start justify-start p-4 relative rounded-md shrink-0 w-[calc(100%-32px)] mx-auto">
                  <div className="flex flex-row items-center justify-between w-full">
                    <div className="font-montserrat font-normal text-[#ffffff] text-[14px]">
                      <p>Additional comments about other opportunities:</p>
                    </div>
                    <button onClick={() => setShowOpportunityCommentInput(false)} className="text-[#ffffff] hover:text-[#ff7e4b] transition-colors">
                      <CloseIcon />
                    </button>
                  </div>
                  <TextArea
                    value={props.state.openToOtherOpportunityComments || ""}
                    onChange={e => handleOpenToOtherOpportunityCommentsChange(e.target.value)}
                    placeholder="e.g., I'm open to contract work, specific domains, etc."
                    rows={4}
                    className="w-full bg-[#14233a] px-3 py-2 font-montserrat font-normal text-[#ffffff] text-[14px] rounded-md outline-none placeholder:opacity-60 resize-none"
                  />
                </div>
              )}
            </div>

            {/* Indicative Rate Section */}
            <div className="bg-[#14233a] box-border content-stretch flex flex-col gap-6 items-start justify-start px-8 py-6 relative rounded-md shrink-0 w-full border border-[rgba(255,255,255,0.2)]">
              <div className="flex flex-row items-center justify-between w-full">
                <div className="flex-1">
                  <div className="font-michroma not-italic relative shrink-0 text-[#ffffff] text-[20px] text-left">
                    <p className="block leading-[1.3]">Your Indicative Rate</p>
                  </div>
                  <div className="font-montserrat font-normal relative shrink-0 text-[#ffffff] text-[14px] text-left opacity-70 mt-2">
                    <p className="block leading-[1.5]">What's your preferred hourly rate for open source work?</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowRateCommentInput(!showRateCommentInput)}
                  className="bg-[#202f45] p-3 rounded-md hover:bg-[#2a3f56] h-full transition-colors"
                  title="Add comment"
                >
                  <CommentIcon />
                </button>
              </div>

              {/* Refactored to use HourlyRateInput */}
              <HourlyRateInput
                state={{ currency: props.state.currency!, hourlyRate: props.state.hourlyRate || null }}
                handleCurrencyChange={handleCurrencyChange}
                handleHourlyRateChange={handleHourlyRateChange}
                forceValidate={forceFormValidation}
                ref={hourlyRateInputRef} // Pass the ref to HourlyRateInput
              />

              {showRateCommentInput && (
                <div className="bg-[#202f45] box-border content-stretch flex flex-col gap-3 items-start justify-start p-4 relative rounded-md shrink-0 w-full">
                  <div className="flex flex-row items-center justify-between w-full">
                    <div className="font-montserrat font-normal text-[#ffffff] text-[14px]">
                      <p>Additional comments about your indicative rate:</p>
                    </div>
                    <button onClick={() => setShowRateCommentInput(false)} className="text-[#ffffff] hover:text-[#ff7e4b] transition-colors">
                      <CloseIcon />
                    </button>
                  </div>
                  <TextArea
                    value={props.state.hourlyRateComments || ""}
                    onChange={e => handleHourlyRateCommentsChange(e.target.value)}
                    placeholder="e.g., I'm open to negotiation, my rate is for senior roles, etc."
                    rows={4}
                    className="w-full bg-[#14233a] px-3 py-2 font-montserrat font-normal text-[#ffffff] text-[14px] rounded-md outline-none placeholder:opacity-60 resize-none"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Button Group */}
          <div className="box-border content-stretch flex flex-row gap-4 h-12 items-end justify-end p-0 relative shrink-0 w-[900px]">
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

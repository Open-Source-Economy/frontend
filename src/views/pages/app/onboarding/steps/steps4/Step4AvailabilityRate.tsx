import React, { useState } from "react";
import { OnboardingStepProps } from "../OnboardingStepProps";
import { getOnboardingBackendAPI } from "src/services";
import * as dto from "@open-source-economy/api-types";
import { ApiError } from "src/ultils/error/ApiError";
import { handleApiCall } from "../../../../../../ultils";
import ProgressBar from "../../components/ProgressBar";

export declare enum Currency {
  USD = "usd",
  EUR = "eur",
  GBP = "gbp",
  CHF = "chf",
}

export declare enum OpenToOtherOpportunityType {
  YES = "yes",
  MAYBE = "maybe",
  NO = "no",
}

// New state and props interfaces
export interface Step4State {
  hourlyWeeklyCommitment: number | null;
  openToOtherOpportunity: OpenToOtherOpportunityType | null;
  hourlyRate: number | null;
  currency: Currency;
  comments: string;
}

export interface Step4AvailabilityRateProps extends OnboardingStepProps<Step4State> {}

// Inline SVG component for CloseIcon
const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Interface for local state management within the component
interface FormErrors {
  weeklyHours?: string;
  largerOpportunities?: string;
  hourlyRate?: string;
  currency?: string;
  comments?: string;
}

// --- Step4AvailabilityRate Component ---
export function Step4AvailabilityRate(props: Step4AvailabilityRateProps) {
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [apiError, setApiError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handlers now directly update the parent state
  const handleWeeklyHoursChange = (value: string) => {
    const hours = value === "" ? null : Number(value);
    if (!isNaN(hours as number)) {
      props.updateState({ hourlyWeeklyCommitment: hours });
    }
    setErrors(prev => ({ ...prev, weeklyHours: undefined }));
  };

  const handleLargerOpportunitiesChange = (value: OpenToOtherOpportunityType) => {
    props.updateState({ openToOtherOpportunity: value });
    setErrors(prev => ({ ...prev, largerOpportunities: undefined }));
  };

  const handleHourlyRateChange = (value: string) => {
    const rate = value === "" ? null : parseFloat(value);
    if (!isNaN(rate as number)) {
      props.updateState({ hourlyRate: rate });
    }
    setErrors(prev => ({ ...prev, hourlyRate: undefined }));
  };

  const handleCurrencyChange = (value: Currency) => {
    props.updateState({ currency: value });
    setErrors(prev => ({ ...prev, currency: undefined }));
  };

  const handleCommentsChange = (value: string) => {
    props.updateState({ comments: value });
    setErrors(prev => ({ ...prev, comments: undefined }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (props.state.hourlyWeeklyCommitment === null || props.state.hourlyWeeklyCommitment < 0 || props.state.hourlyWeeklyCommitment > 168) {
      newErrors.weeklyHours = "Please enter a valid number of hours (0-168)";
    }

    if (props.state.openToOtherOpportunity === null) {
      newErrors.largerOpportunities = "Please select an option";
    }

    if (props.state.hourlyRate === null || props.state.hourlyRate < 0) {
      newErrors.hourlyRate = "Please enter a valid rate";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveSettingsToDatabase = async (): Promise<boolean> => {
    const onboardingAPI = getOnboardingBackendAPI();

    const apiCall = async () => {
      const params: dto.SetDeveloperServiceSettingsParams = {};
      const body: dto.SetDeveloperServiceSettingsBody = {
        hourlyWeeklyCommitment: props.state.hourlyWeeklyCommitment!,
        hourlyWeeklyCommitmentComments: "TODO",
        openToOtherOpportunity: props.state.openToOtherOpportunity!,
        openToOtherOpportunityComments: "TODO",
        hourlyRate: props.state.hourlyRate!,
        currency: props.state.currency,
        hourlyRateComments: "TODO",
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
    <div className="bg-[#0e1f35] box-border content-stretch flex flex-col gap-[50px] items-center justify-start pt-[80px] pb-0 px-0 relative size-full">
      {/* Progress Bar */}
      <ProgressBar currentStep={props.currentStep} />

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
              <div className="box-border content-stretch flex flex-row gap-4 items-center justify-between p-0 relative shrink-0 w-full">
                <div className="flex-1">
                  <div className="font-michroma not-italic relative shrink-0 text-[#ffffff] text-[20px] text-left mb-2">
                    <p className="block leading-[1.3]">Your Weekly Commitment</p>
                  </div>
                  <div className="font-montserrat font-normal relative shrink-0 text-[#ffffff] text-[14px] text-left opacity-70">
                    <p className="block leading-[1.5]">How many hours per week can you dedicate to open source work?</p>
                  </div>
                </div>
                <div className="flex flex-row gap-4 items-center">
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
                    onClick={() => setShowCommentInput(!showCommentInput)}
                    className="bg-[#202f45] p-3 rounded-md hover:bg-[#2a3f56] transition-colors"
                    title="Add comment"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M18 9.5C18.0034 10.8199 17.6951 12.1219 17.1 13.3C16.3944 14.7117 15.3098 15.8992 13.9674 16.7293C12.6251 17.5594 11.0782 17.9994 9.49999 18C8.18013 18.0034 6.87812 17.6951 5.69999 17.1L1.99999 18L2.89999 14.3C2.30493 13.1219 1.99656 11.8199 1.99999 10.5C2.00061 8.92176 2.44061 7.37485 3.27072 6.03255C4.10083 4.69025 5.28825 3.60557 6.69999 2.9C7.87812 2.30493 9.18013 1.99656 10.5 2H11C13.0843 2.11502 15.053 2.99479 16.5291 4.47089C18.0052 5.94699 18.885 7.91568 19 10V10.5H18Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path d="M10 3V13M5 8H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
              {errors.weeklyHours && <div className="text-red-400 text-sm">{errors.weeklyHours}</div>}

              {/* Expandable Comment Section */}
              {showCommentInput && (
                <div className="bg-[#202f45] box-border content-stretch flex flex-col gap-3 items-start justify-start p-4 relative rounded-md shrink-0 w-full">
                  <div className="flex flex-row items-center justify-between w-full">
                    <div className="font-montserrat font-normal text-[#ffffff] text-[14px]">
                      <p>Additional comments about your availability:</p>
                    </div>
                    <button onClick={() => setShowCommentInput(false)} className="text-[#ffffff] hover:text-[#ff7e4b] transition-colors">
                      <CloseIcon />
                    </button>
                  </div>
                  <textarea
                    value={props.state.comments}
                    onChange={e => handleCommentsChange(e.target.value)}
                    placeholder="e.g., I'm available on weekends, prefer morning hours, etc."
                    className="w-full h-24 bg-[#14233a] px-3 py-2 font-montserrat font-normal text-[#ffffff] text-[14px] rounded-md outline-none placeholder:opacity-60 resize-none"
                  />
                </div>
              )}
            </div>

            {/* Larger Opportunities Section */}
            <div className="bg-[#14233a] box-border content-stretch flex flex-col gap-6 items-start justify-start px-8 py-6 relative rounded-md shrink-0 w-full border border-[rgba(255,255,255,0.2)]">
              <div className="font-michroma not-italic relative shrink-0 text-[#ffffff] text-[20px] text-left">
                <p className="block leading-[1.3]">Larger Opportunities</p>
              </div>
              <div className="font-montserrat font-normal relative shrink-0 text-[#ffffff] text-[14px] text-left opacity-70">
                <p className="block leading-[1.5]">Are you interested in taking on larger projects or full-time opportunities?</p>
              </div>
              <div className="box-border content-stretch flex flex-row gap-6 items-center justify-start p-0 relative shrink-0 w-full">
                <button
                  onClick={() => handleLargerOpportunitiesChange(OpenToOtherOpportunityType.YES)}
                  className={`px-6 py-3 rounded-md font-montserrat font-normal text-[16px] transition-all ${
                    props.state.openToOtherOpportunity === OpenToOtherOpportunityType.YES
                      ? "bg-gradient-to-r from-[#ff7e4b] via-[#ff518c] to-[#66319b] text-[#ffffff]"
                      : "bg-[#202f45] text-[#ffffff] hover:bg-[#2a3f56]"
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => handleLargerOpportunitiesChange(OpenToOtherOpportunityType.MAYBE)}
                  className={`px-6 py-3 rounded-md font-montserrat font-normal text-[16px] transition-all ${
                    props.state.openToOtherOpportunity === OpenToOtherOpportunityType.MAYBE
                      ? "bg-gradient-to-r from-[#ff7e4b] via-[#ff518c] to-[#66319b] text-[#ffffff]"
                      : "bg-[#202f45] text-[#ffffff] hover:bg-[#2a3f56]"
                  }`}
                >
                  Maybe
                </button>
                <button
                  onClick={() => handleLargerOpportunitiesChange(OpenToOtherOpportunityType.NO)}
                  className={`px-6 py-3 rounded-md font-montserrat font-normal text-[16px] transition-all ${
                    props.state.openToOtherOpportunity === OpenToOtherOpportunityType.NO
                      ? "bg-gradient-to-r from-[#ff7e4b] via-[#ff518c] to-[#66319b] text-[#ffffff]"
                      : "bg-[#202f45] text-[#ffffff] hover:bg-[#2a3f56]"
                  }`}
                >
                  No
                </button>
              </div>
              {errors.largerOpportunities && <div className="text-red-400 text-sm">{errors.largerOpportunities}</div>}
            </div>

            {/* Indicative Rate Section */}
            <div className="bg-[#14233a] box-border content-stretch flex flex-col gap-6 items-start justify-start px-8 py-6 relative rounded-md shrink-0 w-full border border-[rgba(255,255,255,0.2)]">
              <div className="font-michroma not-italic relative shrink-0 text-[#ffffff] text-[20px] text-left">
                <p className="block leading-[1.3]">Your Indicative Rate</p>
              </div>
              <div className="font-montserrat font-normal relative shrink-0 text-[#ffffff] text-[14px] text-left opacity-70">
                <p className="block leading-[1.5]">What's your preferred hourly rate for open source work?</p>
              </div>
              <div className="box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative shrink-0">
                {/*TODO: refactor */}
                <select
                  value={props.state.currency}
                  onChange={e => handleCurrencyChange(e.target.value as Currency)}
                  className="bg-[#202f45] px-4 py-3 rounded-md font-montserrat font-normal text-[#ffffff] text-[16px] outline-none cursor-pointer hover:bg-[#2a3f56] transition-colors"
                >
                  <option value={Currency.USD}>USD</option>
                  <option value={Currency.EUR}>EUR</option>
                  <option value={Currency.GBP}>GBP</option>
                  <option value={Currency.CHF}>CHF</option>
                </select>
                <div className="bg-[#202f45] box-border flex flex-row gap-2 items-center justify-between px-4 py-3 relative rounded-md w-[150px]">
                  <span className="font-montserrat font-normal text-[#ffffff] text-[16px] opacity-60">$</span>
                  <input
                    type="text"
                    value={props.state.hourlyRate === null ? "" : props.state.hourlyRate}
                    onChange={e => handleHourlyRateChange(e.target.value)}
                    placeholder="0"
                    className="w-full bg-transparent font-montserrat font-normal text-[#ffffff] text-[16px] text-center outline-none placeholder:opacity-60"
                  />
                  <span className="font-montserrat font-normal text-[#ffffff] text-[14px] opacity-60">/hr</span>
                </div>
              </div>
              {errors.hourlyRate && <div className="text-red-400 text-sm">{errors.hourlyRate}</div>}
            </div>
          </div>

          {/* Button Group */}
          <div className="box-border content-stretch flex flex-row gap-4 h-12 items-end justify-end p-0 relative shrink-0 w-[900px]">
            <button
              onClick={props.onBack}
              className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-5 py-3 relative rounded-md shrink-0 border border-[#ffffff] transition-all hover:bg-[rgba(255,255,255,0.1)]"
            >
              <div className="font-michroma leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[16px] text-left text-nowrap">
                <p className="block leading-[1.5] whitespace-pre">Back</p>
              </div>
            </button>

            <button
              onClick={handleNext}
              className="bg-gradient-to-r from-[#ff7e4b] via-[#ff518c] to-[#66319b] box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-5 py-3 relative rounded-md shrink-0 transition-all hover:scale-105"
            >
              <div className="font-michroma leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[16px] text-left text-nowrap">
                <p className="block leading-[1.5] whitespace-pre">Next</p>
              </div>
            </button>
          </div>
        </div>
      </div>
      {/* Loading Indicator */}
      {isLoading && (
        <div className="flex items-center justify-center mt-4">
          <svg className="animate-spin h-6 w-6 text-[#ff7e4b]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span className="ml-3 text-[#ff7e4b] font-montserrat">Loading...</span>
        </div>
      )}

      {/* Error Display */}
      {apiError && (
        <div className="bg-red-900 bg-opacity-30 border border-red-700 text-red-300 px-4 py-3 rounded-md relative mt-4 w-full">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline ml-2">{apiError.message}</span>
        </div>
      )}
    </div>
  );
}

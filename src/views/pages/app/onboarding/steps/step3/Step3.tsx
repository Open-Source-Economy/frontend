import React, { useState } from "react";
import { OnboardingStepProps } from "../OnboardingStepProps";
import { Step3State } from "../../OnboardingDataSteps";
import { getOnboardingBackendAPI } from "src/services";
import * as dto from "@open-source-economy/api-types";
import { IncomeStreamType } from "@open-source-economy/api-types";
import { CloseIcon, FundingCard } from "./FundingCard";
import { ApiError } from "src/ultils/error/ApiError";
import { handleApiCall } from "../../../../../../ultils";
import { Button } from "../../../../../components/elements/Button";
import LoadingIndicator from "../../components/LoadingIndicator";
import ErrorDisplay from "../../components/ErrorDisplay";

export interface Step3Props extends OnboardingStepProps<Step3State> {}

export function Step3(props: Step3Props) {
  const validatedState = props.state || {};

  const [incomeStreams, setIncomeStreams] = useState<IncomeStreamType[]>(
    validatedState.incomeStreams || [IncomeStreamType.ROYALTIES, IncomeStreamType.DONATIONS],
  );
  const [showServiceModel, setShowServiceModel] = useState(false);

  const [apiError, setApiError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const saveIncomeStreams = async () => {
    const apiCall = async () => {
      const params: dto.SetDeveloperIncomeStreamsParams = {};
      const body: dto.SetDeveloperIncomeStreamsBody = {
        incomeStreams: incomeStreams,
      };
      const query: dto.SetDeveloperIncomeStreamsQuery = {};

      return await getOnboardingBackendAPI().setDeveloperIncomeStreams(params, body, query);
    };

    const onSuccess = (response: dto.SetDeveloperIncomeStreamsResponse) => {
      console.log("Income streams saved successfully:", response);
    };

    await handleApiCall(apiCall, setIsLoading, setApiError, onSuccess);
  };

  const handleToggleChange = async (option: IncomeStreamType, enabled: boolean) => {
    const newStreams = enabled ? [...incomeStreams, option] : incomeStreams.filter(stream => stream !== option);

    setIncomeStreams(newStreams);
    props.updateState({ incomeStreams: newStreams });
    await saveIncomeStreams();
  };

  return (
    <div className="flex flex-col items-center gap-12 px-0 pb-0 w-full">
      {/* Main Content */}
      <div className="flex justify-center items-start gap-12 w-full">
        {/* Step Number */}
        <div className="text-white text-center font-michroma text-[42px] leading-[1.3] opacity-15">
          03
        </div>
        
        {/* Divider Line */}
        <div className={`w-px opacity-15 bg-white ${showServiceModel ? "h-[1170px]" : "h-[811px]"}`} />
        
        {/* Form Content */}
        <div className="flex flex-col items-center gap-12 flex-1">
          {/* Content */}
          <div className="flex flex-col items-start gap-12 w-full">
            {/* Section Title */}
            <div className="flex flex-col items-center gap-4 w-full">
              <div className="flex flex-col items-start gap-4 w-full">
                <h1 className="w-full text-white font-michroma text-[42px] leading-[1.3] capitalize">
                  Choose how you get funded
                </h1>
                <p className="w-full text-white font-montserrat text-xl leading-[1.3] opacity-60">
                  3 ways to get paid for your open source work. Designed to respect free software and community-led projects.
                </p>
              </div>
            </div>

            {/* Funding Options */}
            <div className="flex flex-col items-start gap-9 w-full">
              {/* Offer Services Card (Full Width When Selected) */}
              <FundingCard
                title="Offer Services"
                description="Define your open source offerings, your terms, your rates, and your availability."
                isEnabled={incomeStreams.includes(IncomeStreamType.SERVICES)}
                onChange={enabled => handleToggleChange(IncomeStreamType.SERVICES, enabled)}
                isRecommended={true}
                hasLearnMore={true}
                onLearnMore={() => setShowServiceModel(true)}
              />

              {/* Service Model Section (Expanded when Learn More is clicked) */}
              {showServiceModel && (
                <div className="flex flex-col items-center gap-6 w-full p-6 rounded-md bg-transparent">
                  {/* Header with Close Button */}
                  <div className="flex justify-center items-center gap-2.5 w-full relative">
                    <h2 className="flex-1 text-white font-michroma text-[28px] leading-[1.3]">
                      The Service Model
                    </h2>
                    <button 
                      onClick={() => setShowServiceModel(false)}
                      className="flex flex-col justify-center items-center gap-2.5 w-6 h-6 hover:opacity-70 transition-opacity"
                    >
                      <CloseIcon />
                    </button>
                  </div>

                  {/* Service Model Steps */}
                  <div className="flex justify-center items-start gap-5 w-full">
                    {/* Step 1 */}
                    <div className="flex flex-col p-6 gap-4 flex-1 bg-[#14233A] rounded-[30px]">
                      <div className="text-white font-michroma text-[28px] leading-[1.3] opacity-20">
                        1.
                      </div>
                      <div className="text-white font-montserrat text-lg leading-[1.3] opacity-80">
                        You define your service offering, pricing, and terms.
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex flex-col p-6 gap-4 flex-1 bg-[#14233A] rounded-[30px]">
                      <div className="text-white font-michroma text-[28px] leading-[1.3] opacity-20">
                        2.
                      </div>
                      <div className="text-white font-montserrat text-lg leading-[1.3] opacity-80">
                        Companies subscribe to monthly hours or request one-off tasks.
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex flex-col p-6 gap-4 flex-1 bg-[#14233A] rounded-[30px]">
                      <div className="text-white font-michroma text-[28px] leading-[1.3] opacity-20">
                        3.
                      </div>
                      <div className="text-white font-montserrat text-lg leading-[1.3] opacity-80">
                        We handle sales, marketing, contracts, billing, and expectations.
                      </div>
                    </div>

                    {/* Step 4 */}
                    <div className="flex flex-col p-6 gap-4 flex-1 bg-[#14233A] rounded-[30px]">
                      <div className="text-white font-michroma text-[28px] leading-[1.3] opacity-20">
                        4.
                      </div>
                      <div className="text-white font-montserrat text-lg leading-[1.3] opacity-80">
                        Every payment includes a donation to your project and its ecosystem.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Royalties and Donations Cards */}
              <div className="flex items-start gap-9 w-full">
                <FundingCard
                  title="Royalties"
                  description="Earn when your project is used by other funded projects—even transitively."
                  isEnabled={incomeStreams.includes(IncomeStreamType.ROYALTIES)}
                  onChange={enabled => handleToggleChange(IncomeStreamType.ROYALTIES, enabled)}
                />

                <FundingCard
                  title="Donations"
                  description="Let companies fund you or your project—with or without public recognition."
                  isEnabled={incomeStreams.includes(IncomeStreamType.DONATIONS)}
                  onChange={enabled => handleToggleChange(IncomeStreamType.DONATIONS, enabled)}
                />
              </div>
            </div>
          </div>

          {/* Button Group */}
          <div className="flex h-12 items-center gap-2.5 w-full">
            <div className="flex items-start gap-4">
              <div className="flex justify-center items-center gap-2.5 border border-white rounded-md">
                <Button 
                  onClick={props.onBack} 
                  disabled={isLoading} 
                  level="SECONDARY" 
                  audience="DEVELOPER" 
                  size="MEDIUM"
                  className="border-white text-white font-michroma text-base leading-[1.5] px-5 py-3"
                >
                  Back
                </Button>
              </div>
              
              <div className="flex justify-center items-center gap-2.5 rounded-md">
                <Button 
                  onClick={props.onNext} 
                  disabled={isLoading} 
                  level="PRIMARY" 
                  audience="DEVELOPER" 
                  size="MEDIUM"
                  className="bg-[#FF7E4B] text-white font-michroma text-base leading-[1.5] px-5 py-3"
                >
                  Next
                </Button>
              </div>
            </div>
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

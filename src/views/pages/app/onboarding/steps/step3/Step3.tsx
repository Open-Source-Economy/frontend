import React, { useState } from "react";
import { OnboardingStepProps } from "../OnboardingStepProps";
import { Step3State } from "../../OnboardingDataSteps";
import ProgressBar from "../../components/ProgressBar";
import { getOnboardingBackendAPI } from "src/services";
import * as dto from "@open-source-economy/api-types";
import { IncomeStreamType } from "@open-source-economy/api-types";
import { CloseIcon, FundingCard } from "./FundingCard";
import { ApiError } from "src/ultils/error/ApiError";
import { handleApiCall } from "../../../../../../ultils";

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

  const handleNext = async () => {
    await saveIncomeStreams();
    props.onNext();
  };

  return (
    <div className="bg-[#0e1f35] box-border content-stretch flex flex-col gap-[50px] items-center justify-start pt-[80px] pb-0 px-0 relative size-full">
      {/* Progress Bar */}
      <ProgressBar currentStep={props.currentStep} />

      {/* Form Content */}
      <div className="box-border content-stretch flex flex-col gap-12 items-center justify-start p-0 relative shrink-0 w-full">
        <div className="box-border content-stretch flex flex-col gap-8 items-center justify-center p-0 relative shrink-0 w-[700px]">
          {/* Section Title */}
          <div className="box-border content-stretch flex flex-col gap-4 items-center justify-start leading-[0] p-0 relative shrink-0 text-[#ffffff] text-center w-[600px]">
            <div className="font-michroma not-italic relative shrink-0 text-[32px] w-full">
              <p className="block leading-[1.3]">Choose how you get funded</p>
            </div>
            <div className="font-montserrat font-normal leading-[1.5] relative shrink-0 text-[16px] w-full">
              <p className="block mb-0">3 ways to get paid for your open source work.</p>
              <p className="block">Designed to respect free software and community-led projects.</p>
            </div>
          </div>

          {/* Funding Options Cards */}
          <div className="box-border content-stretch flex flex-row gap-5 items-start justify-start p-0 relative shrink-0 w-[1280px]">
            {/* Royalties Card */}
            <FundingCard
              title="Royalties"
              description="Earn when your project is used by other funded projects—even transitively."
              isEnabled={incomeStreams.includes(IncomeStreamType.ROYALTIES)}
              onChange={enabled => handleToggleChange(IncomeStreamType.ROYALTIES, enabled)}
            />

            {/* Offer Services Card (Recommended) */}
            <FundingCard
              title="Offer Services"
              description="Define your open source offerings, your terms, your rates, and your availability."
              isEnabled={incomeStreams.includes(IncomeStreamType.SERVICES)}
              onChange={enabled => handleToggleChange(IncomeStreamType.SERVICES, enabled)}
              isRecommended={true}
              hasLearnMore={true}
              onLearnMore={() => setShowServiceModel(true)}
            />

            {/* Donations Card */}
            <FundingCard
              title="Donations"
              description="Let companies fund you or your project—with or without public recognition."
              isEnabled={incomeStreams.includes(IncomeStreamType.DONATIONS)}
              onChange={enabled => handleToggleChange(IncomeStreamType.DONATIONS, enabled)}
            />
          </div>

          {/* Service Model Section (Expanded when Learn More is clicked) */}
          {showServiceModel && (
            <div className="bg-[#14233a] box-border content-stretch flex flex-col gap-8 items-center justify-start px-[19px] py-5 relative rounded-md shrink-0 w-[1280px] border border-[rgba(255,255,255,0.2)]">
              {/* Close button */}
              <div className="absolute box-border content-stretch flex flex-row gap-2.5 items-center justify-end right-[19px] p-0 top-[21px]">
                <button onClick={() => setShowServiceModel(false)} className="relative shrink-0 size-4 hover:opacity-70 transition-opacity">
                  <CloseIcon />
                </button>
              </div>

              {/* Section Title */}
              <div className="box-border content-stretch flex flex-col gap-4 items-center justify-start p-0 relative shrink-0 w-[600px]">
                <div className="font-michroma leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[25px] text-center w-full">
                  <p className="block leading-[1.3]">The Service Model</p>
                </div>
              </div>

              {/* Service Model Steps */}
              <div className="box-border content-stretch flex flex-row gap-5 items-center justify-start p-0 relative shrink-0 w-full">
                {/* Step 1 */}
                <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
                  <div className="basis-0 bg-[#202f45] box-border content-stretch flex flex-col font-montserrat font-normal gap-[9px] grow h-full items-start justify-start leading-[0] min-h-px min-w-px overflow-clip px-5 py-[30px] relative rounded-md shrink-0 text-[#ffffff] text-left">
                    <div className="relative shrink-0 text-[40px] w-full">
                      <p className="block leading-[1.2]">1.</p>
                    </div>
                    <div className="relative shrink-0 text-[20px] w-full">
                      <p className="block leading-[1.2]">You define your service offering, pricing, and terms.</p>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
                  <div className="basis-0 bg-[#202f45] box-border content-stretch flex flex-col font-montserrat font-normal gap-[9px] grow h-full items-start justify-start leading-[0] min-h-px min-w-px overflow-clip px-5 py-[30px] relative rounded-md shrink-0 text-[#ffffff] text-left">
                    <div className="relative shrink-0 text-[40px] w-full">
                      <p className="block leading-[1.2]">2.</p>
                    </div>
                    <div className="relative shrink-0 text-[20px] w-full">
                      <p className="block leading-[1.2]">Companies subscribe to monthly hours or request one-off developerServices.</p>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
                  <div className="basis-0 bg-[#202f45] box-border content-stretch flex flex-col font-montserrat font-normal gap-[9px] grow h-full items-start justify-start leading-[0] min-h-px min-w-px overflow-clip px-5 py-[30px] relative rounded-md shrink-0 text-[#ffffff] text-left">
                    <div className="relative shrink-0 text-[40px] w-full">
                      <p className="block leading-[1.2]">3.</p>
                    </div>
                    <div className="relative shrink-0 text-[20px] w-full">
                      <p className="block leading-[1.2]">We handle sales, marketing, contracts, billing, and expectations.</p>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
                  <div className="basis-0 bg-[#202f45] box-border content-stretch flex flex-col font-montserrat font-normal gap-[9px] grow h-full items-start justify-start leading-[0] min-h-px min-w-px overflow-clip px-5 py-[30px] relative rounded-md shrink-0 text-[#ffffff] text-left">
                    <div className="relative shrink-0 text-[40px] w-full">
                      <p className="block leading-[1.2]">4.</p>
                    </div>
                    <div className="relative shrink-0 text-[20px] w-full">
                      <p className="block leading-[1.2]">Every payment includes a donation to your project and its ecosystem.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Button Group */}
          <div className="box-border content-stretch flex flex-row gap-4 h-12 items-end justify-end p-0 relative shrink-0 w-[700px]">
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
              className={`bg-gradient-to-r from-[#ff7e4b] via-[#ff518c] to-[#66319b] box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-5 py-3 relative rounded-md shrink-0 transition-all "opacity-50 cursor-not-allowed" : "hover:scale-105"
              }`}
            >
              <div className="font-michroma leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[16px] text-left text-nowrap">
                <p className="block leading-[1.5] whitespace-pre">Next</p>
              </div>
            </button>
          </div>
        </div>
      </div>
      {/* Loading Indicator */}
      {/*TODO: sam - refactor with other step - dont do a copy past*/}
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
      {/*TODO: sam - refactor with other step - dont do a copy past*/}
      {apiError && (
        <div className="bg-red-900 bg-opacity-30 border border-red-700 text-red-300 px-4 py-3 rounded-md relative mt-4 w-full">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline ml-2">{apiError.message}</span>
        </div>
      )}
    </div>
  );
}

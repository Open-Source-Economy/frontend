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
    <div>
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
            <Button onClick={props.onBack} disabled={isLoading} level="SECONDARY" audience="DEVELOPER" size="MEDIUM">
              Back
            </Button>

            <Button onClick={props.onNext} disabled={isLoading} level="PRIMARY" audience="DEVELOPER" size="MEDIUM">
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

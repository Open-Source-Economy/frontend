import React, { useEffect, useState } from "react";
import { OnboardingStepProps } from "../OnboardingStepProps";
import { Step3State } from "../../OnboardingDataSteps";
import { getOnboardingBackendAPI } from "src/services";
import * as dto from "@open-source-economy/api-types";
import { IncomeStreamType } from "@open-source-economy/api-types";
import { ApiError } from "src/ultils/error/ApiError";
import { handleApiCall } from "../../../../../../../ultils";
import LoadingIndicator from "../../components/LoadingIndicator";
import ErrorDisplay from "../../components/ErrorDisplay";
import { ButtonGroup } from "../../landing/components";
import { FundingCardGrid } from "./FundingCardGrid";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../../../../../paths";

export interface Step3Props extends OnboardingStepProps<Step3State> {}

export function Step3(props: Step3Props) {
  const validatedState = props.state || {};
  const navigate = useNavigate();

  const [incomeStreams, setIncomeStreams] = useState<IncomeStreamType[]>(validatedState.incomeStreams);
  const [showServiceModel, setShowServiceModel] = useState(false);

  const [apiError, setApiError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (incomeStreams) {
      saveIncomeStreams();
    }
  }, [incomeStreams]);

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
  };

  const handleServiceLearnMore = () => {
    setShowServiceModel(true);
  };

  const handleCloseServiceModel = () => {
    setShowServiceModel(false);
  };

  const onNext = () => {
    if (!incomeStreams.includes(IncomeStreamType.SERVICES)) {
      navigate(paths.DEVELOPER_ONBOARDING_COMPLETED);
    } else {
      props.onNext();
    }
  };

  return (
    <>
      <div className="flex flex-col items-start gap-9 self-stretch">
        {/* Main Funding Cards Grid with inline Service Model */}
        <FundingCardGrid
          incomeStreams={incomeStreams}
          onToggleChange={handleToggleChange}
          showServiceModel={showServiceModel}
          onServiceLearnMore={handleServiceLearnMore}
          onCloseServiceModel={handleCloseServiceModel}
        />
      </div>

      <ButtonGroup onBack={props.onBack} onNext={onNext} isLoading={isLoading} showErrorMessage={false} errorMessage={apiError?.message} />

      {/* Loading Indicator */}
      {isLoading && <LoadingIndicator />}

      {/* Error Display */}
      <ErrorDisplay message={apiError?.message} />
    </>
  );
}

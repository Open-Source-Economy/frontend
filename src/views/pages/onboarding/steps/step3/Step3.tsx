import React, { useEffect, useMemo, useState } from "react";
import { OnboardingStepProps } from "../OnboardingStepProps";
import { Step3State } from "../../OnboardingDataSteps";
import { getOnboardingBackendAPI } from "src/services";
import * as dto from "@open-source-economy/api-types";
import { IncomeStreamType } from "@open-source-economy/api-types";
import { ApiError } from "src/ultils/error/ApiError";
import { handleApiCall } from "../../../../../ultils";
import { ServerErrorAlert } from "src/views/components/ui/state/ServerErrorAlert";
import { ServiceProviderCard } from "./design-system/ServiceProviderCard";
import { CommonPotParticipantCard } from "./design-system/CommonPotParticipantCard";
import { ParticipationDivider } from "./design-system/ParticipationDivider";
import { InfoMessage } from "src/views/components/ui/info-message";
import { Lightbulb } from "lucide-react";

export interface Step3Props extends OnboardingStepProps<Step3State> {}

type ParticipationModel = "service_provider" | "common_pot_participant";

export function Step3(props: Step3Props) {
  const validatedState = props.state || {};

  const [incomeStreams, setIncomeStreams] = useState<IncomeStreamType[]>(validatedState.incomeStreams);
  const [apiError, setApiError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Determine participation model based on income streams
  const participationModel = useMemo<ParticipationModel>(() => {
    if (incomeStreams.includes(IncomeStreamType.SERVICES)) {
      return "service_provider";
    } else if (incomeStreams.includes(IncomeStreamType.ROYALTIES) || incomeStreams.includes(IncomeStreamType.DONATIONS)) {
      return "common_pot_participant";
    }
    return "common_pot_participant"; // Default
  }, [incomeStreams]);

  useEffect(() => {
    if (incomeStreams && incomeStreams.length > 0) {
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

  const handleParticipationModelChange = (model: ParticipationModel) => {
    let newStreams: IncomeStreamType[];

    if (model === "service_provider") {
      // Service Provider: Only SERVICES
      newStreams = [IncomeStreamType.SERVICES];
    } else {
      // Common Pot Participant: Both ROYALTIES and DONATIONS (simplified)
      newStreams = [IncomeStreamType.ROYALTIES, IncomeStreamType.DONATIONS];
    }

    setIncomeStreams(newStreams);
    props.updateState({ incomeStreams: newStreams });
  };

  // Register onNext: allow advancing; saving runs on selection change
  useEffect(() => {
    props.setOnNext?.(() => true);
    return () => props.setOnNext?.(null);
  }, [props.setOnNext]);

  return (
    <div className="space-y-8">
      {/* Info Message */}
      <InfoMessage icon={Lightbulb} variant="subtle">
        <strong className="block mb-1 text-sm">Choose Your Role</strong>
        <span className="block mb-1">Decide how you want to participate in the open source economy.</span>
        <span className="block">→ You can change this anytime from your profile settings.</span>
      </InfoMessage>

      {/* Error Display */}
      {apiError && <ServerErrorAlert error={apiError} variant="compact" />}

      {/* Participation Model Selection */}
      <div className="space-y-6">
        {/* Service Provider - Featured Hero Card */}
        <ServiceProviderCard isSelected={participationModel === "service_provider"} onSelect={() => handleParticipationModelChange("service_provider")} />

        {/* Divider with OR */}
        <ParticipationDivider />

        {/* Common Pot Participant - Compact Secondary Option */}
        <CommonPotParticipantCard
          isSelected={participationModel === "common_pot_participant"}
          onSelect={() => handleParticipationModelChange("common_pot_participant")}
        />
      </div>
    </div>
  );
}

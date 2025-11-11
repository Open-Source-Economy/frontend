import React, { useEffect, useMemo, useState } from "react";
import { OnboardingStepProps } from "../OnboardingStepProps";
import { getOnboardingBackendAPI } from "src/services";
import * as dto from "@open-source-economy/api-types";
import { Currency, OpenToOtherOpportunityType } from "@open-source-economy/api-types";
import { ApiError } from "src/ultils/error/ApiError";
import { handleApiCall } from "../../../../../ultils";
import { Step4State } from "../../OnboardingDataSteps";
import { ServerErrorAlert } from "src/views/components/ui/state/ServerErrorAlert";
import { BrandModalSection } from "src/views/components/ui/brand-modal";
import { Clock, DollarSign, TrendingUp } from "lucide-react";
import { WeeklyAvailabilityInput } from "src/views/components/ui/forms/custom/WeeklyAvailabilityInput";
import { ServiceRateInput } from "src/views/components/ui/forms/custom/ServiceRateInput";
import { BiggerOpportunitiesRadioGroup } from "./design-system/BiggerOpportunitiesRadioGroup";
import { ExpandableCommentSection } from "../../components/ExpandableCommentSection";
import { PricingInfoBanner } from "./design-system/PricingInfoBanner";
import { validateHourlyRate, validateWeeklyCommitment } from "src/views/components/ui/forms/validators";

export interface Step4AvailabilityRateProps extends OnboardingStepProps<Step4State> {}

interface Step4FormErrors {
  hourlyWeeklyCommitment?: string;
  openToOtherOpportunity?: string;
  hourlyRate?: string;
}

export function Step4(props: Step4AvailabilityRateProps) {
  const [apiError, setApiError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<Step4FormErrors>({});

  // Comment expansion states
  const [isWeeklyHoursCommentExpanded, setIsWeeklyHoursCommentExpanded] = useState(!!props.state.hourlyWeeklyCommitmentComments);
  const [isCommentExpanded, setIsCommentExpanded] = useState(!!props.state.hourlyRateComments);
  const [isBiggerOpportunitiesCommentExpanded, setIsBiggerOpportunitiesCommentExpanded] = useState(!!props.state.openToOtherOpportunityComments);

  // Convert OpenToOtherOpportunityType to boolean | null for BiggerOpportunitiesRadioGroup
  const biggerOpportunitiesValue = useMemo(() => {
    const val = props.state.openToOtherOpportunity;
    if (val === OpenToOtherOpportunityType.YES) return true;
    if (val === OpenToOtherOpportunityType.NO) return false;
    if (val === OpenToOtherOpportunityType.MAYBE) return null;
    return undefined;
  }, [props.state.openToOtherOpportunity]);

  const saveSettingsToDatabase = async (): Promise<boolean> => {
    const onboardingAPI = getOnboardingBackendAPI();
    const apiCall = async () => {
      const params: dto.SetDeveloperServiceSettingsParams = {};
      const body: dto.SetDeveloperServiceSettingsBody = {
        hourlyWeeklyCommitment: props.state.hourlyWeeklyCommitment!,
        hourlyWeeklyCommitmentComments: props.state.hourlyWeeklyCommitmentComments || "",
        openToOtherOpportunity: props.state.openToOtherOpportunity!,
        openToOtherOpportunityComments: props.state.openToOtherOpportunityComments || "",
        hourlyRate: props.state.hourlyRate!,
        currency: props.state.currency!,
        hourlyRateComments: props.state.hourlyRateComments || "",
      };
      const query: dto.SetDeveloperServiceSettingsQuery = {};
      return await onboardingAPI.setDeveloperServiceSettings(params, body, query);
    };

    return await handleApiCall(apiCall, setIsLoading, setApiError);
  };

  const handleNext = async (): Promise<boolean> => {
    setApiError(null);

    const errors: Step4FormErrors = {};
    let isValid = true;

    // Validate required fields
    const weeklyCommitmentError = validateWeeklyCommitment(props.state.hourlyWeeklyCommitment);
    if (weeklyCommitmentError) {
      errors.hourlyWeeklyCommitment = weeklyCommitmentError;
      isValid = false;
    }

    if (props.state.openToOtherOpportunity === undefined) {
      errors.openToOtherOpportunity = "Please indicate if you're open to bigger opportunities";
      isValid = false;
    }

    if (!props.state.currency) {
      errors.hourlyRate = "Currency must be specified";
      isValid = false;
    } else {
      const hourlyRateError = validateHourlyRate(props.state.hourlyRate);
      if (hourlyRateError) {
        errors.hourlyRate = hourlyRateError;
        isValid = false;
      }
    }

    setFormErrors(errors);

    if (!isValid) {
      return false;
    }

    const success = await saveSettingsToDatabase();
    return success;
  };

  // Reset form errors when entering this step
  useEffect(() => {
    setFormErrors({});
  }, [props.currentStep]);

  // Register handler with parent
  useEffect(() => {
    props.setOnNext?.(handleNext);
    return () => props.setOnNext?.(null);
  }, [
    props.setOnNext,
    props.state.hourlyWeeklyCommitment,
    props.state.hourlyWeeklyCommitmentComments,
    props.state.openToOtherOpportunity,
    props.state.openToOtherOpportunityComments,
    props.state.hourlyRate,
    props.state.hourlyRateComments,
    props.state.currency,
  ]);

  // Handle bigger opportunities change
  const handleBiggerOpportunitiesChange = (value: boolean | null) => {
    if (value === true) {
      props.updateState({ openToOtherOpportunity: OpenToOtherOpportunityType.YES });
    } else if (value === false) {
      props.updateState({ openToOtherOpportunity: OpenToOtherOpportunityType.NO });
    } else if (value === null) {
      props.updateState({ openToOtherOpportunity: OpenToOtherOpportunityType.MAYBE });
    }
  };

  return (
    <div className="space-y-8">
      {/* Error Display */}
      {apiError && <ServerErrorAlert error={apiError} variant="compact" />}

      {/* Main Configuration */}
      <div className="space-y-8">
        {/* Typical Weekly Availability Section */}
        <BrandModalSection
          icon={<Clock />}
          title="Typical Weekly Availability"
          description="Approximate hours per week you're typically available (for planning purposes)"
          iconColor="accent"
        >
          <div className="space-y-6">
            <WeeklyAvailabilityInput
              value={props.state.hourlyWeeklyCommitment}
              onChange={value => props.updateState({ hourlyWeeklyCommitment: value })}
              error={formErrors.hourlyWeeklyCommitment}
            />

            {/* Optional Comment Section */}
            <ExpandableCommentSection
              isExpanded={isWeeklyHoursCommentExpanded}
              onToggleExpanded={setIsWeeklyHoursCommentExpanded}
              value={props.state.hourlyWeeklyCommitmentComments || ""}
              onChange={value => props.updateState({ hourlyWeeklyCommitmentComments: value })}
              onDelete={() => {
                props.updateState({ hourlyWeeklyCommitmentComments: "" });
                setIsWeeklyHoursCommentExpanded(false);
              }}
              placeholder="Any additional details about your availability (e.g., timezone preferences, specific days, schedule variations)..."
            />
          </div>
        </BrandModalSection>

        {/* Your Service Rate Section */}
        <BrandModalSection
          icon={<DollarSign />}
          title="Your Service Rate"
          description="Your hourly rate for providing services (what you will receive)"
          iconColor="accent"
        >
          <div className="space-y-6">
            <ServiceRateInput
              currency={props.state.currency || Currency.USD}
              rate={props.state.hourlyRate || 0}
              onCurrencyChange={(value: Currency) => props.updateState({ currency: value })}
              onRateChange={(value: number) => props.updateState({ hourlyRate: value })}
              error={formErrors.hourlyRate}
            />

            {/* Pricing Information */}
            <PricingInfoBanner />

            {/* Optional Comment Section */}
            <ExpandableCommentSection
              isExpanded={isCommentExpanded}
              onToggleExpanded={setIsCommentExpanded}
              value={props.state.hourlyRateComments || ""}
              onChange={value => props.updateState({ hourlyRateComments: value })}
              onDelete={() => {
                props.updateState({ hourlyRateComments: "" });
                setIsCommentExpanded(false);
              }}
              placeholder="Any additional details about your rates or pricing preferences..."
            />
          </div>
        </BrandModalSection>

        {/* Bigger Opportunities Section */}
        <BrandModalSection icon={<TrendingUp />} title="Bigger Opportunities" description="Explore larger engagements and projects" iconColor="success">
          <div className="space-y-6">
            <BiggerOpportunitiesRadioGroup
              value={biggerOpportunitiesValue}
              onChange={handleBiggerOpportunitiesChange}
              error={formErrors.openToOtherOpportunity}
            />

            {/* Optional Comment Section */}
            <ExpandableCommentSection
              isExpanded={isBiggerOpportunitiesCommentExpanded}
              onToggleExpanded={setIsBiggerOpportunitiesCommentExpanded}
              value={props.state.openToOtherOpportunityComments || ""}
              onChange={value => props.updateState({ openToOtherOpportunityComments: value })}
              onDelete={() => {
                props.updateState({ openToOtherOpportunityComments: "" });
                setIsBiggerOpportunitiesCommentExpanded(false);
              }}
              placeholder="What types of bigger opportunities interest you? Any specific requirements or preferences..."
            />
          </div>
        </BrandModalSection>
      </div>
    </div>
  );
}

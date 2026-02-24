import React, { useEffect, useMemo } from "react";
import { useNavigate } from "@tanstack/react-router";
import { OnboardingStepProps } from "../OnboardingStepProps";
import { onboardingHooks } from "src/api";
import { ApiError } from "src/ultils/error/ApiError";
import * as dto from "@open-source-economy/api-types";
import { Currency, OpenToOtherOpportunityType, PreferenceType } from "@open-source-economy/api-types";
import { Step4State } from "../../OnboardingDataSteps";
import { ServerErrorAlert } from "src/views/components/ui/state/ServerErrorAlert";
import { BrandModalSection } from "src/views/components/ui/brand-modal";
import { Clock, DollarSign, TrendingUp } from "lucide-react";
import { ServiceRateInput, WeeklyAvailabilityInput } from "src/views/components/ui/forms";
import { BiggerOpportunitiesRadioGroup } from "./design-system/BiggerOpportunitiesRadioGroup";
import { ExpandableCommentSection } from "../../components/ExpandableCommentSection";
import { PricingInfoBanner } from "./design-system/PricingInfoBanner";
import { paths } from "src/paths";
import { useZodForm } from "src/views/components/ui/forms/rhf";
import { onboardingStep4Schema } from "src/views/components/ui/forms/schemas";
import { useState } from "react";

export interface Step4AvailabilityRateProps extends OnboardingStepProps<Step4State> {
  servicesPreference?: PreferenceType | null;
}

export function Step4(props: Step4AvailabilityRateProps) {
  const navigate = useNavigate();

  const setServiceSettings = onboardingHooks.useSetDeveloperServiceSettingsMutation();
  const completeOnboarding = onboardingHooks.useCompleteOnboardingMutation();

  const mutationError = setServiceSettings.error || completeOnboarding.error;
  const apiError = mutationError
    ? mutationError instanceof ApiError
      ? mutationError
      : ApiError.from(mutationError)
    : null;

  // Check if user selected "Yes" to Service Provider
  const isServiceProvider = props.servicesPreference === PreferenceType.YES;
  // Check if user is not interested in being a service provider at all
  const skipStep5 = props.servicesPreference === PreferenceType.NOT_INTERESTED;

  const form = useZodForm(onboardingStep4Schema, {
    defaultValues: {
      isServiceProvider,
      hourlyWeeklyCommitment: props.state.hourlyWeeklyCommitment,
      hourlyRate: props.state.hourlyRate,
      currency: props.state.currency || "",
      openToOtherOpportunity: props.state.openToOtherOpportunity || "",
      hourlyWeeklyCommitmentComment: props.state.hourlyWeeklyCommitmentComment || "",
      hourlyRateComment: props.state.hourlyRateComment || "",
      openToOtherOpportunityComment: props.state.openToOtherOpportunityComment || "",
    },
  });

  // Keep isServiceProvider in sync
  useEffect(() => {
    form.setValue("isServiceProvider", isServiceProvider);
  }, [isServiceProvider]);

  // Comment expansion states
  const [isWeeklyHoursCommentExpanded, setIsWeeklyHoursCommentExpanded] = useState(
    !!props.state.hourlyWeeklyCommitmentComment
  );
  const [isCommentExpanded, setIsCommentExpanded] = useState(!!props.state.hourlyRateComment);
  const [isBiggerOpportunitiesCommentExpanded, setIsBiggerOpportunitiesCommentExpanded] = useState(
    !!props.state.openToOtherOpportunityComment
  );

  // Convert OpenToOtherOpportunityType to boolean | null for BiggerOpportunitiesRadioGroup
  const openToOtherValue = form.watch("openToOtherOpportunity");
  const biggerOpportunitiesValue = useMemo(() => {
    if (openToOtherValue === OpenToOtherOpportunityType.YES) return true;
    if (openToOtherValue === OpenToOtherOpportunityType.NO) return false;
    if (openToOtherValue === OpenToOtherOpportunityType.MAYBE) return null;
    return undefined;
  }, [openToOtherValue]);

  // Sync RHF -> parent state
  useEffect(() => {
    const sub = form.watch((values) => {
      props.updateState({
        hourlyWeeklyCommitment: values.hourlyWeeklyCommitment ?? undefined,
        hourlyRate: values.hourlyRate ?? undefined,
        currency: (values.currency as Currency) || null,
        openToOtherOpportunity: (values.openToOtherOpportunity as OpenToOtherOpportunityType) || undefined,
        hourlyWeeklyCommitmentComment: values.hourlyWeeklyCommitmentComment || undefined,
        hourlyRateComment: values.hourlyRateComment || undefined,
        openToOtherOpportunityComment: values.openToOtherOpportunityComment || undefined,
      });
    });
    return () => sub.unsubscribe();
  }, [form, props.updateState]);

  const saveSettingsToDatabase = async (): Promise<boolean> => {
    const values = form.getValues();
    try {
      const params: dto.SetDeveloperServiceSettingsParams = {};
      const body: dto.SetDeveloperServiceSettingsBody = {
        hourlyWeeklyCommitment: isServiceProvider ? values.hourlyWeeklyCommitment! : undefined,
        hourlyWeeklyCommitmentComment: values.hourlyWeeklyCommitmentComment || undefined,
        openToOtherOpportunity: values.openToOtherOpportunity as OpenToOtherOpportunityType,
        openToOtherOpportunityComment: values.openToOtherOpportunityComment || undefined,
        hourlyRate: isServiceProvider ? values.hourlyRate! : undefined,
        currency: isServiceProvider ? (values.currency as Currency) : undefined,
        hourlyRateComment: values.hourlyRateComment || undefined,
      };
      const query: dto.SetDeveloperServiceSettingsQuery = {};
      await setServiceSettings.mutateAsync({ params, body, query });
      return true;
    } catch {
      return false;
    }
  };

  // Register handler with parent
  useEffect(() => {
    const handleNext = async (): Promise<boolean> => {
      setServiceSettings.reset();
      completeOnboarding.reset();

      const isValid = await form.trigger();
      if (!isValid) return false;

      const success = await saveSettingsToDatabase();

      // If user selected "Not interested" for Service Provider, skip Step 5 and complete onboarding
      if (success && skipStep5) {
        try {
          await completeOnboarding.mutateAsync({ params: {}, body: {}, query: {} });
          navigate({ to: paths.DEVELOPER_ONBOARDING_COMPLETED as string });
        } catch {
          // error tracked by completeOnboarding.error
        }
        return false; // Don't proceed to Step 5
      }

      return success;
    };

    props.setOnNext?.(handleNext);
    return () => props.setOnNext?.(null);
  }, [props.setOnNext, isServiceProvider, skipStep5]);

  // Reset form errors when entering this step
  useEffect(() => {
    form.clearErrors();
  }, [props.currentStep]);

  // Handle bigger opportunities change
  const handleBiggerOpportunitiesChange = (value: boolean | null) => {
    let opType: OpenToOtherOpportunityType;
    if (value === true) opType = OpenToOtherOpportunityType.YES;
    else if (value === false) opType = OpenToOtherOpportunityType.NO;
    else opType = OpenToOtherOpportunityType.MAYBE;
    form.setValue("openToOtherOpportunity", opType, { shouldValidate: form.formState.isSubmitted });
  };

  const formErrors = form.formState.errors;

  return (
    <div className="space-y-8">
      {/* Error Display */}
      {apiError && <ServerErrorAlert error={apiError} variant="compact" />}

      {/* Main Configuration */}
      <div className="space-y-8">
        {/* Only show service provider sections if user selected "Yes" to Service Provider */}
        {isServiceProvider && (
          <>
            {/* Typical Weekly Availability Section */}
            <BrandModalSection
              icon={<Clock />}
              title="Typical Weekly Availability"
              description="Approximate hours per week you're typically available (for planning purposes)"
              iconColor="accent"
            >
              <div className="space-y-6">
                <WeeklyAvailabilityInput
                  value={form.watch("hourlyWeeklyCommitment")}
                  onChange={(value) =>
                    form.setValue("hourlyWeeklyCommitment", value, { shouldValidate: form.formState.isSubmitted })
                  }
                  error={formErrors.hourlyWeeklyCommitment?.message}
                />

                {/* Optional Comment Section */}
                <ExpandableCommentSection
                  isExpanded={isWeeklyHoursCommentExpanded}
                  onToggleExpanded={setIsWeeklyHoursCommentExpanded}
                  value={form.watch("hourlyWeeklyCommitmentComment") || ""}
                  onChange={(value) => form.setValue("hourlyWeeklyCommitmentComment", value)}
                  onDelete={() => {
                    form.setValue("hourlyWeeklyCommitmentComment", "");
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
                  currency={(form.watch("currency") as Currency) || Currency.USD}
                  rate={form.watch("hourlyRate") || 0}
                  onCurrencyChange={(value: Currency) =>
                    form.setValue("currency", value, { shouldValidate: form.formState.isSubmitted })
                  }
                  onRateChange={(value: number) =>
                    form.setValue("hourlyRate", value, { shouldValidate: form.formState.isSubmitted })
                  }
                  error={formErrors.hourlyRate?.message}
                />

                {/* Pricing Information */}
                <PricingInfoBanner />

                {/* Optional Comment Section */}
                <ExpandableCommentSection
                  isExpanded={isCommentExpanded}
                  onToggleExpanded={setIsCommentExpanded}
                  value={form.watch("hourlyRateComment") || ""}
                  onChange={(value) => form.setValue("hourlyRateComment", value)}
                  onDelete={() => {
                    form.setValue("hourlyRateComment", "");
                    setIsCommentExpanded(false);
                  }}
                  placeholder="Any additional details about your rates or pricing preferences..."
                />
              </div>
            </BrandModalSection>
          </>
        )}

        {/* Bigger Opportunities Section - Always shown */}
        <BrandModalSection
          icon={<TrendingUp />}
          title="Bigger Opportunities"
          description="Explore larger engagements and projects"
          iconColor="success"
        >
          <div className="space-y-6">
            <BiggerOpportunitiesRadioGroup
              value={biggerOpportunitiesValue}
              onChange={handleBiggerOpportunitiesChange}
              error={formErrors.openToOtherOpportunity?.message}
            />

            {/* Optional Comment Section */}
            <ExpandableCommentSection
              isExpanded={isBiggerOpportunitiesCommentExpanded}
              onToggleExpanded={setIsBiggerOpportunitiesCommentExpanded}
              value={form.watch("openToOtherOpportunityComment") || ""}
              onChange={(value) => form.setValue("openToOtherOpportunityComment", value)}
              onDelete={() => {
                form.setValue("openToOtherOpportunityComment", "");
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

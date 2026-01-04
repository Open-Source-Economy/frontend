import React, { useEffect, useState } from "react";
import * as dto from "@open-source-economy/api-types";
import { Clock, DollarSign, FolderGit2 } from "lucide-react";
import { BrandModal, BrandModalSection } from "src/views/components/ui/brand-modal";
import { InfoMessage } from "src/views/components/ui/info-message";
import { Button } from "src/views/components/ui/forms/button";
import { Switch } from "src/views/components/ui/switch";
import { getOnboardingBackendAPI } from "src/services";
import { handleApiCall } from "src/ultils";
import { ApiError } from "src/ultils/error/ApiError";
import { CurrencyCompanion, ResponseTimeTypeCompanion, ServiceTypeCompanion } from "src/ultils/companions";
import { ProjectSelector } from "../components/ProjectSelector";
import { SelectField } from "src/views/components/ui/forms/select/select-field";
import { InputWithAddon } from "../components/InputWithAddon";
import { HelpText } from "src/views/components/ui/help-text";
import { ExpandableCommentSection } from "../../../components";
import { ServiceRateDialogContent } from "../components/ServiceRateDialog";

import { Rate } from "../types";

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  developerServiceEntry: dto.DeveloperServiceEntry | null;
  defaultRate: Rate;
  projects: dto.DeveloperProjectItemEntry[];
  onUpsertDeveloperService: (developerService: dto.DeveloperService) => void;
  onAddProject?: () => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  isOpen,
  onClose,
  developerServiceEntry,
  defaultRate,
  projects,
  onUpsertDeveloperService,
  onAddProject,
}) => {
  const api = getOnboardingBackendAPI();

  // State
  const [selectedProjectIds, setSelectedProjectIds] = useState<dto.DeveloperProjectItemId[]>([]);
  const [useCustomRate, setUseCustomRate] = useState<boolean>(false);
  const [hourlyRate, setHourlyRate] = useState<string>("");
  const [responseTimeHours, setResponseTimeHours] = useState<dto.ResponseTimeType | undefined>(undefined);
  const [comment, setComment] = useState<string>("");
  const [showCommentField, setShowCommentField] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<ApiError | null>(null);

  const currencySymbol = CurrencyCompanion.symbol(defaultRate.currency);

  // Initialize when modal opens
  useEffect(() => {
    if (isOpen && developerServiceEntry) {
      setSelectedProjectIds(developerServiceEntry.developerService?.developerProjectItemIds || []);
      setUseCustomRate(!!developerServiceEntry.developerService?.hourlyRate);
      setHourlyRate(developerServiceEntry.developerService?.hourlyRate?.toString() || "");
      setResponseTimeHours(developerServiceEntry.developerService?.responseTimeHours ?? undefined);
      setComment(developerServiceEntry.developerService?.comment || "");
      setShowCommentField(!!developerServiceEntry.developerService?.comment);
      setApiError(null);
    }
  }, [isOpen, developerServiceEntry]);

  const handleSave = async () => {
    if (!developerServiceEntry) return;

    setIsLoading(true);
    setApiError(null);

    // Validation
    if (selectedProjectIds.length === 0) {
      setIsLoading(false);
      return;
    }

    const apiCall = async () => {
      const body: dto.UpsertDeveloperServiceBody = {
        serviceId: developerServiceEntry.service.id,
        developerProjectItemIds: selectedProjectIds,
        hourlyRate: useCustomRate && hourlyRate ? parseFloat(hourlyRate) : undefined,
        responseTimeHours: developerServiceEntry.service.hasResponseTime ? responseTimeHours : undefined,
        comment: comment || undefined,
      };
      return await api.upsertDeveloperService({}, body, {});
    };

    const onSuccess = (response: dto.UpsertDeveloperServiceResponse) => {
      onUpsertDeveloperService(response.developerService);
      onClose();
    };

    await handleApiCall(apiCall, setIsLoading, setApiError, onSuccess);
  };

  if (!developerServiceEntry) return null;

  const service = developerServiceEntry.service;
  const serviceTypeInfo = ServiceTypeCompanion.info(service.serviceType);
  const canSave = selectedProjectIds.length > 0;
  const displayRate = useCustomRate && hourlyRate ? parseFloat(hourlyRate) : defaultRate.amount;

  return (
    <BrandModal
      open={isOpen}
      onClose={onClose}
      size="2xl"
      preventAutoFocus={true}
      footer={
        <div className="flex items-center justify-end w-full gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!canSave || isLoading}
            className="bg-gradient-to-r from-brand-accent to-brand-highlight hover:from-brand-accent-dark hover:to-brand-highlight-dark text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      }
    >
      <div className="space-y-6 py-2">
        {/* Error Message */}
        {apiError && apiError.message && (
          <div className="p-3 bg-brand-error/10 border border-brand-error/30 rounded-lg text-sm text-brand-error">{apiError.message}</div>
        )}

        <div className="space-y-6">
          {/* Service Header Card */}
          <div className="relative bg-gradient-to-br from-brand-card-blue/40 to-brand-card-blue/20 rounded-xl border border-brand-neutral-300/30 p-3 overflow-hidden">
            {/* Gradient accent overlay */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-brand-accent/5 to-brand-highlight/5 rounded-full blur-3xl -z-0" />

            <div className="relative z-10 flex items-start gap-3">
              {/* Service Icon */}
              <div className="w-10 h-10 bg-gradient-to-br from-brand-accent/20 to-brand-highlight/20 rounded-lg flex items-center justify-center border border-brand-accent/20 flex-shrink-0">
                {React.createElement(serviceTypeInfo.icon, {
                  className: "w-5 h-5 text-brand-accent",
                })}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* Service Name */}
                <h3 className="text-brand-neutral-900 mb-0.5">{service.name}</h3>

                {/* Service Description */}
                {service.description && <p className="text-brand-neutral-600 text-sm">{service.description}</p>}
              </div>
            </div>
          </div>

          {/* Projects */}
          <BrandModalSection icon={<FolderGit2 />} title="Project Selection" description="Choose which projects this service applies to" iconColor="accent">
            <div className="space-y-2">
              <ProjectSelector projects={projects} selectedIds={selectedProjectIds} onChange={setSelectedProjectIds} />
              {selectedProjectIds.length === 0 && <p className="text-xs text-brand-warning">Select at least one project</p>}
            </div>
          </BrandModalSection>

          {/* Pricing & Response Time */}
          <BrandModalSection
            icon={<DollarSign />}
            title="Service Configuration"
            description="Set pricing, response time, and additional notes"
            iconColor="highlight"
          >
            <div className="space-y-4">
              {/* Hourly Rate Override */}
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <label className="text-sm text-brand-neutral-700">Hourly Rate</label>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-brand-neutral-500">{useCustomRate ? "Custom" : "Base"}</span>
                    <Switch
                      checked={useCustomRate}
                      onCheckedChange={checked => {
                        setUseCustomRate(checked);
                        if (!checked) setHourlyRate("");
                      }}
                    />
                  </div>
                </div>

                {!useCustomRate ? (
                  <InputWithAddon prefix={currencySymbol} suffix="/hr" value={defaultRate.amount.toString()} displayMode={true} />
                ) : (
                  <div className="flex items-center gap-2 p-3 bg-brand-card-blue/30 border border-brand-accent/30 rounded-lg focus-within:border-brand-accent focus-within:bg-brand-card-blue/50 transition-all w-fit">
                    <span className="text-sm text-brand-neutral-700">{currencySymbol}</span>
                    <input
                      type="number"
                      value={hourlyRate}
                      onChange={e => setHourlyRate(e.target.value)}
                      placeholder={defaultRate.amount.toString()}
                      className="flex-1 min-w-0 bg-transparent border-none outline-none text-sm text-brand-neutral-900 placeholder:text-brand-neutral-500"
                      style={{ width: "80px" }}
                      step="1"
                      min="0"
                    />
                    <span className="text-xs text-brand-neutral-500">/hr</span>
                  </div>
                )}

                {/* Help Text */}
                <HelpText
                  learnMoreText="Learn more about service rates"
                  learnMoreTitle="Service-Specific Rates"
                  learnMoreDescription="Customize pricing for different services based on their complexity and value"
                  learnMoreContent={<ServiceRateDialogContent currency={currencySymbol} baseRate={defaultRate.amount} />}
                >
                  {useCustomRate
                    ? "Custom rates let you adjust pricing for specific services based on complexity or demand."
                    : `Using your base rate from Step 4 (${currencySymbol}${defaultRate.amount}/hr). Toggle to set a custom rate for this service if needed.`}
                </HelpText>
              </div>

              {/* Response Time (if applicable) */}
              {service.hasResponseTime && (
                <div className="space-y-3">
                  <SelectField
                    label="Response Time"
                    options={ResponseTimeTypeCompanion.selectOptions()}
                    value={responseTimeHours || ""}
                    onChange={value => setResponseTimeHours(value ? (value as dto.ResponseTimeType) : undefined)}
                    placeholder="Select response time"
                  />

                  <InfoMessage icon={Clock} variant="info">
                    Response time is your commitment to acknowledge and begin work on requests within the specified timeframe.
                  </InfoMessage>

                  {/* Additional Notes */}
                  <ExpandableCommentSection
                    isExpanded={showCommentField}
                    onToggleExpanded={setShowCommentField}
                    value={comment}
                    onChange={setComment}
                    onDelete={() => {
                      setComment("");
                      setShowCommentField(false);
                    }}
                    placeholder="Add any additional details or requirements for this service..."
                  />
                </div>
              )}
            </div>
          </BrandModalSection>
        </div>
      </div>
    </BrandModal>
  );
};

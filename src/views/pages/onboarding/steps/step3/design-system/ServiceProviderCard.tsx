import React from "react";
import { PreferenceType } from "@open-source-economy/api-types";
import { ParticipationFeatureItem } from "./ParticipationFeatureItem";
import { FundFlowVisualization } from "./FundFlowVisualization";
import { ParticipationSelectionButtons } from "./ParticipationSelectionButtons";
import { participationCardConfigs, ParticipationModelOption } from "./participationCardConfigs";

interface ServiceProviderCardProps {
  selectedState: PreferenceType | null | undefined;
  onSelect: (state: PreferenceType) => void;
  hasError?: boolean;
}

export const ServiceProviderCard: React.FC<ServiceProviderCardProps> = ({ selectedState, onSelect, hasError }) => {
  const config = participationCardConfigs[ParticipationModelOption.SERVICE_PROVIDER];
  const Icon = config.icon;
  const BadgeIcon = config.badge?.icon;
  const isSelected = selectedState === PreferenceType.YES;

  return (
    <div
      className={`
        group relative w-full rounded-2xl border transition-all duration-300 overflow-hidden
        ${
          hasError
            ? "border-brand-error/50 bg-brand-error/5 hover:border-brand-error/70"
            : "border-brand-neutral-300/10 bg-brand-card-blue/30 hover:border-brand-accent/50"
        }
        hover:shadow-lg
      `}
    >
      {/* Content Grid */}
      <div className="grid md:grid-cols-3 gap-6 p-8 pb-6">
        {/* Left: Main Info */}
        <div className="md:col-span-2 space-y-6 text-left">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-accent via-brand-warning to-brand-highlight rounded-2xl flex items-center justify-center shadow-lg">
                <Icon className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="mb-1">
                  <h3 className="text-2xl transition-colors text-brand-neutral-800">{config.title}</h3>
                </div>
                {config.badge && BadgeIcon && (
                  <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-brand-accent to-brand-warning text-white px-3 py-1 rounded-full text-xs shadow-md">
                    <BadgeIcon className="w-3 h-3" />
                    <span>{config.badge.text}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <p className="text-brand-neutral-600 text-lg leading-relaxed">{config.description}</p>

          {/* Feature Grid */}
          <div className="grid sm:grid-cols-2 gap-3">
            {config.detailedFeatures?.map((feature, index) => (
              <ParticipationFeatureItem key={index} icon={feature.icon} title={feature.title} description={feature.description} />
            ))}
          </div>
        </div>

        {/* Right: Fund Flow Visualization */}
        <FundFlowVisualization />
      </div>

      {/* Selection Buttons - Full Width */}
      <div className="px-8 pb-8 pt-6 border-t border-brand-neutral-300/20">
        <ParticipationSelectionButtons selectedState={selectedState} onSelect={onSelect} />
        {hasError && !selectedState && <p className="text-sm text-brand-error mt-4 text-center">{config.errorMessage}</p>}
      </div>
    </div>
  );
};

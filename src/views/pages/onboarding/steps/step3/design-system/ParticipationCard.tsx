import React from "react";
import { LucideIcon } from "lucide-react";
import { PreferenceType } from "@open-source-economy/api-types";
import { ParticipationSelectionButtons } from "./ParticipationSelectionButtons";

export interface ParticipationCardConfig {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  colorScheme: {
    primary: string; // e.g., 'brand-success', 'brand-accent', 'brand-highlight'
    primaryDark?: string; // e.g., 'brand-success-dark'
  };
  errorMessage: string;
}

interface ParticipationCardProps {
  config: ParticipationCardConfig;
  selectedState: PreferenceType | null | undefined;
  onSelect: (state: PreferenceType) => void;
  hasError?: boolean;
}

// DRY: Layout spacing constants
const LAYOUT = {
  BADGE_TOP: "top-4",
  ICON_SIZE: "w-14 h-14",
  ICON_INNER_SIZE: "w-7 h-7",
  TITLE_HEIGHT: "min-h-[56px]",
  DESCRIPTION_HEIGHT: "min-h-[60px]",
  BOTTOM_PADDING: "pb-20",
} as const;

/**
 * ParticipationCard - Unified reusable card component for all participation options
 * Based on the Community Supporter card layout
 */
export const ParticipationCard: React.FC<ParticipationCardProps> = ({ config, selectedState, onSelect, hasError }) => {
  const { title, description, icon: Icon, features, colorScheme } = config;
  const { primary, primaryDark } = colorScheme;

  const isSelected = selectedState === PreferenceType.YES;

  // DRY: Helper functions for dynamic classes
  const getPrimaryClasses = (opacity?: string) => `text-${primary}${opacity ? `/${opacity}` : ""}`;
  const getBgPrimaryClasses = (opacity?: string) => `bg-${primary}${opacity ? `/${opacity}` : ""}`;
  const getBorderPrimaryClasses = (opacity?: string) => `border-${primary}${opacity ? `/${opacity}` : ""}`;
  const getShadowPrimaryClasses = (opacity?: string) => `shadow-${primary}${opacity ? `/${opacity}` : ""}`;

  const getGradientBg = () => `bg-gradient-to-br from-${primary} ${primaryDark ? `to-${primaryDark}` : `to-${primary}`}`;

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
      {/* Card Content */}
      <div className="p-8 flex flex-col">
        {/* Header Section - Icon, Title, Description */}
        <div className="flex items-start gap-4 mb-4">
          {/* Icon */}
          <div
            className={`
            w-12 h-12 flex-shrink-0 rounded-2xl flex items-center justify-center transition-all duration-300
            ${getBgPrimaryClasses("20")} group-hover:${getBgPrimaryClasses("30")}
          `}
          >
            <Icon className={`w-6 h-6 ${getPrimaryClasses()}`} />
          </div>

          {/* Title and Description */}
          <div className="flex-1 min-w-0">
            <h3 className={`text-xl mb-2 transition-colors text-brand-neutral-800`}>{title}</h3>
            <p className="text-sm text-brand-neutral-600 leading-relaxed mb-4">{description}</p>

            {/* Key Points */}
            <div className="grid md:grid-cols-2 gap-2.5">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2.5">
                  <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${getBgPrimaryClasses("10")}`}>
                    <span className={`${getPrimaryClasses()} text-xs`}>✓</span>
                  </div>
                  <span className="text-sm text-brand-neutral-700 leading-snug">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selection Buttons */}
        <div className="pt-6 border-t border-brand-neutral-300/20">
          <ParticipationSelectionButtons selectedState={selectedState} onSelect={onSelect} />
          {hasError && !selectedState && <p className="text-sm text-brand-error mt-4 text-center">{config.errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

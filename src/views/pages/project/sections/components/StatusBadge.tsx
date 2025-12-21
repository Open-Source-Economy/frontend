import React, { useRef, useState } from "react";
import { Clock, HandHeart, type LucideIcon, Star } from "lucide-react";
import { Badge } from "../../../../components/ui/badge";
import { DeveloperSettings, PreferenceType } from "@open-source-economy/api-types";

export interface ConsultingDetails {
  does?: string[];
  doesNot?: string[];
}

export interface StatusConfig {
  icon: LucideIcon;
  label: string;
  className: string;
  explanation?: string;
  details?: ConsultingDetails;
}

// Configuration
const TOOLTIP_HOVER_DELAY_MS = 100;

// Helper function to get badge configuration based on DeveloperSettings
function getStatusConfig(settings: DeveloperSettings | null): StatusConfig | null {
  const servicesPreference = settings?.servicesPreference;
  const royaltiesPreference = settings?.royaltiesPreference;
  const communitySupporterPreference = settings?.communitySupporterPreference;
  const acceptsDonations = royaltiesPreference === PreferenceType.YES;

  // Determine status based on servicesPreference first
  if (servicesPreference === PreferenceType.YES) {
    return {
      icon: Star,
      label: "Available Now",
      className: "bg-brand-success/10 text-brand-success border-brand-success/20",
      explanation: "Currently available for paid consultation and services.",
    };
  }

  if (servicesPreference === PreferenceType.MAYBE_LATER) {
    return {
      icon: Clock,
      label: "Available Later",
      className: "bg-brand-highlight/10 text-brand-highlight border-brand-highlight/20",
      explanation: "Does not have immediate availability for paid engagements.",
    };
  }

  // Only show community-supporter if they explicitly said yes OR settings is null/undefined
  if (communitySupporterPreference === PreferenceType.YES || communitySupporterPreference === PreferenceType.MAYBE_LATER) {
    return {
      icon: HandHeart,
      label: "Community Supporter",
      className: "bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-amber-600 border-amber-500/30",
      explanation: "Supports other maintainers in this initiative but does not offer paid services.",
      details: {
        does: [...(acceptsDonations ? ["Accepts donations"] : []), "Reviews PRs and provides feedback", "Participates in brainstorming sessions"],
        doesNot: [...(acceptsDonations ? [] : ["Accepts donations"]), "Accepts paid engagements"],
      },
    };
  }

  // If they have settings but haven't set any preferences, don't show a badge
  return null;
}

interface StatusBadgeProps {
  settings: DeveloperSettings | null;
}

// Status Badge with Tooltip Component
export function StatusBadge({ settings }: StatusBadgeProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const hoverTimeoutRef = useRef<number | null>(null);
  const config = getStatusConfig(settings);

  // Don't render if no config (no badge to show)
  if (!config) {
    return null;
  }

  const Icon = config.icon;
  const explanation = config.explanation;
  const details = config.details;

  // Only show tooltip if there's an explanation or details
  const hasTooltipContent = !!explanation || (details && (details.does || details.doesNot));

  const handleMouseEnter = () => {
    if (hasTooltipContent) {
      hoverTimeoutRef.current = window.setTimeout(() => {
        setShowTooltip(true);
      }, TOOLTIP_HOVER_DELAY_MS);
    }
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current !== null) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setShowTooltip(false);
  };

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Badge className={`${config.className} text-xs shadow-sm ${hasTooltipContent ? "cursor-help" : ""}`}>
        <Icon className="mr-1 h-3 w-3" />
        {config.label}
      </Badge>

      {/* Tooltip */}
      {showTooltip && hasTooltipContent && (
        <div className="absolute top-full right-0 mt-2 w-64 z-20 animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="bg-brand-card-blue-light text-brand-neutral-900 rounded-lg p-2 shadow-xl border border-brand-neutral-300/60">
            {/* Explanation */}
            {explanation && (
              <div className={`text-xs leading-snug ${details && (details.does || details.doesNot) ? "mb-2 pb-2 border-b border-brand-neutral-300/30" : ""}`}>
                {explanation}
              </div>
            )}

            {/* Structured Details */}
            {details && (details.does || details.doesNot) && (
              <div className="space-y-2">
                {/* What They Do */}
                {details.does && details.does.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <div className="w-1 h-1 rounded-full bg-brand-success flex-shrink-0" />
                      <span className="text-[10px] text-brand-neutral-600 uppercase tracking-wider">Does</span>
                    </div>
                    <ul className="space-y-0.5 list-none m-0 p-0">
                      {details.does.map((item, index) => (
                        <li key={index} className="text-xs text-brand-neutral-700 flex items-start leading-snug pl-1">
                          <span className="mr-1 text-brand-success flex-shrink-0">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* What They Don't Do */}
                {details.doesNot && details.doesNot.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <div className="w-1 h-1 rounded-full bg-brand-neutral-500 flex-shrink-0" />
                      <span className="text-[10px] text-brand-neutral-600 uppercase tracking-wider">Doesn't</span>
                    </div>
                    <ul className="space-y-0.5 list-none m-0 p-0">
                      {details.doesNot.map((item, index) => (
                        <li key={index} className="text-xs text-brand-neutral-600 flex items-start leading-snug pl-1">
                          <span className="mr-1 text-brand-neutral-500 flex-shrink-0">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Arrow */}
            <div className="absolute -top-1 right-4 w-2 h-2 bg-brand-card-blue-light border-l border-t border-brand-neutral-300/60 rotate-45" />
          </div>
        </div>
      )}
    </div>
  );
}

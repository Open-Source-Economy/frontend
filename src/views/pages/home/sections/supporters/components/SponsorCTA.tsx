import React from "react";
import { ExternalLink } from "lucide-react";

import { colorWithAlpha } from "./colorUtils";
import { SponsorTierName, type Sponsor } from "./types";

interface SponsorCTAProps {
  sponsor: Sponsor;
}

export function SponsorCTA(props: SponsorCTAProps) {
  if (
    !props.sponsor.ctaText ||
    !props.sponsor.ctaUrl ||
    (props.sponsor.tier !== SponsorTierName.Platinum && props.sponsor.tier !== SponsorTierName.Gold)
  ) {
    return null;
  }

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    window.open(props.sponsor.ctaUrl, "_blank", "noopener,noreferrer");
  };

  if (props.sponsor.tier === SponsorTierName.Platinum) {
    return (
      <div className="w-full flex justify-center mt-1" onClick={handleClick}>
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer group/cta"
          style={{
            background: `linear-gradient(135deg, ${colorWithAlpha(props.sponsor.accentColor, 0.125)}, ${colorWithAlpha(props.sponsor.accentColor, 0.063)})`,
            border: `1px solid ${colorWithAlpha(props.sponsor.accentColor, 0.251)}`,
          }}
        >
          <span className="text-xs" style={{ color: props.sponsor.accentColor }}>
            {props.sponsor.ctaText}
          </span>
          <ExternalLink
            className="h-3.5 w-3.5 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-transform"
            style={{ color: props.sponsor.accentColor }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center mt-1" onClick={handleClick}>
      <div className="inline-flex items-center gap-1.5 text-xs text-brand-neutral-600 hover:text-brand-neutral-800 transition-colors cursor-pointer group/cta">
        <span>{props.sponsor.ctaText}</span>
        <ExternalLink className="h-3 w-3 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-transform" />
      </div>
    </div>
  );
}

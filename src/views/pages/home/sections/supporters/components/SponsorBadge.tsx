import { Award, Crown } from "lucide-react";

import { colorWithAlpha } from "src/views/pages/home/sections/supporters/components/colorUtils";
import { SponsorTierName, type Sponsor } from "src/views/pages/home/sections/supporters/components/types";

interface SponsorBadgeProps {
  sponsor: Sponsor;
}

export function SponsorBadge(props: SponsorBadgeProps) {
  if (!props.sponsor.badge) {
    return null;
  }

  return (
    <div className="w-full flex justify-center -mt-2 mb-1">
      {props.sponsor.tier === SponsorTierName.Platinum && (
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm shadow-xl transition-all duration-300 group-hover:shadow-2xl"
          style={{
            background: `linear-gradient(135deg, ${colorWithAlpha(props.sponsor.accentColor, 0.251)}, ${colorWithAlpha(props.sponsor.accentColor, 0.125)})`,
            border: `1.5px solid ${colorWithAlpha(props.sponsor.accentColor, 0.376)}`,
            boxShadow: `0 0 25px -5px ${colorWithAlpha(props.sponsor.accentColor, 0.314)}, 0 10px 20px -10px ${colorWithAlpha(props.sponsor.accentColor, 0.188)}`,
          }}
        >
          <Crown
            className="h-4 w-4"
            style={{ color: props.sponsor.accentColor, filter: "drop-shadow(0 0 4px currentColor)" }}
          />
          <span
            className="text-brand-neutral-800 tracking-wide uppercase text-[10px] letterspacing-widest"
            style={{ textShadow: "0 1px 2px rgba(0,0,0,0.1)" }}
          >
            {props.sponsor.badge}
          </span>
        </div>
      )}
      {props.sponsor.tier === SponsorTierName.Gold && (
        <div
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-sm border shadow-md transition-all duration-300"
          style={{
            background: `linear-gradient(135deg, ${colorWithAlpha(props.sponsor.accentColor, 0.145)}, ${colorWithAlpha(props.sponsor.accentColor, 0.082)})`,
            borderColor: colorWithAlpha(props.sponsor.accentColor, 0.314),
          }}
        >
          <Award className="h-3.5 w-3.5" style={{ color: props.sponsor.accentColor }} />
          <span className="text-brand-neutral-700 tracking-wide text-[10px] uppercase">{props.sponsor.badge}</span>
        </div>
      )}
      {props.sponsor.tier === SponsorTierName.Silver && (
        <div
          className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] border backdrop-blur-sm"
          style={{
            background: colorWithAlpha(props.sponsor.accentColor, 0.071),
            borderColor: colorWithAlpha(props.sponsor.accentColor, 0.208),
          }}
        >
          <span className="text-brand-neutral-600 uppercase tracking-wide">{props.sponsor.badge}</span>
        </div>
      )}
    </div>
  );
}

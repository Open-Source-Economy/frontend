import { colorWithAlpha } from "src/views/pages/home/sections/supporters/components/colorUtils";
import { SponsorTierName, type Sponsor } from "src/views/pages/home/sections/supporters/components/types";

interface SponsorTaglineProps {
  sponsor: Sponsor;
}

export function SponsorTagline(props: SponsorTaglineProps) {
  if (
    !props.sponsor.tagline ||
    (props.sponsor.tier !== SponsorTierName.Platinum && props.sponsor.tier !== SponsorTierName.Gold)
  ) {
    return null;
  }

  if (props.sponsor.tier === SponsorTierName.Platinum) {
    return (
      <div className="w-full flex justify-center">
        <p
          className="text-sm italic text-center px-4 py-2 rounded-lg"
          style={{
            background: `linear-gradient(90deg, transparent, ${colorWithAlpha(props.sponsor.accentColor, 0.063)}, transparent)`,
            color: props.sponsor.accentColor,
          }}
        >
          {props.sponsor.tagline}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center">
      <p className="text-xs italic text-brand-neutral-600 text-center px-2">{props.sponsor.tagline}</p>
    </div>
  );
}

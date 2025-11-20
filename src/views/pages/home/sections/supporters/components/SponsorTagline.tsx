import { colorWithAlpha } from "./colorUtils";
import type { Sponsor } from "./types";

interface SponsorTaglineProps {
  sponsor: Sponsor;
}

export const SponsorTagline: React.FC<SponsorTaglineProps> = ({ sponsor }) => {
  if (!sponsor.tagline || (sponsor.tier !== "Platinum" && sponsor.tier !== "Gold")) {
    return null;
  }

  if (sponsor.tier === "Platinum") {
    return (
      <div className="w-full flex justify-center">
        <p
          className="text-sm italic text-center px-4 py-2 rounded-lg"
          style={{
            background: `linear-gradient(90deg, transparent, ${colorWithAlpha(sponsor.accentColor, 0.063)}, transparent)`,
            color: sponsor.accentColor,
          }}
        >
          {sponsor.tagline}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center">
      <p className="text-xs italic text-brand-neutral-600 text-center px-2">{sponsor.tagline}</p>
    </div>
  );
};

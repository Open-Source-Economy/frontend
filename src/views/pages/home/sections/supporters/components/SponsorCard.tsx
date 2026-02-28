import { Award, Crown, Heart, Star } from "lucide-react";

import { colorWithAlpha } from "./colorUtils";
import { Sponsor } from "./types";
import { SponsorBadge } from "./SponsorBadge";
import { SponsorTagline } from "./SponsorTagline";
import { SponsorCTA } from "./SponsorCTA";

const tierIcons = {
  crown: Crown,
  award: Award,
  star: Star,
  heart: Heart,
};

interface SponsorCardProps {
  sponsor: Sponsor;
}

export function SponsorCard(props: SponsorCardProps) {
  const IconComponent = tierIcons[props.sponsor.iconType];

  return (
    <div
      className={`bg-gradient-to-br from-brand-card-blue to-brand-card-blue-dark border border-brand-neutral-300 rounded-2xl ${props.sponsor.cardPadding} hover:scale-[1.02] hover:shadow-2xl relative group ${props.sponsor.cardWidth} transition-all duration-500 ease-out overflow-hidden cursor-pointer`}
      style={{
        boxShadow: `0 10px 40px -15px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.05) inset, 0 0 30px -10px ${colorWithAlpha(props.sponsor.accentColor, 0.082)}`,
        borderTopColor: props.sponsor.accentColor,
        borderTopWidth: "4px",
      }}
      onClick={() => window.open(`https://${props.sponsor.domain}`, "_blank", "noopener,noreferrer")}
    >
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${props.sponsor.accentColor} 0%, transparent 50%)`,
        }}
      />

      <div
        className="absolute left-0 top-0 bottom-0 w-1 opacity-40 group-hover:opacity-70 transition-opacity duration-300"
        style={{
          background: `linear-gradient(180deg, ${props.sponsor.accentColor} 0%, transparent 100%)`,
        }}
      />

      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-20 transition-all duration-300 z-0">
        <IconComponent className="h-8 w-8" style={{ color: props.sponsor.accentColor }} />
      </div>

      <div className="flex flex-col items-center gap-5 relative z-10">
        <SponsorBadge sponsor={props.sponsor} />

        <div className="flex items-center justify-center gap-4 w-full">
          <div className="flex-shrink-0">
            <img
              src={`https://logo.clearbit.com/${props.sponsor.domain}`}
              alt={`${props.sponsor.name} logo`}
              className="h-12 w-12 object-contain group-hover:scale-105 transition-transform duration-300 rounded-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = "flex";
              }}
            />
            <div
              className="h-12 w-12 rounded-lg bg-gradient-to-br from-brand-accent/20 to-brand-highlight/20 border border-brand-neutral-300 flex items-center justify-center"
              style={{ display: "none" }}
            >
              <span className="text-brand-neutral-900">
                {props.sponsor.name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </span>
            </div>
          </div>

          <div className="relative">
            <p
              className={`text-brand-neutral-900 ${props.sponsor.textSize} relative group-hover:text-brand-neutral-950 transition-colors`}
              style={{
                lineHeight: "1.3",
              }}
            >
              {props.sponsor.name}
            </p>
            <div
              className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                transform: "translateY(8px)",
                background: `linear-gradient(90deg, ${props.sponsor.accentColor}, transparent)`,
              }}
            />
          </div>
        </div>

        <SponsorTagline sponsor={props.sponsor} />

        {props.sponsor.description && (
          <p
            className={`text-brand-neutral-600 ${props.sponsor.descriptionSize} text-center leading-relaxed w-full`}
            style={{
              display: "-webkit-box",
              WebkitLineClamp: props.sponsor.descriptionLines,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {props.sponsor.description}
          </p>
        )}

        <SponsorCTA sponsor={props.sponsor} />
      </div>

      <div
        className="absolute top-0 right-0 w-16 h-16 opacity-15 rounded-tr-2xl pointer-events-none"
        style={{
          background: `linear-gradient(225deg, ${colorWithAlpha(props.sponsor.accentColor, 0.376)} 0%, transparent 70%)`,
        }}
      />
    </div>
  );
}

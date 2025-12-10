import React from "react";
import type { LucideIcon } from "lucide-react";
import { CheckCircle2, Handshake, Megaphone, Network } from "lucide-react";

interface WinWinWinPartnershipProps {
  className?: string;
}

export const winWinWinContent = {
  title: "Win-Win-Win Partnership",
  description: "Pay for expert maintainer access—every dollar strengthens your brand and secures your supply chain.",
  cards: [
    {
      icon: Handshake,
      title: "For Your Team",
      intro: "Direct access to expert maintainers",
      benefits: [
        "Accelerate delivery with world-class maintainers by your side",
        "Solve critical issues without long ramp-up time",
        "Reduce engineering load on unfamiliar or niche components",
      ],
      accent: "primary",
    },
    {
      icon: Megaphone,
      title: "For Your Brand",
      intro: "Direct access to expert maintainers",
      benefits: [
        "Transparent non-profit model with visible impact",
        "We run brand-recognition campaigns highlighting your support",
        "Stand out as a trusted partner to developers and maintainers",
      ],
      accent: "highlight",
    },
    {
      icon: Network,
      title: "For Your Ecosystem",
      intro: "Secure your software foundation",
      benefits: [
        "Support an independent open-source ecosystem",
        "No vendor lock-in or license change risks",
        "Ensure long-term sustainability of critical dependencies",
      ],
      accent: "primary",
    },
  ] as PartnershipCardProps[],
};

type AccentVariant = "primary" | "highlight" | "success";

interface BulletPointProps {
  text: string;
  accent: AccentVariant;
}

const BulletPoint: React.FC<BulletPointProps> = ({ text, accent }) => (
  <div className="flex items-start gap-3 text-left">
    <CheckCircle2 className={`w-4 h-4 text-brand-${accent} flex-shrink-0 mt-0.5`} />
    <span className="text-sm text-brand-neutral-600 leading-relaxed">{text}</span>
  </div>
);

interface PartnershipCardProps {
  icon: LucideIcon;
  title: string;
  intro: string;
  benefits: string[];
  accent: AccentVariant;
}

function PartnershipCard({ icon: Icon, title, intro, benefits, accent }: PartnershipCardProps) {
  return (
    <div className="group relative bg-gradient-to-br from-brand-card-blue to-brand-card-blue-dark rounded-2xl p-10 border border-brand-neutral-300/20 text-center hover:border-brand-neutral-300/40 hover:shadow-2xl transition-all duration-500">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-neutral-300/0 to-brand-neutral-300/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        {/* Icon */}
        <div
          className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-${accent}/20 to-brand-${accent}/5 flex items-center justify-center mb-8 mx-auto group-hover:from-brand-${accent}/30 group-hover:to-brand-${accent}/10 transition-all duration-500`}
        >
          <Icon className={`w-8 h-8 text-brand-${accent}`} />
        </div>

        {/* Title */}
        <h3 className={`text-2xl md:text-3xl text-brand-${accent} mb-5`}>{title}</h3>

        {/* Intro */}
        <p className="text-brand-neutral-700 mb-6">{intro}</p>

        {/* Benefits */}
        <div className="space-y-3 max-w-sm mx-auto">
          {benefits.map((benefit, index) => (
            <BulletPoint key={index} text={benefit} accent={accent} />
          ))}
        </div>
      </div>
    </div>
  );
}

// -----------------------------
// Main section component
// -----------------------------
export function WinWinWinPartnership({ className }: WinWinWinPartnershipProps) {
  const { title, description, cards } = winWinWinContent;

  return (
    <section className={`py-24 lg:py-40 bg-gradient-to-b from-brand-card-blue via-brand-secondary/95 to-brand-success/10 ${className ?? ""}`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16 lg:mb-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-brand-neutral-950 mb-6 tracking-tight">{title}</h1>
          <p className="text-lg md:text-xl text-brand-neutral-700 max-w-3xl mx-auto leading-relaxed">{description}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {cards.map((card, idx) => (
            <PartnershipCard key={idx} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}

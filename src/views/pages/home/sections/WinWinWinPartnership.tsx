import React from "react";
import type { LucideIcon } from "lucide-react";
import { Handshake, Megaphone, Network } from "lucide-react";

interface WinWinWinPartnershipProps {
  className?: string;
}

export const winWinWinContent = {
  title: "Win-Win-Win Partnership",
  description:
    "Partnering with Open Source Economy means faster development, stronger brand reputation, and a more resilient software ecosystem—all powered by your contribution.",
  cards: [
    {
      icon: Handshake,
      title: "For Your Team",
      description:
        "Accelerate development with expert services, solve critical problems faster, and level up your entire team with direct mentorship from the world's best open source developers.",
      color: "brand-primary",
    },
    {
      icon: Megaphone,
      title: "For Your Brand",
      description:
        "Build developer credibility and gain recognition for supporting the open source ecosystem. Demonstrate your commitment to sustainable software development.",
      color: "brand-highlight",
    },
    {
      icon: Network,
      title: "For Your Ecosystem",
      description:
        "Secure your foundation by protecting the sustainability of critical open source projects. Ensure long-term reliability and reduce dependency risks.",
      color: "brand-primary",
    },
  ] as PartnershipCardProps[],
};

// -----------------------------
// Reusable card component
// -----------------------------
interface PartnershipCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string; // e.g. "brand-primary"
}

function PartnershipCard({ icon: Icon, title, description, color }: PartnershipCardProps) {
  return (
    <div className="group relative bg-gradient-to-br from-brand-card-blue to-brand-card-blue-dark rounded-2xl p-8 border border-brand-neutral-300/20 text-center hover:border-brand-neutral-300/40 hover:shadow-2xl transition-all duration-500">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-neutral-300/0 to-brand-neutral-300/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        {/* Icon */}
        <div
          className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-${color}/20 to-${color}/5 flex items-center justify-center mb-8 mx-auto group-hover:from-${color}/30 group-hover:to-${color}/10 transition-all duration-500`}
        >
          <Icon className={`w-8 h-8 text-${color}`} />
        </div>

        {/* Title */}
        <h3 className={`text-2xl md:text-3xl text-${color} mb-5`}>{title}</h3>

        {/* Description */}
        <p className="text-brand-neutral-600 leading-relaxed max-w-sm mx-auto">{description}</p>
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

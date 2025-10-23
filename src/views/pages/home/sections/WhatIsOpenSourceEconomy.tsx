import React from "react";
import type { LucideIcon } from "lucide-react";
import { Building2, CheckCircle, Heart, Shield, Users } from "lucide-react";

interface WhatIsOpenSourceEconomyProps {
  className?: string;
}

export const whatIsOSEContent = {
  badge: {
    icon: Building2,
    text: "Swiss Non-Profit",
  },
  title: "What is Open Source Economy?",
  description: "The only non-profit platform that connects your enterprise directly with the world's most skilled open source creators and core maintainers—",
  descriptionHighlight: "the very people who built the technology your business depends on",
  cards: [
    {
      icon: Users,
      colorClass: "text-brand-primary",
      // title: "Skip the Queue",
      title: "Direct Collaboration",
      description: "Collaborate directly with the experts who built your open source stack, without intermediaries or resellers.",
      //       description: "Work directly with the maintainers of your critical dependencies. Get faster resolutions, custom solutions, and ongoing advisory.",
    },
    {
      icon: Shield,
      colorClass: "text-brand-accent",
      title: "Enterprise-Ready",
      description: "NDAs and SLAs available on demand to ensure your enterprise meets the highest security and reliability standards.",
    },
    {
      icon: Heart,
      colorClass: "text-brand-highlight",
      title: "Sustainable Impact",
      description: "Each contract reinvests in the open source projects your business relies on, ensuring long-term sustainability",
    },
    {
      icon: CheckCircle,
      colorClass: "text-brand-primary",
      title: "Purpose-Driven",
      description: "Partnership with us powers initiatives, outreach, and events that promote open source innovation worldwide.",
    },
  ] as FeatureCardProps[],
};

// -----------------------------
// Reusable card component
// -----------------------------
interface FeatureCardProps {
  icon: LucideIcon;
  colorClass: string; // e.g., "text-brand-primary"
  title: string;
  description: string;
}

function FeatureCard(props: FeatureCardProps) {
  return (
    <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl p-6 text-center hover:bg-card/80 transition-colors duration-200">
      <props.icon className={`w-12 h-12 ${props.colorClass} mx-auto mb-4`} />
      <h3 className="font-semibold mb-3 text-lg">{props.title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{props.description}</p>
    </div>
  );
}

// -----------------------------
// Main section component
// -----------------------------
export function WhatIsOpenSourceEconomy(props: WhatIsOpenSourceEconomyProps) {
  const { badge, title, description, descriptionHighlight, cards } = whatIsOSEContent;
  const BadgeIcon = badge.icon;

  return (
    <section className={`relative py-20 md:py-32 overflow-hidden transition-all duration-1000 ease-in-out ${props.className ?? ""}`}>
      {/* Subtle decorative overlay to enhance passed background */}
      <div className="absolute inset-0 bg-gradient-to-tl from-brand-primary/3 via-transparent to-brand-accent/3" />

      {/* Decorative elements */}
      <div className="absolute top-20 -left-20 w-72 h-72 bg-brand-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 -right-20 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* What is Open Source Economy */}
        <div className="max-w-5xl mx-auto mb-24">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/10 border border-brand-primary/20 rounded-full mb-6">
              <BadgeIcon className="w-4 h-4 text-brand-primary" />
              <span className="text-sm font-medium text-brand-primary">{badge.text}</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground to-brand-primary bg-clip-text text-transparent">
              {title}
            </h2>

            <div className="max-w-5xl mx-auto">
              <p className="text-xl text-muted-foreground leading-relaxed mb-12">
                {description}
                <span className="text-foreground font-semibold bg-gradient-to-r from-brand-primary via-brand-accent to-brand-highlight bg-clip-text text-transparent">
                  {" "}
                  {descriptionHighlight}
                </span>
                .
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
                {cards.map((card, idx) => (
                  <FeatureCard key={`${card.title}-${idx}`} {...card} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

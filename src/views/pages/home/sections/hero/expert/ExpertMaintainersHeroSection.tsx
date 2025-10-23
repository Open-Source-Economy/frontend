import React from "react";
import { HeroLeftContent } from "src/views/pages/home/sections/hero/expert/elements/HeroLeftContent";
import { HeroRightContent } from "src/views/pages/home/sections/hero/expert/elements/HeroRightContent";
import { HeroAction, TrustIndicator } from "src/views/pages/home/sections/hero/HeroSection";

interface ExpertMaintainersHeroSectionProps {
  badge?: string;
  headline: string;
  description: string;
  actions?: HeroAction[];
  trustIndicators?: TrustIndicator[];
}

export function ExpertMaintainersHeroSection(props: ExpertMaintainersHeroSectionProps) {
  return (
    <>
      <section className={`relative py-16 md:py-24 lg:py-32 overflow-hidden`}>
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-brand-primary/5 via-brand-primary/10 to-transparent rounded-full blur-3xl opacity-60 animate-pulse"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content (left) */}
            <HeroLeftContent badge={props.badge} headline={props.headline} description={props.description} actions={props.actions} />

            {/* Visuals (right) */}
            <HeroRightContent />
          </div>
        </div>
      </section>
    </>
  );
}

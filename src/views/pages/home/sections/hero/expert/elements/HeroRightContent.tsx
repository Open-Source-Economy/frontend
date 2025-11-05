import React from "react";
import { ExpertMaintainers } from "./ExpertMaintainers";
import { DecorativeOrb } from "src/views/components/ui/decorative/decorative-orb";

interface HeroRightContentProps {}

export function HeroRightContent(props: HeroRightContentProps) {
  return (
    <div className={`relative lg:order-last min-h-[500px] flex items-center`}>
      {/* Main Content */}
      <div className="relative z-10 w-full">
        <ExpertMaintainers />
      </div>

      {/* Enterprise Decorative Elements */}
      <DecorativeOrb size="large" position="top-right" variant="primary" intensity="medium" animated={true} />

      <DecorativeOrb size="medium" position="bottom-left" variant="accent" intensity="medium" animated={false} />

      {/* Additional subtle background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-primary/5 rounded-3xl blur-3xl opacity-40" />
    </div>
  );
}

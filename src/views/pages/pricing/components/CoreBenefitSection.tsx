import React from "react";
import { Check } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { Feature } from "./types";

interface CoreBenefitSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
}

export function CoreBenefitSection({ title, subtitle, description }: CoreBenefitSectionProps) {
  return (
    <>
      {/* Part 1: Universal Credits Access */}
      <div className="mb-4">
        <SectionHeader title={title} subtitle={subtitle} />

        {/* Universal Access Highlight */}
        <div className="bg-brand-accent/5 rounded-md p-2 mb-4 border border-brand-accent/20 mt-3">
          <p className="text-xs text-brand-neutral-700 flex items-start gap-1.5">
            <Check className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
            <span>
              Works across <span className="text-brand-accent">all projects</span> and <span className="text-brand-accent">all maintainers</span> on the
              platform
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

import React from "react";

export interface StepSidebarProps {
  /** Current step number */
  stepNumber: number;
  /** Step title */
  title: string;
  /** Step description - what the user needs to do */
  description: string;
}

/**
 * StepSidebar - Desktop-only left sidebar showing step context
 * Displays large step number and description for clarity
 */
export const StepSidebar: React.FC<StepSidebarProps> = ({ stepNumber, title, description }) => {
  return (
    <div className="hidden lg:flex flex-col min-w-[180px] pr-6 border-r border-brand-neutral-300/30 self-start sticky top-8">
      {/* Large Step Number - Subtle & Elegant */}
      <div
        className="text-7xl tracking-tighter mb-6"
        style={{
          fontVariantNumeric: "tabular-nums",
          color: "rgba(226, 232, 240, 0.15)", // brand-neutral-800 at 15% opacity
          fontWeight: 300,
          lineHeight: 0.9,
        }}
      >
        {stepNumber.toString().padStart(2, "0")}
      </div>
    </div>
  );
};

import React from "react";
import { SectionHeader } from "src/views/components/ui/section/section-header";
import { StepCard } from "src/views/components/ui/step-card";
import { FeatureBadge } from "src/views/components/ui/feature-badge";
import { FileText, Heart, Layers, LucideIcon, Rocket } from "lucide-react";

// -----------------------------
// Types
// -----------------------------
export interface HowItWorksStep {
  icon: LucideIcon;
  title: string;
  description: string;
}

// -----------------------------
// Content (data-only)
// -----------------------------
export const howItWorksContent = {
  title: "How It Works",
  description: "One contract. Multiple maintainers. Multiple ecosystem. Flexible models.",
  steps: [
    {
      icon: FileText,
      title: "Simplicity",
      description:
        "Sign one enterprise agreement to access multiple open source maintainers. We manage NDAs, SLAs, invoicing, and compliance so collaboration stays simple and secure.",
    },
    {
      icon: Layers,
      title: "Flexibility",
      description:
        "Secure dedicated maintainer time for critical projects while keeping flexibility with On-Demand Access Credits for the rest of your stack. Use both models together.",
    },
    {
      icon: Rocket,
      title: "Empowerment",
      description:
        //   "Boost productivity and reduce downtime by giving your teams direct access to the maintainers who build and maintain your open source tools.",
        // "Engage with open source maintainers for high-priority fixes, custom development, and strategic advisory—strengthening the performance and reliability of your systems.",
        // "Boost productivity and reduce downtime by giving your teams direct access to the maintainers who build and maintain your open source tools, for high-priority fixes, custom development, and strategic advisory",
        "Empower your teams with direct access to the maintainers who built your open source stack—reducing downtime, accelerating delivery, and gaining expert insight on demand.",
    },
    {
      icon: Heart,
      title: "Recognition",
      description:
        "Your engagement sustains the open source ecosystem. Open Source Economy promotes your contribution through campaigns and events that highlight your leadership.",
    },
  ] as HowItWorksStep[],
  features: ["NDA protection", "SLA-backed", "Easy payment processing", "Full transparency", "100% open source output code"],
};

interface HowItWorksSimpleProps {
  className?: string;
  /** Visibility level for the section header */
  headerVisibility?: "prominent" | "normal" | "subtle";
}

// -----------------------------
// Main component
// -----------------------------
export function HowItWorksSimple(props: HowItWorksSimpleProps) {
  return (
    <section className={`py-32 ${props.className ?? ""}`}>
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <SectionHeader
          title={howItWorksContent.title}
          description={howItWorksContent.description}
          titleLevel="h1"
          align="center"
          maxWidth="2xl"
          spacing="xl"
          visibility={props.headerVisibility ?? "normal"}
        />

        {/* Steps with connecting line */}
        <div className="relative mb-16">
          {/* Connecting line - hidden on mobile */}
          <div className="hidden md:block absolute top-[52px] left-[16.66%] right-[16.66%] h-[2px] bg-gradient-to-r from-brand-accent via-brand-highlight to-brand-accent opacity-30 -translate-y-px" />

          {/* Steps grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
            {howItWorksContent.steps.map((step, index) => (
              <StepCard key={index} icon={step.icon} title={step.title} description={step.description} index={index} />
            ))}
          </div>
        </div>

        {/* Feature badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          {howItWorksContent.features.map((feature, index) => (
            <FeatureBadge key={index} label={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

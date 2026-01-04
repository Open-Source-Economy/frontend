import React from "react";
import { SectionHeader } from "src/views/components/ui/section/section-header";
import { StepCard } from "src/views/components/ui/step-card";
import { AlertCircle, ArrowRight, Calendar, Clock, FileText, Globe, Heart, Layers, LucideIcon, Repeat, Rocket, ShieldCheck, Target, Zap } from "lucide-react";
import { Button } from "../../../components/ui/forms";
import { ExternalLink } from "src/views/components/ui/forms/external-link";
import { laurianeCalLink } from "src/views/v1/data";
import { envGroups, isFeatureVisible } from "src/ultils/featureVisibility";
// -----------------------------
// Types
// -----------------------------
export interface HowItWorksStep {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface AccessModelFeature {
  icon: LucideIcon;
  text: string;
}

interface AccessModel {
  icon: LucideIcon;
  title: string;
  description: string;
  accentColor: "accent" | "highlight";
  features: AccessModelFeature[];
  bestFor: string;
}

// -----------------------------
// Content (data-only)
// -----------------------------
export const howItWorksContent = {
  title: "How It Works",
  description: "One contract. Multiple maintainers. Multiple ecosystems. Flexible models.",
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
  accessModels: {
    title: "Two Flexible Access Models",
    description: "Choose the model that fits your needs, or combine both for maximum flexibility",
    models: [
      {
        icon: ShieldCheck,
        title: "Project-Specific Support Plan",
        description: "Secure a predictable, long-term resource for your most critical projects. Guaranteed availability with SLA response times.",
        accentColor: "accent",
        features: [
          { icon: Calendar, text: "Reserved monthly capacity" },
          { icon: Target, text: "Focused on specific projects" },
          { icon: Clock, text: "SLA-backed response times" },
        ],
        bestFor: "Mission-critical projects",
      },
      {
        icon: Zap,
        title: "On-Demand Access",
        description: "Pre-purchase rollover Service Credits for flexible, ecosystem-wide support when unexpected needs or issues come up.",
        accentColor: "highlight",
        features: [
          { icon: Repeat, text: "Credits rollover month-to-month" },
          { icon: Globe, text: "Works with any project or maintainer" },
          { icon: AlertCircle, text: "Best-effort availability (no SLA)" },
        ],
        bestFor: "Broad ecosystem support",
      },
    ] as AccessModel[],
  },

  cta: {
    primaryButton: "Schedule a Demo",
    secondaryButton: "Learn More",
    subtext: "30-minute call • No commitment • Custom pricing",
  },
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

        {/*/!* Feature badges *!/*/}
        {/*<div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">*/}
        {/*  {howItWorksContent.features.map((feature, index) => (*/}
        {/*    <FeatureBadge key={index} label={feature} />*/}
        {/*  ))}*/}
        {/*</div>*/}

        {/* Access Models Section */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h3 className="text-brand-neutral-900 mb-3">{howItWorksContent.accessModels.title}</h3>
            <p className="text-brand-neutral-600 max-w-2xl mx-auto">{howItWorksContent.accessModels.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {howItWorksContent.accessModels.models.map((model, index) => {
              const Icon = model.icon;
              return (
                <div
                  key={index}
                  className={`bg-brand-card-blue/50 backdrop-blur-sm border border-brand-neutral-300/30 rounded-lg p-6 hover:border-brand-${model.accentColor}/40 transition-colors flex flex-col`}
                >
                  <div className="flex items-start gap-4 mb-4 flex-grow">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-lg bg-brand-${model.accentColor}/10 flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 text-brand-${model.accentColor}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-brand-neutral-900 mb-2">{model.title}</h4>
                      <p className="text-brand-neutral-700 text-sm mb-4">{model.description}</p>
                      <div className="space-y-2.5">
                        {model.features.map((feature, featureIndex) => (
                          <FeatureListItem key={featureIndex} icon={feature.icon} text={feature.text} accentColor={model.accentColor} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-brand-neutral-600 text-sm mt-auto pt-3 border-t border-brand-neutral-300/20">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-brand-${model.accentColor}/10 text-brand-${model.accentColor}`}
                    >
                      Best for: {model.bestFor}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4">
            <ExternalLink href={laurianeCalLink} underline={false}>
              <Button size="lg">
                {howItWorksContent.cta.primaryButton}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </ExternalLink>
            {isFeatureVisible(envGroups.localAndDev) && (
              <Button size="lg" variant="outline">
                {howItWorksContent.cta.secondaryButton}
              </Button>
            )}
          </div>
          <p className="text-brand-neutral-600 text-sm mt-4">{howItWorksContent.cta.subtext}</p>
        </div>
      </div>
    </section>
  );
}

interface FeatureListItemProps {
  icon: LucideIcon;
  text: string;
  accentColor: "accent" | "highlight";
}

const FeatureListItem: React.FC<FeatureListItemProps> = ({ icon: Icon, text, accentColor }) => {
  const accentClasses = accentColor === "accent" ? "bg-brand-accent/10 text-brand-accent" : "bg-brand-highlight/10 text-brand-highlight";

  return (
    <div className="flex items-center gap-2.5">
      <div className={`flex-shrink-0 w-5 h-5 rounded ${accentClasses} flex items-center justify-center`}>
        <Icon className="w-3 h-3" />
      </div>
      <span className="text-xs text-brand-neutral-700">{text}</span>
    </div>
  );
};

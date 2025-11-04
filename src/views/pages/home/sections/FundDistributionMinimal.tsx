import React from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Building2, DollarSign, Eye, GitBranch, Info, Layers, Users } from "lucide-react";
import { Card, CardContent } from "src/views/components/ui/card";
import { Button } from "src/views/components/ui/forms/button";
import { Progress } from "src/views/components/ui/progress";
import { isVisible } from "src/ultils/featureVisibility";

interface FundDistributionMinimalProps {
  className?: string;
}

// ---------------------------------------
// Content data (single source of truth)
// ---------------------------------------
export const fundDistributionContent = {
  badge: {
    icon: DollarSign,
    text: "Fund Transparency",
  },
  title: "Where Your Investment Goes",
  description:
    "Every percentage is negotiated and agreed upon with maintainers for each project. We manage enterprise outreach, negotiation, and contracts on behalf of maintainers. Our share reflects this effort—while most funds go directly to the people building your stack.",
  note: "Example distribution shown below—actual percentages are customized on a per-project basis.",
  allocations: [
    {
      percentage: 55,
      title: "Service Provider",
      subtitle: "Maintainers",
      icon: Users,
      color: "brand-accent",
      description: "Direct payments to maintainers for the services they provide",
      // usage: [
      //   "Direct payments to maintainers",
      //   "Expert consultation fees",
      //   "Priority support delivery"
      // ],
    },
    {
      percentage: 10,
      title: "The platform",
      subtitle: "Non-Profit Operations",
      icon: Building2,
      color: "brand-primary",
      description: "We handle enterprise relations for maintainers—our share reflect that effort",
      descriptionNote: "* agreed with each project",
      // usage: ["Platform development & security", "Customer support operations", "Quality assurance & compliance"],
    },
    {
      percentage: 20,
      title: "Open Source Project",
      subtitle: "Maintenance",
      icon: GitBranch,
      color: "brand-primary",
      description: "Reinvestment into the same open source project where the maintainer provided the service",
      // usage: ["Core project improvements", "Bug fixes & feature development", "Documentation & tooling"],
    },
    {
      percentage: 15,
      title: "Project Dependencies",
      subtitle: "Ecosystem Support",
      icon: Layers,
      color: "brand-highlight",
      description: "Support for the upstream dependencies that the maintained project relies on",
      // usage: ["Supporting critical dependencies", "Ecosystem health initiatives", "Upstream contribution funding"],
    },
  ] as AllocationCardProps[],
  summary: {
    labelIcon: Eye,
    label: "Non-Profit Transparency",
    heading: "Collaborative Fund Distribution",
    paragraph:
      "Every project's fund distribution is negotiated transparently with maintainers. Our non-profit fee is flexible and agreed upon to ensure fairness for all stakeholders.",
    highlight: "Typically 80-90% goes directly to maintainers and their projects—percentages customized per engagement",
    ctaPrimary: {
      text: "View Live Dashboard",
      icon: Info,
    },
    ctaSecondary: {
      text: "Download Report",
      icon: ArrowRight,
    },
  },
};

// ---------------------------------------
// Reusable card component
// ---------------------------------------
interface AllocationCardProps {
  percentage: number;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  color: string; // e.g. "brand-primary" | "brand-accent"
  description: string;
  descriptionNote?: string;
  usage?: string[];
  negotiable?: boolean;
}

function AllocationCard({ percentage, title, subtitle, icon: Icon, color, description, descriptionNote, usage, negotiable }: AllocationCardProps) {
  return (
    <Card className={`group border border-border/50 hover:border-${color}/30 hover:shadow-lg transition-all duration-300`}>
      <CardContent className="p-6 flex flex-col h-full">
        {/* Header with Icon on Left and Percentage on Right */}
        <div className="flex items-center justify-between mb-4">
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${color}/10 to-${color}/20 flex items-center justify-center text-${color} group-hover:scale-110 transition-transform duration-300`}
          >
            <Icon className="w-5 h-5" />
          </div>

          <div className="text-right">
            <div className={`text-3xl font-bold text-${color}`}>~{percentage}%</div>
            {negotiable && <span className="text-xs text-muted-foreground italic">negotiable</span>}
          </div>
        </div>

        <h3 className="font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-xs text-muted-foreground mb-4">{subtitle}</p>

        {/* Description per allocation */}
        <p className="text-sm text-muted-foreground mb-4 flex-grow">
          {description}
          {descriptionNote && <span className="block mt-2 text-xs text-brand-accent/70 italic">{descriptionNote}</span>}
        </p>

        {/* Bottom Section - Always Aligned */}
        <div className="mt-auto">
          <Progress value={percentage} className={`h-2 bg-brand-neutral-300 [&>div]:bg-${color} mb-3`} />

          {/* Fund Usage Bullet Points */}
          {usage && usage.length > 0 && (
            <div className="text-left space-y-1">
              {usage.map((u, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <div className={`w-1 h-1 rounded-full bg-${color} mt-1.5 flex-shrink-0`} />
                  <span>{u}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------
// Main component
// ---------------------------------------
export function FundDistributionMinimal({ className }: FundDistributionMinimalProps) {
  const { badge, title, description, note, allocations, summary } = fundDistributionContent;
  const BadgeIcon = badge.icon;
  const SummaryIcon = summary.labelIcon;

  return (
    <section className={`py-16 lg:py-20 ${className ?? ""}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-brand-primary/10 to-brand-accent/10 border border-brand-primary/20 rounded-full mb-4">
            <BadgeIcon className="w-4 h-4 text-brand-primary" />
            <span className="text-sm font-medium text-brand-primary">{badge.text}</span>
          </div>

          <h2 className="text-3xl md:text-4xl mb-4 bg-gradient-to-r from-foreground to-brand-accent bg-clip-text text-transparent">{title}</h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-3">{description}</p>

          <p className="text-sm text-brand-accent/80 max-w-2xl mx-auto italic">{note}</p>
        </div>

        {/* Fund Allocation Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {allocations.map((allocation, i) => (
            <AllocationCard key={`${allocation.title}-${i}`} {...allocation} />
          ))}
        </div>

        {/* Summary & CTA */}
        {isVisible("fundDistributionSummary") && (
          <Card className="border border-brand-accent/20 bg-gradient-to-br from-card to-brand-accent/5">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <SummaryIcon className="w-5 h-5 text-brand-accent" />
                <span className="text-brand-accent font-medium">{summary.label}</span>
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-2">{summary.heading}</h3>

              <p className="text-muted-foreground mb-4 max-w-2xl mx-auto">{summary.paragraph}</p>

              <p className="text-sm text-brand-primary mb-6 max-w-lg mx-auto">{summary.highlight}</p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button className="bg-gradient-to-r from-brand-accent to-brand-accent-dark hover:from-brand-accent-dark hover:to-brand-accent text-white">
                  <summary.ctaPrimary.icon className="w-4 h-4 mr-2" />
                  {summary.ctaPrimary.text}
                </Button>
                <Button variant="outline" className="border-brand-accent/30 text-brand-accent hover:bg-brand-accent/10">
                  {summary.ctaSecondary.text}
                  <summary.ctaSecondary.icon className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}

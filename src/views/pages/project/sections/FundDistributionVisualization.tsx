import React from "react";
import type { LucideIcon } from "lucide-react";
import { Building2, Heart, Speaker, TrendingUp, Users } from "lucide-react";

interface FundDistributionVisualizationProps {
  distribution: {
    serviceProvider: number;
    openSourceEconomy: number;
    project: number;
    dependencies: number;
  };
  projectName: string;
}

type DistributionKey = keyof FundDistributionVisualizationProps["distribution"];

interface DistributionConfigEntry {
  key: DistributionKey;
  label: string;
  description: string;
  Icon: LucideIcon;
  accentColor: "accent" | "warning" | "highlight" | "neutral";
}

const DISTRIBUTION_CONFIG: DistributionConfigEntry[] = [
  {
    key: "serviceProvider",
    label: "Service Provider",
    description: "Direct compensation to maintainers delivering the services you requested (e.g., bug fixes, consultancy, and more).",
    Icon: Users,
    accentColor: "accent",
  },
  {
    key: "project",
    label: "Project Support",
    description: "Ongoing maintenance and enhancement of community features, including testing infrastructure.",
    Icon: Heart,
    accentColor: "warning",
  },
  {
    key: "dependencies",
    label: "Dependencies",
    description: "Support and maintenance of critical dependencies and infrastructure projects our work depends on.",
    Icon: TrendingUp,
    accentColor: "highlight",
  },
  {
    key: "openSourceEconomy",
    label: "Open Source Economy",
    description: "Platform operations and ecosystem sustainability, adjusted according to brand recognition level.",
    Icon: Building2,
    accentColor: "neutral",
  },
];

function DistributionBar({ distribution, total }: { distribution: FundDistributionVisualizationProps["distribution"]; total: number }) {
  if (!total) {
    return null;
  }

  return (
    <div className="flex h-16 rounded-lg overflow-hidden border border-brand-neutral-300">
      {DISTRIBUTION_CONFIG.map(({ key, accentColor }) => {
        const value = distribution[key];
        return (
          <div
            key={key}
            className={`flex items-center justify-center transition-all bg-brand-${accentColor}`}
            style={{
              width: `${(value / total) * 100}%`,
            }}
          >
            <span className="text-white">{value}%</span>
          </div>
        );
      })}
    </div>
  );
}

function DistributionCard({ item, value }: { item: DistributionConfigEntry; value: number }) {
  const { Icon, label, description, accentColor } = item;

  return (
    <div className={`p-4 rounded-lg border bg-brand-${accentColor}/5 border-brand-${accentColor}/20`}>
      <div className={`flex items-center gap-2 mb-2 text-brand-${accentColor}`}>
        <Icon className="h-5 w-5" />
        <span>{value}%</span>
      </div>
      <h5 className="text-brand-neutral-800 mb-1">{label}</h5>
      <p className="text-brand-neutral-600 text-sm">{description}</p>
    </div>
  );
}

export function FundDistributionVisualization({ distribution, projectName }: FundDistributionVisualizationProps) {
  const total = distribution.serviceProvider + distribution.openSourceEconomy + distribution.project + distribution.dependencies;

  return (
    <div className="bg-[rgba(26,41,66,0)] border border-brand-neutral-300 rounded-xl p-8">
      <h3 className="text-brand-neutral-900 mb-2">Transparent Pricing</h3>
      <p className="text-brand-neutral-600 mb-8">
        100% of your investment goes directly to open source maintainers and their ecosystem—empowering project independence.
        <br /> You’re investing in an open ecosystem with no vendor lock-in, no license traps, and a community-first mindset.
      </p>

      {/* Visual Distribution Bar */}
      <div className="mb-8">
        <DistributionBar distribution={distribution} total={total} />
      </div>

      {/* Breakdown */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {DISTRIBUTION_CONFIG.map(item => (
          <DistributionCard key={item.key} item={item} value={distribution[item.key]} />
        ))}
      </div>

      <div className="mt-8 p-8 bg-gradient-to-br from-brand-card-blue via-brand-card-blue-light to-brand-accent/5 border border-brand-accent/30 rounded-2xl shadow-lg shadow-brand-accent/10">
        <div className="flex items-start gap-4 mb-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-accent/10 border border-brand-accent/30 shrink-0">
            <Speaker className="w-6 h-6 text-brand-accent" />
          </div>
          <div className="flex-1">
            <h4 className="text-brand-neutral-900 mb-2">Brand Recognition</h4>
            <p className="text-brand-neutral-700">
              Receive optional public acknowledgment through our marketing campaigns and community announcements for supporting open source sustainability.
            </p>
          </div>
        </div>
        <div className="pl-16 pt-4 border-t border-brand-neutral-300/50">
          <p className="text-brand-neutral-600 text-sm">
            <strong className="text-brand-neutral-800">Non-Profit Partnership Advantage:</strong>
            {/* <strong className="text-brand-accent"> */} 100% of your investment{/*</strong>*/} goes directly to open source maintainers and ecosystem
            sustainability.
          </p>
        </div>
      </div>
    </div>
  );
}

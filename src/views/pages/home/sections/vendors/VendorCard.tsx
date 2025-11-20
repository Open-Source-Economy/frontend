import React from "react";
import { ExternalLink, Star, GitBranch, Award } from "lucide-react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/forms";

export interface VendorMetric {
  icon: "star" | "projects" | "award";
  label: string;
  value: string | number;
}

export interface VendorCardProps {
  name: string;
  logo: string;
  tagline: string;
  description: string;
  metrics: VendorMetric[];
  ctaText?: string;
  ctaLink?: string;
  onLearnMore?: () => void;
}

const metricIcons = {
  star: Star,
  projects: GitBranch,
  award: Award,
};

export function VendorCard({ name, logo, tagline, description, metrics, ctaText = "Learn More", ctaLink, onLearnMore }: VendorCardProps) {
  const handleClick = () => {
    if (ctaLink) {
      window.open(ctaLink, "_blank", "noopener,noreferrer");
    } else if (onLearnMore) {
      onLearnMore();
    }
  };

  return (
    <div
      className="group bg-gradient-to-br from-brand-card-blue to-brand-card-blue-dark border border-brand-neutral-300 rounded-2xl p-8 hover:scale-[1.02] hover:shadow-2xl transition-all duration-500 ease-out overflow-hidden cursor-pointer relative"
      style={{
        boxShadow: "0 10px 40px -15px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.05) inset",
      }}
      onClick={handleClick}
    >
      {/* Subtle background overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(255, 127, 80, 0.1) 0%, transparent 50%)",
        }}
      />

      {/* Corner accent */}
      <div
        className="absolute top-0 right-0 w-20 h-20 opacity-15 rounded-tr-2xl pointer-events-none"
        style={{
          background: "linear-gradient(225deg, rgba(255, 127, 80, 0.6) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-6 h-full">
        {/* Logo */}
        <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-brand-neutral-200 to-brand-neutral-300 border border-brand-neutral-300 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 overflow-hidden shadow-lg">
          <img
            src={logo}
            alt={`${name} logo`}
            className="w-full h-full object-contain p-3"
            onError={e => {
              // Fallback to initials
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              const fallback = target.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = "flex";
            }}
          />
          {/* Fallback - Vendor initials */}
          <div className="w-full h-full flex items-center justify-center" style={{ display: "none" }}>
            <span className="text-brand-neutral-900 text-2xl">
              {name
                .split(" ")
                .map(word => word[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </span>
          </div>
        </div>

        {/* Vendor Name */}
        <div>
          <h3 className="text-brand-neutral-900 mb-2 group-hover:text-brand-neutral-950 transition-colors">{name}</h3>

          {/* Tagline */}
          <p className="text-brand-accent italic text-sm">{tagline}</p>
        </div>

        {/* Description */}
        <p className="text-brand-neutral-600 leading-relaxed">{description}</p>

        {/* Metrics */}
        <div className="flex flex-wrap justify-center gap-3 w-full mt-auto">
          {metrics.map((metric, idx) => {
            const IconComponent = metricIcons[metric.icon];
            return (
              <Badge
                key={idx}
                variant="outline"
                className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-br from-brand-secondary/40 to-brand-secondary/20 border-brand-neutral-300 hover:border-brand-accent/50 transition-colors"
              >
                <IconComponent className="h-3.5 w-3.5 text-brand-accent" />
                <span className="text-brand-neutral-700 text-xs">
                  {metric.value} {metric.label}
                </span>
              </Badge>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="pt-2 mt-auto">
          <Button
            variant="outline"
            className="group-hover:bg-brand-accent group-hover:text-white group-hover:border-brand-accent transition-all duration-300 gap-2 cursor-pointer"
            onClick={e => {
              e.stopPropagation();
              handleClick();
            }}
          >
            {ctaText}
            <ExternalLink className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Button>
        </div>
      </div>

      {/* Hover glow effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{
          boxShadow: "0 0 30px -10px rgba(255, 127, 80, 0.3)",
        }}
      />
    </div>
  );
}

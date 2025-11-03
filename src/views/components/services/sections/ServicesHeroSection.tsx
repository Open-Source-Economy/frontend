import React from "react";

interface ServicesHeroSectionProps {
  badge?: string;
  title: React.ReactNode;
  description: React.ReactNode;
  decorativeLabel?: string;
  className?: string;
}

/**
 * ServicesHeroSection - Hero section for services page
 * Displays title, description with decorative gradients and elements
 */
export const ServicesHeroSection: React.FC<ServicesHeroSectionProps> = ({
  badge = "Services from Expert Maintainers",
  title,
  description,
  decorativeLabel = "Direct from Maintainers",
  className = "",
}) => {
  return (
    <div className={`relative text-center mb-16 ${className}`}>
      {/* Background decoration - Blue to Green Journey */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-brand-primary/6 via-brand-accent/4 to-brand-success/8 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-brand-primary/8 via-brand-accent/6 to-transparent rounded-full blur-2xl opacity-40"></div>
        <div className="absolute top-1/2 right-1/4 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-br from-brand-accent/6 via-brand-success/4 to-transparent rounded-full blur-xl opacity-35"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-4xl mx-auto space-y-6">
        {/* Premium badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-primary/10 via-brand-primary/5 to-transparent rounded-full border border-brand-primary/20 backdrop-blur-sm">
          <div className="w-2 h-2 bg-brand-primary rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-brand-primary tracking-wide">{badge}</span>
        </div>

        {/* Main title */}
        {title}

        {/* Description */}
        {description}

        {/* Decorative elements */}
        <div className="flex items-center justify-center gap-6 pt-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-brand-primary/40"></div>
            <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
            <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-brand-primary/40"></div>
          </div>
          <div className="text-xs text-muted-foreground font-medium tracking-widest uppercase">{decorativeLabel}</div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-brand-primary/40"></div>
            <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
            <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-brand-primary/40"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

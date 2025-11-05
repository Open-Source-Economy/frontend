import React from "react";
import { LucideIcon, Shield } from "lucide-react";
import { Card, CardContent } from "../../ui/card";
import { EnterpriseServiceCard } from "../ui/EnterpriseServiceCard";
import { isVisible } from "src/ultils/featureVisibility";

interface EnterpriseService {
  icon: LucideIcon;
  title: string;
  description: React.ReactNode;
  buttonText: string;
  colorScheme: "primary" | "accent";
}

interface EnterpriseAddonsSectionProps {
  services: EnterpriseService[];
  className?: string;
}

/**
 * EnterpriseAddonsSection - Enterprise-grade service guarantees section
 * Displays NDA, SLA, and ecosystem programs with trust indicators
 */
export const EnterpriseAddonsSection: React.FC<EnterpriseAddonsSectionProps> = ({ services, className = "" }) => {
  const showButtons = isVisible("enterpriseServiceButtons");

  return (
    <div className={`relative mb-12 ${className}`}>
      {/* Background decoration - Blue to Green Journey */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-brand-primary/5 via-brand-accent/4 to-brand-primary/6 rounded-full blur-2xl opacity-60"></div>
      </div>

      <Card className="bg-gradient-to-br from-background via-background to-brand-accent/3 border-brand-primary/15 shadow-md backdrop-blur-sm">
        <CardContent className="p-8 lg:p-12">
          <div className="text-center max-w-4xl mx-auto">
            {/* Enhanced Header with Blue-to-Green Journey */}
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/15 via-brand-accent/12 to-brand-primary/15 blur-xl opacity-40 rounded-full"></div>
              <div className="relative inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-brand-primary/8 via-brand-accent/10 to-brand-primary/8 rounded-full border border-brand-accent/20 backdrop-blur-sm shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-brand-primary rounded-full animate-pulse"></div>
                  <div className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-pulse" style={{ animationDelay: "0.5s" }}></div>
                  <div className="w-1 h-1 bg-brand-primary rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>
                </div>
                <span className="text-sm font-semibold text-brand-accent-dark tracking-wide">Enterprise-Grade Assurance</span>
                <Shield className="w-4 h-4 text-brand-accent" />
              </div>
            </div>

            <h2 className="text-2xl lg:text-3xl mb-4 font-semibold">
              <span className="bg-gradient-to-r from-brand-primary via-brand-accent to-brand-primary bg-clip-text text-transparent">
                Professional Service Guarantees
              </span>
            </h2>

            <p className="text-lg text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto">
              Enterprise-grade <span className="text-brand-primary">legal frameworks</span> with
              <span className="text-brand-accent"> strategic partnerships</span> designed for
              <span className="text-brand-primary"> sustainable growth</span> at scale.
            </p>

            {/* Premium Enterprise Services Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {services.map((service, index) => (
                <EnterpriseServiceCard
                  key={index}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  buttonText={service.buttonText}
                  colorScheme={service.colorScheme}
                  showButton={showButtons}
                />
              ))}
            </div>

            {/* Local Environment Indicator */}
            {showButtons && (
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-warning/10 border border-brand-warning/30 rounded-lg text-xs text-brand-warning">
                  <span className="w-1.5 h-1.5 bg-brand-warning rounded-full animate-pulse"></span>
                  <span className="font-medium">Local Environment - Buttons Visible</span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

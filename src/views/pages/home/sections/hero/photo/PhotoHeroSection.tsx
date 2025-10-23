import React from "react";
import { Link } from "react-router-dom";
import { Button } from "src/views/components/ui/forms/button";
import { ExternalLink } from "src/views/components/ui/forms/ExternalLink";
import { Typography } from "src/views/components/ui/typography";
import { ImageWithFallback } from "src/views/components/ImageWithFallback";
import { ArrowRight } from "lucide-react";
import { HeroAction, TrustIndicator } from "src/views/pages/home/sections/hero/HeroSection";

interface PhotoHeroSectionProps {
  badge?: string;
  headline: string;
  description: string;
  actions?: HeroAction[];
  trustIndicators?: TrustIndicator[];
  imageSrc: string;
  imageAlt: string;
}

export function PhotoHeroSection(props: PhotoHeroSectionProps) {
  return (
    <>
      <section className={`relative min-h-[600px] md:min-h-[700px] lg:min-h-[800px] overflow-hidden`}>
        {/* Full-width background image - aligned with header top */}
        {props.imageSrc && (
          <>
            <div className="absolute inset-0 z-0">
              <ImageWithFallback src={props.imageSrc} alt={props.imageAlt ?? ""} className="w-full h-full object-cover object-top" />
            </div>
            {/* Multi-layer gradient overlay for optimal text readability and image visibility */}
            <div className="absolute inset-0 z-10">
              {/* Horizontal gradient - stronger on left where content is */}
              <div className="absolute inset-0 bg-gradient-to-r from-brand-secondary/90 via-brand-secondary/50 to-transparent" />
              {/* Vertical gradient - subtle darkening at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary/60 via-transparent to-transparent" />
              {/* Radial gradient - focused protection around text area */}
              <div className="absolute inset-y-0 left-0 right-1/2 bg-gradient-to-r from-brand-secondary/70 to-transparent" />
            </div>
          </>
        )}

        {/* Content overlay */}
        <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 h-full min-h-[600px] md:min-h-[700px] lg:min-h-[800px] flex items-end">
          <div className="max-w-2xl space-y-6 pb-16 md:pb-20 lg:pb-24 w-full">
            {props.badge && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full hover:bg-white/10 transition-all duration-300">
                <div className="w-1 h-1 bg-white/60 rounded-full" />
                <span className="text-xs text-white/70 tracking-wide">{props.badge}</span>
              </div>
            )}

            <div className="space-y-6 max-w-2xl">
              <div className="relative inline-block">
                {/* Backdrop glow for better visibility */}
                <div className="absolute -inset-4 bg-gradient-to-r from-brand-accent/20 via-brand-highlight/20 to-brand-accent/20 blur-3xl opacity-60 rounded-3xl" />
                <Typography.DisplayLarge
                  className="relative leading-[1.1] text-white"
                  style={{
                    textShadow:
                      "0 0 80px rgba(255, 127, 80, 0.6), 0 0 40px rgba(218, 165, 32, 0.5), 0 4px 30px rgba(0, 0, 0, 0.9), 0 2px 15px rgba(0, 0, 0, 1), 0 8px 40px rgba(255, 127, 80, 0.3)",
                  }}
                >
                  {props.headline}
                </Typography.DisplayLarge>
              </div>

              <Typography.BodyLarge className="text-brand-neutral-800 leading-[1.7] max-w-xl drop-shadow-xl">{props.description}</Typography.BodyLarge>
            </div>

            {(props.actions?.length ?? 0) > 0 && (
              <div className="flex flex-col sm:flex-row gap-4 items-stretch">
                {(props.actions ?? []).map((action, index) => {
                  // External link
                  if (action.href && action.external) {
                    return (
                      <ExternalLink key={index} href={action.href} underline={false}>
                        <Button
                          variant={action.variant || "default"}
                          size="lg"
                          rightIcon={action.icon ? ArrowRight : undefined}
                          icon={action.icon}
                          className="shadow-2xl hover:shadow-brand-accent/20 transition-all duration-300"
                        >
                          {action.text}
                        </Button>
                      </ExternalLink>
                    );
                  }

                  // Internal link
                  if (action.href && !action.external) {
                    return (
                      <Link key={index} to={action.href}>
                        <Button
                          variant={action.variant || "default"}
                          size="lg"
                          rightIcon={action.icon ? ArrowRight : undefined}
                          icon={action.icon}
                          className="shadow-2xl hover:shadow-brand-accent/20 transition-all duration-300"
                        >
                          {action.text}
                        </Button>
                      </Link>
                    );
                  }

                  // Button with onClick
                  return (
                    <Button
                      key={index}
                      variant={action.variant || "default"}
                      onClick={action.onClick}
                      size="lg"
                      rightIcon={action.icon ? ArrowRight : undefined}
                      icon={action.icon}
                      className="shadow-2xl hover:shadow-brand-accent/20 transition-all duration-300"
                    >
                      {action.text}
                    </Button>
                  );
                })}
              </div>
            )}

            {/* Trust Indicators */}
            {(props.trustIndicators?.length ?? 0) > 0 && (
              <div className="pt-8 border-t border-brand-neutral-700/30">
                <div className="flex flex-wrap items-center gap-8 lg:gap-10">
                  {(props.trustIndicators ?? []).map((indicator, index) => {
                    const Icon = indicator.icon;
                    // Semantic colors for each indicator type
                    const textLc = indicator.text.toLowerCase();
                    const isSecurityIndicator = textLc.includes("soc") || textLc.includes("compliant");
                    const isNonProfitIndicator = textLc.includes("non-profit") || textLc.includes("501");
                    // const isSupportIndicator = textLc.includes("support") || textLc.includes("24");

                    let iconColor = "text-brand-neutral-600";
                    let bgColor = "bg-brand-neutral-600/15";
                    let borderColor = "border-brand-neutral-600/30";
                    let hoverBgColor = "group-hover:bg-brand-neutral-600/20";

                    if (isNonProfitIndicator) {
                      iconColor = "text-brand-success-light";
                      bgColor = "bg-brand-success/15";
                      borderColor = "border-brand-success/30";
                      hoverBgColor = "group-hover:bg-brand-success/20";
                    } else if (isSecurityIndicator) {
                      iconColor = "text-brand-accent-light";
                      bgColor = "bg-brand-accent/10";
                      borderColor = "border-brand-accent/25";
                      hoverBgColor = "group-hover:bg-brand-accent/15";
                    }

                    return (
                      <div key={index} className="flex items-center gap-3 group cursor-default">
                        <div
                          className={`flex items-center justify-center w-9 h-9 rounded-xl ${bgColor} backdrop-blur-sm border ${borderColor} shadow-xl ${hoverBgColor} group-hover:scale-105 transition-all duration-300`}
                        >
                          <Icon className={`w-4.5 h-4.5 ${iconColor} drop-shadow-lg`} />
                        </div>
                        <span className="text-sm text-brand-neutral-700 drop-shadow-lg tracking-wide group-hover:text-brand-neutral-600 transition-colors duration-300">
                          {indicator.text}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

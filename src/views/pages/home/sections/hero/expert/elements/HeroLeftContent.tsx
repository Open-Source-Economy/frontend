import React from "react";
import { Link } from "react-router-dom";
import { Button } from "src/views/components/ui/forms/button";
import { ExternalLink } from "src/views/components/ui/forms/external-link";
import { ArrowRight, Clock, Shield } from "lucide-react";
import { Typography } from "src/views/components/ui/typography";
import { HeroAction } from "src/views/pages/home/sections/hero/HeroSection";

interface HeroLeftContentProps {
  badge?: string;
  headline: string;
  description: string;
  actions?: HeroAction[];
}

export function HeroLeftContent(props: HeroLeftContentProps) {
  return (
    <>
      <div className="max-w-2xl space-y-8">
        {props.badge && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-card-blue rounded-full border border-brand-neutral-300">
            <div className="w-2 h-2 bg-brand-accent rounded-full"></div>
            <span className="text-sm text-brand-neutral-800">{props.badge}</span>
          </div>
        )}

        <div className="space-y-6">
          <Typography.DisplayLarge className="leading-tight">{props.headline}</Typography.DisplayLarge>

          <Typography.BodyLarge className="text-brand-neutral-600 max-w-xl">{props.description}</Typography.BodyLarge>

          {(props.actions?.length ?? 0) > 0 && (
            <div className="flex flex-col sm:flex-row gap-4 items-stretch">
              {(props.actions ?? []).map((action, index) => {
                // External link
                if (action.href && action.external) {
                  return (
                    <ExternalLink key={index} href={action.href} underline={false}>
                      <Button variant={action.variant} size="lg" rightIcon={action.icon ? ArrowRight : undefined} icon={action.icon}>
                        {action.text}
                      </Button>
                    </ExternalLink>
                  );
                }

                // Internal link
                if (action.href && !action.external) {
                  return (
                    <Link key={index} to={action.href}>
                      <Button variant={action.variant} size="lg" rightIcon={action.icon ? ArrowRight : undefined} icon={action.icon}>
                        {action.text}
                      </Button>
                    </Link>
                  );
                }

                // Button with onClick
                return (
                  <Button
                    key={index}
                    variant={action.variant}
                    onClick={action.onClick}
                    size="lg"
                    rightIcon={action.icon ? ArrowRight : undefined}
                    icon={action.icon}
                  >
                    {action.text}
                  </Button>
                );
              })}
            </div>
          )}

          {/* Trust Indicators */}
          <div className="pt-2">
            <div className="flex flex-wrap items-center gap-6 text-sm text-brand-neutral-600">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-brand-neutral-500" />
                <span>NDAs Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-brand-neutral-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-brand-secondary rounded-full" />
                </div>
                <span>501(c)(3) Non-Profit</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-neutral-500" />
                <span>Enterprise SLA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

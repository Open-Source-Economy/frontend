import React from "react";
import { Button } from "src/views/components/ui/forms/button";
import { ExternalLink } from "src/views/components/ui/forms/external-link";
import { Typography } from "src/views/components/ui/typography";
import { ArrowRight, CheckCircle2, Sparkles, TrendingUp } from "lucide-react";
import { laurianeCalLink } from "src/views/v1/data";

interface TransformCTASectionProps {
  className?: string;
}

export function TransformCTASection({ className }: TransformCTASectionProps) {
  const benefits = [
    "Direct access to expert maintainers",
    "Transparent, mission-driven pricing",
    "Enterprise-grade support & security",
    "Support the open source ecosystem",
  ];

  return (
    <section className={`relative overflow-hidden ${className ?? ""}`}>
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-secondary via-brand-secondary-dark to-brand-neutral-100" />

      {/* Warm Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-accent/20 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-highlight/20 rounded-full blur-3xl opacity-40" />

      <div className="relative container mx-auto px-6 py-20 md:py-28 lg:py-32">
        <div className="max-w-4xl mx-auto">
          {/* Premium Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-brand-accent/15 via-brand-highlight/15 to-brand-accent/15 backdrop-blur-md rounded-full border border-brand-accent/30 shadow-lg shadow-brand-accent/10">
              <Sparkles className="w-4 h-4 text-brand-accent" />
              <span
                className="text-sm text-brand-neutral-950 tracking-wide"
                style={{
                  textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
                }}
              >
                Join Leading Enterprises
              </span>
            </div>
          </div>

          {/* Main Headline */}
          <div className="text-center space-y-6 mb-10">
            <div className="relative inline-block">
              {/* Multi-layer backdrop glow */}
              <div className="absolute -inset-6 bg-gradient-to-r from-brand-accent/25 via-brand-highlight/25 to-brand-accent/25 blur-3xl opacity-70 rounded-3xl" />
              <div className="absolute -inset-3 bg-gradient-to-r from-brand-accent/15 via-brand-highlight/15 to-brand-accent/15 blur-2xl opacity-60 rounded-2xl" />

              <Typography.DisplayMedium
                className="relative text-white text-center"
                style={{
                  textShadow:
                    "0 0 80px rgba(255, 127, 80, 0.7), 0 0 40px rgba(218, 165, 32, 0.6), 0 4px 30px rgba(0, 0, 0, 0.95), 0 2px 15px rgba(0, 0, 0, 1), 0 8px 40px rgba(255, 127, 80, 0.4), 0 1px 3px rgba(0, 0, 0, 1)",
                }}
              >
                Ready to Transform Your Open Source Strategy?
              </Typography.DisplayMedium>
            </div>

            {/* Description with Glass Card */}
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute -inset-3 bg-gradient-to-r from-brand-primary/10 via-transparent to-brand-accent/10 blur-2xl opacity-50 rounded-2xl" />

              <div className="relative bg-gradient-to-br from-brand-card-blue-dark/60 via-brand-card-blue-dark/40 to-transparent backdrop-blur-md rounded-2xl p-6 border border-brand-neutral-300/20 shadow-2xl">
                <Typography.BodyLarge
                  className="text-brand-neutral-900 leading-[1.7] text-center"
                  style={{
                    textShadow: "0 2px 15px rgba(0, 0, 0, 0.7), 0 1px 5px rgba(0, 0, 0, 0.9)",
                  }}
                >
                  Connect with the world's best open source maintainers under one enterprise contract. Get the support you need while investing in a sustainable
                  future for open source.
                </Typography.BodyLarge>
              </div>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 gap-4 mb-10 max-w-3xl mx-auto">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group flex items-start gap-3 px-5 py-4 bg-gradient-to-br from-brand-card-blue-dark/60 via-brand-card-blue-dark/40 to-transparent backdrop-blur-md rounded-xl border border-brand-neutral-300/20 hover:border-brand-accent/40 transition-all duration-300 hover:scale-102 shadow-lg hover:shadow-xl"
                style={{
                  boxShadow: "0 4px 20px rgba(255, 127, 80, 0.15), 0 2px 10px rgba(0, 0, 0, 0.3)",
                }}
              >
                <div className="relative mt-0.5">
                  <div className="absolute inset-0 bg-brand-primary blur-md opacity-30" />
                  <CheckCircle2 className="relative w-5 h-5 text-brand-primary drop-shadow-lg" />
                </div>
                <span
                  className="text-brand-neutral-900 leading-relaxed group-hover:text-brand-neutral-950 transition-colors duration-300"
                  style={{
                    textShadow: "0 1px 3px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  {benefit}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center pt-2">
            <Button
              size="lg"
              rightIcon={ArrowRight}
              className="shadow-2xl shadow-brand-accent/30 hover:shadow-3xl hover:shadow-brand-accent/40 hover:scale-105 transition-all duration-300 group"
            >
              <span className="flex items-center gap-2">
                Get Started Today
                <TrendingUp className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </span>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="shadow-xl shadow-black/20 hover:shadow-2xl hover:scale-102 border-2 border-brand-neutral-300/30 hover:border-brand-accent/40 transition-all duration-300"
            >
              <ExternalLink href={laurianeCalLink} underline={false}>
                Schedule a Demo
              </ExternalLink>
            </Button>
          </div>

          {/* Trust Indicator */}
          <div className="mt-10 text-center">
            <div
              className="inline-flex items-center gap-2 text-sm text-brand-neutral-700"
              style={{
                textShadow: "0 1px 3px rgba(0, 0, 0, 0.5)",
              }}
            >
              <div className="w-2 h-2 bg-brand-primary rounded-full animate-pulse shadow-lg shadow-brand-primary/50" />
              <span>Join 100+ organizations transforming their open source approach</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

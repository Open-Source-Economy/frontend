import React from "react";
import { Code, Globe, Heart, Shield, Users, Zap } from "lucide-react";

interface SellingPoint {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight: string;
  accentColor: string;
}

interface UniqueSellingPointsProps {
  className?: string;
}

export function UniqueSellingPoints(props: UniqueSellingPointsProps) {
  const sellingPoints: SellingPoint[] = [
    {
      icon: <Users className="w-6 h-6 text-white" />,
      title: "Direct Connections to Maintainers",
      description: "Skip intermediaries and work directly with the original creators and core maintainers.",
      highlight: "No middlemen",
      accentColor: "brand-accent",
    },
    {
      icon: <Heart className="w-6 h-6 text-white" />,
      title: "100% Nonprofit Model",
      description: "Every dollar goes directly to maintainers and projects. Zero profit extraction.",
      highlight: "Pure mission focus",
      accentColor: "brand-primary",
    },
    {
      icon: <Code className="w-6 h-6 text-white" />,
      title: "100% Open-Source Output",
      description: "All work, improvements, and solutions remain open source for the community.",
      highlight: "Community first",
      accentColor: "brand-highlight",
    },
    {
      icon: <Shield className="w-6 h-6 text-white" />,
      title: "Enterprise Security",
      description: "Full NDA protection, SOC 2 compliance, and enterprise-grade security practices.",
      highlight: "Bank-level security",
      accentColor: "brand-accent",
    },
    {
      icon: <Zap className="w-6 h-6 text-white" />,
      title: "Rapid Response Time",
      description: "Direct maintainer access means faster fixes and immediate answers to issues.",
      highlight: "24-48hr response",
      accentColor: "brand-primary",
    },
    {
      icon: <Globe className="w-6 h-6 text-white" />,
      title: "Ecosystem Strengthening",
      description: "Your investment improves dependencies and security for millions of users.",
      highlight: "Global impact",
      accentColor: "brand-highlight",
    },
  ];

  return (
    <section className={`py-20 lg:py-32 bg-background ${props.className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-primary/10 via-brand-accent/10 to-brand-highlight/10 border border-brand-accent/20 rounded-full mb-6">
            <Heart className="w-4 h-4 text-brand-accent" />
            <span className="text-sm font-medium text-brand-accent">Our Movement</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-6 bg-gradient-to-r from-foreground via-brand-primary to-brand-accent bg-clip-text text-transparent">
            Why OpenSupport is Different
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're not just another platform - we're a movement toward sustainable open source.
          </p>
        </div>

        {/* Selling Points Grid - 3x2 Layout */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {sellingPoints.map((point, index) => (
            <div
              key={point.title}
              className="group relative bg-gradient-to-br from-card via-card to-brand-primary/5 border border-border/50 rounded-xl p-8 lg:p-10 text-center hover:border-brand-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Background Glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-br from-${point.accentColor}/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl`}
              ></div>

              {/* Icon */}
              <div
                className={`w-12 h-12 bg-gradient-to-br from-${point.accentColor} to-${point.accentColor}-dark rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10`}
              >
                {point.icon}
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-lg mb-4 text-foreground group-hover:text-foreground transition-colors duration-300">{point.title}</h3>

                <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-muted-foreground transition-colors duration-300">
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

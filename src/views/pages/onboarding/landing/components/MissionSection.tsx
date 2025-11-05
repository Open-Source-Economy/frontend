import React from "react";
import { CheckCircle2, Code2, Heart, Shield, Target, TrendingUp, Users } from "lucide-react";

export const MissionSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-brand-neutral-100 via-brand-secondary to-brand-neutral-200 border-y border-brand-neutral-300">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/10 border border-brand-primary/20 rounded-full mb-4">
            <Shield className="w-4 h-4 text-brand-primary" />
            <span className="text-sm text-brand-primary">Swiss Non-Profit</span>
          </div>
          <h2 className="text-brand-neutral-950 mb-4">Our Mission: Solve Open Source Sustainability</h2>
          <p className="text-brand-neutral-700 text-lg max-w-2xl mx-auto">
            We connect maintainers with the <span className="text-brand-primary">$27B→$44B services market</span> while ensuring funds flow to the entire
            ecosystem—not VCs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
          {/* What */}
          <div className="bg-card/60 backdrop-blur-sm border border-brand-neutral-300/50 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-brand-accent/10 rounded-lg">
                <Target className="w-5 h-5 text-brand-accent" />
              </div>
              <h3 className="text-brand-neutral-900">What We Do</h3>
            </div>
            <p className="text-sm text-brand-neutral-600 leading-relaxed">
              A platform where you provide services at your rates while we handle business operations and automatically fund your dependencies.
            </p>
          </div>

          {/* Why */}
          <div className="bg-card/60 backdrop-blur-sm border border-brand-neutral-300/50 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-brand-primary/10 rounded-lg">
                <TrendingUp className="w-5 h-5 text-brand-primary" />
              </div>
              <h3 className="text-brand-neutral-900">Why It Works</h3>
            </div>
            <p className="text-sm text-brand-neutral-600 leading-relaxed">
              The OSS services market is massive. We tap into it systematically, considering dependency trees and market reality.
            </p>
          </div>

          {/* How */}
          <div className="bg-card/60 backdrop-blur-sm border border-brand-neutral-300/50 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-brand-highlight/10 rounded-lg">
                <Heart className="w-5 h-5 text-brand-highlight" />
              </div>
              <h3 className="text-brand-neutral-900">Why Non-Profit</h3>
            </div>
            <p className="text-sm text-brand-neutral-600 leading-relaxed">
              As a non-profit, revenue flows throughout the ecosystem—strengthening the foundation, not enriching VCs.
            </p>
          </div>
        </div>

        {/* Core Values Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/10 border border-brand-primary/20 rounded-full">
            <CheckCircle2 className="w-4 h-4 text-brand-primary" />
            <span className="text-sm text-brand-neutral-800">100% Non-Profit</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-accent/10 border border-brand-accent/20 rounded-full">
            <Users className="w-4 h-4 text-brand-accent" />
            <span className="text-sm text-brand-neutral-800">Community First</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-highlight/10 border border-brand-highlight/20 rounded-full">
            <Heart className="w-4 h-4 text-brand-highlight" />
            <span className="text-sm text-brand-neutral-800">Respects Your Values</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-neutral-700/10 border border-brand-neutral-700/20 rounded-full">
            <Shield className="w-4 h-4 text-brand-neutral-700" />
            <span className="text-sm text-brand-neutral-800">Swiss Transparency</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/10 border border-brand-primary/20 rounded-full">
            <Code2 className="w-4 h-4 text-brand-primary" />
            <span className="text-sm text-brand-neutral-800">FOSS Aligned</span>
          </div>
        </div>
      </div>
    </section>
  );
};

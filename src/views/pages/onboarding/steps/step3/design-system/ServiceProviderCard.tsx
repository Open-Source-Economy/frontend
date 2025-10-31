import React from "react";
import { CheckCircle2, DollarSign, GitBranch, Heart, Sparkles, Users, Zap } from "lucide-react";
import { ParticipationFeatureItem } from "./ParticipationFeatureItem";
import { FundFlowVisualization } from "./FundFlowVisualization";

interface ServiceProviderCardProps {
  isSelected: boolean;
  onSelect: () => void;
}

export const ServiceProviderCard: React.FC<ServiceProviderCardProps> = ({ isSelected, onSelect }) => {
  return (
    <div className="relative">
      {/* Glowing background effect - Visible when selected or hovered */}
      <div
        className={`absolute -inset-1 bg-gradient-to-r from-brand-accent/30 via-brand-warning/25 to-brand-highlight/30 rounded-3xl blur-2xl transition-opacity duration-300 ${
          isSelected ? "opacity-60" : "opacity-0 group-hover:opacity-60"
        }`}
      />

      <button
        onClick={onSelect}
        className={`group relative w-full text-left transition-all duration-300 ${isSelected ? "scale-[1.02]" : "hover:scale-[1.01]"}`}
      >
        {/* Main Card */}
        <div
          className={`relative rounded-3xl border-2 overflow-hidden transition-all duration-300 ${
            isSelected
              ? "bg-gradient-to-br from-brand-card-blue via-brand-secondary to-brand-card-blue-dark border-brand-accent shadow-2xl shadow-brand-accent/40"
              : "bg-brand-secondary/40 border-brand-neutral-300/20 group-hover:border-brand-accent/50 group-hover:bg-brand-secondary/60 shadow-md group-hover:shadow-xl group-hover:shadow-brand-accent/20"
          }`}
        >
          {/* Radio Button Style Indicator + Selected Badge */}
          <div className="absolute top-6 right-6 z-10 flex items-center gap-3">
            {isSelected && (
              <div className="bg-brand-accent text-white px-3 py-1 rounded-full text-xs animate-in fade-in slide-in-from-right-2 duration-300">✓ Selected</div>
            )}
            <div
              className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                isSelected ? "border-brand-accent bg-brand-accent shadow-lg shadow-brand-accent/50" : "border-brand-neutral-400 bg-transparent"
              }`}
            >
              {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
            </div>
          </div>

          {/* Top Badge - Visible when selected or hovered */}
          <div
            className={`absolute -top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-accent via-brand-warning to-brand-highlight transition-opacity duration-300 ${
              isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}
          />

          {/* Content Grid */}
          <div className="grid md:grid-cols-3 gap-6 p-8">
            {/* Left: Main Info */}
            <div className="md:col-span-2 space-y-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-brand-accent via-brand-warning to-brand-highlight rounded-2xl flex items-center justify-center shadow-lg">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="mb-1">
                      <h3 className="text-2xl text-brand-neutral-900">Service Provider</h3>
                    </div>
                    <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-brand-accent to-brand-warning text-white px-3 py-1 rounded-full text-xs">
                      <Sparkles className="w-3 h-3" />
                      <span>Powers the Entire Ecosystem</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-brand-neutral-600 text-lg">
                Provide services to enterprises and your earnings automatically fund both visible and invisible open source work across the ecosystem.
              </p>

              {/* Feature Grid */}
              <div className="grid sm:grid-cols-2 gap-3">
                <ParticipationFeatureItem icon={DollarSign} title="Earn from Enterprise Contracts" description="Direct revenue stream" />
                <ParticipationFeatureItem icon={Heart} title="Fund Your Project's Pot" description="Build project sustainability" />
                <ParticipationFeatureItem icon={GitBranch} title="Support Dependencies" description="Automatic distribution" />
                <ParticipationFeatureItem icon={Users} title="Governance Rights" description="Influence fund allocation" />
              </div>
            </div>

            {/* Right: Fund Flow Visualization */}
            <FundFlowVisualization />
          </div>
        </div>
      </button>
    </div>
  );
};

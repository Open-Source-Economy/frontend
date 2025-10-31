import React from "react";
import { ArrowRight, CheckCircle2, Handshake, Heart, Zap } from "lucide-react";
import { ParticipationFeatureItem } from "./ParticipationFeatureItem";

interface CommonPotParticipantCardProps {
  isSelected: boolean;
  onSelect: () => void;
}

export const CommonPotParticipantCard: React.FC<CommonPotParticipantCardProps> = ({ isSelected, onSelect }) => {
  return (
    <div className="max-w-2xl mx-auto relative group">
      {/* Glowing background effect - Visible when selected or hovered */}
      <div
        className={`absolute -inset-1 bg-gradient-to-r from-brand-highlight/30 via-brand-warning/20 to-brand-highlight/30 rounded-2xl blur-2xl transition-opacity duration-300 ${
          isSelected ? "opacity-60" : "opacity-0 group-hover:opacity-60"
        }`}
      />

      <button
        onClick={onSelect}
        className={`relative w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 ${
          isSelected
            ? "border-brand-highlight bg-gradient-to-br from-brand-card-blue via-brand-secondary to-brand-card-blue-dark shadow-2xl shadow-brand-highlight/40 scale-[1.02]"
            : "border-brand-neutral-300/20 bg-brand-secondary/40 group-hover:border-brand-highlight/50 group-hover:shadow-xl group-hover:shadow-brand-highlight/20 group-hover:scale-[1.01]"
        }`}
      >
        {/* Radio Button Style Indicator + Selected Badge */}
        <div className="absolute top-6 right-6 flex items-center gap-3">
          {isSelected && (
            <div className="bg-brand-highlight text-white px-3 py-1 rounded-full text-xs animate-in fade-in slide-in-from-right-2 duration-300">✓ Selected</div>
          )}
          <div
            className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
              isSelected ? "border-brand-highlight bg-brand-highlight shadow-lg shadow-brand-highlight/50" : "border-brand-neutral-400 bg-transparent"
            }`}
          >
            {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
          </div>
        </div>
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="w-12 h-12 bg-gradient-to-br from-brand-highlight to-brand-warning rounded-xl flex items-center justify-center flex-shrink-0">
            <Heart className="w-6 h-6 text-white" />
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="mb-2">
              <h3 className="text-lg text-brand-neutral-900">Common Pot Participant</h3>
            </div>

            <p className="text-sm text-brand-neutral-600 mb-4">
              Benefit from funds contributed by Service Providers to support community work that wouldn't otherwise be funded. Focus on your open source project
              while the ecosystem sustains you.
            </p>

            {/* Compact Features */}
            <div className="grid sm:grid-cols-2 gap-2">
              <ParticipationFeatureItem icon={Handshake} title="Funded by service providers" description="" variant="compact" />
              <ParticipationFeatureItem icon={Zap} title="Focus on community work" description="" variant="compact" />
              <ParticipationFeatureItem icon={Heart} title="Support unfunded projects" description="" variant="compact" />
              <ParticipationFeatureItem icon={ArrowRight} title="Switch to provider anytime" description="" variant="compact" />
            </div>

            <div className="mt-4 pt-4 border-t border-brand-neutral-300/10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-highlight/10 text-brand-highlight-dark rounded-full text-xs">
                <Heart className="w-3 h-3" />
                <span>Sustains work that benefits everyone</span>
              </div>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};

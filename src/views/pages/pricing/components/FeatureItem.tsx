import React from "react";
import { Check, X } from "lucide-react";
import { InfoTooltip } from "../ui/info-tooltip";

interface FeatureItemProps {
  text: string | React.ReactNode;
  included?: boolean;
  isNew?: boolean;
  hasInfo?: boolean;
  infoText?: string;
  infoDescription?: string;
  infoLink?: {
    text: string;
    href: string;
  };
}

export function FeatureItem({ text, included = true, isNew = false, hasInfo = false, infoText, infoDescription, infoLink }: FeatureItemProps) {
  return (
    <div className={`flex items-start gap-1.5 text-sm mb-2 mt-2 ${!included ? "opacity-40" : ""}`}>
      {included ? <Check className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" /> : <X className="w-4 h-4 text-brand-neutral-400 shrink-0 mt-0.5" />}
      <span className={included ? "text-brand-neutral-700" : "text-brand-neutral-500"}>{text}</span>
      {isNew && (
        <span className="inline-block px-1.5 py-0.5 bg-gradient-to-r from-brand-accent to-brand-highlight text-white text-xs rounded uppercase tracking-wide">
          New
        </span>
      )}
      {hasInfo && infoText && (
        <div className="relative group">
          <InfoTooltip content={infoText} description={infoDescription} link={infoLink} className="shrink-0 cursor-help align-middle" />
        </div>
      )}
    </div>
  );
}

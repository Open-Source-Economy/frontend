import React from "react";
import { InfoTooltip } from "../ui/info-tooltip";

interface SectionSubtitleProps {
  text: string;
  tooltip?: {
    content: string;
    description?: string;
    link?: {
      text: string;
      href: string;
    };
  };
  className?: string;
}

export function SectionSubtitle({ text, tooltip, className = "" }: SectionSubtitleProps) {
  return (
    <div className={`flex items-baseline gap-2 ${className}`}>
      <p className="text-xs text-brand-neutral-500">{text}</p>
      {tooltip && <InfoTooltip content={tooltip.content} description={tooltip.description} link={tooltip.link} className="shrink-0 cursor-help self-end" />}
    </div>
  );
}

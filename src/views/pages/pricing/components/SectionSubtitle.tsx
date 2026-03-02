import React from "react";
import { InfoTooltip } from "src/views/pages/pricing/ui/info-tooltip";

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

export function SectionSubtitle(props: SectionSubtitleProps) {
  const className = props.className ?? "";

  return (
    <div className={`flex items-baseline gap-2 ${className}`}>
      <p className="text-xs text-brand-neutral-500">{props.text}</p>
      {props.tooltip && (
        <InfoTooltip
          content={props.tooltip.content}
          description={props.tooltip.description}
          link={props.tooltip.link}
          className="shrink-0 cursor-help self-end"
        />
      )}
    </div>
  );
}

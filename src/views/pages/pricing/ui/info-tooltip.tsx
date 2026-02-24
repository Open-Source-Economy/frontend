import React from "react";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";

interface InfoTooltipProps {
  content: string;
  description?: string;
  link?: {
    text: string;
    href: string;
  };
  className?: string;
}

export function InfoTooltip(props: InfoTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <div className={`inline-flex items-center justify-center ${props.className}`}>
            <Info className="w-4 h-4 text-brand-neutral-400 hover:text-brand-accent transition-colors" />
          </div>
        </TooltipTrigger>
        <TooltipContent
          className="max-w-[220px] bg-brand-card-blue-dark text-brand-neutral-800 shadow-xl px-3 py-2 border border-brand-neutral-300/30"
          sideOffset={6}
        >
          <div className="space-y-1.5">
            <p className="text-[11px] leading-snug text-brand-neutral-900">{props.content}</p>
            {props.description && (
              <p className="text-[10px] leading-snug text-brand-neutral-600">{props.description}</p>
            )}
            {props.link && (
              <a
                href={props.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[10px] leading-snug text-brand-accent hover:text-brand-accent-light underline hover:no-underline transition-all font-medium"
              >
                {props.link.text}
              </a>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

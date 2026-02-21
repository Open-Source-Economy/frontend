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

export function InfoTooltip({ content, description, link, className }: InfoTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <div className={`inline-flex items-center justify-center ${className}`}>
            <Info className="w-4 h-4 text-brand-neutral-400 hover:text-brand-accent transition-colors" />
          </div>
        </TooltipTrigger>
        <TooltipContent
          className="max-w-[220px] bg-brand-card-blue-dark text-brand-neutral-800 shadow-xl px-3 py-2 border border-brand-neutral-300/30"
          sideOffset={6}
        >
          <div className="space-y-1.5">
            <p className="text-[11px] leading-snug text-brand-neutral-900">{content}</p>
            {description && <p className="text-[10px] leading-snug text-brand-neutral-600">{description}</p>}
            {link && (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[10px] leading-snug text-brand-accent hover:text-brand-accent-light underline hover:no-underline transition-all font-medium"
              >
                {link.text}
              </a>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

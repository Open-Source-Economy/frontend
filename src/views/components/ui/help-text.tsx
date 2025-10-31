import React, { ReactNode } from "react";
import { Info, LucideIcon } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";

interface HelpTextProps {
  children: ReactNode;
  icon?: LucideIcon;
  learnMoreText?: string;
  learnMoreContent?: ReactNode;
  learnMoreTitle?: string;
  learnMoreDescription?: string;
  className?: string;
}

/**
 * HelpText - Reusable help text component with optional "learn more" dialog
 * Used for inline explanations with optional detailed information
 */
export function HelpText({
  children,
  icon: Icon = Info,
  learnMoreText,
  learnMoreContent,
  learnMoreTitle,
  learnMoreDescription,
  className = "",
}: HelpTextProps) {
  return (
    <div className={`flex items-start gap-2 p-3 bg-brand-neutral-200/50 rounded-lg border border-brand-neutral-300/30 ${className}`}>
      <Icon className="w-4 h-4 text-brand-accent mt-0.5 flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <p className="text-xs text-brand-neutral-600">{children}</p>
        {learnMoreText && learnMoreContent && (
          <Dialog>
            <DialogTrigger asChild>
              <button type="button" className="text-xs text-brand-accent hover:text-brand-accent-light transition-colors underline">
                {learnMoreText}
              </button>
            </DialogTrigger>
            <DialogContent className="bg-brand-secondary-dark border border-brand-neutral-300/10 max-w-3xl max-h-[90vh] flex flex-col">
              {(learnMoreTitle || learnMoreDescription) && (
                <DialogHeader>
                  {learnMoreTitle && <DialogTitle className="text-brand-neutral-900">{learnMoreTitle}</DialogTitle>}
                  {learnMoreDescription && <DialogDescription className="text-brand-neutral-600">{learnMoreDescription}</DialogDescription>}
                </DialogHeader>
              )}
              <div className="overflow-y-auto pr-2 -mr-2">{learnMoreContent}</div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}

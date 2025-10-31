import React from "react";
import { X } from "lucide-react";
import { cn } from "../utils";
import { cva, type VariantProps } from "class-variance-authority";

const chipVariants = cva(
  "inline-flex items-center rounded-lg bg-gradient-to-r from-brand-accent/15 to-brand-highlight/15 border border-brand-accent/30 transition-colors",
  {
    variants: {
      size: {
        sm: "px-2 py-0.5 text-xs gap-1",
        md: "px-2.5 py-1 text-xs gap-1.5",
        lg: "px-3 py-1.5 text-sm gap-2",
      },
      interactive: {
        true: "hover:from-brand-accent/20 hover:to-brand-highlight/20",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      interactive: false,
    },
  },
);

export interface ChipProps extends VariantProps<typeof chipVariants> {
  children: React.ReactNode;
  onRemove?: () => void;
  className?: string;
  disabled?: boolean;
}

export const Chip: React.FC<ChipProps> = ({ children, onRemove, size, interactive, className, disabled = false }) => {
  const isInteractive = interactive ?? onRemove !== undefined;

  return (
    <span className={cn(chipVariants({ size, interactive: isInteractive }), "text-brand-accent", className)}>
      <span>{children}</span>
      {onRemove && (
        <button
          onClick={onRemove}
          className="text-brand-accent/70 hover:text-brand-error transition-colors cursor-pointer"
          aria-label={`Remove ${children}`}
          type="button"
          disabled={disabled}
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </span>
  );
};

import React from "react";
import { cn } from "src/views/components/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Search } from "lucide-react";

const searchInputVariants = cva(
  "group relative flex w-full items-center rounded-[var(--form-border-radius)] border border-[color:var(--form-border)] bg-[color:var(--form-background)] text-[color:var(--form-text)] text-sm font-normal transition-[var(--form-transition)] shadow-[var(--form-elevation-rest)] outline-none placeholder:text-[color:var(--form-text-placeholder)] backdrop-blur-sm disabled:cursor-not-allowed disabled:opacity-60 hover:border-[color:var(--form-border-hover)] hover:bg-[color:var(--form-background-hover)] hover:shadow-[var(--form-elevation-hover)] hover:-translate-y-0.5 focus:border-[color:var(--form-border-focus)] focus:bg-[color:var(--form-background-focus)] focus:shadow-[var(--form-elevation-focus)] focus:-translate-y-1 focus:ring-2 focus:ring-[color:var(--form-ring-color)]/15 selection:bg-brand-primary selection:text-white",
  {
    variants: {
      variant: {
        default: "",
        outline: "border-2 border-brand-primary/20 hover:border-brand-accent/40 focus:border-brand-accent focus:shadow-[0_0_0_2px_rgb(30_64_175_/_0.2)]",
        filled:
          "border-transparent bg-gradient-to-r from-muted/80 to-brand-primary/5 hover:from-muted hover:to-brand-primary/10 focus:border-brand-accent focus:from-background focus:to-brand-accent/10",
        ghost:
          "border-transparent bg-transparent hover:bg-gradient-to-r hover:from-brand-primary/5 hover:to-brand-accent/5 focus:border-brand-accent/50 focus:bg-gradient-to-r focus:from-brand-primary/10 focus:to-brand-accent/10",
        success: "border-brand-success hover:border-brand-success focus:border-brand-success focus:shadow-[0_0_0_2px_rgb(22_163_74_/_0.2)]",
        error: "border-brand-error hover:border-brand-error focus:border-brand-error focus:shadow-[0_0_0_2px_rgb(220_38_38_/_0.2)]",
        warning: "border-brand-warning/50 hover:border-brand-warning/70 focus:border-brand-warning focus:shadow-[0_0_0_2px_rgb(217_119_6_/_0.2)]",
      },
      size: {
        sm: "h-[var(--form-height-sm)] px-[var(--space-form-padding-x-sm)] py-[var(--space-form-padding-y-sm)] text-xs rounded-[var(--form-border-radius-sm)] pl-8",
        default: "h-[var(--form-height)] px-[var(--space-form-padding-x)] py-[var(--space-form-padding-y)] pl-10",
        lg: "h-[var(--form-height-lg)] px-[var(--space-form-padding-x-lg)] py-[var(--space-form-padding-y-lg)] text-base rounded-[var(--form-border-radius-lg)] pl-12",
        xl: "h-14 px-6 py-3.5 text-lg rounded-xl pl-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface SearchInputProps
  extends Omit<
      React.ComponentProps<"input">,
      // avoid clashes with our variants and controlled props
      "size" | "onChange" | "value"
    >,
    VariantProps<typeof searchInputVariants> {
  value: string;
  onChange: (value: string) => void;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ placeholder = "Search...", value, onChange, className = "", variant = "default", size = "default", type = "text", ...props }, ref) => {
    const iconSize = size === "sm" ? 16 : size === "lg" ? 20 : size === "xl" ? 24 : 18;
    const iconLeft = size === "sm" ? "0.5rem" : size === "lg" ? "1rem" : size === "xl" ? "1.25rem" : "0.75rem";

    return (
      <div className="relative flex-1">
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          className={cn(searchInputVariants({ variant, size }), className)}
          aria-label={props["aria-label"] ?? placeholder}
          {...props}
        />
        <Search
          size={iconSize}
          className="absolute top-1/2 -translate-y-1/2 text-[color:var(--form-text-placeholder)] pointer-events-none"
          style={{ left: iconLeft }}
        />
      </div>
    );
  },
);

SearchInput.displayName = "SearchInput";

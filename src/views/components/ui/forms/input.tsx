import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../utils";

const inputVariants = cva(
  "w-full bg-form-background border border-form-border rounded-lg px-4 py-3 text-brand-neutral-900 placeholder:text-form-text-placeholder focus:border-brand-accent focus:outline-none transition-colors",
  {
    variants: {
      variant: {
        // Default - Simple, clean contact form style
        default: "",

        // Outline - Enhanced border
        outline: "border-2 border-brand-primary/20 hover:border-brand-accent/40 focus:border-brand-accent",

        // Filled - Modern filled appearance
        filled:
          "border-transparent bg-gradient-to-r from-muted/80 to-brand-primary/5 hover:from-muted hover:to-brand-primary/10 focus:border-brand-accent focus:from-background focus:to-brand-accent/10",

        // Ghost - Minimal appearance
        ghost:
          "border-transparent bg-transparent hover:bg-gradient-to-r hover:from-brand-primary/5 hover:to-brand-accent/5 focus:border-brand-accent/50 focus:bg-gradient-to-r focus:from-brand-primary/10 focus:to-brand-accent/10",

        // Success state
        success: "border-brand-success focus:border-brand-success",

        // Error state
        error: "border-brand-error focus:border-brand-error",

        // Warning state
        warning: "border-brand-warning/50 focus:border-brand-warning",
      },
      size: {
        sm: "px-3 py-2 text-xs",
        default: "px-4 py-3",
        lg: "px-5 py-4 text-base",
        xl: "px-6 py-5 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface InputProps extends Omit<React.ComponentProps<"input">, "size">, VariantProps<typeof inputVariants> {
  leftIcon?: React.ComponentType<{ className?: string }>;
  rightIcon?: React.ComponentType<{ className?: string }>;
  loading?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, type, leftIcon: LeftIcon, rightIcon: RightIcon, loading, ...props }, ref) => {
    const hasIcons = LeftIcon || RightIcon || loading;

    const LoadingIcon = () => (
      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    );

    if (hasIcons) {
      return (
        <div className="relative group">
          <input
            type={type}
            className={cn(inputVariants({ variant, size }), LeftIcon && "pl-10", (RightIcon || loading) && "pr-10", className)}
            ref={ref}
            {...props}
          />
          {LeftIcon && (
            <LeftIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-hover:text-brand-primary transition-colors duration-300" />
          )}
          {loading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              <LoadingIcon />
            </div>
          )}
          {RightIcon && !loading && (
            <RightIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-hover:text-brand-primary transition-colors duration-300" />
          )}
        </div>
      );
    }

    return <input type={type} className={cn(inputVariants({ variant, size }), className)} ref={ref} {...props} />;
  },
);

Input.displayName = "Input";

export { Input };
